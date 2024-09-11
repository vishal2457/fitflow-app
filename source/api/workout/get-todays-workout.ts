import type { AxiosError } from "axios";
import { createQuery } from "react-query-kit";

import { client } from "../common";

type Variables = { id?: number };
type Response = any;

export const getTodaysWorkout = createQuery<Response, Variables, AxiosError>({
  queryKey: ["todays-workout"],
  fetcher: (variables) => {
    if (!variables.id) {
      return;
    }
    return client
      .get(`/member/todays-workout/${variables.id}`)
      .then((response) => response.data);
  },
});
