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
      className={`shrink-0 overflow-hidden rounded-full bg-gray-200 ${borderClass} ${className}`.trim()}
    >
      {src && <img src={src} alt={alt} className="h-full w-full object-cover" />}
    </div>
  );
};

export default Profile;
