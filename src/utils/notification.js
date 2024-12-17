import urlBase64ToUint8Array from "./urlBase64ToUint8Array";

export const sendNotification = (user_id,user_role) => {
    // if ("Notification" in window) {
    //   console.log("Sending notification...");
    //   new Notification("Hello!", {
    //     body: "This is your notification.",
    //     //icon: "/icon.png", // Optional: Add an icon
    //   });
    // } else {
    //   console.error("Notifications are not supported in this browser.");
    // }
    if (
      "serviceWorker" in navigator &&
      "PushManager" in window
    ) {
      navigator.serviceWorker
        .register("/sw.js", {
          scope: "/",
        })
        .then(async (swRegistration) => {
          const existingSubscription =
            await swRegistration.pushManager.getSubscription();
          if (existingSubscription) {
            // Unsubscribe if the applicationServerKey is different
            console.log("Unsubscribing existing subscription...");
            await existingSubscription.unsubscribe();
          }
          const subscription = await swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(
              process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
            ),
          });
          console.log("Push subscription:", subscription);
          // Send the subscription object to your backend
          fetch(`${process.env.NEXT_PUBLIC_API_REMOTE_URL}/subscribe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              subscription,
              user_id,
              user_role
            }),
          }).then(async (res) => {
            console.log(await res.json());
          });
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  };