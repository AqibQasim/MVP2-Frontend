import HeadingSmall from "./HeadingSmall";
import Hr from "./Hr";

function DashboardSection({
  paragraph = "",
  heading = "Recommendations",
  children,
}) {
  return (
    <div className="rounded-3xl bg-neutral-white p-6">
      <div className="head">
        <p className="text-sm font-medium text-grey-primary-shade-30">
          {paragraph}
        </p>
        <HeadingSmall>{heading}</HeadingSmall>
      </div>
      <Hr />
      <div className="body"> {children} </div>
    </div>
  );
}

export default DashboardSection;
