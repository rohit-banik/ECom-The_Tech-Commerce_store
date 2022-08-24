import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("1234", 10),
    isAdmin: true,
  },
  {
    name: "Yeye Bhatt",
    email: "yeye@example.com",
    password: bcrypt.hashSync("1234", 10),
  },
  {
    name: "Bruhh Johnson",
    email: "bruhh@example.com",
    password: bcrypt.hashSync("1234", 10),
  },
];

export default users;
