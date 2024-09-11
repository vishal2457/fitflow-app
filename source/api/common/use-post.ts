import type { AxiosError } from "axios";
import { createMutation } from "react-query-kit";
import { client } from "../common";
import { User } from "../../types/user";

type Payload = { endpoint: string; payload: any };
type Response = any;

export const usePost = createMutation<Response, Payload, AxiosError>({
  mutationFn: async ({ endpoint, payload }) => {
    return client.post(endpoint, payload);
  },
});
