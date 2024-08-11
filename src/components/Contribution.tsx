import { Suspense, useState } from 'react';
import { DEFAULT_MONTH_LABELS } from '@/assets/constants';
import {
  getAllActivities,
  getMonthLabels,
  groupDatesByWeeks,
} from '@/utils/contribution';
import NewdayActivity from '@/components/NewdayActivity';
import IconHelp from '@/assets/icon_help.svg?react';
import Skeleton from '@/components/Skeleton';
import Table from '@/components/Table';
import { useSearchParams } from 'react-router-dom';

const ActivityLoading = () => {
  return (
    <>
      <tr className="relative h-[136px] py-4">
        <td>
          <Skeleton className="absolute h-full w-full rounded" />
        </td>
      </tr>
    </>
  );
};

interface IProps {
  params: {
    id: string;
  };
}

const Contribution = ({ params }: IProps) => {
  const [showHelp, setShowHelp] = useState(false);
  const allActivities = getAllActivities();
  const weeks = groupDatesByWeeks(allActivities);
  const monthLabel = getMonthLabels(weeks, DEFAULT_MONTH_LABELS);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="relative py-8">
      <div className="mb-3 flex items-end gap-1 text-base">
        <h2 className="text-lg font-bold lg:text-xl">Activities</h2>
        <div
          className="group sm:relative"
          onMouseOver={(): void => setShowHelp(true)}
          onMouseOut={(): void => setShowHelp(false)}
        >
          <button className="relative top-[1px]">
            <IconHelp className="h-4 w-4 opacity-50 group-hover:opacity-100" />
            <span className="blind">도움말</span>
          </button>
          {showHelp && (
            <ul className="left absolute left-0 z-10 flex w-[100%] flex-col rounded-md border-[1px] border-solid bg-white py-1 pl-5 pr-2 text-center text-xs leading-5 sm:w-[382px]">
              <li className="list-disc text-left">
                코테PT는 학습보다 복습에 주안점을 두기 때문에 학습을 했지만
                복습을 하지 않았을 경우에는 잔디가 시들게 됩니다.
              </li>
              <li className="list-disc text-left">
                학습 후 같은 문제를 풀어 복습하게 되면 잔디가 푸르게 바뀝니다.
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="overflow-x-scroll p-8 shadow-md sm:rounded-lg lg:overflow-auto">
        <table className="w-max border-separate border-spacing-1 lg:w-full">
          <thead className="text-xs text-gray-700">
            <tr>
              <th className="text-left text-transparent opacity-0">요일</th>
              {monthLabel.map(({ weekIndex, label }) => {
                return (
                  <th
                    scope="col"
                    colSpan={weekIndex}
                    key={label}
                    className="text-left"
                  >
                    {label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody
            onClick={(
              e: React.MouseEvent<HTMLTableSectionElement, MouseEvent>,
            ) => {
              const target = e.target as HTMLElement; // HTMLElement로 타입 단언
              searchParams.set('sort', target.dataset.date || '');
              setSearchParams(searchParams);
            }}
          >
            <Suspense fallback={<ActivityLoading />}>
              <NewdayActivity params={params} />
            </Suspense>
          </tbody>
        </table>
        <div className="flex items-center gap-[3px] pt-3 lg:justify-end">
          <span className="text-sm text-gray-400">Bad</span>
          <span className="inline-block h-4 w-4 rounded-br-full rounded-tl-full bg-bad-4-full"></span>
          <span className="inline-block h-4 w-4 rounded-br-full rounded-tl-full bg-bad-3-full"></span>
          <span className="inline-block h-4 w-4 rounded-br-full rounded-tl-full bg-bad-2-full"></span>
          <span className="inline-block h-4 w-4 rounded-br-full rounded-tl-full bg-bad-1-full"></span>
          <span className="inline-block h-4 w-4 rounded-br-full rounded-tl-full bg-empty-full"></span>
          <span className="inline-block h-4 w-4 rounded-br-full rounded-tl-full bg-good-1-full"></span>
          <span className="inline-block h-4 w-4 rounded-br-full rounded-tl-full bg-good-2-full"></span>
          <span className="inline-block h-4 w-4 rounded-br-full rounded-tl-full bg-good-3-full"></span>
          <span className="inline-block h-4 w-4 rounded-br-full rounded-tl-full bg-good-4-full"></span>
          <span className="text-sm text-gray-400">Good</span>
        </div>
      </div>
      <div>
        <Table params={params} />
      </div>
    </div>
  );
};

export default Contribution;
