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

  public map(jsonUserData: any): UserStreak {
    // TODO refactor
    const weeks =
      jsonUserData.data.user.contributionsCollection.contributionCalendar.weeks;

    let events: number[][] = [];
    weeks.forEach((week: any, indexWeek: number) => {
      events[indexWeek] = [];

      week.contributionDays.forEach((day: any) => {
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
