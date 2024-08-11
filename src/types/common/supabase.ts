import { ICustomSolvedProblem } from '@/types/common/baekjoon';

export interface IBaekjoonTable {
  id: string;
  solved_problem: ICustomSolvedProblem[];
  solved_list: {
    [key: string]: ICustomSolvedProblem[];
  };
  solved_count: number;
  solved_recent: string;
  craeted_at: Date;
  updated_at: Date;
  review_count: number;
  solved_total_count: number;
  solved_day: number;
}
