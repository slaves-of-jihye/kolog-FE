'use client';

import { Header } from '@/widgets/header';
import { HistoryList } from '@/widgets/history-list';
import { useLogsByDate } from '@/entities/log';
import dayjs from 'dayjs';

const MOCK_LOGS = [
  {
    date: '5-12',
    hour: 10,
    userId: 1,
    nickname: '하린',
    profileImage: '',
    videoUrl: '',
    caption: '오늘의 기록입니다.',
  },
];

const History = () => {
  const today = dayjs().format('M-D');
  const { data: logs } = useLogsByDate(today);

  const displayLogs = logs && logs.length > 0 ? logs : MOCK_LOGS;

  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="flex flex-col gap-16 px-5 pt-[4.25rem] pb-16">
        <Header />
        <HistoryList logs={displayLogs} />
      </div>
    </div>
  );
};

export default History;
