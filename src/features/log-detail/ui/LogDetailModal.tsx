'use client';

import { useEffect, useState } from 'react';
import { LogCard } from '@/shared/ui';
import { Profile } from '@/shared/ui';
import { EmotionPickerModal } from '@/features/emotion-picker';
import {
  Log,
  useCreateChatMutation,
  useDeleteLogMutation,
  useEmotionMutation,
  useUpdateLogMutation,
} from '@/entities/log';
import { useProfile } from '@/entities/user';
import { fixLocalhost } from '@/shared/lib/url';

type LogDetailModalProps = {
  log: Log;
  onClose: () => void;
};

export const LogDetailModal = ({ log, onClose }: LogDetailModalProps) => {
  const [input, setInput] = useState('');
  const [showEmotionPicker, setShowEmotionPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editCaption, setEditCaption] = useState(log.caption ?? '');
  const [editVideoFile, setEditVideoFile] = useState<File | null>(null);

  const { userId } = useProfile();
  const isOwner = log.uploader.id === userId;

  const comments = log.comments;
  const { mutate: createChat, isPending: isChatPending } = useCreateChatMutation();
  const { mutate: addEmotion } = useEmotionMutation();
  const { mutate: updateLog, isPending: isUpdatePending } = useUpdateLogMutation();
  const { mutate: deleteLog, isPending: isDeletePending } = useDeleteLogMutation();

  const handleSubmit = () => {
    const content = input.trim();
    if (!content || isChatPending) return;
    createChat({ logId: log.id, content }, { onSuccess: () => setInput('') });
  };

  const handleUpdate = () => {
    if (isUpdatePending) return;
    updateLog(
      { logId: log.id, caption: editCaption, videoFile: editVideoFile ?? undefined },
      {
        onSuccess: () => {
          setIsEditing(false);
          setEditVideoFile(null);
        },
        onError: () => {
          alert('로그 수정에 실패했습니다. 잠시 후 다시 시도해 주세요.');
        },
      },
    );
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditCaption(log.caption ?? '');
    setEditVideoFile(null);
  };

  const handleDelete = () => {
    if (isDeletePending) return;
    if (!confirm('이 로그를 삭제할까요? 되돌릴 수 없습니다.')) return;
    deleteLog(log.id, {
      onSuccess: () => onClose(),
      onError: () => alert('로그 삭제에 실패했습니다. 잠시 후 다시 시도해 주세요.'),
    });
  };

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
        <LogCard
          authorName={log.uploader.nickname}
          time={`${log.hour}:00`}
          message={log.caption ?? ''}
          videoUrl={log.videoUrl}
          profileImageUrl={log.uploader.profileImageUrl || undefined}
          showProgress={false}
          onEmotion={(e) => {
            e?.stopPropagation();
            setShowEmotionPicker(true);
          }}
        />

        {/* 작성자 전용 수정/삭제 */}
        {isOwner && !isEditing && (
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="text-[0.625rem] tracking-[0.0125rem] text-gray-500"
            >
              수정
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={isDeletePending}
              className="text-[0.625rem] tracking-[0.0125rem] text-red-500 disabled:opacity-50"
            >
              삭제
            </button>
          </div>
        )}

        {isOwner && isEditing && (
          <div className="flex flex-col gap-2 rounded-[0.5rem] border border-gray-100 bg-white p-2.5">
            <textarea
              className="focus:border-primary-300 min-h-[3rem] rounded-[0.25rem] border border-gray-200 bg-white px-2 py-1.5 text-[0.625rem] tracking-[0.0125rem] text-gray-800 outline-none"
              value={editCaption}
              onChange={(e) => setEditCaption(e.target.value)}
              placeholder="캡션을 입력하세요"
            />
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setEditVideoFile(e.target.files?.[0] ?? null)}
              className="text-[0.625rem] text-gray-600"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="text-[0.625rem] tracking-[0.0125rem] text-gray-500"
              >
                취소
              </button>
              <button
                type="button"
                onClick={handleUpdate}
                disabled={isUpdatePending}
                className="bg-primary-200 rounded-[0.25rem] px-2.5 py-1.5 text-[0.625rem] tracking-[0.0125rem] text-gray-800 disabled:opacity-50"
              >
                저장
              </button>
            </div>
          </div>
        )}

        {/* 댓글 입력 */}
        <div className="flex items-start gap-1">
          <input
            className="focus:border-primary-300 min-w-0 flex-1 rounded-[0.25rem] border border-gray-200 bg-white px-2 py-2 text-[0.625rem] tracking-[0.0125rem] text-gray-800 outline-none placeholder:text-gray-400"
            placeholder="무엇이든 남겨 보세요!"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) handleSubmit();
            }}
          />
          <button
            type="button"
            disabled={isChatPending || !input.trim()}
            onClick={handleSubmit}
            className="bg-primary-200 shrink-0 rounded-[0.25rem] px-2.5 py-2 text-[0.625rem] tracking-[0.0125rem] text-gray-800 disabled:opacity-50"
          >
            전송
          </button>
        </div>

        {/* 댓글 목록 */}
        <div className="flex flex-col gap-2">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="flex flex-col gap-2 rounded-[0.5rem] border border-gray-100 bg-white p-2.5"
            >
              <div className="flex items-center gap-1">
                <Profile
                  className="size-6"
                  border
                  src={fixLocalhost(comment.author.profileImageUrl ?? undefined)}
                  alt={comment.author.nickname}
                />
                <p className="text-[0.625rem] tracking-[0.0125rem] text-gray-800">
                  {comment.author.nickname}
                </p>
              </div>
              <p className="text-[0.625rem] tracking-[0.0125rem] text-gray-600">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {showEmotionPicker && (
        <EmotionPickerModal
          onSelect={(emotionId) => {
            addEmotion(
              { logId: log.id, emotionId },
              {
                onSuccess: () => {
                  alert('반응을 남겼습니다!');
                  setShowEmotionPicker(false);
                },
                onError: () => {
                  alert('이미 반응을 남겼거나 오류가 발생했습니다.');
                  setShowEmotionPicker(false);
                },
              },
            );
          }}
          onClose={() => setShowEmotionPicker(false)}
        />
      )}
    </div>
  );
};
