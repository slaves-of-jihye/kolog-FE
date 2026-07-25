'use client';

import { useEffect } from 'react';

type EmotionPickerModalProps = {
  onSelect: (emotionId: string) => void;
  onClose: () => void;
};

const EMOTIONS = [
  { id: 'heart', emoji: '❤️', label: '좋아요' },
  { id: 'laugh', emoji: '😂', label: '웃겨요' },
  { id: 'wow', emoji: '😮', label: '놀라워요' },
  { id: 'sad', emoji: '😢', label: '슬퍼요' },
  { id: 'angry', emoji: '😡', label: '화나요' },
  { id: 'thinking', emoji: '🤔', label: '생각중' },
];

export const EmotionPickerModal = ({ onSelect, onClose }: EmotionPickerModalProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="flex w-[18rem] flex-col gap-3 rounded-2xl bg-white p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-center text-sm font-bold text-gray-800">반응 선택하기</p>
        <div className="grid grid-cols-3 gap-2">
          {EMOTIONS.map((emotion) => (
            <button
              key={emotion.id}
              type="button"
              onClick={() => {
                onSelect(emotion.id);
                onClose();
              }}
              className="flex flex-col items-center gap-1 rounded-xl p-3 transition-colors hover:bg-gray-100"
            >
              <span className="text-2xl">{emotion.emoji}</span>
              <span className="text-[0.625rem] text-gray-600">{emotion.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
