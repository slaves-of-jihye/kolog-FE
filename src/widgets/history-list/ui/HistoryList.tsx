import Link from 'next/link';
import { LogCard } from '@/shared/ui';
import { DateLogItem } from '@/entities/log';
import dayjs from 'dayjs';

interface HistoryListProps {
  logs?: DateLogItem[];
}

export const HistoryList = ({ logs }: HistoryListProps) => {
  if (!logs || logs.length === 0) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-2 overflow-hidden rounded-[0.5rem] bg-gray-100 p-4">
          <p className="text-[0.625rem] tracking-[0.0125rem] text-gray-600">
            아직 기록이 없습니다.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {logs.map((log, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 overflow-hidden rounded-[0.5rem] bg-gray-100 p-4"
        >
          <p className="text-[0.875rem] font-bold text-gray-800">
            {dayjs(log.date).format('M월 D일')}의 기록
          </p>
          <LogCard authorName={log.nickname} time={`${log.hour}:00`} message={log.caption} />
          <Link
            href={`/log?date=${encodeURIComponent(log.date)}`}
            aria-label={`${log.date} 로그 보기`}
            className="text-left text-[0.625rem] tracking-[0.0125rem] text-gray-500"
          >
            바로가기 →
          </Link>
        </div>
      ))}
    </div>
  );
};
