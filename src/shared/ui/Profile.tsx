import Image from 'next/image';

type ProfileProps = {
  className?: string;
  border?: boolean;
  thick?: boolean;
  src?: string;
  alt?: string;
};

const Profile = ({
  className = '',
  border = false,
  thick = false,
  src,
  alt = '',
}: ProfileProps) => {
  const borderClass = border
    ? thick
      ? 'border-2 border-primary-300'
      : 'border border-primary-300'
    : '';

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full bg-gray-200 ${borderClass} ${className}`.trim()}
    >
      {src && <Image src={src} alt={alt} fill className="object-cover" />}
    </div>
  );
};

export default Profile;
