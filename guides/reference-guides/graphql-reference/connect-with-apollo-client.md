---
description: >-
  A reference guide to get you up and running with TerminusDB & TerminusCMS
  using GraphQL and Apollo Client
---

# Connect with Apollo Client

1. Install dependencies

```sh
    npm install @apollo/client graphql
```

2. To initialize ApolloClient and connect with TerminusDB/CMS import these dependencies

```javascript
import { ApolloClient, InMemoryCache, ApolloProvider, gql,HttpLink,ApolloLink } from '@apollo/client';
```

Initialize ApolloClient by passing its constructor with a configuration object with the TerminusDB server endpoint, user credentials and cache fields.

> Extra information about the Apollo client cache can be found on their [website](https://www.apollographql.com/docs/react/caching/overview)

### Connect with TerminusDB Local

```javascript
const orgName = "myOrganizationName"
const dbName = "myDBname"
const myBranch = "main"

const user = "admin"
const password = "mypass"
const userPassEnc = btoa(`${user}:${password}`)

const terminusdbURL = `http://127.0.0.1:6363/api/graphql/${orgName}/${dbName}/local/branch/${myBranch}/`

const httpLink = new HttpLink({ uri: terminusdbURL });
const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
    headers: {
        ...headers,
        authorization: `Basic ${userPassEnc}`}
    }));
    return forward(operation);
})
    
const cache = new InMemoryCache({
    addTypename: false
});

const value = concat(authMiddleware, httpLink)

const apolloClient = new ApolloClient({
    cache:cache,
    link: value,       
});

3. Query your database

apolloClient
  .query({
    query: gql`
     query{
        Person{
        _id
        name
        }
    }
    `,
  })
  .then((result) => console.log(result));
```

### Connect with TerminusCMS

> You will need to [get your API key](../../../terminuscms/get-api-key.md) to connect with terminusCMS

```javascript
const orgName = "myOrganizationName"
const dbName = "myDBname"
const myBranch = "main"

const user = "admin"
const password = "mypass"
const userPassEnc = btoa(`${user}:${password}`)

const terminusdbURL = `https://cloud.terminusdb.com/${orgName}/api/graphql/${orgName}/${dbName}/local/branch/${myBranch}/`
const myAPIToken = 'replaceYourToken'

const httpLink = new HttpLink({ uri: terminusdbURL });
const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
    headers: {
        ...headers,
        authorization: `Token ${myAPIToken}`}
    }));
    return forward(operation);
})
    
const cache = new InMemoryCache({
    addTypename: false
});

const value = concat(authMiddleware, httpLink)

const apolloClient = new ApolloClient({
    cache:cache,
    link: value,       
});

3. Query your database

apolloClient
  .query({
    query: gql`
     query{
        Person{
        _id
        name
        }
    }
    `,
  })
  .then((result) => console.log(result));
```

\
