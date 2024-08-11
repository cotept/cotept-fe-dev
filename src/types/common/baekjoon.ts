interface IBaseSolvedProblem {
  problemNum: string;
  problemLink: string;
  language: string;
}

interface ISolvedTime {
  solvedTime: string;
}

interface ISolvedTimeArray {
  solvedTime: string[];
  isReview?: boolean;
}

export type ISolvedProblem = IBaseSolvedProblem & ISolvedTime;

export type ICustomSolvedProblem = IBaseSolvedProblem & ISolvedTimeArray;

export interface IBaekjoonCrawlingData {
  solved_problem: ISolvedProblem[];
  solved_count: number;
  solved_recent: string;
  updated_at: Date;
}

export interface ICustomBaekjoonCrawlingData {
  solved_problem: ICustomSolvedProblem[];
  solved_list: {
    [key: string]: ICustomSolvedProblem[];
  };
  solved_count: number;
  solved_recent: string;
  updated_at: Date;
  review_count: number;
  solved_total_count: number;
  solved_day: number;
}
