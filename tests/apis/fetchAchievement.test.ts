import fetchAchievement from '@/apis/fetchAchievement';
import { ICustomBaekjoonCrawlingData } from '@/types/common/baekjoon';
import { ResponseData } from '@/types/common/response';
import { describe, it, expect, beforeEach, expectTypeOf } from 'vitest';

describe('백준 문제 크롤링', () => {
  it('string 타입의 파라미터를 받는다', () => {
    return expectTypeOf(fetchAchievement).parameter(0).toBeString();
  });

  it('하나의 파라미터를 받는다', () => {
    return expect(fetchAchievement).toHaveLength(1);
  });

  describe('요청 성공 시', () => {
    let fetchResult: ResponseData<ICustomBaekjoonCrawlingData[]>;
    let data: ICustomBaekjoonCrawlingData[];

    beforeEach(async () => {
      fetchResult = await fetchAchievement('testID');
      data = fetchResult.data;
    });

    it('ICustomBaekjoonCrawlingData[] 타입을 리턴한다', async () => {
      expectTypeOf(data).toBeArray();
      expectTypeOf(data).toMatchTypeOf<ICustomBaekjoonCrawlingData[]>();
    });
  });

  describe('요청 실패 시, 4xx code 를 리턴한다', () => {
    it('빈 문자열 "" 입력 시, 404 Not Found 를 리턴한다', async () => {
      await expect(fetchAchievement('')).rejects.toThrowError(
        `Request failed with status code 404`,
      );
    });

    it('인수 없이 호출 시, 404 Not Found 를 리턴한다', async () => {
      // @ts-ignore
      await expect(fetchAchievement()).rejects.toThrowError(
        `Request failed with status code 404`,
      );
    });

    it('존재하지 않는 ID 를 입력 시, 502 Bad Gateway 를 리턴한다', async () => {
      await expect(fetchAchievement('notExistId')).rejects.toThrowError(
        `Request failed with status code 502`,
      );
    });

    it('문제를 풀지 않은 계정인 경우 [] 를 리턴한다', async () => {
      const { data }: ResponseData<ICustomBaekjoonCrawlingData[]> =
        await fetchAchievement('empty');
      expect(data[0].solved_problem).toHaveLength(0);
    });
  });
});
