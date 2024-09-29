import type { AxiosError } from "axios";
import { createQuery } from "react-query-kit";

import { client } from "../common";

type Variables = { id?: number };
type Response = any;

export const getLastSevenDaysCalorieBurn = createQuery<
  Response,
  Variables,
  AxiosError
>({
  queryKey: ["getLastSevenDaysCalorieBurn"],
  fetcher: () => {
    return client
      .get(`/member/calories-burnt-last-seven-days`)
      .then((response) => response.data);
  },
});
