import { createAsyncAction } from "typesafe-actions";

export const loginAction = createAsyncAction(
  "login/doLogin/pending",
  "login/doLogin/fulfuilled",
  "login/doLogin/rejected"
)<{ username: string; password: string }, string, void>();
