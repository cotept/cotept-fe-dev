import { cn } from '@/utils/cn';
import IDefaultProps from '@/types/common/props';

const Skeleton = (props:IDefaultProps) => {
  const { className="" } = props;
  return (
    <div className="animate-pulse flex">
      <div className={cn('bg-slate-200', className)}></div>
    </div>
  );
};

export default Skeleton;
