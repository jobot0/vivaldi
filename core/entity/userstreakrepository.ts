import { UserStreak } from "./userstreak.ts";
export interface UserStreakRepository {
  getUserStreak(username: string): Promise<UserStreak>;
}
