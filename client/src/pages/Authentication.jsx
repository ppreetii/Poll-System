import { json, redirect } from "react-router-dom";

import AuthForm from "../components/auth/AuthForm";
import { COMMON } from "../constants/common";

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

  const response = await fetch(`https://poll-system-be.vercel.app/api/v1/users/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(authData),
  });

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

  localStorage.setItem("token", token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
