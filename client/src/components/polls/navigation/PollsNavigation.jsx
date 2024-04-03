import { NavLink, useRouteLoaderData } from "react-router-dom";

import classes from "./PollsNavigation.module.css";

function PollsNavigation() {
  const token = useRouteLoaderData("root");
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>All Polls</li>
          {token && (
            <li>
              <NavLink
                to="/events/new"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                <i className="fa-solid fa-plus"></i>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default PollsNavigation;
