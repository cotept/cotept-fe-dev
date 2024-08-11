import useSolvedSuspenseQuery from '@/hooks/reactQuery/queries/useSolvedSuspenseQuery';
import { IBaekjoonTable } from '@/types/common/supabase';
import { useSearchParams } from 'react-router-dom';

interface IProps {
  id: string;
}
const TableList = (props: IProps) => {
  const { id } = props;
  const { data: baekjoonData } = useSolvedSuspenseQuery(id);
  const [searchParams] = useSearchParams();
  const data = baekjoonData.data?.[0] as IBaekjoonTable;
  const solvedList = data?.solved_list;
  const selectDate = searchParams.get('sort');
  return (
    <>
      {selectDate && solvedList ? (
        solvedList[selectDate] ? (
          solvedList[selectDate].map((problem, index) => (
            <tr
              key={index}
              className="w-full border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <td className="w-1/4 px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  {problem?.problemNum}
                </a>
              </td>
              <td className="w-1/4 px-6 py-4">{problem?.language}</td>
              <td className="w-1/4 px-6 py-4">{problem?.solvedTime[0]}</td>
              <td className="w-1/4 px-6 py-4">{problem?.solvedTime[1]}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="px-6 py-4 text-center" colSpan={4}>
              해결한 문제가 없습니다. 다른 날짜를 선택해주세요.
            </td>
          </tr>
        )
      ) : (
        <tr>
          <td className="px-6 py-4 text-center" colSpan={4}>
            해결한 문제를 확인하시려면 원하는 날짜를 선택해주세요.
          </td>
        </tr>
      )}
    </>
  );
};

export default TableList;
