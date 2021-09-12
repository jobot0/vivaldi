import { UserStreak } from "../core/entity/userstreak.ts";
export class RestUserStreakMapper {
  private static instance: RestUserStreakMapper;

  private constructor() {}

  public static getInstance(): RestUserStreakMapper {
    if (!RestUserStreakMapper.instance) {
      RestUserStreakMapper.instance = new RestUserStreakMapper();
    }

    return RestUserStreakMapper.instance;
  }

  public map(jsonUserData: JSONUserData): UserStreak {
    // TODO refactor
    const events: number[][] = [];
    const weeks =
      jsonUserData.data.user.contributionsCollection.contributionCalendar.weeks;

    weeks.forEach((week: Week, indexWeek: number) => {
      events[indexWeek] = [];

      week.contributionDays.forEach((day: ContributionDay) => {
        let hasActivity = 0;
        if (day.contributionCount > 0) {
          hasActivity = 1;
        } else {
          hasActivity = 0;
        }
        events[indexWeek][day.weekday] = hasActivity;
      });
    });

    return { events: events };
  }
}
export interface JSONUserData {
  data: Data;
}

export interface Data {
  user: User;
}

export interface User {
  contributionsCollection: ContributionsCollection;
}

export interface ContributionsCollection {
  contributionCalendar: ContributionCalendar;
}

export interface ContributionCalendar {
  weeks: Week[];
}

export interface Week {
  contributionDays: ContributionDay[];
}

export interface ContributionDay {
  date: Date;
  weekday: number;
  contributionCount: number;
}
