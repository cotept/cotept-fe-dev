import { compareAsc, differenceInDays, formatISO } from 'date-fns';
import { getAllActivities, getLevel } from '@/utils/contribution';
import { ISolvedProblem, ICustomSolvedProblem } from '@/types/common/baekjoon';
import { I365DateType } from '@/types/contribution';

interface IGetBaekjoonSolvedData {
  solved_problem: ICustomSolvedProblem[];
  review_count: number;
  solved_day: number;
  solved_list: {
    [key: string]: ICustomSolvedProblem[];
  };
}

/**
 * 같은 언어와 같은 문제 번호일 때, 문제를 푼 시간이 여러개일 경우
 * solvedTime으로 모아주는 역할
 * @param {} data 외부에서 크롤링한 solved_problem
 * @returns {
 *  solved_problem: 해결한 문제 리스트(solvedTime에 동일한 문제를 다른 날에 푼 경우 배열로 담겨있음),
 *  review_count: 복습한 문제 개수(선정 기준은 solvedTime안에 값이 2개 이상일 경우 복습한걸로 간주),
 *  solved_day: 1년동안 코테 문제 푼 일수,
 * }
 */
export const getBaekjoonSolvedData = (
  data: ISolvedProblem[],
): IGetBaekjoonSolvedData => {
  let reviewCount = 0;
  const solvedDays = new Set();
  const newData: ICustomSolvedProblem[] = data.reduce(
    (acc: ICustomSolvedProblem[], cur: ISolvedProblem) => {
      let existingIndex = acc.findIndex(
        (obj: ICustomSolvedProblem) =>
          obj.problemNum === cur.problemNum && obj.language === cur.language,
      );
      if (existingIndex >= 0) {
        acc[existingIndex].solvedTime.push(cur.solvedTime);
        if (
          !acc[existingIndex].isReview &&
          acc[existingIndex].solvedTime.length >= 2
        ) {
          acc[existingIndex].isReview = true;
          reviewCount++;
        }
      } else {
        solvedDays.add(cur.solvedTime.slice(0, 10));
        acc.push({
          problemNum: cur.problemNum,
          problemLink: cur.problemLink,
          language: cur.language,
          solvedTime: new Array(cur.solvedTime),
          isReview: false,
        });
      }
      return acc;
    },
    [],
  );
  const solvedProblem: ICustomSolvedProblem[] = Object.values(newData);
  const { solved_day, solved_list } = checkSolvedTime(
    getAllActivities(),
    solvedProblem,
  );
  return {
    solved_problem: solvedProblem,
    review_count: reviewCount,
    solved_day: solved_day,
    solved_list: solved_list,
  };
};

// interface Solved {
//   problemNum : string
//   language: string
//   problemLink: string
// }

interface ICheckSolvedTime {
  dataActivities: I365DateType[];
  solved_day: number;
  solved_list: {
    [key: string]: ICustomSolvedProblem[];
  };
}

/**
 * 365일을 solvedTime의 값과 비교하여 문제를 푼 날이면 가중치를 더해주고
 * 가중치에 따라 Level이 주어지며 Level로 나뭇잎의 색을 결정한 배열을 반환
 * @param {*} oneYearFromNowArr 1년전부터 현재까지의 일자를 담은 배열
 * @param {*} fetchSolvedProblem 백준 ID로 조회 후 해결한 문제들이 담긴 배열
 * @returns {
 *   dataActivities: 365일에 코테를 푼 날에 가중치와 Level을 설정한 배열,
 *   solved_day: 중복날짜 제거하고 실제 푼 날의 일수,
 * }
 */
export const checkSolvedTime = (
  oneYearFromNowArr: I365DateType[],
  fetchSolvedProblem: ICustomSolvedProblem[],
): ICheckSolvedTime => {
  const solvedDays = new Set<string>();
  const solvedList = new Map<string, ICustomSolvedProblem[]>();
  if (!Array.isArray(oneYearFromNowArr) || !Array.isArray(fetchSolvedProblem)) {
    return {
      dataActivities: oneYearFromNowArr,
      solved_day: solvedDays.size,
      solved_list: Object.fromEntries(solvedList),
    }; // 유효하지 않은 경우, 원래 배열 반환
  }
  const oneYearFromNowArrLen = oneYearFromNowArr.length;
  const fetchSolvedProblemLen = fetchSolvedProblem.length;
  for (let i = 0; i < oneYearFromNowArrLen; i++) {
    const currentDate = oneYearFromNowArr[i];
    for (let k = 0; k < fetchSolvedProblemLen; k++) {
      if (currentDate && currentDate.hasOwnProperty('date')) {
        const date: string = currentDate.date;
        const solvedTimeArray: string[] = fetchSolvedProblem[k].solvedTime;
        solvedTimeArray.sort(compareAsc);
        const solvedTime: string = formatISO(
          fetchSolvedProblem[k].solvedTime[0],
          {
            representation: 'date',
          },
        );

        if (date == solvedTime) {
          currentDate.count++;
          currentDate.level = getLevel(currentDate.count);
          const daysSinceProblemSolved = differenceInDays(
            new Date(),
            solvedTime,
          );
          solvedDays.add(solvedTime);
          if (!solvedList.get(solvedTime)) {
            solvedList.set(solvedTime, [fetchSolvedProblem[k]]);
          } else {
            solvedList.get(solvedTime)?.push(fetchSolvedProblem[k]);
          }
          currentDate.overdue = daysSinceProblemSolved;
          if (solvedTimeArray.length > 1) {
            currentDate.againCount++;
            currentDate.againLevel = getLevel(currentDate.againCount);
          }
        }
      }
    }
    if (currentDate && currentDate.againCount === currentDate.count) {
      currentDate.again = true;
    }
  }
  return {
    dataActivities: oneYearFromNowArr,
    solved_day: solvedDays.size,
    solved_list: Object.fromEntries(solvedList),
  };
};
