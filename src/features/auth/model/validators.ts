export const validateRequired = (value: string, fieldName: string) => {
  if (!value.trim()) return `${fieldName}을(를) 입력해 주세요.`;
  return '';
};

export const validateEmail = (value: string) => {
  const trimmed = value.trim();
  if (!trimmed) return '이메일을 입력해 주세요.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return '올바른 이메일 형식이 아닙니다.';
  return '';
};

export const validatePassword = (value: string) => {
  if (!value) return '비밀번호를 입력해 주세요.';
  if (value.length < 8) return '비밀번호는 8자 이상이어야 합니다.';
  if (value.length > 20) return '비밀번호는 20자 이하여야 합니다.';
  if (!/[A-Za-z]/.test(value) || !/[0-9]/.test(value))
    return '비밀번호는 영문자와 숫자를 모두 포함해야 합니다.';
  return '';
};

export const validatePasswordConfirm = (password: string, confirm: string) => {
  if (!confirm) return '비밀번호를 한번 더 입력해 주세요.';
  if (password !== confirm) return '비밀번호가 일치하지 않습니다.';
  return '';
};
