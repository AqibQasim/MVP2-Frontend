import PropTypes from "prop-types";
import Image from "next/image";

function EntityCard({
  sm = false,
  lg = false,
  entity = {
    image: "/avatars/avatar-1.png",
    name: "John Doe",
    profession: "Software Developer",
  },
}) {
  return (
    <div className="entity flex items-center justify-start gap-2">
      <div
        className={`relative size-12 overflow-hidden rounded-full bg-bg-avatar`}
      >
        <Image
          src={entity.image}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          alt="an avatar image"
        />
      </div>
      <div className="names">
        <p className="font-lufga text-sm font-medium"> {entity.name} </p>
        <p className="text-sm font-medium text-grey-primary-shade-30">
          {" "}
          {entity.profession}{" "}
        </p>
      </div>
    </div>
  );
}

EntityCard.propTypes = {
  sm: PropTypes.bool,
  lg: PropTypes.bool,
  entity: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    profession: PropTypes.string,
  }),
};

export default EntityCard;
