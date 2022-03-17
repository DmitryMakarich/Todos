export interface StatsModel {
  completed: TimePeriod;
  created: TimePeriod;
}

export interface TimePeriod {
  dayCount: number;
  weekCount: number;
  allTimeCount: number;
}
