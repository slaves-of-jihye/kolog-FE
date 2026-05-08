'use client';

const Button = ({ label, onClick }: { label: string; onClick?: () => void }) => {
  return (
    <button
      type="button"
      className="bg-primary-200 w-full rounded-[0.5rem] px-[0.9375rem] py-1.5 text-[0.75rem] tracking-[0.015rem] text-gray-600"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
