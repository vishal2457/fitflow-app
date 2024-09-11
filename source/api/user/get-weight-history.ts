import type { AxiosError } from "axios";
import { createQuery } from "react-query-kit";

import { client } from "../common";

type Variables = { id?: number };
type Response = any;

export const getWeightHistory = createQuery<Response, Variables, AxiosError>({
  queryKey: ["weight-history"],
  fetcher: (variables) => {
    if (!variables.id) {
      return;
    }
    return client
      .get(`/member/weight-history/${variables.id}`)
      .then((response) => response.data);
  },
});
