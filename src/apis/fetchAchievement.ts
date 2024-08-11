import { defaultInstance } from '@/apis';
import { getBaekjoonSolvedData } from '@/apis/crawling/baekjoon';
import {
  IBaekjoonCrawlingData,
  ICustomBaekjoonCrawlingData,
} from '@/types/common/baekjoon';
import { ICommonResponse, ResponseData } from '@/types/common/response';
import { AxiosResponse } from 'axios';

const fetchAchievement = async (
  baekjoon_id: string,
): Promise<ResponseData<ICustomBaekjoonCrawlingData[]>> =>
  await defaultInstance
    .get(`achievement?id=${baekjoon_id}`)
    .then((res: AxiosResponse<ICommonResponse<IBaekjoonCrawlingData[]>>) => {
      const solvedData = getBaekjoonSolvedData(res.data.data[0].solved_problem);
      return {
        data: [
          {
            ...res.data.data[0],
            ...solvedData,
            solved_total_count: solvedData.solved_problem.length,
          },
        ],
      };
    });

export default fetchAchievement;
