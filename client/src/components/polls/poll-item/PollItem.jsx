import {
  Form,
  useNavigation,
  useRouteLoaderData,
  useActionData,
} from "react-router-dom";

import classes from "./PollItem.module.css";
import PageContent from "../../common/PageContent";

function PollItem({ data }) {
  const token = useRouteLoaderData("root");
  const voteActionData = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Form  method="PATCH" className={classes.poll}>
      {/* {data?.errors && (
        <PageContent title={data.errors[0].field ?? data.errors[0].message} timeout={3000} />
      )} */}
      {voteActionData?.errors && (
        <PageContent
          title={
            voteActionData.errors[0].field ?? voteActionData.errors[0].message
          }
          timeout={3000}
        />
      )}

      <h1>{data.question}</h1>
      <p>
        <input type="checkbox" id="optionA" name="optionA" value="false" />
        <label htmlFor="optionA"> A. {data.optionA}</label>
      </p>
      <p>
        <input type="checkbox" id="optionB" name="optionB" value="false" />
        <label htmlFor="optionB">B. {data.optionB}</label>
      </p>
      <p>
        <input type="checkbox" id="optionC" name="optionC" value="false" />
        <label htmlFor="optionC">C. {data.optionC}</label>
      </p>
      <p>
        <input type="checkbox" id="optionD" name="optionD" value="false" />
        <label htmlFor="optionD">D. {data.optionD}</label>
      </p>

      {token && (
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Vote"}
          {voteActionData?.id && <PageContent title={"Your Vote added!"} timeout={3000} />}
        </button>
      )}
    </Form>
  );
}

export default PollItem;
