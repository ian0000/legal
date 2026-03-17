import type { AuthResponse } from "@legal/shared";
const response: AuthResponse = {
  token: "abc",
  user: { _id: "1", name: "Ian", email: "test@test.com" },
};

console.log(response.token);
