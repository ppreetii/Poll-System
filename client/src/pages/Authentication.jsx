import { json, redirect } from "react-router-dom";

import AuthForm from "../components/auth/AuthForm";

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

  if(mode === 'signup'){
    authData.name = data.get("name");
  }

  const response = await fetch(`https://poll-system-be.vercel.app/api/v1/users/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  const resData = await response.json();

  if (!response.ok) {
    throw json(
      resData,
      {
        status: response.status
      }
    );
  }

  if(mode === 'signup'){
    return redirect('/auth?mode=login');
  }

  const token = resData.jwt;

  localStorage.setItem('token', token);
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem('expiration', expiration.toISOString());

  return redirect('/');
}
