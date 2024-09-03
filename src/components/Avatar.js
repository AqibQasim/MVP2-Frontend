
import Image from "next/image";

const Avatar = ({ src, alt }) => (
    <div className="relative size-8 overflow-hidden rounded-full bg-bg-avatar">
        <Image src={src} fill sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 25vw" className="object-cover" alt={alt} />
    </div>
);

export default Avatar;