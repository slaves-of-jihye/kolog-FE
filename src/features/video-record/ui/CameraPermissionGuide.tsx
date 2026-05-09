type CameraPermissionGuideProps = {
  onClose: () => void;
};

export const CameraPermissionGuide = ({ onClose }: CameraPermissionGuideProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onClick={onClose}>
      <div
        className="flex w-full max-w-sm flex-col gap-4 rounded-t-[1.25rem] bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto h-1 w-10 rounded-full bg-gray-300" />
        <div className="flex flex-col gap-1.5">
          <p className="text-base font-bold text-gray-800">카메라 권한이 필요해요</p>
          <p className="text-[0.75rem] tracking-[0.015rem] text-gray-500">
            브라우저 주소창의 자물쇠 아이콘을 눌러 카메라 권한을 허용한 뒤 다시 시도해 주세요.
          </p>
        </div>
        <button
          type="button"
          className="bg-primary-200 rounded-[0.5rem] py-3 text-[0.875rem] font-bold text-gray-800"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  );
};
