import { UserStreakRepository } from "./entity/userstreakrepository.ts";
import { UserStreak } from "./entity/userstreak.ts";
export class GetUserStreak {
  private userStreakRepository: UserStreakRepository;

  constructor(userStreakRepository: UserStreakRepository) {
    this.userStreakRepository = userStreakRepository;
  }

  execute(username: string): Promise<UserStreak> {
    return this.userStreakRepository.getUserStreak(username);
  }
}
