import { redirect } from "react-router-dom";

export function action() {
  fetch(`https://poll-system-be.vercel.app/api/v1/users/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");
  return redirect("/");
}
