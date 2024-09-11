import { notFound } from "next/navigation";
// example

export const getProductById = async function (id) {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);

    // For testing
    // await new Promise((res) => setTimeout(res, 5000));

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error(error);
    notFound();
  }
};

export const getProducts = async function () {
  try {
    const response = await fetch(`https://fakestoreapi.com/products`);

    // For testing
    // await new Promise((res) => setTimeout(res, 5000));

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const product = await response.json();
    return product;
  } catch (error) {
    console.error(error);
    // notFound();
    throw new Error(error || "Products could not be loaded");
  }
};

export async function getClients() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_REMOTE_URL}/clients`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log("Response: ", response);
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(text);
      });
    }

    const clients = await response.json();
    return clients;
  } catch (error) {
    console.log("Error:", error);
    throw new Error(error.message || "Could not get Clients");
  }
}
