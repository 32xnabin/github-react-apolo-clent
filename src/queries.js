import gql from "graphql-tag";

export const SEARCH_FOR_REPOS = gql`
  query($search_term: String!) {
    search(query: $search_term, type: REPOSITORY, first: 20) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            name
            owner {
              login
            }
            stargazers {
              totalCount
            }
            descriptionHTML
          }
        }
      }
    }
  }
`;

export const SEARCH_FOR_USERS = gql`
  query($search_term: String!) {
    search(query: $search_term, type: USER, first: 5) {
      pageInfo {
        startCursor
        hasNextPage
        endCursor
      }
      userCount
      edges {
        node {
          ... on User {
            login
            bio
            avatarUrl
            name
            repositories(first: 5, isFork: false) {
              nodes {
                id
                name
                url
                owner {
                  login
                }
                stargazers {
                  totalCount
                }
                watchers {
                  totalCount
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const GET_REPO_ISSUES = gql`
  query($name: String!, $owner: String!, $getCount: Int) {
    repository(name: $name, owner: $owner) {
      issues(
        first: $getCount
        states: [OPEN]
        orderBy: { field: CREATED_AT, direction: DESC }
      ) {
        nodes {
          title
          bodyHTML
          createdAt
        }
      }
    }
  }
`;
export const ADD_REPO_ISSUE = gql`
  mutation($repoId: String!, $title: String!, $body: String!) {
    createIssue(input: { repositoryId: $repoId, title: $title, body: $body }) {
      issue {
        number
        body
      }
    }
  }
`;
