'use client';

import { useState } from 'react';
import { LogCard } from '@/shared/ui';
import { LogDetailModal } from '@/features/log-detail';
import { Log } from '@/entities/log';

type LogListProps = {
  logs: Log[];
};

export const LogList = ({ logs }: LogListProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex !== null ? logs[selectedIndex] : null;

  return (
    <>
      <div className="flex flex-col gap-2">
        {logs.map((log, i) => (
          <div
            key={log.logId || i}
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
              authorName={log.user.nickname}
              time={`${log.hour}:00`}
              message={log.caption}
              showProgress={false}
            />
          </div>
        ))}
      </div>

      {selected && (
        <LogDetailModal
          logId={selected.logId}
          authorName={selected.user.nickname}
          time={`${selected.hour}:00`}
          message={selected.caption}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
};
