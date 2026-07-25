'use client';

import { useState } from 'react';
import { LogCard } from '@/shared/ui';
import { LogDetailModal } from '@/features/log-detail';
import { EmotionPickerModal } from '@/features/emotion-picker';
import { Log, useEmotionMutation } from '@/entities/log';

type LogListProps = {
  logs: Log[];
};

export const LogList = ({ logs }: LogListProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [emotionPickerLogId, setEmotionPickerLogId] = useState<number | null>(null);
  const selected = selectedIndex !== null ? logs[selectedIndex] : null;
  const { mutate: addEmotion } = useEmotionMutation();

  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-10 text-gray-400">
        <p className="text-sm">아직 아무도 로그를 업로드하지 않았어요.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {logs.map((log, i) => (
          <div
            key={log.logId ?? i}
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
              authorName={log.nickname}
              time={`${log.hour}:00`}
              message={log.caption}
              videoUrl={log.videoUrl}
              showProgress={false}
              onEmotion={(e) => {
                e.stopPropagation();
                setEmotionPickerLogId(log.logId);
              }}
            />
          </div>
        ))}
      </div>

      {selected && (
        <LogDetailModal
          logId={selected.logId}
          authorName={selected.nickname}
          time={`${selected.hour}:00`}
          message={selected.caption}
          videoUrl={selected.videoUrl}
          onClose={() => setSelectedIndex(null)}
        />
      )}

      {emotionPickerLogId !== null && (
        <EmotionPickerModal
          onSelect={(emotionId) => {
            addEmotion(
              { logId: emotionPickerLogId, emotionId },
              {
                onSuccess: () => {
                  alert('반응을 남겼습니다!');
                  setEmotionPickerLogId(null);
                },
              },
            );
          }}
          onClose={() => setEmotionPickerLogId(null)}
        />
      )}
    </>
  );
};
