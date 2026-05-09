'use client';

import { useState } from 'react';
import { FormField } from '@/shared/ui';

export const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API 연동
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-[3.75rem]">
      <div className="flex flex-col gap-6">
        <FormField
          label="이메일"
          required
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={setEmail}
        />
        <FormField
          label="비밀번호"
          required
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={setPassword}
        />
        <FormField
          label="비밀번호 확인"
          required
          type="password"
          placeholder="비밀번호를 한번 더 입력하세요"
          value={passwordConfirm}
          onChange={setPasswordConfirm}
        />
        <FormField
          label="닉네임"
          required
          placeholder="사용할 닉네임을 입력하세요"
          value={nickname}
          onChange={setNickname}
        />
      </div>
      <button
        type="submit"
        className="bg-primary-100 w-full rounded-[0.5rem] px-[0.9375rem] py-1.5 text-[0.75rem] tracking-[0.015rem] text-gray-600"
      >
        회원가입하기
      </button>
    </form>
  );
};
