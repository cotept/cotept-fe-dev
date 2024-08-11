// Jest-DOM 유틸리티 함수를 Vitest에 추가
import '@testing-library/jest-dom/vitest';

// Vitest 유틸리티와 훅(hook)을 임포트
import { expect, beforeAll, afterEach, afterAll } from 'vitest';

// React Testing Library의 cleanup 함수를 임포트
import { cleanup } from '@testing-library/react';

// Jest-DOM 매처를 임포트
import * as matchers from '@testing-library/jest-dom/matchers';

// 모의(mock) API 서버를 임포트
import { server } from '@mocks/node';

// react-testing-library의 matcher를 확장한다.
// `@testing-library/jest-dom`의 matcher를 사용할 수 있게 된다.
expect.extend(matchers);

// 모든 테스트 실행 전에 모의 API 서버를 시작
beforeAll(() => server.listen());

// 각 테스트 케이스 후에 모의 API 서버의 핸들러를 리셋하고, React Testing Library에서 렌더링된 요소를 정리(cleanup)
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

// 모든 테스트 실행 후에 모의 API 서버를 종료
afterAll(() => server.close());
