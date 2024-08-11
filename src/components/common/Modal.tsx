import IDefaultProps from '@/types/common/props';
import { createPortal } from 'react-dom';
import IconClose from '@/assets/icon_close.svg?react';

interface IModalProp extends IDefaultProps {
  title: string;
  onClick?: () => void;
}

const Modal = (props: IModalProp) => {
  const { children, title, onClick } = props;
  const modalRoot = document.getElementById('portal');

  if (!modalRoot) return null;
  return createPortal(
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[999] flex items-center justify-center bg-[rgba(0,0,0,.7)]">
      <div className="relative h-[45%] w-[45%] rounded-lg bg-white">
        <h3 className="border-b border-solid border-gray-400 p-4 text-xl font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <div className="p-4">{children}</div>
        <button
          onClick={onClick}
          className="absolute right-2 top-[0.65rem] z-10"
        >
          <IconClose />
          <span className="blind">닫기</span>
        </button>
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;
