import { Suspense } from "react";
import ProductList from "@/component/ProductList";
import Heading from "@/component/Heading";

export const metadata = {
  title: "Products",
};

function Page({ searchParams }) {
  console.log(`search param ${searchParams}`);

  return (
    <div>
      <Heading> Products </Heading>
      {/* // use a loader as fallback here */}
      <Suspense fallback={<p>Loading page</p>}>
        <ProductList />
      </Suspense>
    </div>
  );
}

export default Page;
