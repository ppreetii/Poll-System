import { json, redirect } from "react-router-dom";

import AuthForm from "../components/auth/AuthForm";
import { COMMON } from "../constants/common";
import { API } from "../constants/api";
import { socket } from "../socket";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  if (mode !== "login" && mode !== "signup") {
    throw json(
      {
        message: "Unsupported mode",
      },
      {
        status: 422,
      }
    );
  }
  const data = await request.formData();

  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  if (mode === "signup") {
    authData.name = data.get("name");
  }

  const response = await fetch(
    `${API.BASE_LOCAL}${API.USERS}/${mode}`, //donot forget to change
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(authData),
    }
  );

  if (COMMON.ERR_STATUS.includes(response.status)) {
    return response;
  }
  if (!response.ok) {
    throw json(response, {
      status: response.status,
    });
  }

  if (mode === "signup") {
    return redirect("/auth?mode=login");
  }
  const resData = await response.json();
  const token = resData.jwt;
  const username = resData.name;
  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  socket.connect();
  return redirect("/");
}
