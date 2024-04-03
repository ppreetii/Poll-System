import { Outlet } from 'react-router-dom';

import PollsNavigation from '../components/polls/navigation/PollsNavigation';

function PollsRootLayout() {
  return (
    <div className='pollContainer'>
      <PollsNavigation />
      <Outlet />
    </div>
  );
}

export default PollsRootLayout;
