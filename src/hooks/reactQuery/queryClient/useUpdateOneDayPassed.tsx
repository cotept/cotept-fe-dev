import { checkSolvedTime } from '@/apis/crawling/baekjoon';
import fetchAchievement from '@/apis/fetchAchievement';
import useUpdateSolvedMutation from '@/hooks/reactQuery/mutations/useUpdateSolvedMutation';
import useSolvedSuspenseQuery from '@/hooks/reactQuery/queries/useSolvedSuspenseQuery';
import { queryKeys } from '@/hooks/reactQuery/queryKey';
import { ICustomBaekjoonCrawlingData } from '@/types/common/baekjoon';
import { ResponseData } from '@/types/common/response';
import { IBaekjoonTable } from '@/types/common/supabase';
import { I365DateType } from '@/types/contribution';
import {
  getAllActivities,
  groupByDays,
  isOneDayPassed,
} from '@/utils/contribution';
import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const getNewData = async (baekjoonId: string, queryClient: QueryClient) => {
  const crawlingData: ResponseData<ICustomBaekjoonCrawlingData[]> =
    await queryClient.fetchQuery({
      queryKey: queryKeys.baekjoonController.newSolved(baekjoonId),
      queryFn: async () => await fetchAchievement(baekjoonId),
    });
  queryClient.setQueryData(
    queryKeys.baekjoonController.solved(baekjoonId), // todo crawling 지우고 캐시 삭제 후 저장하는 형태로하기
    crawlingData,
  );
};

const useUpdateOneDayPassed = (baekjoonId: string) => {
  const [newdayActivity, setnewdayActivity] = useState<
    (I365DateType[] | null)[]
  >([]);
  const queryClient = useQueryClient();
  const allActivities = getAllActivities();
  const { mutate } = useUpdateSolvedMutation(baekjoonId);
  const { data: baekjoonData } = useSolvedSuspenseQuery(baekjoonId);
  const data = baekjoonData.data?.[0] as IBaekjoonTable;
  const fetchSolvedProblem = data?.solved_problem;
  const { dataActivities } = checkSolvedTime(allActivities, fetchSolvedProblem);

  useEffect(() => {
    // 하루 이상 지나면 데이터 업데이트
    if (data?.updated_at && isOneDayPassed(data?.updated_at)) {
      const updateOneDayPassed = async (baekjoonId: string) => {
        mutate(baekjoonId);
      };
      updateOneDayPassed(baekjoonId);
    } else if (!fetchSolvedProblem) {
      // 새로 고침 시 가져온 정보가 없으면 호출
      getNewData(baekjoonId, queryClient);
    }
    setnewdayActivity(groupByDays(dataActivities));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return newdayActivity;
};

export default useUpdateOneDayPassed;
