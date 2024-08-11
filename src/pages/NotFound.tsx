import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="flex h-screen items-center bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-sm text-center">
        <h1 className="mb-4 text-7xl font-extrabold tracking-tight text-primary-600 lg:text-9xl dark:text-primary-500">
          404
        </h1>
        <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
          🚨페이지를 찾을 수 없습니다🚨
        </p>
        <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
          페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
          <br />
          입력하신 주소가 정확한지 다시 한 번 확인해주세요.
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

export default NotFound;
