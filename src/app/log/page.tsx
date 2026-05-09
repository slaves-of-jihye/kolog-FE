import Image from 'next/image';
import { Archive } from 'lucide-react';
import { ProfileMenu } from '@/features/profile-menu';
import { LogList } from './LogList';
import { VlogBanner } from './VlogBanner';

const mockLogs = [
  { authorName: '하린', time: '10:00', message: '집에 가기' },
  { authorName: '미수', time: '10:00', message: '여기 어디야' },
  {
    authorName: '소리',
    time: '10:00',
    message: '같이 놀자',
    comment: { authorName: '하린', text: '임소리 왜케 귀엽지 진짜' },
  },
  { authorName: '하린', time: '10:00', message: '집에 가기' },
  { authorName: '하린', time: '10:00', message: '집에 가기' },
];

type SearchParams = Promise<{ date?: string; hours?: string; completed?: string }>;

const Log = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { date, hours, completed } = await searchParams;
  const isPastView = Boolean(date && hours);
  const isCompleted = completed === 'true';

  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="flex flex-col gap-16 px-5 pt-[4.25rem] pb-16">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <Image src="/logo.svg" alt="KOLOG" width={74} height={20} priority />
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="보관함"
              className="flex size-8 items-center justify-center"
            >
              <Archive className="size-full text-gray-800" strokeWidth={1.5} />
            </button>
            <ProfileMenu />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {/* 과거 로그 조회 배너 */}
          {isPastView && (
            <VlogBanner
              date={date}
              isCompleted={isCompleted}
              previewLog={isCompleted ? mockLogs[0] : undefined}
            />
          )}

          {/* 그룹 로그 */}
          <div className="flex flex-col gap-2">
            {/* 제목 + 날짜 */}
            <div className="flex items-center gap-2">
              <p className="text-base font-bold text-gray-800">최강 2학년 2반 로그</p>
              <p className="text-[0.75rem] tracking-[0.015rem] text-gray-500">{date ?? '4/24'}</p>
            </div>

            {/* 타임라인 프로그레스 바 */}
            <div className="flex h-1 items-center gap-0.5">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-full min-w-px flex-1 rounded-full ${i === 6 ? 'bg-primary-400' : 'bg-gray-300'}`}
                />
              ))}
            </div>

            <LogList logs={mockLogs} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Log;
