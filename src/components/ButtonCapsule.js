import ChevronRight from "@/svgs/ChevronRight";

function ButtonCapsule({ className, children, onPress, id }) {
  return (
    <button
      onClick={onPress}
      className={`${className} gap-4.5 inline-flex items-center justify-center rounded-[2.5rem] bg-primary p-1.5 pl-5 text-sm font-bold capitalize text-neutral-white`}
      id={id}
      
    >
      {" "}
      {children}{" "}
      <span className="rounded-[150px] bg-neutral-white px-4 py-3 text-neutral-dark">
        <ChevronRight className="h-[10px] w-[9px]" />
      </span>{" "}
    </button>
  );
}

export default ButtonCapsule;
