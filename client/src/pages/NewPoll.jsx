import { json, redirect } from "react-router-dom";

import NewPoll from "../components/polls/new-poll/NewPoll";
import { COMMON } from "../constants/common";

function NewPollPage() {
  return <NewPoll />;
}

export default NewPollPage;

export async function action({ request }) {
  const data = await request.formData();

  const poll = {
    question: data.get("question"),
    optionA: data.get("optionA"),
    optionB: data.get("optionB"),
    optionC: data.get("optionC"),
    optionD: data.get("optionD"),
  };

  const response = await fetch(
    "https://poll-system-be.vercel.app/api/v1/polls",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "include",
      body: JSON.stringify(poll),
    }
  );

  if (COMMON.ERR_STATUS.includes(response.status)) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save Poll." }, { status: 500 });
  }

  return redirect("/polls");
}
