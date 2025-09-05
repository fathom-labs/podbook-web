// src/lib/apolloClient.ts
import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API_URL || 'https://dev-api.fathom.fm/graphql'
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
    });
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

// Auth link with better token handling
const authLink = setContext((_, { headers }) => {
    // Get the token from environment variables
    const token = import.meta.env.VITE_PODIUM_API_TOKEN;
    
    if (!token) {
      console.warn('VITE_PODIUM_API_TOKEN is not set in environment variables');
    }
    
    // Ensure the token is properly formatted
    const authHeader = token ? { 
      authorization: `${token.replace(/^Bearer\s+/i, '')}` 
    } : {};
  
    return {
      headers: {
        ...headers,
        ...authHeader,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    };
  });  

// Combine the links
const link = ApolloLink.from([errorLink, authLink, httpLink]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export default client;