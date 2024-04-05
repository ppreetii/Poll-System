import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
} from "react-router-dom";

import classes from "./NewPoll.module.css";
import PageContent from "../../common/PageContent";

function NewPoll() {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }
  return (
    <Form method="POST" className={classes.poll}>
      <p>
        <input type="text" id="question" name="question" required />
        <label htmlFor="question"> Question</label>
      </p>
      <p>
        <input type="text" id="optionA" name="optionA" required />
        <label htmlFor="optionA"> Option A</label>
      </p>
      <p>
        <input type="text" id="optionB" name="optionB" required />
        <label htmlFor="optionB"> Option B</label>
      </p>
      <p>
        <input type="text" id="optionC" name="optionC" required />
        <label htmlFor="optionC"> Option C</label>
      </p>
      <p>
        <input type="text" id="optionD" name="optionD" required />
        <label htmlFor="optionD"> Option D</label>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Save"}
        </button>
      </div>
      {data?.errors && (
        <PageContent
          title={data.errors[0].field ?? data.errors[0].message}
          timeout={3000}
        />
      )}
    </Form>
  );
}

export default NewPoll;
