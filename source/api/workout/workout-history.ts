import type { AxiosError } from "axios";
import { createQuery } from "react-query-kit";

import { client } from "../common";

type Variables = { id?: number };
type Response = any;

export const getWorkoutHistory = createQuery<Response, Variables, AxiosError>({
  queryKey: ["workout-history"],
  fetcher: (variables) => {
    if (!variables.id) {
      return;
    }
    return client
      .get(`/member/workout-log-list/${variables.id}`, {
        params: {
          page: 1,
          limit: 200,
          sort: JSON.stringify({ Desc: "createdAt" }),
          filters: JSON.stringify({}),
          fields: "",
        },
      })
      .then((response) => response.data);
  },
});
