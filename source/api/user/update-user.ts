import type { AxiosError } from "axios";
import { createMutation } from "react-query-kit";
import { client } from "../common";
import { User } from "../../types/user";

type Payload = User;
type Response = any;

export const updateUser = createMutation<Response, Payload, AxiosError>({
  mutationFn: async (payload) => {
    const { id, createdAt, updatedAt, ...rest } = payload;
    return client.put(`/member/update/${id}`, rest);
  },
});
