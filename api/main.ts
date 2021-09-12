import { RestUserStreakMapper } from "../data/restuserstreakmapper.ts";
import { GqlUserStreakDataSource } from "../data/gqluserstreakdatasource.ts";
import { DataUserStreakRepository } from "../data/datauserstreakrepository.ts";
import { GetUserStreak } from "../core/get_user_streak.ts";
import { Application, Router, RouterContext } from "../deps.ts";
import { oakCors } from "../deps.ts";
const restUserStreakMapper = RestUserStreakMapper.getInstance();
const restUserStreakDataSource = new GqlUserStreakDataSource();
const dataUserStreakRepository = new DataUserStreakRepository(
  restUserStreakDataSource,
  restUserStreakMapper
);
const getUserStreak = new GetUserStreak(dataUserStreakRepository);

const app = new Application();

const router = new Router();
router.get("/user/:username", async (context: RouterContext) => {
  if (context.params.username !== undefined) {
    const result = await getUserStreak.execute(context.params.username);
    context.response.body = { data: result };
  } else {
    context.response.status = 400;
  }
});

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
