'use client';

import { LogList } from '@/widgets/log-list';
import { useHourlyLogs } from '@/entities/log';

type GroupLogProps = {
  date?: string;
  hour?: number;
};

export const GroupLog = ({ date, hour }: GroupLogProps) => {
  const { data: logs = [] } = useHourlyLogs(hour);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <p className="text-base font-bold text-gray-800">최강 2학년 2반 로그</p>
        <p className="text-[0.75rem] tracking-[0.015rem] text-gray-500">{date ?? '4-24'}</p>
      </div>

      <div className="flex h-1 items-center gap-0.5">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className={`h-full min-w-px flex-1 rounded-full ${i === 6 ? 'bg-primary-400' : 'bg-gray-300'}`}
          />
        ))}
      </div>

      <LogList logs={logs} />
    </div>
  );
};
