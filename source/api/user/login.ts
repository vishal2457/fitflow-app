import type { AxiosError } from "axios";
import { createMutation } from "react-query-kit";

import { client } from "../common";

type Payload = {
  email: string;
  passcode: number;
};
type Response = any;

export const useLogin = createMutation<Response, Payload, AxiosError>({
  mutationFn: async (payload) => client.post(`/member/login`, payload),
});
