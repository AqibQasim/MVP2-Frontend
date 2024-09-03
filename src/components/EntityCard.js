import Image from "next/image";
import PropTypes from "prop-types";

function EntityCard({
  sm = false,
  lg = false,
  icon = false,
  entity = {
    image: "/avatars/avatar-1.png",
    name: "John Doe",
    profession: "Software Developer",
  },
}) {
  const sizeClass = lg ? "size-20" : sm ? "size-9" : "size-12";
  const textSizeClass = lg ? "text-lg" : sm ? "text-base" : "text-sm";

  return (
    <div className="entity flex items-center justify-start gap-2">
      <div
        className={`relative ${sizeClass} ${icon ? "!bg-primary-tint-100 p-3.5" : ""} overflow-hidden rounded-full bg-bg-avatar`}
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
        <p className={`font-lufga ${textSizeClass} font-medium`}>
          {entity.name}
        </p>
        <p className="text-sm font-medium text-grey-primary-shade-30">
          {entity.profession}
        </p>
      </div>
    </div>
  );
}

EntityCard.propTypes = {
  sm: PropTypes.bool,
  lg: PropTypes.bool,
  profession: PropTypes.bool,
  entity: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    profession: PropTypes.string,
  }),
};

export default EntityCard;
