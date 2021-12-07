import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';

const Issue = ({ title }) => {
  return (
    <>
      <ListItem>
        <ListItemText>{title}</ListItemText>
      </ListItem>
    </>
  );
};

export default Issue;
