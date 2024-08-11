import fetchUserCheck from '@/apis/fetchUserCheck';
import { ResponseCode } from '@/types/common/response';
import { describe, it, expect, beforeEach, expectTypeOf } from 'vitest';

describe('백준 아이디 확인', () => {
  it('string 타입의 파라미터를 받는다', () => {
    return expectTypeOf(fetchUserCheck).parameter(0).toBeString();
  });

  it('하나의 파라미터를 받는다', () => {
    return expect(fetchUserCheck).toHaveLength(1);
  });

  describe('요청 성공 시', () => {
    let statusCode: ResponseCode;

    beforeEach(async () => {
      statusCode = await fetchUserCheck('testID');
    });

    it('ResponseCode 타입을 리턴한다', async () => {
      expectTypeOf(statusCode).toMatchTypeOf<ResponseCode>();
    });

    it('200 code 를 리턴한다', async () => {
      expect(statusCode).toBe(200);
    });
  });

  describe('요청 실패 시, 4xx code 를 리턴한다', () => {
    it('빈 문자열 "" 입력 시, 404 Not Found 를 리턴한다', async () => {
      let statusCode: ResponseCode = await fetchUserCheck('');
      expect(statusCode).toBe(404);
    });
    it('인수 없이 호출 시, 404 Not Found 를 리턴한다', async () => {
      // @ts-ignore
      let statusCode: ResponseCode = await fetchUserCheck();
      expect(statusCode).toBe(404);
    });
    it('존재하지 않는 ID 입력 시, 404 Not Found 를 리턴한다', async () => {
      let statusCode: ResponseCode = await fetchUserCheck('notExistId');
      expect(statusCode).toBe(404);
    });
  });
});
