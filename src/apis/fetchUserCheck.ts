import { defaultInstance } from '@/apis';
import { ResponseCode } from '@/types/common/response';
import { AxiosResponse } from 'axios';

const fetchUserCheck = (baekjoonID: string) =>
  defaultInstance
    .get(`login?userId=${baekjoonID}`)
    .then((res: AxiosResponse<ResponseCode>) => res.data);

export default fetchUserCheck;
