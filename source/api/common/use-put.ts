import type { AxiosError } from "axios";
import { createMutation } from "react-query-kit";
import { client } from ".";
import { User } from "../../types/user";

type Payload = { endpoint: string; payload: User };
type Response = any;

export const usePut = createMutation<Response, Payload, AxiosError>({
  mutationFn: async ({ endpoint, payload }) => {
    return client.put(endpoint, payload);
  },
});
