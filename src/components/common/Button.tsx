import { useTransition } from 'react';
import Spinner from '@/components/common/Spinner';
import { cn } from '@/utils/cn';
import IDefaultProps from '@/types/common/props';

interface IButtonProps extends IDefaultProps {
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const Button = (props:IButtonProps) => {
  const { className="", onClick, children } = props;
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'flex-shrink-0 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2.5 text-center flex justify-center items-center',
        className,
      )}
    >
      {children}
    </button>
  );
};

export const SubmitButton = (props:IButtonProps) => {
  const { className="", onClick, children } = props;
  return (
    <button
      onClick={onClick}
      type="submit"
      className={cn(
        'flex-shrink-0 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2.5 text-center flex justify-center items-center',
        className,
      )}
    >
      {children}
    </button>
  );
};

interface ILoadingBtnProps extends IDefaultProps {
  onClick: () => void;
  isPending: boolean,
}

export const LoadingButton = (props:ILoadingBtnProps) => {
  const {
    className="",
    onClick,
    isPending: mutateIsPending,
    children,
  } = props;
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      onClick();
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      type="button"
      className={cn(
        'flex-shrink-0 text-white focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm py-2.5 text-center flex justify-center items-center',
        className,
      )}
    >
      {isPending || mutateIsPending ? (
        <Spinner className="w-4 h-4" />
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
