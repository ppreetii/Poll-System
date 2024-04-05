import { redirect } from "react-router-dom";
import { socket } from "../socket";

export function action() {
  fetch(`https://poll-system-be.vercel.app/api/v1/users/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  localStorage.removeItem("expiration");

  socket.disconnect();
  return redirect("/");
}
