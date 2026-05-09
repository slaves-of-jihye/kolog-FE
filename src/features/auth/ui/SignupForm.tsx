'use client';

import { useState } from 'react';
import { FormField } from '@/shared/ui';
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validateRequired,
} from '../model/validators';

export const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmError, setPasswordConfirmError] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (emailError) setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (passwordError) setPasswordError(validatePassword(value));
    if (passwordConfirmError)
      setPasswordConfirmError(validatePasswordConfirm(value, passwordConfirm));
  };

  const handlePasswordConfirmChange = (value: string) => {
    setPasswordConfirm(value);
    if (passwordConfirmError) setPasswordConfirmError(validatePasswordConfirm(password, value));
  };

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    if (nicknameError) setNicknameError(validateRequired(value, '닉네임'));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    const pcErr = validatePasswordConfirm(password, passwordConfirm);
    const nErr = validateRequired(nickname, '닉네임');
    setEmailError(eErr);
    setPasswordError(pErr);
    setPasswordConfirmError(pcErr);
    setNicknameError(nErr);
    if (eErr || pErr || pcErr || nErr) return;
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
          onChange={handleEmailChange}
          error={emailError}
        />
        <FormField
          label="비밀번호"
          required
          type="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={handlePasswordChange}
          error={passwordError}
        />
        <FormField
          label="비밀번호 확인"
          required
          type="password"
          placeholder="비밀번호를 한번 더 입력하세요"
          value={passwordConfirm}
          onChange={handlePasswordConfirmChange}
          error={passwordConfirmError}
        />
        <FormField
          label="닉네임"
          required
          placeholder="사용할 닉네임을 입력하세요"
          value={nickname}
          onChange={handleNicknameChange}
          error={nicknameError}
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
