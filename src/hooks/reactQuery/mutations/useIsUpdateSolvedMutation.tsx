import { queryKeys } from '@/hooks/reactQuery/queryKey';
import { useIsMutating } from '@tanstack/react-query';

const useIsUpdateSolvedMutation = (key: string) => {
  return useIsMutating({
    mutationKey: queryKeys.baekjoonController.updateData(key),
  });
};

export default useIsUpdateSolvedMutation;
