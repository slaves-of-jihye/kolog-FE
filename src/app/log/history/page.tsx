'use client';

import { Header } from '@/widgets/header';
import { HistoryList } from '@/widgets/history-list';
import { useLogsByDate } from '@/entities/log';
import dayjs from 'dayjs';

const History = () => {
  const today = dayjs().format('M-D');
  const { data: logs, isLoading } = useLogsByDate(today);

  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="flex flex-col gap-16 px-5 pt-[4.25rem] pb-16">
        <Header />
        {isLoading ? (
          <div className="flex flex-col gap-2 overflow-hidden rounded-[0.5rem] bg-gray-100 p-4">
            <p className="text-[0.625rem] tracking-[0.0125rem] text-gray-600">
              기록을 불러오는 중입니다...
            </p>
          </div>
        ) : (
          <HistoryList logs={logs} />
        )}
      </div>
    </div>
  );
};

export default History;
