'use client';

import { useState } from 'react';
import { FormField } from '@/shared/ui';
import { validateEmail, validatePassword } from '../model/validators';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (passwordError) setPasswordError(validatePassword(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    setEmailError(eErr);
    setPasswordError(pErr);
    if (eErr || pErr) return;
    // TODO: API 연동
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="flex w-full flex-col gap-[3.75rem]">
      <div className="flex flex-col gap-6">
        <FormField
          label="이메일"
          required
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={handleEmailChange}
          error={emailError}
          autoComplete="email"
        />
        <FormField
          label="비밀번호"
          required
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
          autoComplete="current-password"
        />
      </div>
      <button
        type="submit"
        className="bg-primary-100 w-full rounded-[0.5rem] px-[0.9375rem] py-1.5 text-[0.75rem] tracking-[0.015rem] text-gray-600"
      >
        로그인하기
      </button>
    </form>
  );
};
