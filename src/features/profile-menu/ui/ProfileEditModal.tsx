'use client';

import { Pencil } from 'lucide-react';
import { useState, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { Profile } from '@/shared/ui';
import { useUpdateProfileMutation, useProfile } from '@/entities/user';

type ProfileEditModalProps = {
  onClose: () => void;
  initialName?: string;
  onConfirm?: (nickname: string) => void;
};

export const ProfileEditModal = ({ onClose, initialName, onConfirm }: ProfileEditModalProps) => {
  const { nickname: currentNickname, profileImage: currentProfileImage } = useProfile();
  const [nickname, setNickname] = useState(initialName ?? currentNickname);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { mutate: updateProfile, isPending } = useUpdateProfileMutation();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px]" onClick={onClose}>
      <div
        className="absolute top-[13.1875rem] right-[2.0625rem] left-[2.0625rem] flex flex-col items-center gap-6 rounded-[0.5rem] bg-white px-9 py-8"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[0.875rem] text-gray-600">프로필 편집</p>
        <div className="flex w-full flex-col items-center gap-4">
          <div className="relative size-[6.875rem] shrink-0">
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="프로필 미리보기"
                width={110}
                height={110}
                className="size-full rounded-full border-2 border-gray-200 object-cover"
              />
            ) : currentProfileImage ? (
              <Image
                src={currentProfileImage}
                alt="현재 프로필"
                width={110}
                height={110}
                className="size-full rounded-full border-2 border-gray-200 object-cover"
              />
            ) : (
              <Profile className="size-full" border thick />
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <button
              type="button"
              className="absolute right-0 bottom-0 size-[1.375rem]"
              aria-label="프로필 사진 변경"
              onClick={handleImageClick}
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
        <button
          type="button"
          className="bg-primary-100 flex h-12 w-full items-center justify-center rounded-xl text-base font-bold text-gray-800 disabled:opacity-50"
          onClick={() => {
            if (!nickname.trim() || isPending) return;
            updateProfile(
              {
                nickname: nickname.trim(),
                profileImage: profileImage ?? undefined,
              },
              {
                onSuccess: (response) => {
                  // localStorage 업데이트
                  localStorage.setItem('nickname', nickname.trim());
                  if (response.data.profileImage) {
                    localStorage.setItem('profileImage', response.data.profileImage);
                  }
                  // React Query 캐시 무효화하여 최신 데이터 반영
                  queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
                  // localStorage 변경 이벤트 발생
                  window.dispatchEvent(new Event('storage'));
                  onConfirm?.(nickname.trim());
                  onClose();
                },
              },
            );
          }}
          disabled={isPending || !nickname.trim()}
        >
          {isPending ? '저장 중...' : '적용하기'}
        </button>
      </div>
    </div>
  );
};
