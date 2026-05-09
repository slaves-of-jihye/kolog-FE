import Link from 'next/link';
import { LogCard } from '@/shared/ui';

type HistoryEntry = {
  date: string;
  dateParam?: string;
  log?: { authorName: string; time: string; message: string };
};

const mockHistory: HistoryEntry[] = [
  {
    date: '4월 24일의 기록',
    dateParam: '4/24',
    log: { authorName: '하린', time: '10:00', message: '집에 가기' },
  },
  {
    date: '4월 25일의 기록',
    dateParam: '4/25',
    log: { authorName: '하린', time: '10:00', message: '집에 가기' },
  },
  { date: '4월 26일의 기록', dateParam: '4/26' },
  { date: '4월 27일의 기록', dateParam: '4/27' },
];

export const HistoryList = () => {
  return (
    <div className="flex flex-col gap-3">
      {mockHistory.map((entry, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 overflow-hidden rounded-[0.5rem] bg-gray-100 p-4"
        >
          <p className="text-[0.875rem] font-bold text-gray-800">{entry.date}</p>
          {entry.log ? (
            <>
              <LogCard
                authorName={entry.log.authorName}
                time={entry.log.time}
                message={entry.log.message}
              />
              <Link
                href={`/log?date=${entry.dateParam}`}
                aria-label={`${entry.date} 로그 보기`}
                className="text-left text-[0.625rem] tracking-[0.0125rem] text-gray-500"
              >
                바로가기 →
              </Link>
            </>
          ) : (
            <p className="text-[0.625rem] tracking-[0.0125rem] text-gray-600">
              아직 기록이 없습니다.
            </p>
          )}
        </div>
      ))}
    </div>
  );
};
