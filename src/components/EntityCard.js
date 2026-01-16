import Image from "next/image";
import PropTypes from "prop-types";

function EntityCard({
  onClick,
  sm = false,
  lg = false,
  icon = false,
  showVerified = false,
  entity = {
    image: "/avatars/avatar-2.png",
    name: "John Doe",
    profession: "",
    membership: "",
  },
}) {
  const sizeClass = lg ? "size-20" : sm ? "size-9" : "size-12";
  const textSizeClass = lg ? "text-lg" : sm ? "text-base" : "text-sm";
  const membershipDate =
    entity?.membership && !isNaN(new Date(entity.membership))
      ? new Date(entity.membership).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
      : null;

  return (
    <div className="entity flex items-center justify-start gap-2" onClick={onClick}>
      <div
        className={`relative ${sizeClass} ${icon ? "!bg-primary-tint-100 p-3.5" : ""} overflow-hidden rounded-full bg-bg-avatar -mt-3.5`}
      >
        {!icon ? (
          <Image
            src={entity.image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            alt="Avatar image"
          />
        ) : (
          icon
        )}
      </div>
      <div className="names">
        <div className="flex items-center gap-2">
          <p className={`font-lufga ${textSizeClass} text-[15px] font-medium`}>
            {entity.name}
          </p>
          {showVerified && (
            <Image src="/verifcation.png" alt="Verified" width={16} height={16} />
          )}
        </div>
        {entity.profession && (
          <p className="text-[14px] text-sm font-medium text-grey-primary-shade-30">
            {entity.profession}
          </p>
        )}
        {membershipDate && (
          <p className="text-[13px] text-sm font-medium text-grey-primary-shade-30">
            CovenTal member since {membershipDate}
          </p>
         )} 
      </div>
    </div>
  );
}

EntityCard.propTypes = {
  sm: PropTypes.bool,
  lg: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.element]),
  showVerified: PropTypes.bool,
  entity: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    profession: PropTypes.string,
    membership: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  }),
};

export default EntityCard;
