export interface IGenerateDate {
  date: string
  count: number
  again: null | boolean
  againCount: number
  level: number
  againLevel: number
  overdue: number
}

export type I365DateType = IGenerateDate | null;

export interface I365DateLabel {
  weekIndex: number
  label: MonthLabelType
}

export type I365DateLabelType = I365DateType | I365DateLabel;

export type MonthLabelType = "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";