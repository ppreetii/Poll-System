import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

import PageContent from "../common/PageContent";

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();

  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log In" : "Register"}</h1>
        {!isLogin && (
          <p>
            <label htmlFor="name">Name</label>
            <input id="name" type="name" name="name" required />
          </p>
        )}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Register" : "Log In"}
          </Link>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Send"}
          </button>
        </div>
      </Form>
      {data?.errors && (
        <PageContent
          title={
            data.errors[0].field ? data.errors[0].message : "An error occurred"
          }
        >
          {data.errors[0].field ?? data.errors[0].message}
        </PageContent>
      )}
    </>
  );
}

export default AuthForm;
