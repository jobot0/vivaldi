import { UserStreakRepository } from "../core/entity/userstreakrepository.ts";
import { GqlUserStreakDataSource } from "../data/gqluserstreakdatasource.ts";
import { RestUserStreakMapper } from "../data/restuserstreakmapper.ts";
import { UserStreak } from "../core/entity/userstreak.ts";
export class DataUserStreakRepository implements UserStreakRepository {
  private gqlUserStreakDataSource: GqlUserStreakDataSource;
  private restUserStreakMapper: RestUserStreakMapper;
  constructor(
    gqlUserStreakDataSource: GqlUserStreakDataSource,
    restUserStrakMapper: RestUserStreakMapper
  ) {
    this.gqlUserStreakDataSource = gqlUserStreakDataSource;
    this.restUserStreakMapper = restUserStrakMapper;
  }
  async getUserStreak(username: string): Promise<UserStreak> {
    const jsonData = await this.gqlUserStreakDataSource.getUserStreak(username);

    return Promise.resolve(this.restUserStreakMapper.map(jsonData));
  }
}
