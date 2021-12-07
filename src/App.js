import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './client';
import { Typography, Container, makeStyles } from '@material-ui/core';
import UserList from './components/UserList';
import IssueList from './components/IssueList';
import SearchBar from './components/SearchBar';

const useStyles = makeStyles({
  title: {
    marginTop: '1rem',
    marginBottom: '1rem',
    textAlign: 'center',
  },
});

const App = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [owner, setOwner] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [repoId, setRepoId] = useState(null);
  const [showIssues, setShowIssues] = useState(false);
  useEffect(() => {}, [showIssues]);
  return (
    <ApolloProvider client={client}>
      <Container>
        <SearchBar
          value={searchTerm}
          setShowIssues={setShowIssues}
          onChange={setSearchTerm}
        />
        {showIssues ? (
          <IssueList
            repoId={repoId}
            repoName={selectedRepo}
            repoOwner={owner}
          />
        ) : (
          <UserList
            setOwner={setOwner}
            setSelectedRepo={setSelectedRepo}
            setRepoId={setRepoId}
            setShowIssues={setShowIssues}
            searchTerm={searchTerm}
          />
        )}
      </Container>
    </ApolloProvider>
  );
};

export default App;
