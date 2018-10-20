import { request } from "graphql-request";
import { createConnection } from "typeorm";

import { User } from "../entity/User";

const email = "test@email.com";
const password = "1111";
const mutation = `
mutation {
    register(email:"${email}", password:"${password}")
}
`;

test("register user", async () => {
  const response = await request("http://localhost:4000", mutation);
  expect(response).toEqual({ register: true });
  await createConnection();
  const users = await User.find({ where: { email } });
  expect(users).toHaveLength(1);
  const user = users[0];
  expect(user.email).toEqual(email);
  expect(user.password).not.toEqual(password);
});
