import {
  checkClientByEmail,
  checkCustomerByEmail,
  createCustomer,
} from "@/lib/data-service";

async function Home() {
  await createCustomer({
    email: "Akomid@gmail.com",
    name: "Ako Mid",
    user_role: "customer",
    method: "signup",
  });
  // let clientOrCustomer = null;
  // const existingClient = await checkClientByEmail("ardaguler@gmail.com");
  // if (existingClient) clientOrCustomer = "client";
  // const existingCustomer = await checkCustomerByEmail("ardaguler@gmail.com");
  // if (existingCustomer) clientOrCustomer = "customer";

  // console.log("Client: ", existingClient);
  // console.log("Customer: ", existingCustomer);
  // console.log(clientOrCustomer);

  return (
    <>
      <h1 className="font-satoshi text-7xl font-black text-primary-shade-10">
        heading
      </h1>
      <h1 className="text-primary-shade-20">heading</h1>
      <h1 className="text-primary-shade-30">heading</h1>
      <h1 className="text-primary-shade-40">heading</h1>
      <h1 className="text-primary-shade-50">heading</h1>
      <h1 className="text-primary-shade-60">heading</h1>
      <h1 className="text-primary-shade-60">heading</h1>
      <h1 className="text-primary-shade-60">heading</h1>
      <h1 className="text-primary-shade-60">heading</h1>
      <h1 className="text-primary-shade-60">heading</h1>
      <h1 className="text-primary-shade-60">heading</h1>
      <h1 className="text-primary-shade-60">heading</h1>
      <h1 className="text-primary-shade-70">heading</h1>
      <h1 className="text-primary-shade-80">heading</h1>
      <h1 className="text-primary-shade-90">heading</h1>
      <h1 className="text-primary-shade-100">heading</h1>
      <h1 className="text-primary-shade-10">heading</h1>
      <h1 className="text-primary-shade-10">heading</h1>
      <h1 className="text-primary-shade-60">heading</h1>
      <h1 className="text-primary-shade-10">heading</h1>
      <h1 className="text-primary-shade-10">heading</h1>
      <h1 className="text-primary-shade-10">heading</h1>
      <h1 className="text-primary-shade-10">heading</h1>
      <h1 className="text-primary-shade-10">heading</h1>
      <h1 className="text-primary-shade-10">heading</h1>
      <h1 className="text-primary-shade-10">heading</h1>
    </>
  );
}

export default Home;
