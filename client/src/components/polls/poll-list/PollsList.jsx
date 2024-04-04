import { Link } from "react-router-dom";

import classes from "./PollsList.module.css";
import PageContent from "../../common/PageContent";
import { daysLeftToExpire } from "../../../utils/helper";

function PollsList({ data }) {
  return (
    <div className={classes.polls}>
      {data?.errors && <PageContent title={data.errors[0].message} />}
      {Array.isArray(data) && (
        <ul className={classes.list}>
          {data.map((poll) => {
            const daysLeft = daysLeftToExpire(poll.expiresAt);
            return <li key={poll.id} className={classes.item}>
               <Link to={`/polls/${poll.id}`}>
                <div className={classes.content}>
                  <h2>{poll.question}</h2>
                  <cite> { daysLeft > 0 ? `${daysLeft} days left` : "Expired" } </cite>
                </div>
              </Link>
            </li>
})}
        </ul>
      )}
      
    </div>
  );
}

export default PollsList;
