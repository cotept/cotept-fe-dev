import { forwardRef, HTMLInputTypeAttribute } from 'react';
import { cn } from '@/utils/cn';
import IDefaultProps from '@/types/common/props';

interface IInputProp extends IDefaultProps {
  id: string,
  name: string,
  type: HTMLInputTypeAttribute,
  onFocus?:() => void,
  placeholder: string
}

const Input = forwardRef<HTMLInputElement,IInputProp>(
  ({ id, name, type, placeholder, className="", ...props }, ref) => {
    return (
      <input
        type={type}
        name={name}
        id={id}
        {...props}
        ref={ref}
        className={cn(
          'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
          className,
        )}
        placeholder={placeholder}
        autoComplete="on"
      />
    );
  },
);

interface ILabelProp extends IDefaultProps {
  htmlFor: string
}

export const Label = ({ htmlFor, children }: ILabelProp) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >
      {children}
    </label>
  );
};

export const LabelInput = forwardRef<HTMLInputElement,IInputProp>(
  ({ id, name, type, placeholder, className="", children, ...props }, ref) => {
    return (
      <>
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {children}
        </label>
        <input
          type={type}
          name={name}
          id={id}
          ref={ref}
          {...props}
          className={cn(
            'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
            className,
          )}
          placeholder={placeholder}
          autoComplete="on"
        />
      </>
    );
  },
);
export default Input;
Input.displayName = 'Input';
LabelInput.displayName = 'LabelInput';
