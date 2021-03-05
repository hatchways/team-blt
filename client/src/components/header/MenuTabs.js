import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,    
  },
  Tab:{
    textTransform: "none",
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab className={classes.Tab} label="Shopping Lists" component={Link}
                    to="/"/>
          <Tab className={classes.Tab} label="Friends" component={Link}
                    to="/friends"/>
          <Tab className={classes.Tab} label="Notifications" component={Link}
                    to="/notifications"/>
        </Tabs>      
    </div>
  );
}
