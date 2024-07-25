import { create } from "apisauce";

const url = process.env.SERVER_LINK;

export const api = create({
  baseURL: "http://localhost:5000",
});
