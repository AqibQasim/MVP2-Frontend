import { Suspense } from "react";
import ProductList from "@/components/ProductList";
import Heading from "@/components/Heading";

export const metadata = {
  title: "Products",
};

function Page({ searchParams }) {
  console.log(`search param ${searchParams}`);

  return (
    <div>
      <Heading> Products </Heading>
      {/* // use a loader as fallback here */}
      <Suspense fallback={<p>Loading Page</p>}>
        <ProductList />
      </Suspense>
    </div>
  );
}

export default Page;
