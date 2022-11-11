# Connecting to GraphQL

TerminusDB hosts a GraphQL endpoint at:

```
SERVERNAME/api/graphql/ORG/DATAPRODUCT
```

For instance, with a dataproduct named `admin/people`, and a locally
installed TerminusDB, you can query it at:

```
http://127.0.0.1:6363/api/graphql/admin/people
```

For TerminusX, simply XXXXXXXXXXXXXXXX Robin?

## Authentication

Since TerminusDB requires authenatication to access data products, you
will need to use the authentication method that has been configured
for your server.

### Basic Auth

Using Basic Auth, the method which is default in locally installed
TerminusDB's, you can supply the Authorization header, with your basic
auth. (To generate a Basic Auth string, see [Basic Auth Generator](https://www.blitter.se/utils/basic-authentication-header-generator/)).

For example, if you would like to connect to `admin/people` with the
apollo clien tto download the assocated GraphQL schema, simply use:

```shell
npx apollo client:download-schema --endpoint=http://127.0.0.1:6363/api/graphql/admin/people schema.graphql --header='Authorization: Basic YWRtaW46cm9vdA=='
```

### TerminusX: COMING SOON!

In TerminusX you can use an API key with the following header.

For instance, with the apollo client, you can download your schema as
follows:

```shell
npx apollo client:download-schema --endpoint=https://cloud.terminusdb.com/TEAM/api/graphql/TEAM/people schema.graphql --header="Authorization: Token $(cat ~/my_token_file)"
```
Where `my_token_file` contains an API token for TerminusX.

## GraphiQL

![GraphiQL dashboard](some_url_here)

TerminusDB ships with a GraphiQL graphical GraphQL query interface and
schema browser. This is a quick way to get aquainted with GraphQL in
TerminusDB.

You can reach this browser at:

```
http://127.0.0.1:6363/api/graphiql/admin/people
```

You will also need to set your Authorization header in the Header
dialog box at the bottom centre.

For instance, in the default install, as:

```json
{
  "Authorization": "Basic YWRtaW46cm9vdA=="
}
```
