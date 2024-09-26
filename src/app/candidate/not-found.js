import Button from "@/components/Button";
import Link from "next/link";

function NotFound({ error }) {

  return (
    <main className="mt-20 flex flex-col items-center justify-center space-y-6 px-4 text-center lg:mt-0 lg:h-[calc(100dvh-7.25em)]">
      <h1 className="text-balance text-4xl font-semibold">
        This Candidate could not be found :(
      </h1>
      <p>
        You may go back to{" "}
        <Link href="/" class="text-blue-700 hover:underline">
          home
        </Link>
        .
      </p>
      <Button as="link" href="/">
        Back to home
      </Button> 
    </main>
  );
}

export default NotFound;
