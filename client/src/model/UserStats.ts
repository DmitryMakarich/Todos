import TimePeriod from "./TimePeriod";

export default interface UserStatsModel {
  _id: string;
  fullName: string;
  createdTodos: TimePeriod;
  completedTodos: TimePeriod;
}
