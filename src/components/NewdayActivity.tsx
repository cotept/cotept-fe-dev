import Skeleton from '@/components/Skeleton';

import { I365DateType } from '@/types/contribution';
import { IBaekjoonTable } from '@/types/common/supabase';
import useSolvedSuspenseQuery from '@/hooks/reactQuery/queries/useSolvedSuspenseQuery';
import useIsUpdateSolvedMutation from '@/hooks/reactQuery/mutations/useIsUpdateSolvedMutation';
import useUpdateOneDayPassed from '@/hooks/reactQuery/queryClient/useUpdateOneDayPassed';

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

interface IActivityBgColor {
  good: {
    [key: number]: string;
  };
  bad: {
    [key: number]: string;
  };
}

const activityBgColor: IActivityBgColor = {
  good: {
    0: 'bg-[#F0F0EF] after:text-[#E6E6E6]',
    1: 'bg-[#D0E7D2] after:text-[#B9D8BC]',
    2: 'bg-[#B0D9B1] after:text-[#8AB989]',
    3: 'bg-[#79AC78] after:text-[#5F975E]',
    4: 'bg-[#416241] after:text-[#235F23]',
  },
  bad: {
    0: 'bg-[#F0F0EF] after:text-[#E6E6E6]',
    1: 'bg-[#F4DFBA] after:text-[#E3CBA0]',
    2: 'bg-[#EEC373] after:text-[#DFAA46]',
    3: 'bg-[#CA965C] after:text-[#B27A3C]',
    4: 'bg-[#876445] after:text-[#75563B]',
  },
};

interface IProps {
  params: {
    id: string;
  };
}

const NewdayActivity = (props: IProps) => {
  const { params } = props;
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const isMutatingCrawling = useIsUpdateSolvedMutation(params.id);
  const { data: baekjoonData } = useSolvedSuspenseQuery(params.id);
  const data = baekjoonData.data?.[0] as IBaekjoonTable;
  const fetchSolvedCount = data?.solved_count;
  const newdayActivity = useUpdateOneDayPassed(params.id);

  return (
    <>
      {!isMutatingCrawling && fetchSolvedCount ? (
        newdayActivity.map((activities: I365DateType[] | null, index) => (
          <tr key={index}>
            <th className="w-8 text-left text-xs">{daysOfWeek[index]}</th>
            {activities &&
              activities.map((activity: I365DateType, index) => (
                <td
                  key={index}
                  data-date={activity?.date}
                  className={`h-3 w-3 md:h-4 md:w-4 ${
                    activity == null && 'opacity-0'
                  } ${`${
                    activity?.again
                      ? activityBgColor['good'][activity.level]
                      : activityBgColor['bad'][activity?.level || 0]
                  }`} group relative justify-self-center rounded-br-full rounded-tl-full after:absolute after:left-[29%] after:top-[9%] after:rotate-[30deg] after:font-thin after:content-['|'] md:after:left-[30%] md:after:top-[10%] md:after:rotate-[45deg]`}
                >
                  <span className="absolute z-10 ml-2 hidden w-max origin-center translate-x-[-50%] translate-y-[-130%] cursor-default rounded-md  bg-slate-950 px-2 py-1 text-center text-xs text-white before:absolute before:left-[50%] before:top-[100%] before:inline-block before:h-2 before:w-2 before:origin-center before:translate-x-[-50%] before:translate-y-[-50%] before:rotate-45 before:bg-slate-950 before:content-[''] group-hover:inline-block">
                    {activity?.date}
                    <br />
                    {activity?.count == 0
                      ? `0 solved.`
                      : activity?.again
                        ? `${activity?.count} solved /  
                        ${activity.againCount} review`
                        : `${activity?.count} solved / 0 review`}
                  </span>
                </td>
              ))}
          </tr>
        ))
      ) : (
        <ActivityLoading />
      )}
    </>
  );
};

export default NewdayActivity;
