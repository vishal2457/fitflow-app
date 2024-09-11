import type { AxiosError } from "axios";
import { createMutation } from "react-query-kit";
import { TB_memberWorkoutLog } from "mx-schema";

import { client } from "../common";

type Variables = Omit<typeof TB_memberWorkoutLog.$inferInsert, "memberID">[];
type Response = any;

export const addWorkoutLog = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (payload) =>
    client
      .post(`/member/log-workout`, payload)
      .then((response) => response.data),
});
