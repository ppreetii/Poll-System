import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";

import HomePage from "./pages/Home";
import PollsRootLayout from "./pages/PollRoot";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import PollsPage,{loader as pollLoader} from "./pages/Polls";
import { action as logoutAction } from "./pages/Logout";
import PollDetailPage , {loader as pollDetailLoader, action as votingAction} from "./pages/PollDetail";
import NewPollPage, {action as newPollAction} from "./pages/NewPoll";

import { tokenLoader } from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "polls",
        element: <PollsRootLayout />,
        children: [
          {
            index: true,
            element: <PollsPage/>,
            loader: pollLoader
          },
          {
            path: ":pollId",
            id: "poll-detail",
            loader: pollDetailLoader,
            children: [
              { 
                index: true,
                element: <PollDetailPage />,
                action: votingAction,               
              }
            ],
          },
          {
            path: "new",
            element: <NewPollPage />,
            action: newPollAction
          }
        ]
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
