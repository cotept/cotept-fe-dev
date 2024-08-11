import fetchAchievement from '@/apis/fetchAchievement';
import { queryKeys } from '@/hooks/reactQuery/queryKey';
import { supabaseClient } from '@/supabase/client';
import { ICustomBaekjoonCrawlingData } from '@/types/common/baekjoon';
import { ResponseData } from '@/types/common/response';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useUpdateSolvedMutation = (key: string) => {
  const queryClient = useQueryClient();

  const setSolvedQuery = async (
    baekjoonId: string,
    crawlingData: ICustomBaekjoonCrawlingData,
  ) => {
    queryClient.setQueryData(
      queryKeys.baekjoonController.solved(baekjoonId),
      crawlingData,
    );
    await supabaseClient
      .from('baekjoon')
      .update([crawlingData])
      .eq('id', baekjoonId);
    // 하루 지난 데이터가 캐싱되어 있는 상태에서 새로운 데이터를 가져온 후
    // setQueryData를 통해 업데이트해줬지만 화면에서는 동기화가 이루어지지 않음
    // invalidateQueries를 통해 해당 queryKey 중 활성화(현재 페이지에서 사용중인 데이터) 된 애들만 강제 동기화
    // (invalidateQueries는 캐싱중이며 활성화 되어있는 query들을 무효화하고 다시 요청)
    await queryClient.invalidateQueries({
      queryKey: queryKeys.baekjoonController.solved(baekjoonId),
      refetchType: 'active',
    });
  };
  return useMutation({
    mutationFn: async (
      baekjoonId: string,
    ): Promise<ResponseData<ICustomBaekjoonCrawlingData[]>> =>
      await fetchAchievement(baekjoonId),
    mutationKey: queryKeys.baekjoonController.updateData(key),
    onSuccess: async (
      res: ResponseData<ICustomBaekjoonCrawlingData[]>,
      baekjoonId,
    ) => {
      const crawlingData: ICustomBaekjoonCrawlingData = res.data[0];
      await setSolvedQuery(baekjoonId, crawlingData);
    },
  });
};

export default useUpdateSolvedMutation;
