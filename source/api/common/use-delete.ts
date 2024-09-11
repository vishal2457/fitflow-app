import type { AxiosError } from "axios";
import { createMutation } from "react-query-kit";
import { client } from "../common";

type Payload = { endpoint: string };
type Response = any;

export const useDelete = createMutation<Response, Payload, AxiosError>({
  mutationFn: async ({ endpoint }) => {
    return client.delete(endpoint);
  },
});
