import { atom } from "recoil";

export const adminLogin = atom({
  key: "admin login",
  default: false
});

export const studentLogin = atom({
  key: "student login",
  default: false
});
