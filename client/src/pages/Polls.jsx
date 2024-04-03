import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import PollsList from "../components/polls/poll-list/PollsList";
import { COMMON } from "../constants/common";

function PollsPage() {
  const {polls} = useLoaderData();
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={polls}>
        {(result) => <PollsList data={result} />}
      </Await>
    </Suspense>
  );
}

export default PollsPage;

async function loadPolls() {
  const response = await fetch(
    "https://poll-system-be.vercel.app/api/v1/polls",
    {
      withCredentials: true,
      credentials: "include",
    }
  );
  const resData = await response.json();
  if (COMMON.ERR_STATUS.includes(response.status)) {
    return resData;
  }

  if (!response.ok) {
    throw json(
      { message: "Could not fetch Polls." },
      {
        status: 500,
      }
    );
  }

  return resData;
}

export function loader() {
  return defer({
    polls: loadPolls(),
  });
}
