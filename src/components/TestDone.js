import Image from "next/image";
import Heading from "./Heading";


function TestDone() {
 
  return (
    <div className="h-screen min-w-4.5 gap-8 rounded-4xl bg-neutral-white px-8 py-10 overflow-hidden">

      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="flex h-auto w-auto flex-col items-center justify-center space-y-6">
          {/* Profile Image */}
          <div className="relative h-[140px] w-[140px] overflow-hidden rounded-full bg-bg-avatar">
            <Image
              src={"/avatars/avatar-3.svg"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              alt="Avatar image"
            />
          </div>

          {/* Welcome Message */}
          <div className="text-center">
            <Heading sm className="font-medium" style={{ fontSize: "34px" }}>
              Sorry!
            </Heading>
            <p className="text-grey-primary-shade-30 mt-5 text-3xl">
              you have alredy given your test.
            </p>
          </div>

        
        </div>
      </div>
     
    </div>
  );
}

export default TestDone;

