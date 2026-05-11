'use client';

import { Header } from '@/widgets/header';
import { HistoryList } from '@/widgets/history-list';
import { useLogsByDate } from '@/entities/log';
import dayjs from 'dayjs';

const History = () => {
  const today = dayjs().format('M-D');
  const { data: logs } = useLogsByDate(today);

  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="flex flex-col gap-16 px-5 pt-[4.25rem] pb-16">
        <Header />
        <HistoryList logs={logs} />
      </div>
    </div>
  );
};

export default History;
