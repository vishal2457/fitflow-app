import type { AxiosError } from "axios";
import { createQuery } from "react-query-kit";

import { client } from "../common";

type Variables = { id?: number };
type Response = any;

export const getLastSevenDaysWorkoutCount = createQuery<
  Response,
  Variables,
  AxiosError
>({
  queryKey: ["getLastSevenDaysWorkoutCount"],
  fetcher: () => {
    return client
      .get(`/member/workout-count-last-seven-days`)
      .then((response) => response.data);
  },
});
