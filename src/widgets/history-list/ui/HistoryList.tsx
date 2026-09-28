'use client';

import Link from 'next/link';
import { RecentLogDay, useLogs } from '@/entities/log';
import { LogCard } from '@/shared/ui';
import { mdToIso } from '@/shared/lib/date';
import dayjs from 'dayjs';

interface HistoryListProps {
  dateHours?: RecentLogDay[];
}

export const HistoryList = ({ dateHours }: HistoryListProps) => {
  if (!dateHours || dateHours.length === 0) {
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

  // 날짜 내림차순 정렬 (최신순)
  const sortedDateHours = [...dateHours].sort((a, b) => {
    return dayjs(mdToIso(b.date)).diff(dayjs(mdToIso(a.date)));
  });

  return (
    <div className="flex flex-col gap-3">
      {sortedDateHours.map((item) => (
        <DateHistoryItem
          key={item.date}
          date={item.date}
          firstHour={item.hours[0]}
          totalHours={item.hours.length}
        />
      ))}
    </div>
  );
};

const DateHistoryItem = ({
  date,
  firstHour,
  totalHours,
}: {
  date: string;
  firstHour: number;
  totalHours: number;
}) => {
  const { data: logs } = useLogs({ date: mdToIso(date), hour: firstHour });
  const featuredLog = logs && logs.length > 0 ? logs[0] : null;

  return (
    <div className="flex flex-col gap-2 overflow-hidden rounded-[0.5rem] bg-gray-100 p-4">
      <p className="text-[0.875rem] font-bold text-gray-800">
        {dayjs(mdToIso(date)).format('M월 D일')}의 기록
      </p>
      {featuredLog && (
        <LogCard
          authorName={featuredLog.uploader.nickname}
          time={`${featuredLog.hour}:00`}
          message={featuredLog.caption ?? ''}
          videoUrl={featuredLog.videoUrl}
          profileImageUrl={featuredLog.uploader.profileImageUrl || undefined}
          showProgress={false}
        />
      )}
      <p className="text-[0.625rem] tracking-[0.0125rem] text-gray-600">
        {totalHours}개의 시간대에 로그가 있습니다
      </p>
      <Link
        href={`/log?date=${date}&hour=${firstHour}`}
        aria-label={`${date} 로그 보기`}
        className="text-left text-[0.625rem] tracking-[0.0125rem] text-gray-500"
      >
        바로가기 →
      </Link>
    </div>
  );
};
