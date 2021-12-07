import React, { useState, useEffect } from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './client';
import { Container } from '@material-ui/core';
import UserList from './components/UserList';
import IssueList from './components/IssueList';
import SearchBar from './components/SearchBar';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [owner, setOwner] = useState(null);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [repoId, setRepoId] = useState(null);
  const [showIssues, setShowIssues] = useState(false);
  useEffect(() => {
    setOwner(null);
  }, [showIssues]);
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
