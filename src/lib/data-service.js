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
