import { I365DateLabel, I365DateType, IGenerateDate, MonthLabelType } from '@/types/contribution';
import {
  eachDayOfInterval,
  formatISO,
  nextDay,
  getDay,
  parseISO,
  subWeeks,
  differenceInCalendarDays,
  subDays,
  getMonth,
  formatDistanceToNow,
  format,
} from 'date-fns';
import { ko } from 'date-fns/locale';
// 지난 52주 날짜 구하기
export const generateDate = (): IGenerateDate[] => {
  const today = new Date();
  const days: Date[] = eachDayOfInterval({
    start: subDays(today, 364),
    end: today,
  });

  return days.map((day: Date):IGenerateDate => {
    const date:string = formatISO(day, { representation: 'date' });
    const count = 0;
    const again = null;
    const againCount = 0;
    const level = 0;
    const againLevel = 0;
    const overdue = 0;
    return {
      date,
      count,
      again,
      againCount,
      level,
      againLevel,
      overdue,
    };
  });
};

// 365일 배열 만들기
export const getAllActivities = (): I365DateType[] => {
  const weekStart = 0; // 시작은 sunday
  const normalizedActivities: IGenerateDate[] = generateDate();
  const firstDay: Date = parseISO(normalizedActivities[0].date);
  const firstCalendarDate: Date =
    getDay(firstDay) === weekStart
      ? firstDay
      : subWeeks(nextDay(firstDay, weekStart), 1);
  const allActivities: I365DateType[] = [
    ...Array(differenceInCalendarDays(firstDay, firstCalendarDate)).fill(
      null,
    ),
    ...normalizedActivities,
  ];
  return allActivities;
};

// 지난 52주 날짜 주차별 구분
export const groupDatesByWeeks = (allActivities:I365DateType[]): I365DateType[][] => {
  const numberOfWeeks:number = Math.ceil(allActivities.length / 7);
  return Array(numberOfWeeks)
    .fill(null)
    .map((_, weekIndex) => allActivities.slice(weekIndex * 7, weekIndex * 7 + 7));
};

// 지난 52주 날짜 요일별 구분
export const groupByDays = (allActivities:I365DateType[]) => {
  const newActivities: (I365DateType[] | null)[] = [];
  if (!allActivities) return newActivities;
  allActivities.map((day: I365DateType, index) => {
    if (day === null) {
      newActivities[index] = Array(1).fill(null);
    } else {
      const { date } = day;
      if (!newActivities[getDay(date)]) {
        newActivities[getDay(date)] = [];
      }
      newActivities[getDay(date)]?.push(day);
    }
  });
  return newActivities;
};

// 월별 위치 파악 함수
export const getMonthLabels = (weeks:I365DateType[][], monthNames: MonthLabelType[]): I365DateLabel[] => {
  const monthLabels: I365DateLabel[] = weeks
    .reduce<I365DateLabel[]>((labels: I365DateLabel[], week: I365DateType[], weekIndex: number) => {
      const firstActivity: I365DateType | undefined = week.find((activity: I365DateType) => activity !== null);
      const month: MonthLabelType = monthNames[getMonth(firstActivity!.date)];
      const prevLabel: I365DateLabel = labels[labels.length - 1];
      if (weekIndex === 0 || prevLabel.label !== month) {
        return [...labels, { weekIndex, label: month }];
      }
      return labels;
    }, [])
    .filter(({ weekIndex }: I365DateLabel, index, labels: I365DateLabel[]) => {
      const minWeeks = 3;
      if (index === 0) {
        return labels[1] && labels[1].weekIndex - weekIndex >= minWeeks;
      }
      if (index === labels.length - 1) {
        return weeks.slice(weekIndex).length >= minWeeks;
      }
      return true;
    });

  monthLabels.forEach((_, index) => {
    if (index > 0) {
      monthLabels[index - 1].weekIndex =
        monthLabels[index].weekIndex - monthLabels[index - 1].weekIndex;
    }
    if (index === monthLabels.length - 1) {
      monthLabels[index].weekIndex = 52 - monthLabels[index].weekIndex;
    }
  });
  return monthLabels;
};

export const getLevel = (count: number) => {
  let level: number = 0;
  if (count >= 1 && count <= 3) {
    level = 1;
  } else if (count >= 4 && count <= 6) {
    level = 2;
  } else if (count >= 7 && count <= 9) {
    level = 3;
  } else if (count >= 10) {
    level = 4;
  }
  return level;
};

export const isOneDayPassed = (updateTime: Date) => {
  // 현재 시간
  const now = new Date();

  // 업데이트 시간을 Date 객체로 변환
  const updateDate = new Date(updateTime);

  // 현재 시간과 업데이트 시간의 차이를 밀리초 단위로 계산
  const diff: number = +now - +updateDate;

  // 하루의 밀리초는 24 * 60 * 60 * 1000 = 86400000
  return diff > 86400000;
};

export const fromNow = (date: Date) => {
  if (!date) {
    return null;
  }
  const setDate = new Date(date);
  const d = new Date(setDate.getTime() - 9 * 60 * 60 * 1000); // 9시간 빼기
  const now = Date.now();
  const diff = (now - d.getTime()) / 1000; // 현재 시간과의 차이(초)
  if (diff < 60 * 1) {
    // 1분 미만일땐 방금 전 표기
    return '방금 전';
  }
  if (diff < 60 * 60 * 24 * 3) {
    // 3일 미만일땐 시간차이 출력(몇시간 전, 몇일 전)
    return formatDistanceToNow(d, { addSuffix: true, locale: ko });
  }
  return format(d, 'PPP EEE p', { locale: ko }); // 날짜 포맷
};
