type ProfileProps = {
  className?: string;
  border?: boolean;
  thick?: boolean;
  src?: string;
  alt?: string;
};

export const Profile = ({
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
      suppressHydrationWarning
    >
      {src && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          onError={(e) => {
            // 이미지 로드 실패 시 숨김 처리
            e.currentTarget.style.display = 'none';
          }}
        />
      )}
    </div>
  );
};

export default Profile;
