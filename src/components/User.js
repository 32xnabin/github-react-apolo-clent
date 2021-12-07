import React from 'react';

import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  userDiv: {
    margin: '8px',
  },
  avatar: {
    width: '200px',
    height: '200px',
  },
});

const User = ({ name, avatarurl }) => {
  const classes = useStyles();
  return (
    <div className={classes.userDiv}>
      <img alt={name} className={classes.avatar} src={avatarurl} />
      <Typography variant={'h6'}>{name}</Typography>
    </div>
  );
};

export default User;
