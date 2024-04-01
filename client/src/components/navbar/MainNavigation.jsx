import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

import classes from "./MainNavigation.module.css";

function MainNavigation() {
  const token = useRouteLoaderData('root');
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/polls"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Polls
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chat"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Chat
            </NavLink>
          </li>
          {
            !token && <li>
            <NavLink
              to="/auth?mode=login"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              SignUp / Login
            </NavLink>
          </li>
          }
          {
            token && <li>
            <Form action="/logout" method="post">
              <button> Logout </button>
            </Form>
          </li>
          }
          
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
