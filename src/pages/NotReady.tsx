import { Link } from 'react-router-dom';

const NotReady = () => {
  return (
    <section className="flex h-screen items-center bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-sm text-center">
        <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
          📢서비스 준비중입니다📢
        </p>
        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          보다 나은 서비스 제공을 위하여 페이지 준비중에 있습니다.
          <br />
          빠른 시일내에 준비하여 찾아뵙겠습니다.
        </p>
        <Link
          to="/"
          className="my-4 inline-flex rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
        >
          메인으로
        </Link>
      </div>
    </section>
  );
};

export default NotReady;
