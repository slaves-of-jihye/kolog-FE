'use client';

import { useState } from 'react';
import MoreVertical from '@/shared/assets/icons/more-vertical.svg';
import EmotionIcon from '@/shared/assets/icons/emotion-icon.svg';
import { Profile } from './Profile';
import { fixLocalhost } from '@/shared/lib/url';

type LogComment = {
  authorName: string;
  text: string;
};

type LogCardProps = {
  authorName: string;
  time: string;
  message: string;
  videoUrl?: string;
  profileImageUrl?: string;
  totalSegments?: number;
  activeSegmentIndex?: number;
  showProgress?: boolean;
  showUploadCta?: boolean;
  uploadCtaLabel?: string;
  onUploadCtaClick?: () => void;
  onEmotion?: (e?: React.MouseEvent) => void;
  onEditLog?: () => void;
  onDeleteLog?: () => void;
  comment?: LogComment;
};

const LogCard = ({
  authorName,
  time,
  message,
  videoUrl,
  profileImageUrl,
  totalSegments = 7,
  activeSegmentIndex = 6,
  showProgress = true,
  showUploadCta = false,
  uploadCtaLabel = '눌러서 촬영',
  onUploadCtaClick,
  onEmotion,
  onEditLog,
  onDeleteLog,
  comment,
}: LogCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const fixedVideoUrl = fixLocalhost(videoUrl);
  const fixedProfileImageUrl = fixLocalhost(profileImageUrl);
  const canManage = !!onEditLog || !!onDeleteLog;

  return (
    <div className="relative flex h-[10.125rem] w-full shrink-0 flex-col items-center justify-between overflow-hidden rounded-[0.625rem] p-3">
      {fixedVideoUrl ? (
        <video
          src={fixedVideoUrl}
          autoPlay
          muted
          playsInline
          loop
          className="absolute inset-0 h-full w-full rounded-[0.625rem] object-cover"
        />
      ) : (
        <div className="absolute inset-0 rounded-[0.625rem] bg-gray-300" />
      )}
      <div className="absolute inset-0 rounded-[0.625rem] bg-black/10" />

      <div className="relative flex w-full items-center justify-between">
        <div className="flex items-center gap-1">
          <Profile className="size-4" src={fixedProfileImageUrl} alt={authorName} border={false} />
          <p
            className="text-[0.5rem] tracking-[0.01rem] whitespace-nowrap text-white"
            suppressHydrationWarning
          >
            {authorName}
          </p>
        </div>
        {canManage ? (
          <div className="relative">
            <button
              type="button"
              className="shrink-0"
              aria-haspopup="menu"
              aria-expanded={isMenuOpen}
              aria-controls="log-card-menu"
              aria-label="로그 관리 메뉴 열기"
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen((prev) => !prev);
              }}
            >
              <MoreVertical className="size-4 fill-white" />
            </button>

            {isMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuOpen(false);
                  }}
                />
                <div
                  id="log-card-menu"
                  role="menu"
                  className="absolute top-5 right-0 z-50 flex flex-col gap-1 overflow-hidden rounded-lg bg-white/90 p-2 whitespace-nowrap shadow-[0_2px_4px_0_rgba(0,0,0,0.25)] backdrop-blur-xl"
                >
                  {onEditLog && (
                    <button
                      type="button"
                      role="menuitem"
                      className="rounded-md px-2 py-1 text-left text-[0.625rem] tracking-[0.0125rem] text-gray-700 hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMenuOpen(false);
                        onEditLog();
                      }}
                    >
                      수정
                    </button>
                  )}
                  {onDeleteLog && (
                    <button
                      type="button"
                      role="menuitem"
                      className="rounded-md px-2 py-1 text-left text-[0.625rem] tracking-[0.0125rem] text-red-500 hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMenuOpen(false);
                        onDeleteLog();
                      }}
                    >
                      삭제
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          <MoreVertical className="size-4 fill-white" />
        )}
      </div>

      <div className="text-primary-50 relative flex flex-col items-center gap-0.5 text-center">
        <p className="font-display text-[2rem] leading-[0.9] whitespace-nowrap">{time}</p>
        {showUploadCta ? (
          <button
            type="button"
            onClick={onUploadCtaClick}
            disabled={!onUploadCtaClick}
            className="flex max-w-[7.25rem] items-center justify-center rounded-full border border-gray-100 bg-gradient-to-b from-gray-50/80 to-gray-50/60 px-2 py-1 backdrop-blur-[6px] disabled:cursor-default"
          >
            <p className="truncate text-[0.5rem] tracking-[0.01rem] text-gray-700">
              {uploadCtaLabel}
            </p>
          </button>
        ) : (
          <p className="text-[0.5rem] tracking-[0.01rem]">{message}</p>
        )}
      </div>

      {showUploadCta ? (
        <div aria-hidden="true" className="size-4" />
      ) : showProgress ? (
        <div className="relative flex h-0.5 w-[10.5rem] items-center gap-0.5">
          {Array.from({ length: totalSegments }).map((_, i) => (
            <div
              key={i}
              className={`h-full min-w-px flex-1 rounded-full ${i === activeSegmentIndex ? 'bg-gray-50' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      ) : (
        <button type="button" onClick={onEmotion} aria-label="공감하기" className="relative size-4">
          <EmotionIcon className="size-full" />
        </button>
      )}

      {comment && (
        <div className="absolute bottom-2 left-3 flex items-end gap-1">
          <div className="size-4 shrink-0 overflow-hidden rounded-full bg-white" />
          <div className="flex max-w-[7.25rem] items-center rounded-full border border-gray-100 bg-gradient-to-b from-gray-50/80 to-gray-50/60 px-2 py-1 backdrop-blur-[6px]">
            <p className="truncate text-[0.5rem] tracking-[0.01rem] text-gray-700">
              {comment.text}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogCard;
