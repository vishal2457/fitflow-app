import type { AxiosError } from "axios";
import { createQuery } from "react-query-kit";

import { client } from "../common";

type Variables = { id?: number };
type Response = any;

export const getMembershipDetail = createQuery<Response, Variables, AxiosError>(
  {
    queryKey: ["membership-detail"],
    fetcher: (variables) => {
      if (!variables.id) {
        return;
      }
      return client
        .get(`/member/active-membership/${variables.id}`)
        .then((response) => response.data);
    },
  }
);
