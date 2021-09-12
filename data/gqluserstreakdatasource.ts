export class GqlUserStreakDataSource {
  async getUserStreak(username: string): Promise<any> {
    const token = Deno.env.get("GITHUB_PAT");
    const headers = {
      Authorization: `bearer ${token}`,
    };
    const body = {
      query: `query {
        user(login: "${username}") {
          contributionsCollection {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  weekday
                  contributionCount
                }
              }
            }
          }
        }
      }`,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(body),
      headers: headers,
    };
    const jsonResponse = await fetch("https://api.github.com/graphql", options);
    const jsonData = await jsonResponse.json();
    return jsonData;
  }
}
