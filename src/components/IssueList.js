import React, { useState, useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';

import {
  Dialog,
  DialogContent,
  TextField,
  CircularProgress,
  List,
  Typography,
  makeStyles,
} from '@material-ui/core';

import Issue from './Issue';
import { GET_REPO_ISSUES, ADD_REPO_ISSUE } from '../queries';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    justifyContent: 'space-around',
  },
  addIssueDiv: {
    flexDirection: 'row',
    padding: '8px',
  },
  titleDiv: { display: 'flex', justifyContent: 'space-between', margin: '8px' },
  buttonsDiv: { display: 'flex', justifyContent: 'flex-end', margin: '8px' },
  cancelButton: {
    padding: '6px 8px',
    background: '#fff',
    border: '1px solid #000',
    color: '#000',
    marginRight: '10px',
  },
  createButton: { padding: '6px 8px', background: '#000', color: '#fff' },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
});

const IssueList = ({ repoId, repoName, repInfo, repoOwner }) => {
  const classes = useStyles();
  const [dialogOpened, setDialogOpened] = useState(false);
  const [getIssues, { loading, data }] = useLazyQuery(GET_REPO_ISSUES);

  const [issueTitle, setIssueTitle] = useState('');
  const [issueBody, setIssueBody] = useState('');
  const [addIssue] = useMutation(ADD_REPO_ISSUE);

  const handleTitleChange = (e) => {
    setIssueTitle(e.target.value);
  };
  const handleBodyChange = (e) => {
    setIssueBody(e.target.value);
  };
  const handleSubmit = async () => {
    await addIssue({
      variables: {
        repoId: repoId,
        title: issueTitle,
        body: issueBody,
      },
    });
    loadIssues(20);
    setDialogOpened(false);
  };

  const loadIssues = async (getCount) => {
    await getIssues({
      fetchPolicy: 'cache-and-network',
      variables: {
        getCount: getCount,
        name: repoName,
        owner: repoOwner,
      },
    });
  };

  useEffect(() => {
    setDialogOpened(false);
    loadIssues(10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className={classes.spinnerContainer}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      {!data || !data.repository.issues.nodes.length ? (
        <div className={classes.titleDiv}>
          <Typography component={'h5'}>There are no issues!</Typography>
          <button onClick={() => setDialogOpened(true)}>Add Issue</button>
        </div>
      ) : (
        <>
          <div className={classes.titleDiv}>
            <Typography variant={'h5'}>Open issues</Typography>
            <button onClick={() => setDialogOpened(true)}>Add Issue</button>
          </div>

          <List>
            {data.repository.issues.nodes.map((issue) => (
              <Issue
                repoId={repoId}
                title={issue.title}
                bodyHTML={issue.bodyHTML}
              />
            ))}
          </List>
        </>
      )}

      <Dialog
        maxWidth={'xl'}
        open={dialogOpened}
        onClose={() => setDialogOpened(false)}
      >
        <DialogContent>
          <div className={classes.addIssueDiv}>
            <Typography style={{ marginBottom: '16px' }}>New Issue</Typography>
            <TextField
              fullWidth
              placeholder={'Title'}
              variant="outlined"
              onChange={handleTitleChange}
            />

            <TextField
              style={{ marginTop: '6px' }}
              fullWidth
              placeholder={'Description'}
              variant="outlined"
              multiline
              rows={8}
              rowsMax={8}
              value={issueBody}
              onChange={handleBodyChange}
            />
            <div className={classes.buttonsDiv}>
              <button
                className={classes.cancelButton}
                onClick={() => setDialogOpened(false)}
              >
                CANCEL
              </button>
              <button className={classes.createButton} onClick={handleSubmit}>
                CREATE
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IssueList;
