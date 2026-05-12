'use client';

import { useEffect, useState } from 'react';
import { LogCard } from '@/shared/ui';
import { Profile } from '@/shared/ui';
import { useLogChats } from '@/entities/log';

type LogDetailModalProps = {
  logId: number;
  authorName: string;
  time: string;
  message: string;
  onClose: () => void;
};

export const LogDetailModal = ({
  logId,
  authorName,
  time,
  message,
  onClose,
}: LogDetailModalProps) => {
  const [input, setInput] = useState('');
  const { data: comments = [] } = useLogChats(logId);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

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
        role="dialog"
        aria-modal="true"
        aria-label="로그 상세"
        className="flex w-[21rem] flex-col gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 선택된 로그 카드 */}
        <LogCard authorName={authorName} time={time} message={message} showProgress={false} />

        {/* 댓글 입력 */}
        <div className="flex items-start gap-1">
          <input
            className="focus:border-primary-300 min-w-0 flex-1 rounded-[0.25rem] border border-gray-200 bg-white px-2 py-2 text-[0.625rem] tracking-[0.0125rem] text-gray-800 outline-none placeholder:text-gray-400"
            placeholder="무엇이든 남겨 보세요!"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="button"
            className="bg-primary-200 shrink-0 rounded-[0.25rem] px-2.5 py-2 text-[0.625rem] tracking-[0.0125rem] text-gray-800"
          >
            전송
          </button>
        </div>

        {/* 댓글 목록 */}
        <div className="flex flex-col gap-2">
          {comments.map((comment, i) => (
            <div
              key={comment.chatId || i}
              className="flex flex-col gap-2 rounded-[0.5rem] border border-gray-100 bg-white p-2.5"
            >
              <div className="flex items-center gap-1">
                <Profile className="size-6" border />
                <p className="text-[0.625rem] tracking-[0.0125rem] text-gray-800">
                  {comment.nickname}
                </p>
              </div>
              <p className="text-[0.625rem] tracking-[0.0125rem] text-gray-600">
                {comment.chatContent}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
