import { UserStreakRepository } from "../entity/userstreakrepository.ts";
import { GetUserStreak } from "../get_user_streak.ts";
import { assertEquals } from "../../deps.ts";
import { UserStreak } from "../entity/userstreak.ts";

const expectedResult: UserStreak = {
  events: [
    [1, 1, 1],
    [0, 0, 0],
  ],
};
const mock: UserStreakRepository = {
  getUserStreak: (_username: string) => Promise.resolve(expectedResult),
};
const testedUsecase = new GetUserStreak(mock);
Deno.test("SHOULD return expected array WHEN called", async () => {
  // Arrange
  const username = "testedUsername";

  // Act
  const result = await testedUsecase.execute(username);

  // Assert
  assertEquals(expectedResult, result);
});
