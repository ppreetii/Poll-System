import { useState } from 'react';
import classes from './PageContent.module.css';

function PageContent({ title, children , timeout = 0}) {
  const [visible, setVisisble] = useState(true);

  if(timeout){
    setTimeout(()=>{
      setVisisble(false);
    }, timeout)
  }
  return (
    visible && <div className={classes.content}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;
