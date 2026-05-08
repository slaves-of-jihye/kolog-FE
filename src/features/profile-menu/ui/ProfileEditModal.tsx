'use client';

import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { Profile, Button } from '@/shared/ui';

type ProfileEditModalProps = {
  onClose: () => void;
  initialName?: string;
  onConfirm?: (nickname: string) => void;
};

export const ProfileEditModal = ({ onClose, initialName, onConfirm }: ProfileEditModalProps) => {
  const [nickname, setNickname] = useState(initialName ?? '');

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]" onClick={onClose}>
      <div
        className="absolute top-[13.1875rem] right-[2.0625rem] left-[2.0625rem] flex flex-col items-center gap-6 rounded-[0.5rem] bg-white px-9 py-8"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[0.875rem] text-gray-600">프로필 편집</p>
        <div className="flex w-full flex-col items-center gap-4">
          <div className="relative size-[6.875rem] shrink-0">
            <Profile className="size-full" border thick />
            <button
              className="absolute right-0 bottom-0 size-[1.375rem]"
              aria-label="프로필 사진 변경"
            >
              <Pencil className="size-full text-gray-600" strokeWidth={1.5} />
            </button>
          </div>
          <div className="flex w-full flex-col gap-1">
            <p className="text-[0.625rem] tracking-[0.0125rem] text-gray-700">닉네임</p>
            <div className="rounded-[0.25rem] bg-gray-100 px-2 py-[0.3125rem]">
              <input
                className="w-full bg-transparent text-[0.625rem] tracking-[0.0125rem] text-gray-800 outline-none"
                placeholder="이름을 입력하세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>
          </div>
        </div>
        <Button label="적용하기" onClick={() => onConfirm?.(nickname)} />
      </div>
    </div>
  );
};
