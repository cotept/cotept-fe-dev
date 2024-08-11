import { Suspense } from 'react';
import Skeleton from '@/components/Skeleton';
import TableList from '@/components/TableList';
import { useIsFetching } from '@tanstack/react-query';
import useIsUpdateSolvedMutation from '@/hooks/reactQuery/mutations/useIsUpdateSolvedMutation';

const TableLoading = () => {
  return (
    <tr>
      <td className="px-6 py-4">
        <Skeleton className="w-full rounded py-4" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="w-full rounded py-4" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="w-full rounded py-4" />
      </td>
      <td className="px-6 py-4">
        <Skeleton className="w-full rounded py-4" />
      </td>
    </tr>
  );
};

interface IProps {
  params: {
    id: string;
  };
}

const Table = (props: IProps) => {
  const { params } = props;
  const isMutatingCrawling = useIsUpdateSolvedMutation(params.id);
  const isFetchingNewSolved = useIsFetching({
    queryKey: ['solved', 'new', params.id],
  });
  return (
    <>
      {' '}
      <div className="relative overflow-x-auto py-3 shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <caption className="bg-white p-5 text-left text-lg font-semibold text-gray-900 lg:text-xl rtl:text-right dark:bg-gray-800 dark:text-white">
            BAEJOON
          </caption>
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                문제
              </th>
              <th scope="col" className="px-6 py-3">
                언어
              </th>
              <th scope="col" className="px-6 py-3">
                학습한 시간
              </th>
              <th scope="col" className="px-6 py-3">
                복습한 시간
              </th>
            </tr>
          </thead>
          <tbody>
            <Suspense fallback={<TableLoading />}>
              {!isFetchingNewSolved && !isMutatingCrawling ? (
                <TableList id={params.id} />
              ) : (
                <TableLoading />
              )}
            </Suspense>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
