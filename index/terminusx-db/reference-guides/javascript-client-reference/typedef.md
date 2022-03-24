# TypeDef

**TypeDef**

Type definations

## DocParamsGet

**DocParamsGet: `Object`**

the GET document interface query parameters

**Properties**

| Name           | Type        | Description                                                                                                                                  |
| -------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| \[graph\_type] | `GraphType` | instance                                                                                                                                     |
| \[type]        | `string`    | only documents of the given type are returned.                                                                                               |
| \[id]          | `string`    | only the document with the given ID is returned.                                                                                             |
| \[prefixed]    | `boolean`   | default is true, return IRIs using a prefixed notation wherever possible. If false, full IRIs are used.                                      |
| \[minimized]   | `boolean`   | default is false, return the documents with very little whitespace. Each json document will be on its own line.                              |
| \[unfold]      | `boolean`   | default is false, any subdocuments contained in the returned document are returned too. If false, these are referred to by their ID instead. |
| \[skip]        | `number`    | default is 0, How many results to skip                                                                                                       |
| \[count]       | `number`    | count - How many results to return. If this option is absent, all results are returned.                                                      |
| \[as\_list]    | `boolean`   | default is false, If true, don't return a stream of json objects, but a json list.                                                           |
| \[graph\_type] | `string`    | instance                                                                                                                                     |

## DocParamsPost

**DocParamsPost: `Object`**

the POST document interface query parameters

**Properties**

| Name             | Type        | Description                                                                                                                                                                                                              |
| ---------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| \[graph\_type]   | `GraphType` | default is instance instance                                                                                                                                                                                             |
| \[full\_replace] | `boolean`   | default is false, If true, all existing documents are deleted before inserting the posted documents. This allows the full replacement of the contents of a database. This is especially useful for replacing the schema. |

## DocParamsPut

**DocParamsPut: `Object`**

the PUT document interface query parameters

**Properties**

| Name           | Type        | Description                   |
| -------------- | ----------- | ----------------------------- |
| \[graph\_type] | `GraphType` | default is instance, instance |

## DocParamsDelete

**DocParamsDelete: `Object`**

the DELETE document interface query parameters

**Properties**

| Name           | Type                | Description                                                                          |
| -------------- | ------------------- | ------------------------------------------------------------------------------------ |
| \[graph\_type] | `GraphType`         | default is instance, instance                                                        |
| id             | `string` \| `array` | a single id or a list of ids to delete.                                              |
| \[nuke]        | `booleam`           | default is false, If true, delete everything at this resource location (dangerous!). |

## GraphRef

**GraphRef: `"schema/main"` | `"instance/main"` | `string`**

## DataFormatObj

**DataFormatObj: `Object`**

(export/import)

**Properties**

| Name              | Type                  | Description        |
| ----------------- | --------------------- | ------------------ |
| \[type]           | `"csv"` \| `"turtle"` | the format type    |
| \[format\_header] | `string`              | header format type |

## FuntionType

**FuntionType: `"add_quad"` | `"delete_quad"` | `"add_triple"` | `"delete_triple"` | `"quad"` | `"triple"`**

## ResourceType

**ResourceType: `"commits"` | `"meta"` | `"branch"` | `"ref"` | `"repo"` | `"db"`**

## GraphType

**GraphType: `"instance"` | `"schema"`**

## CredentialObj

**CredentialObj: `Object`**

**Properties**

| Name    | Type                  | Description                                        |
| ------- | --------------------- | -------------------------------------------------- |
| type    | `'basic'` \| `'jwt'`  | the authorization type of an TerminusDB connection |
| \[user] | `string` \| `boolean` | the user id                                        |
| key     | `string`              | the connection key                                 |

## ActionType

**ActionType: `'graph'` | `'db'` | `'clone'` | `'triples'` | `'woql'` | `'fetch'` | `'pull'` | `'rebase'` | `'branch'` | `'reset'` | `'push'` | `'squash'`**

## ParamsObj

**ParamsObj: `Object`**

**Properties**

| Name                   | Type                   | Description                                                                           |
| ---------------------- | ---------------------- | ------------------------------------------------------------------------------------- |
| \[key]                 | `string`               | api key for basic auth                                                                |
| \[jwt]                 | `string`               | jwt token to connect with terminusX server                                            |
| \[user]                | `string`               | the user id, we use this for basic authentication and for identify the commits author |
| \[organization]        | `string`               | set organization to this id                                                           |
| \[db]                  | `string`               | set cursor to this db                                                                 |
| \[repo]                | `RepoType` \| `string` | set cursor to this repo                                                               |
| \[branch]              | `string`               | set branch to this id                                                                 |
| \[ref]                 | `string`               | set commit ref                                                                        |
| \[default\_branch\_id] | `string`               | set the default branch id                                                             |

## RolesObj

**RolesObj: `Object`**

**Properties**

| Name                  | Type     | Description                         |
| --------------------- | -------- | ----------------------------------- |
| agent\_name           | `string` | the Authorization connection's type |
| \[database\_name]     | `string` | the user id                         |
| \[organization\_name] | `string` | the connection key                  |
| \[actions]            | `array`  | list of roles                       |
| \[invitation]         | `string` | -                                   |

## RepoType

**RepoType: `"local"` | `"remote"`**

## DbDetails

**DbDetails: `Object`**

**Properties**

| Name            | Type      | Description                                                          |
| --------------- | --------- | -------------------------------------------------------------------- |
| \[organization] | `string`  | the db organization id                                               |
| id              | `string`  | The database identification name                                     |
| label           | `string`  | "Textual DB Name"                                                    |
| \[comment]      | `string`  | "Text description of DB"                                             |
| \[public]       | `boolean` |                                                                      |
| \[icon]         | `string`  | The database's icon                                                  |
| \[prefixes]     | `object`  | {scm: "http://url.to.use/for/scm", doc: "http://url.to.use/for/doc"} |
| \[schema]       | `boolean` | if set to true, a schema graph will be created                       |

## RemoteRepoDetails

**RemoteRepoDetails: `Object`**

{remote: "origin", "remote\_branch": "main", "author": "admin", "message": "message"}

**Properties**

| Name           | Type     | Description                                  |
| -------------- | -------- | -------------------------------------------- |
| \[remote]      | `string` | remote server url                            |
| remote\_branch | `string` | remote branch name                           |
| \[author]      | `string` | if it is undefined it get the current author |
| \[message]     | `string` | the update commit message                    |

## CloneSourceDetails

**CloneSourceDetails: `Object`**

**Properties**

| Name        | Type     | Description              |
| ----------- | -------- | ------------------------ |
| remote\_url | `string` | the remote db source url |
| \[label]    | `string` |                          |
| \[comment]  | `string` |                          |
