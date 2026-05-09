import { Profile } from '@/shared/ui';
import EmotionIcon from '@/shared/assets/icons/emotion-icon.svg';

type VlogBannerProps = {
  date?: string;
  isCompleted?: boolean;
  previewLog?: {
    authorName: string;
    time: string;
    message: string;
  };
};

export const VlogBanner = ({ date, isCompleted = false, previewLog }: VlogBannerProps) => {
  if (isCompleted) {
    return (
      <div className="flex flex-col gap-[0.625rem] rounded-[0.5rem] bg-gray-100 p-3">
        <p className="font-display text-2xl leading-[0.9] font-bold text-gray-800">
          오늘의 브이로그
        </p>
        <p className="text-[0.75rem] tracking-[0.015rem] text-gray-500">
          {date ? `${date}의 브이로그가 완성되었습니다!` : '브이로그가 완성되었습니다!'}
        </p>
        {previewLog && (
          <div className="relative flex h-[162px] flex-col items-center justify-between overflow-hidden rounded-[0.625rem] bg-gray-800 p-3">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-1">
                <Profile className="size-4" />
                <p className="text-[0.5rem] tracking-[0.01rem] text-white">
                  {previewLog.authorName}
                </p>
              </div>
            </div>
            <div className="text-primary-50 flex flex-col items-center">
              <p className="font-display text-[2rem] leading-[0.9]">{previewLog.time}</p>
              <p className="text-[0.5rem] tracking-[0.01rem]">{previewLog.message}</p>
            </div>
            <EmotionIcon className="size-[1.125rem]" />
          </div>
        )}
        <button
          type="button"
          className="text-left text-[0.625rem] tracking-[0.0125rem] text-gray-500"
        >
          바로가기 →
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 rounded-[0.5rem] bg-gray-100 px-4 py-3">
      <p className="font-display text-base font-bold text-gray-800">오늘의 브이로그</p>
      <p className="text-[0.625rem] tracking-[0.0125rem] text-gray-500">
        오늘의 브이로그가 생성 중입니다...
      </p>
    </div>
  );
};
