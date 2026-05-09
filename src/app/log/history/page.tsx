import { Header } from '@/widgets/header';
import { HistoryList } from '@/widgets/history-list';

const History = () => {
  return (
    <div className="relative min-h-screen w-full bg-white">
      <div className="flex flex-col gap-16 px-5 pt-[4.25rem] pb-16">
        <Header />
        <HistoryList />
      </div>
    </div>
  );
};

export default History;
