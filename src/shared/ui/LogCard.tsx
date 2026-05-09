import MoreVertical from '@/shared/assets/icons/more-vertical.svg';
import EmotionIcon from '@/shared/assets/icons/emotion-icon.svg';

type LogComment = {
  authorName: string;
  text: string;
};

type LogCardProps = {
  authorName: string;
  time: string;
  message: string;
  totalSegments?: number;
  activeSegmentIndex?: number;
  showProgress?: boolean;
  showUploadCta?: boolean;
  uploadCtaLabel?: string;
  onUploadCtaClick?: () => void;
  onEmotion?: () => void;
  comment?: LogComment;
};

const LogCard = ({
  authorName,
  time,
  message,
  totalSegments = 7,
  activeSegmentIndex = 6,
  showProgress = true,
  showUploadCta = false,
  uploadCtaLabel = '눌러서 촬영',
  onUploadCtaClick,
  onEmotion,
  comment,
}: LogCardProps) => {
  return (
    <div className="relative flex h-[10.125rem] w-full shrink-0 flex-col items-center justify-between overflow-hidden rounded-[0.625rem] p-3">
      <div className="absolute inset-0 rounded-[0.625rem] bg-gray-300" />
      <div className="absolute inset-0 rounded-[0.625rem] bg-black/10" />

      <div className="relative flex w-full items-center justify-between">
        <div className="flex items-center gap-1">
          <div className="size-4 shrink-0 rounded-full bg-white" />
          <p className="text-[0.5rem] tracking-[0.01rem] whitespace-nowrap text-white">
            {authorName}
          </p>
        </div>
        <MoreVertical className="size-4 fill-white" />
      </div>

      <div className="text-primary-50 relative flex flex-col items-center gap-0.5 text-center">
        <p className="font-display text-[2rem] leading-[0.9] whitespace-nowrap">{time}</p>
        {showUploadCta ? (
          <button
            type="button"
            onClick={onUploadCtaClick}
            disabled={!onUploadCtaClick}
            className="flex max-w-[7.25rem] items-center justify-center rounded-full border border-gray-100 bg-gradient-to-b from-gray-50/80 to-gray-50/60 px-2 py-1 backdrop-blur-[6px] disabled:cursor-default"
          >
            <p className="truncate text-[0.5rem] tracking-[0.01rem] text-gray-700">
              {uploadCtaLabel}
            </p>
          </button>
        ) : (
          <p className="text-[0.5rem] tracking-[0.01rem]">{message}</p>
        )}
      </div>

      {showUploadCta ? (
        <div aria-hidden="true" className="size-4" />
      ) : showProgress ? (
        <div className="relative flex h-0.5 w-[10.5rem] items-center gap-0.5">
          {Array.from({ length: totalSegments }).map((_, i) => (
            <div
              key={i}
              className={`h-full min-w-px flex-1 rounded-full ${i === activeSegmentIndex ? 'bg-gray-50' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      ) : (
        <button type="button" onClick={onEmotion} aria-label="공감하기" className="relative size-4">
          <EmotionIcon className="size-full" />
        </button>
      )}

      {comment && (
        <div className="absolute bottom-2 left-3 flex items-end gap-1">
          <div className="size-4 shrink-0 overflow-hidden rounded-full bg-white" />
          <div className="flex max-w-[7.25rem] items-center rounded-full border border-gray-100 bg-gradient-to-b from-gray-50/80 to-gray-50/60 px-2 py-1 backdrop-blur-[6px]">
            <p className="truncate text-[0.5rem] tracking-[0.01rem] text-gray-700">
              {comment.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogCard;
