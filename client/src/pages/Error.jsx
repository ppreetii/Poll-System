import { useRouteError } from "react-router-dom";

import PageContent from "../components/common/PageContent";
import RootLayout from "./Root";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  const { data } = error;

  if (data?.errors) {
    if (data?.errors?.[0].message && data?.errors?.[0].field) {
      title = data.errors.message;
      message = data.errors.field;
    } else {
      message = data.errors[0].message;
    }
  }

  return (
    <>
      <RootLayout />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
