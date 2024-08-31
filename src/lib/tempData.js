import { notFound } from "next/navigation";

// Dummy data
export const getDummyClients = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Clients could not be loaded:", error.message);
    throw new Error(`Clients could not be loaded:  ${error.message}`);
  }
};

export const getDummyClientById = async (id) => {
  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );

    // For testing
    // await new Promise((res) => setTimeout(res, 5000));

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch client:", error.message);
    notFound();
  }
};
