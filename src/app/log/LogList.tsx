'use client';

import { useState } from 'react';
import { LogCard } from '@/shared/ui';
import { LogDetailModal } from '@/features/log-detail';

type LogItem = {
  authorName: string;
  time: string;
  message: string;
  comment?: { authorName: string; text: string };
};

type LogListProps = {
  logs: LogItem[];
};

export const LogList = ({ logs }: LogListProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex !== null ? logs[selectedIndex] : null;

  return (
    <>
      <div className="flex flex-col gap-2">
        {logs.map((log, i) => (
          <div
            key={i}
            role="button"
            tabIndex={0}
            className="cursor-pointer"
            onClick={() => setSelectedIndex(i)}
            onKeyDown={(e) => {
              if (e.key === ' ') {
                e.preventDefault();
                setSelectedIndex(i);
              } else if (e.key === 'Enter') {
                setSelectedIndex(i);
              }
            }}
          >
            <LogCard
              authorName={log.authorName}
              time={log.time}
              message={log.message}
              showProgress={false}
              comment={log.comment}
            />
          </div>
        ))}
      </div>

      {selected && (
        <LogDetailModal
          authorName={selected.authorName}
          time={selected.time}
          message={selected.message}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
};
