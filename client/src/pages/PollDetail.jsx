import { Suspense } from "react";
import {
  useRouteLoaderData,
  json,
  defer,
  Await,
} from "react-router-dom";

import PollItem from "../components/polls/poll-item/PollItem";

import { COMMON } from "../constants/common";

function PollDetailPage() {
  const { data } = useRouteLoaderData("poll-detail");

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={data}>
        {(loadedData) => <PollItem data={loadedData} />}
      </Await>
    </Suspense>
  );
}

export default PollDetailPage;

async function loadPoll(id) {
  const response = await fetch(
    "https://poll-system-be.vercel.app/api/v1/polls/" + id,
    {
      withCredentials: true,
      credentials: "include",
    }
  );

  if (COMMON.ERR_STATUS.includes(response.status)) {
    return response;
  }

  const resData = await response.json();
  return resData;
}

export async function loader({ request, params }) {
  const id = params.pollId;

  return defer({
    data: loadPoll(id),
  });
}

export async function action({ request, params }) {
  const data = await request.formData();

  const vote = {
    optionA: data.get("optionA") ?? false,
    optionB: data.get("optionB") ?? false,
    optionC: data.get("optionC") ?? false,
    optionD: data.get("optionD") ?? false
  };

  const response = await fetch(
    "https://poll-system-be.vercel.app/api/v1/polls/" + params.pollId,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vote),
      withCredentials: true,
      credentials: "include",
    }
  );

  if (COMMON.ERR_STATUS.includes(response.status)) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not add your vote." }, { status: 500 });
  }

  const resData = await response.json();
  return resData;
}
