import { cn } from '@/utils/cn';
import IDefaultProps from '@/types/common/props';


const ValidateMessage = (props:IDefaultProps) => {
  const { className="", children } = props;

  return (
    <p
      className={cn(
        'absolute text-xs pt-[1px] pl-[2px] text-red-600',
        className,
      )}
    >
      {children}
    </p>
  );
};

export default ValidateMessage;
