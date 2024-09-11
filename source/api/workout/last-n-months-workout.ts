import type { AxiosError } from "axios";
import { createQuery } from "react-query-kit";

import { client } from "../common";
import { MxResponse, TB_memberWorkoutLog } from "mx-schema";

type Variables = { months?: number; id?: number };
type Response =
  | MxResponse<Array<typeof TB_memberWorkoutLog.$inferSelect>>
  | undefined;

export const getLastNMonthsWorkout = createQuery<
  Response,
  Variables,
  AxiosError
>({
  queryKey: ["n-months-workout"],
  fetcher: (variables) => {
    if (!variables.id) {
      return;
    }
    return client
      .get(`/member/last-n-months-workout-logs/${variables.id}`, {
        params: { months: variables.months || 2 },
      })
      .then((response) => response.data);
  },
});
