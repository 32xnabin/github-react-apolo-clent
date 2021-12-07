import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Typography, makeStyles, CircularProgress } from '@material-ui/core';
import { useDebounce } from 'use-debounce';
import { SEARCH_FOR_USERS } from '../queries';

import User from './User';

const useStyles = makeStyles({
  repo: {
    marginTop: '1rem',
    fontSize: '18px',
  },
  spinnerContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '1rem',
  },
  userDiv: {
    display: 'flex',
    justifyContent: 'space-around',
  },
});

const UserList = ({
  searchTerm,
  setOwner,
  setSelectedRepo,
  setShowIssues,
  setRepoId,
}) => {
  const classes = useStyles();
  const [repos, setRepos] = useState(null);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  const { data, loading, error } = useQuery(SEARCH_FOR_USERS, {
    variables: { search_term: debouncedSearchTerm },
  });

  const handleProfileClick = (item) => {
    setRepos(item.node.repositories.nodes);
  };
  const handleRepoClick = async (repo) => {
    setSelectedRepo(repo.name);
    setOwner(repo.owner.login);
    setRepoId(repo.id);
    setShowIssues(true);
  };

  useEffect(() => {
    setRepos(null);
  }, [data]);

  if (loading) {
    return (
      <div className={classes.spinnerContainer}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <Typography
        variant={'overline'}
        className={classes.note}
        component={'div'}
        color={'error'}
      >
        {error}
      </Typography>
    );
  }

  if (!data) {
    return (
      <Typography
        variant={'overline'}
        className={classes.note}
        component={'div'}
      >
        There are no such users!
      </Typography>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <div className={classes.userDiv}>
        {data.search.edges.map((item, i) => (
          <div
            data-value={i}
            style={{ margin: '4px' }}
            onClick={() => handleProfileClick(item)}
          >
            <User
              name={item.node.name}
              avatarurl={item.node.avatarUrl}
              key={i}
            />
          </div>
        ))}
      </div>

      {repos && (
        <div
          style={{
            marginBottom: '8px',
            width: '100%',
            padding: '20px',
          }}
        >
          <Typography variant={'h6'}>Repositories</Typography>
          {repos.map((repo, i) => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '8px',
                width: '100%',
              }}
              onClick={() => handleRepoClick(repo)}
            >
              <div className={classes.repo}>
                <di></di>
                {repo.url}
              </div>

              <div className={classes.repo}>
                {repo.stargazers.totalCount} stars / {repo.watchers.totalCount}
                watching
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
