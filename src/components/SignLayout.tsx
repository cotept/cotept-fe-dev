import IDefaultProps from '@/types/common/props';
import { Link } from 'react-router-dom';

const SignLayout = (props:IDefaultProps) => {
  const {children} = props
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              <Link
                to="/"
                className="mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
              >
                💪코테PT
              </Link>
            </h1>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignLayout;
