<a id="client.Client"></a>

# client.Client

Client.py
Client is the Python public API for TerminusDB

<a id="client.Client.JWTAuth"></a>

# JWTAuth Objects

```python
class JWTAuth(requests.auth.AuthBase)
```

Class for JWT Authentication in requests

<a id="client.Client.APITokenAuth"></a>

# APITokenAuth Objects

```python
class APITokenAuth(requests.auth.AuthBase)
```

Class for API Token Authentication in requests

<a id="client.Client.GraphType"></a>

# GraphType Objects

```python
class GraphType(str, Enum)
```

Type of graph

<a id="client.Client.Client"></a>

# Client Objects

```python
class Client()
```

Client for TerminusDB server.

**Arguments**:

- `server_url` (`str`): URL of the server that this client connected.
- `api` (`str`): API endpoint for this client.
- `team` (`str`): Team that this client is using. "admin" for local dbs.
- `db` (`str`): Database that this client is connected to.
- `user` (`str`): TerminiusDB user that this client is using. "admin" for local dbs.
- `branch` (`str`): Branch of the database that this client is connected to. Default to "main".
- `ref` (`str, None`): Ref setting for the client. Default to None.
- `repo` (`str`): Repo identifier of the database that this client is connected to. Default to "local".

<a id="client.Client.Client.close"></a>

## close

```python
def close(self) -> None
```

Undo connect and close the connection.

The connection will be unusable from this point forward; an Error (or subclass) exception will be raised if any operation is attempted with the connection, unless connect is call again.

<a id="client.Client.Client.info"></a>

## info

```python
def info(self) -> dict
```

Get info of a TerminusDB database server

**Returns**:

`dict`: Dict with version information:
```
{
  "@type": "api:InfoResponse",
  "api:info": {
    "authority": "anonymous",
    "storage": {
      "version": "1"
    },
    "terminusdb": {
      "git_hash": "53acb38f9aedeec6c524f5679965488788e6ccf5",
      "version": "10.1.5"
    },
    "terminusdb_store": {
      "version": "0.19.8"
    }
  },
  "api:status": "api:success"
}
```

<a id="client.Client.Client.ok"></a>

## ok

```python
def ok(self) -> bool
```

Check whether the TerminusDB server is still OK.

Status is not OK when this function returns false
   or throws an exception (mostly ConnectTimeout)

**Raises**:

- `Exception`: When a connection can't be made by the requests library

**Returns**:

`bool`: 

<a id="client.Client.Client.log"></a>

## log

```python
def log(self,
        team: Optional[str] = None,
        db: Optional[str] = None,
        start: int = 0,
        count: int = -1)
```

Get commit history of a database

**Arguments**:

- `team` (`str`): The team from which the database is. Defaults to the class property.
- `db` (`str`): The database. Defaults to the class property.
- `start` (`int`): Commit index to start from. Defaults to 0.
- `count` (`int`): Amount of commits to get. Defaults to -1 which gets all.

**Returns**:

`list`: List of the following commit objects:
```
  {
   "@id":"InitialCommit/hpl18q42dbnab4vzq8me4bg1xn8p2a0",
   "@type":"InitialCommit",
   "author":"system",
   "identifier":"hpl18q42dbnab4vzq8me4bg1xn8p2a0",
   "message":"create initial schema",
   "schema":"layer_data:Layer_4234adfe377fa9563a17ad764ac37f5dcb14de13668ea725ef0748248229a91b",
   "timestamp":1660919664.9129035
  }
```

<a id="client.Client.Client.get_commit_history"></a>

## get\_commit\_history

```python
def get_commit_history(self, max_history: int = 500) -> list
```

Get the whole commit history.

Commit history - Commit id, author of the commit, commit message and the commit time, in the current branch from the current commit, ordered backwards in time, will be returned in a dictionary in the follow format:
```
{ "commit_id":
     { "author": "commit_author",
       "message": "commit_message",
       "timestamp: <datetime object of the timestamp>"
     }
}
```

**Arguments**:

- `max_history` (`int`): maximum number of commit that would return, counting backwards from your current commit. Default is set to 500. It needs to be nop-negative, if input is 0 it will still give the last commit.

**Examples**:

```python
>>> from terminusdb_client import Client
>>> client = Client("http://127.0.0.1:6363"
>>> client.connect(db="bank_balance_example")
>>> client.get_commit_history()
```

**Returns**:

`list`: 

<a id="client.Client.Client.get_all_branches"></a>

## get\_all\_branches

```python
def get_all_branches(self, get_data_version=False)
```

Get all the branches available in the database.

<a id="client.Client.Client.rollback"></a>

## rollback

```python
def rollback(self, steps=1) -> None
```

Curently not implementated. Please check back later.

Raises
----------
NotImplementedError
    Since TerminusDB currently does not support open transactions. This method is not applicable to it's usage. To reset commit head, use Client.reset

<a id="client.Client.Client.copy"></a>

## copy

```python
def copy(self) -> "Client"
```

Create a deep copy of this client.

**Examples**:

```python
>>> client = Client("http://127.0.0.1:6363/")
>>> clone = client.copy()
>>> assert client is not clone
```

**Returns**:

`Client`: The copied client instance.

<a id="client.Client.Client.set_db"></a>

## set\_db

```python
def set_db(self, dbid: str, team: Optional[str] = None) -> str
```

Set the connection to another database. This will reset the connection.

**Arguments**:

- `dbid` (`str`): Database identifer to set in the config.
- `team` (`str`): Team identifer to set in the config. If not passed in, it will use the current one.

**Examples**:

```python
>>> client = Client("http://127.0.0.1:6363")
>>> client.set_db("database1")
```

**Returns**:

`str`: The current database identifier.

<a id="client.Client.Client.create_database"></a>

## create\_database

```python
def create_database(self,
                    dbid: str,
                    team: Optional[str] = None,
                    label: Optional[str] = None,
                    description: Optional[str] = None,
                    prefixes: Optional[dict] = None,
                    include_schema: bool = True) -> None
```

Create a TerminusDB database by posting

a terminus:Database document to the Terminus Server.

**Arguments**:

- `dbid` (`str`): Unique identifier of the database.
- `team` (`str`): ID of the Team in which to create the DB (defaults to 'admin')
- `label` (`str`): Database name.
- `description` (`str`): Database description.
- `prefixes` (`dict`): Optional dict containing ``"@base"`` and ``"@schema"`` keys.

@base (str)
    IRI to use when ``doc:`` prefixes are expanded. Defaults to ``terminusdb:///data``.
@schema (str)
    IRI to use when ``scm:`` prefixes are expanded. Defaults to ``terminusdb:///schema``.
- `include_schema` (`bool`): If ``True``, a main schema graph will be created, otherwise only a main instance graph will be created.

**Raises**:

- `InterfaceError`: if the client does not connect to a server

**Examples**:

```python
>>> client = Client("http://127.0.0.1:6363/")
>>> client.create_database("someDB", "admin", "Database Label", "My Description")
```

<a id="client.Client.Client.delete_database"></a>

## delete\_database

```python
def delete_database(self,
                    dbid: Optional[str] = None,
                    team: Optional[str] = None,
                    force: bool = False) -> None
```

Delete a TerminusDB database.

If ``team`` is provided, then the team in the config will be updated
and the new value will be used in future requests to the server.

**Arguments**:

- `dbid` (`str`): ID of the database to delete
- `team` (`str`): the team in which the database resides (defaults to "admin")
- `force` (`bool`): None

**Raises**:

- `UserWarning`: If the value of dbid is None.
- `InterfaceError`: if the client does not connect to a server.

**Examples**:

```python
>>> client = Client("http://127.0.0.1:6363/")
>>> client.delete_database("<database>", "<team>")
```

<a id="client.Client.Client.get_triples"></a>

## get\_triples

```python
def get_triples(self, graph_type: GraphType) -> str
```

Retrieves the contents of the specified graph as triples encoded in turtle format

**Arguments**:

- `graph_type` (`GraphType`): Graph type, either GraphType.INSTANCE or GraphType.SCHEMA.

**Raises**:

- `InterfaceError`: if the client does not connect to a database

**Returns**:

`str`: 

<a id="client.Client.Client.update_triples"></a>

## update\_triples

```python
def update_triples(self, graph_type: GraphType, content: str,
                   commit_msg: str) -> None
```

Updates the contents of the specified graph with the triples encoded in turtle format.

Replaces the entire graph contents

**Arguments**:

- `graph_type` (`GraphType`): Graph type, either GraphType.INSTANCE or GraphType.SCHEMA.
- `content`: Valid set of triples in Turtle or Trig format.
- `commit_msg` (`str`): Commit message.

**Raises**:

- `InterfaceError`: if the client does not connect to a database

<a id="client.Client.Client.insert_triples"></a>

## insert\_triples

```python
def insert_triples(self,
                   graph_type: GraphType,
                   content: str,
                   commit_msg: Optional[str] = None) -> None
```

Inserts into the specified graph with the triples encoded in turtle format.

**Arguments**:

- `graph_type` (`GraphType`): Graph type, either GraphType.INSTANCE or GraphType.SCHEMA.
- `content`: Valid set of triples in Turtle or Trig format.
- `commit_msg` (`str`): Commit message.

**Raises**:

- `InterfaceError`: if the client does not connect to a database

<a id="client.Client.Client.query_document"></a>

## query\_document

```python
def query_document(self,
                   document_template: dict,
                   graph_type: GraphType = GraphType.INSTANCE,
                   skip: int = 0,
                   count: Optional[int] = None,
                   as_list: bool = False,
                   get_data_version: bool = False,
                   **kwargs) -> Union[Iterable, list]
```

Retrieves all documents that match a given document template

**Arguments**:

- `document_template` (`dict`): Template for the document that is being retrived
- `graph_type` (`GraphType`): Graph type, either GraphType.INSTANCE or GraphType.SCHEMA.
- `as_list` (`bool`): If the result returned as list rather than an iterator.
- `get_data_version` (`bool`): If the data version of the document(s) should be obtained. If True, the method return the result and the version as a tuple.

**Raises**:

- `InterfaceError`: if the client does not connect to a database

**Returns**:

`Iterable`: 

<a id="client.Client.Client.get_document"></a>

## get\_document

```python
def get_document(self,
                 iri_id: str,
                 graph_type: GraphType = GraphType.INSTANCE,
                 get_data_version: bool = False,
                 **kwargs) -> dict
```

Retrieves the document of the iri_id

**Arguments**:

- `iri_id` (`str`): Iri id for the docuemnt that is retriving
- `graph_type` (`GraphType`): Graph type, either GraphType.INSTANCE or GraphType.SCHEMA.
- `get_data_version` (`bool`): If the data version of the document(s) should be obtained. If True, the method return the result and the version as a tuple.
- `kwargs` (``): Additional boolean flags for retriving. Currently avaliable: "prefixed", "minimized", "unfold"

**Raises**:

- `InterfaceError`: if the client does not connect to a database

**Returns**:

`dict`: 

<a id="client.Client.Client.get_documents_by_type"></a>

## get\_documents\_by\_type

```python
def get_documents_by_type(self,
                          doc_type: str,
                          graph_type: GraphType = GraphType.INSTANCE,
                          skip: int = 0,
                          count: Optional[int] = None,
                          as_list: bool = False,
                          get_data_version=False,
                          **kwargs) -> Union[Iterable, list]
```

Retrieves the documents by type

**Arguments**:

- `doc_type` (`str`): Specific type for the docuemnts that is retriving
- `graph_type` (`GraphType`): Graph type, either GraphType.INSTANCE or GraphType.SCHEMA.
- `skip` (`int`): The starting posiion of the returning results, default to be 0
- `count` (`int or None`): The maximum number of returned result, if None (default) it will return all of the avalible result.
- `as_list` (`bool`): If the result returned as list rather than an iterator.
- `get_data_version` (`bool`): If the version of the document(s) should be obtained. If True, the method return the result and the version as a tuple.
- `kwargs` (``): Additional boolean flags for retriving. Currently avaliable: "prefixed", "unfold"

**Raises**:

- `InterfaceError`: if the client does not connect to a database

**Returns**:

`iterable`: Stream of dictionaries

<a id="client.Client.Client.get_all_documents"></a>

## get\_all\_documents

```python
def get_all_documents(self,
                      graph_type: GraphType = GraphType.INSTANCE,
                      skip: int = 0,
                      count: Optional[int] = None,
                      as_list: bool = False,
                      get_data_version: bool = False,
                      doc_type: Optional[str] = None,
                      **kwargs) -> Union[Iterable, list, tuple]
```

Retrieves all avalibale the documents

**Arguments**:

- `graph_type` (`GraphType`): Graph type, either GraphType.INSTANCE or GraphType.SCHEMA.
- `skip` (`int`): The starting posiion of the returning results, default to be 0
- `count` (`int or None`): The maximum number of returned result, if None (default) it will return all of the avalible result.
- `as_list` (`bool`): If the result returned as list rather than an iterator.
- `get_data_version` (`bool`): If the version of the document(s) should be obtained. If True, the method return the result and the version as a tuple.
- `kwargs` (``): Additional boolean flags for retriving. Currently avaliable: "prefixed", "unfold"

**Raises**:

- `InterfaceError`: if the client does not connect to a database

**Returns**:

`iterable`: Stream of dictionaries

<a id="client.Client.Client.get_existing_classes"></a>

## get\_existing\_classes

```python
def get_existing_classes(self)
```

Get all the existing classes (only ids) in a database.

<a id="client.Client.Client.insert_document"></a>

## insert\_document

```python
def insert_document(
        self,
        document: Union[dict, List[dict], "Schema",  # noqa:F821
                        "DocumentTemplate",  # noqa:F821
                        List["DocumentTemplate"],  # noqa:F821
                        ],
        graph_type: GraphType = GraphType.INSTANCE,
        full_replace: bool = False,
        commit_msg: Optional[str] = None,
        last_data_version: Optional[str] = None,
        compress: Union[str, int] = 1024,
        raw_json: bool = False) -> None
```

Inserts the specified document(s)

**Arguments**:

- `document` (`dict or list of dict`): Document(s) to be inserted.
- `graph_type` (`GraphType`): Graph type, either GraphType.INSTANCE or GraphType.SCHEMA.
- `full_replace` (`: bool`): If True then the whole graph will be replaced. WARNING: you should also supply the context object as the first element in the list of documents  if using this option.
- `commit_msg` (`str`): Commit message.
- `last_data_version` (`str`): Last version before the update, used to check if the document has been changed unknowingly
- `compress` (`str or int`): If it is an integer, size of the data larger than this (in bytes) will be compress with gzip in the request (assume encoding as UTF-8, 0 = always compress). If it is `never` it will never compress the data.
- `raw_json` (`bool`): Update as raw json

**Raises**:

- `InterfaceError`: if the client does not connect to a database

**Returns**:

`list`: list of ids of the inseted docuemnts

<a id="client.Client.Client.replace_document"></a>

## replace\_document

```python
def replace_document(
        self,
        document: Union[dict, List[dict], "Schema",  # noqa:F821
                        "DocumentTemplate",  # noqa:F821
                        List["DocumentTemplate"],  # noqa:F821
                        ],
        graph_type: GraphType = GraphType.INSTANCE,
        commit_msg: Optional[str] = None,
        last_data_version: Optional[str] = None,
        compress: Union[str, int] = 1024,
        create: bool = False,
        raw_json: bool = False) -> dict
```

Updates the specified document(s)

**Arguments**:

- `document` (`dict or list of dict`): Document(s) to be updated.
- `graph_type` (`GraphType`): Graph type, either GraphType.INSTANCE or GraphType.SCHEMA.
- `commit_msg` (`str`): Commit message.
- `last_data_version` (`str`): Last version before the update, used to check if the document has been changed unknowingly
- `compress` (`str or int`): If it is an integer, size of the data larger than this (in bytes) will be compress with gzip in the request (assume encoding as UTF-8, 0 = always compress). If it is `never` it will never compress the data.
- `create` (`bool`): Create the document if it does not yet exist.
- `raw_json` (`bool`): Update as raw json

**Raises**:

- `InterfaceError`: if the client does not connect to a database

<a id="client.Client.Client.update_document"></a>

## update\_document

```python
def update_document(
        self,
        document: Union[dict, List[dict], "Schema",  # noqa:F821
                        "DocumentTemplate",  # noqa:F821
                        List["DocumentTemplate"],  # noqa:F821
                        ],
        graph_type: GraphType = GraphType.INSTANCE,
        commit_msg: Optional[str] = None,
        last_data_version: Optional[str] = None,
        compress: Union[str, int] = 1024) -> None
```

Updates the specified document(s). Add the document if not existed.

**Arguments**:

- `document` (`dict or list of dict`): Document(s) to be updated.
- `graph_type` (`GraphType`): Graph type, either GraphType.INSTANCE or GraphType.SCHEMA.
- `commit_msg` (`str`): Commit message.
- `last_data_version` (`str`): Last version before the update, used to check if the document has been changed unknowingly
- `compress` (`str or int`): If it is an integer, size of the data larger than this (in bytes) will be compress with gzip in the request (assume encoding as UTF-8, 0 = always compress). If it is `never` it will never compress the data.

**Raises**:

- `InterfaceError`: if the client does not connect to a database

<a id="client.Client.Client.delete_document"></a>

## delete\_document

```python
def delete_document(self,
                    document: Union[str, list, dict, Iterable],
                    graph_type: GraphType = GraphType.INSTANCE,
                    commit_msg: Optional[str] = None,
                    last_data_version: Optional[str] = None) -> None
```

Delete the specified document(s)

**Arguments**:

- `document` (`str or list of str`): Document(s) (as dictionary or DocumentTemplate objects) or id(s) of document(s) to be updated.
- `graph_type` (`GraphType`): Graph type, either GraphType.INSTANCE or GraphType.SCHEMA.
- `commit_msg` (`str`): Commit message.
- `last_data_version` (`str`): Last version before the update, used to check if the document has been changed unknowingly

**Raises**:

- `InterfaceError`: if the client does not connect to a database

<a id="client.Client.Client.has_doc"></a>

## has\_doc

```python
def has_doc(self,
            doc_id: str,
            graph_type: GraphType = GraphType.INSTANCE) -> bool
```

Check if a certain document exist in a database

**Arguments**:

- `doc_id` (`str`): Id of document to be checked.
- `graph_type` (`GraphType`): Graph type, either GraphType.INSTANCE or GraphType.SCHEMA.

**Raises**:

- `InterfaceError`: if the client does not connect to a database

**Returns**:

`Bool`: if the document exist

<a id="client.Client.Client.get_class_frame"></a>

## get\_class\_frame

```python
def get_class_frame(self, class_name)
```

Get the frame of the class of class_name. Provide information about all the avaliable properties of that class.

**Arguments**:

- `class_name` (`str`): Name of the class

**Returns**:

`dict`: Dictionary containing information

<a id="client.Client.Client.commit"></a>

## commit

```python
def commit(self)
```

Not implementated: open transactions currently not suportted. Please check back later.

<a id="client.Client.Client.query"></a>

## query

```python
def query(self,
          woql_query: Union[dict, WOQLQuery],
          commit_msg: Optional[str] = None,
          get_data_version: bool = False,
          last_data_version: Optional[str] = None) -> Union[dict, str]
```

Updates the contents of the specified graph with the triples encoded in turtle format Replaces the entire graph contents

**Arguments**:

- `woql_query` (`dict or WOQLQuery object`): A woql query as an object or dict
- `commit_mg` (`str`): A message that will be written to the commit log to describe the change
- `get_data_version` (`bool`): If the data version of the query result(s) should be obtained. If True, the method return the result and the version as a tuple.
- `last_data_version` (`str`): Last version before the update, used to check if the document has been changed unknowingly
- `file_dict` (`**deprecated**`): File dictionary to be associated with post name => filename, for multipart POST

**Raises**:

- `InterfaceError`: if the client does not connect to a database

**Examples**:

```python
>>> Client(server="http://localhost:6363").query(woql, "updating graph")
```

**Returns**:

`dict`: 

<a id="client.Client.Client.create_branch"></a>

## create\_branch

```python
def create_branch(self, new_branch_id: str, empty: bool = False) -> None
```

Create a branch starting from the current branch.

**Arguments**:

- `new_branch_id` (`str`): New branch identifier.
- `empty` (`bool`): Create an empty branch if true (no starting commit)

**Raises**:

- `InterfaceError`: if the client does not connect to a database

<a id="client.Client.Client.delete_branch"></a>

## delete\_branch

```python
def delete_branch(self, branch_id: str) -> None
```

Delete a branch

**Arguments**:

- `branch_id` (`str`): Branch to delete

**Raises**:

- `InterfaceError`: if the client does not connect to a database

<a id="client.Client.Client.pull"></a>

## pull

```python
def pull(self,
         remote: str = "origin",
         remote_branch: Optional[str] = None,
         message: Optional[str] = None,
         author: Optional[str] = None) -> dict
```

Pull updates from a remote repository to the current database.

**Arguments**:

- `remote` (`str`): remote to pull from, default "origin"
- `remote_branch` (`str`): remote branch to pull from, default to be your current barnch
- `message` (`str`): optional commit message
- `author` (`str`): option to overide the author of the operation

**Raises**:

- `InterfaceError`: if the client does not connect to a database

**Examples**:

```python
>>> client = Client("http://127.0.0.1:6363/")
>>> client.pull()
```

**Returns**:

`dict`: 

<a id="client.Client.Client.fetch"></a>

## fetch

```python
def fetch(self, remote_id: str) -> dict
```

Fatch the brach from a remote

**Arguments**:

- `remote_id` (`str`): id of the remote

**Raises**:

- `InterfaceError`: if the client does not connect to a database

<a id="client.Client.Client.push"></a>

## push

```python
def push(self,
         remote: str = "origin",
         remote_branch: Optional[str] = None,
         message: Optional[str] = None,
         author: Optional[str] = None) -> dict
```

Push changes from a branch to a remote repo

**Arguments**:

- `remote` (`str`): remote to push to, default "origin"
- `remote_branch` (`str`): remote branch to push to, default to be your current barnch
- `message` (`str`): optional commit message
- `author` (`str`): option to overide the author of the operation

**Raises**:

- `InterfaceError`: if the client does not connect to a database

**Examples**:

```python
>>> Client(server="http://localhost:6363").push(remote="origin", remote_branch = "main", author = "admin", message = "commit message"})
```

**Returns**:

`dict`: 

<a id="client.Client.Client.rebase"></a>

## rebase

```python
def rebase(self,
           branch: Optional[str] = None,
           commit: Optional[str] = None,
           rebase_source: Optional[str] = None,
           message: Optional[str] = None,
           author: Optional[str] = None) -> dict
```

Rebase the current branch onto the specified remote branch. Need to specify one of 'branch','commit' or the 'rebase_source'.

**Arguments**:

- `branch` (`str`): the branch for the rebase
- `rebase_source` (`str`): the source branch for the rebase
- `message` (`str`): the commit message
- `author` (`str`): the commit author

**Raises**:

- `InterfaceError`: if the client does not connect to a database

**Examples**:

```python
>>> client = Client("http://127.0.0.1:6363/")
>>> client.rebase("the_branch")
```

**Returns**:

`dict`: 

<a id="client.Client.Client.reset"></a>

## reset

```python
def reset(self,
          commit: Optional[str] = None,
          soft: bool = False,
          use_path: bool = False) -> None
```

Reset the current branch HEAD to the specified commit path. If `soft` is not True, it will be a hard reset, meaning reset to that commit in the backend and newer commit will be wipped out. If `soft` is True, the client will only reference to that commit and can be reset to the newest commit when done.

**Arguments**:

- `commit` (`string`): Commit id or path to the commit (if use_path is True), for instance '234980523ffaf93' or 'admin/database/local/commit/234980523ffaf93'. If not provided, it will reset to the newest commit (useful when need to go back after a soft reset).
- `soft` (`bool`): Flag indicating if the reset if soft, that is referencing to a previous commit instead of resetting to a previous commit in the backend and wipping newer commits.
- `use_path` (`bool`): Wheather or not the commit given is an id or path. Default using id and use_path is False.

**Raises**:

- `InterfaceError`: if the client does not connect to a database

**Examples**:

```python
>>> client = Client("http://127.0.0.1:6363/")
>>> client.reset('234980523ffaf93')
>>> client.reset('admin/database/local/commit/234980523ffaf93', use_path=True)
```

<a id="client.Client.Client.optimize"></a>

## optimize

```python
def optimize(self, path: str) -> None
```

Optimize the specified path.

**Arguments**:

- `path` (`string`): Path to optimize, for instance admin/database/_meta for the repo graph.

**Raises**:

- `InterfaceError`: if the client does not connect to a database

**Examples**:

```python
>>> client = Client("http://127.0.0.1:6363/")
>>> client.optimize('admin/database') # optimise database branch (here main)
>>> client.optimize('admin/database/_meta') # optimise the repository graph (actually creates a squashed flat layer)
>>> client.optimize('admin/database/local/_commits') # commit graph is optimised
```

<a id="client.Client.Client.squash"></a>

## squash

```python
def squash(self,
           message: Optional[str] = None,
           author: Optional[str] = None,
           reset: bool = False) -> str
```

Squash the current branch HEAD into a commit

**Arguments**:

- `message` (`string`): Message for the newly created squash commit
- `author` (`string`): Author of the commit
- `reset` (`bool`): Perform reset after squash

**Raises**:

- `InterfaceError`: if the client does not connect to a database

**Examples**:

```python
>>> client = Client("http://127.0.0.1:6363/")
>>> client.connect(user="admin", key="root", team="admin", db="some_db")
>>> client.squash('This is a squash commit message!')
```

**Returns**:

`str`: commit id to be reset

<a id="client.Client.Client.apply"></a>

## apply

```python
def apply(self,
          before_version,
          after_version,
          branch=None,
          message=None,
          author=None)
```

Diff two different commits and apply changes on branch

**Arguments**:

- `before_version` (`string`): Before branch/commit to compare
- `after_object` (`string`): After branch/commit to compare
- `branch` (`string`): Branch to apply to. Optional.

<a id="client.Client.Client.diff_object"></a>

## diff\_object

```python
def diff_object(self, before_object, after_object)
```

Diff two different objects.

**Arguments**:

- `before_object` (`string`): Before object to compare
- `after_object` (`string`): After object to compare

<a id="client.Client.Client.diff_version"></a>

## diff\_version

```python
def diff_version(self, before_version, after_version)
```

Diff two different versions. Can either be a branch or a commit

**Arguments**:

- `before_version` (`string`): Commit or branch of the before version to compare
- `after_version` (`string`): Commit or branch of the after version to compare

<a id="client.Client.Client.diff"></a>

## diff

```python
def diff(
        self,
        before: Union[str, dict, List[dict], "Schema",  # noqa:F821
                      "DocumentTemplate",  # noqa:F821
                      List["DocumentTemplate"],  # noqa:F821
                      ],
        after: Union[str, dict, List[dict], "Schema",  # noqa:F821
                     "DocumentTemplate",  # noqa:F821
                     List["DocumentTemplate"],  # noqa:F821
                     ],
        document_id: Union[str, None] = None)
```

DEPRECATED

Perform diff on 2 set of document(s), result in a Patch object.

Do not connect when using public API.

**Examples**:

```python
>>> client = Client("http://127.0.0.1:6363/")
>>> client.connect(user="admin", key="root", team="admin", db="some_db")
>>> result = client.diff({ "@id" : "Person/Jane", "@type" : "Person", "name" : "Jane"}, { "@id" : "Person/Jane", "@type" : "Person", "name" : "Janine"})
>>> result.to_json = '{ "name" : { "@op" : "SwapValue", "@before" : "Jane", "@after": "Janine" }}'
```

**Returns**:

`obj`: Patch object

<a id="client.Client.Client.patch"></a>

## patch

```python
def patch(
        self,
        before: Union[dict, List[dict], "Schema",  # noqa:F821
                      "DocumentTemplate",  # noqa:F821
                      List["DocumentTemplate"],  # noqa:F821
                      ],
        patch: Patch)
```

Apply the patch object to the before object and return an after object. Note that this change does not commit changes to the graph.

Do not connect when using public API.

**Examples**:

```python
>>> client = Client("http://127.0.0.1:6363/")
>>> client.connect(user="admin", key="root", team="admin", db="some_db")
>>> patch_obj = Patch(json='{"name" : { "@op" : "ValueSwap", "@before" : "Jane", "@after": "Janine" }}')
>>> result = client.patch({ "@id" : "Person/Jane", "@type" : Person", "name" : "Jane"}, patch_obj)
>>> print(result)
```

**Returns**:

`dict`: After object

<a id="client.Client.Client.clonedb"></a>

## clonedb

```python
def clonedb(self,
            clone_source: str,
            newid: str,
            description: Optional[str] = None) -> None
```

Clone a remote repository and create a local copy.

**Arguments**:

- `clone_source` (`str`): The source url of the repo to be cloned.
- `newid` (`str`): Identifier of the new repository to create.
- `Description` (`str`): Optional description about the cloned database.

**Raises**:

- `InterfaceError`: if the client does not connect to a database

**Examples**:

```python
>>> client = Client("http://127.0.0.1:6363/")
>>> client.clonedb("http://terminusdb.com/some_user/test_db", "my_test_db")
```

<a id="client.Client.Client.create_organization"></a>

## create\_organization

```python
def create_organization(self, org: str) -> Optional[dict]
```

Add a new organization

**Arguments**:

- `org` (`str`): The id of the organization

**Raises**:

- `InterfaceError`: if the client does not connect to a server

**Returns**:

`dict or None if failed`: 

<a id="client.Client.Client.get_organization_users"></a>

## get\_organization\_users

```python
def get_organization_users(self, org: str) -> Optional[dict]
```

Returns a list of users in an organization.

**Arguments**:

- `org` (`str`): None

**Raises**:

- `InterfaceError`: if the client does not connect to a server

**Returns**:

`dict or None if not found`: 

<a id="client.Client.Client.get_organization_user"></a>

## get\_organization\_user

```python
def get_organization_user(self, org: str, username: str) -> Optional[dict]
```

Returns user info related to an organization.

**Arguments**:

- `org` (`str`): None
- `username` (`str`): None

**Raises**:

- `InterfaceError`: if the client does not connect to a server

**Returns**:

`dict or None if not found`: 

<a id="client.Client.Client.get_organization_user_databases"></a>

## get\_organization\_user\_databases

```python
def get_organization_user_databases(self, org: str,
                                    username: str) -> Optional[dict]
```

Returns the databases available to a user which are inside an organization

**Arguments**:

- `org` (`str`): None
- `username` (`str`): None

**Raises**:

- `InterfaceError`: if the client does not connect to a server

**Returns**:

`dict or None if not found`: 

<a id="client.Client.Client.get_organizations"></a>

## get\_organizations

```python
def get_organizations(self) -> Optional[dict]
```

Returns a list of organizations in the database.

**Raises**:

- `InterfaceError`: if the client does not connect to a server

**Returns**:

`dict or None if not found`: 

<a id="client.Client.Client.get_organization"></a>

## get\_organization

```python
def get_organization(self, org: str) -> Optional[dict]
```

Returns a specific organization

**Arguments**:

- `org` (`str`): The id of the organization

**Raises**:

- `InterfaceError`: if the client does not connect to a server

**Returns**:

`dict or None if not found`: 

<a id="client.Client.Client.delete_organization"></a>

## delete\_organization

```python
def delete_organization(self, org: str) -> Optional[dict]
```

Deletes a specific organization

**Arguments**:

- `org` (`str`): The id of the organization

**Raises**:

- `InterfaceError`: if the client does not connect to a server

**Returns**:

`dict or None if request failed`: 

<a id="client.Client.Client.change_capabilities"></a>

## change\_capabilities

```python
def change_capabilities(self, capability_change: dict) -> Optional[dict]
```

Change the capabilities of a certain user

Parameters
----------
capability_change: dict
Dict for the capability change request.

**Example**:

  {
- `"operation"` - "revoke",
- `"scope"` - "UserDatabase/f5a0ef94469b32e1aee321678436c7dfd5a96d9c476672b3282ae89a45b5200e",
- `"user"` - "User/admin",
- `"roles"` - [
  "Role/consumer",
  "Role/admin"
  ]
  }
  
  Raises
  ------
  InterfaceError
  if the client does not connect to a server
  
  Returns
  -------
  dict or None if request failed

<a id="client.Client.Client.add_role"></a>

## add\_role

```python
def add_role(self, role: dict) -> Optional[dict]
```

Add a new role

**Arguments**:

- `role` (`dict`): The role dict

**Raises**:

- `InterfaceError`: if the client does not connect to a server

**Examples**:

```python
>>> client = Client("http://127.0.0.1:6363")
>>> client.connect(key="root", team="admin", user="admin", db="example_db")
>>> role = {
```
```python
>>> client.add_role(role)
```

**Returns**:

`dict or None if failed`: 

<a id="client.Client.Client.change_role"></a>

## change\_role

```python
def change_role(self, role: dict) -> Optional[dict]
```

Change role actions for a particular role

**Arguments**:

- `role` (`dict`): Role dict

**Raises**:

- `InterfaceError`: if the client does not connect to a server

**Examples**:

```python
>>> client = Client("http://127.0.0.1:6363")
>>> client.connect(key="root", team="admin", user="admin", db="example_db")
>>> role = {
```
```python
>>> client.change_role(role)
```

**Returns**:

`dict or None if failed`: 

<a id="client.Client.Client.get_available_roles"></a>

## get\_available\_roles

```python
def get_available_roles(self) -> Optional[dict]
```

Get the available roles for the current authenticated user

**Raises**:

- `InterfaceError`: if the client does not connect to a server

**Returns**:

`dict or None if failed`: 

<a id="client.Client.Client.add_user"></a>

## add\_user

```python
def add_user(self, username: str, password: str) -> Optional[dict]
```

Add a new user

**Arguments**:

- `username` (`str`): The username of the user
- `password` (`str`): The user's password

**Raises**:

- `InterfaceError`: if the client does not connect to a server

**Returns**:

`dict or None if failed`: 

<a id="client.Client.Client.get_user"></a>

## get\_user

```python
def get_user(self, username: str) -> Optional[dict]
```

Get a user

**Arguments**:

- `username` (`str`): The username of the user

**Raises**:

- `InterfaceError`: if the client does not connect to a server

**Returns**:

`dict or None if failed`: 

<a id="client.Client.Client.get_users"></a>

## get\_users

```python
def get_users(self) -> Optional[dict]
```

Get all users

**Raises**:

- `InterfaceError`: if the client does not connect to a server

**Returns**:

`dict or None if failed`: 

<a id="client.Client.Client.delete_user"></a>

## delete\_user

```python
def delete_user(self, username: str) -> Optional[dict]
```

Delete a user

**Arguments**:

- `username` (`str`): The username of the user

**Raises**:

- `InterfaceError`: if the client does not connect to a server

**Returns**:

`dict or None if failed`: 

<a id="client.Client.Client.change_user_password"></a>

## change\_user\_password

```python
def change_user_password(self, username: str, password: str) -> Optional[dict]
```

Change user's password

**Arguments**:

- `username` (`str`): The username of the user
- `password` (`str`): The new password

**Raises**:

- `InterfaceError`: if the client does not connect to a server

**Returns**:

`dict or None if failed`: 

<a id="client.Client.Client.get_database"></a>

## get\_database

```python
def get_database(self,
                 dbid: str,
                 team: Optional[str] = None) -> Optional[dict]
```

Returns metadata (id, organization, label, comment) about the requested database

**Arguments**:

- `dbid` (`str`): The id of the database
- `team` (`str`): The organization of the database (default self.team)

**Raises**:

- `InterfaceError`: if the client does not connect to a server
- `DatabaseError`: if the database can't be found

**Returns**:

`dict`: 

<a id="client.Client.Client.has_database"></a>

## has\_database

```python
def has_database(self, dbid: str, team: Optional[str] = None) -> bool
```

Check whether a database exists

**Arguments**:

- `dbid` (`str`): The id of the database
- `team` (`str`): The organization of the database (default self.team)

**Raises**:

- `InterfaceError`: if the client does not connect to a server

**Returns**:

`True or False if not found`: 

<a id="client.Client.Client.get_databases"></a>

## get\_databases

```python
def get_databases(self) -> List[dict]
```

Returns a list of database metadata records for all databases the user has access to

**Raises**:

- `InterfaceError`: if the client does not connect to a server

**Returns**:

`list of dicts`: 

<a id="client.Client.Client.list_databases"></a>

## list\_databases

```python
def list_databases(self) -> List[Dict]
```

Returns a list of database ids for all databases the user has access to

**Raises**:

- `InterfaceError`: if the client does not connect to a server

**Returns**:

`list of dicts`: 

