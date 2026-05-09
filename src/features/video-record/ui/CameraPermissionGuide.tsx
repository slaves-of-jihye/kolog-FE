'use client';

import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

type CameraPermissionGuideProps = {
  onClose: () => void;
  title?: string;
  description?: string;
};

export const CameraPermissionGuide = ({
  onClose,
  title = '카메라 권한이 필요해요',
  description = '브라우저 주소창의 자물쇠 아이콘을 눌러 카메라 권한을 허용한 뒤 다시 시도해 주세요.',
}: CameraPermissionGuideProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cam-perm-title"
        aria-describedby="cam-perm-desc"
        className="flex w-full max-w-sm flex-col gap-4 rounded-t-[1.25rem] bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto h-1 w-10 rounded-full bg-gray-300" />
        <div className="flex flex-col gap-1.5">
          <p id="cam-perm-title" className="text-base font-bold text-gray-800">
            {title}
          </p>
          <p id="cam-perm-desc" className="text-[0.75rem] tracking-[0.015rem] text-gray-500">
            {description}
          </p>
        </div>
        <button
          type="button"
          autoFocus
          className="bg-primary-200 rounded-[0.5rem] py-3 text-[0.875rem] font-bold text-gray-800"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  );
};
