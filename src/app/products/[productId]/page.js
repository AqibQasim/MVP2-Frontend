import { getProductById, getProducts } from "@/lib/data-service";

//  dynamic metadeta for dynamic routes
export async function generateMetadata({ params }) {
  const { title } = await getProductById(params.productId);
  return { title: `Product ${title}` };
}

// Static route generation for dynamic routes
export async function generateStaticParams() {
  const products = await getProducts();
  const ids = products.map((product) => ({ productId: String(product.id) }));
  return ids;
}

async function Page({ params }) {
  // Todo Get Product
  const product = await getProductById(params.productId);

  return (
    <div>
      <h1>Product {params.productId} </h1>
    </div>
  );
}

export default Page;
