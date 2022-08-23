# terminusdb_client.client package

## Submodules

## terminusdb_client.client.Client module

Client.py
Client is the Python public API for TerminusDB


## class terminusdb_client.client.Client.JWTAuth(token)
**Bases:** `AuthBase`

Class for JWT Authentication in requests


### __init__(token)

## class terminusdb_client.client.Client.APITokenAuth(token)
**Bases:** `AuthBase`

Class for API Token Authentication in requests


### __init__(token)

## class terminusdb_client.client.Client.ResourceType(value)
**Bases:** `Enum`

Enum for the different TerminusDB resources


### DB(_ = '

### META(_ = '

### REPO(_ = '

### COMMITS(_ = '

### REF(_ = '

### BRANCH(_ = '

## class terminusdb_client.client.Client.Patch(json=None)
**Bases:** `object`


### __init__(json=None)


> **Property:**  update()


> **Property:**  before()

### from_json(json_str)

### to_json()

### copy()

## class terminusdb_client.client.Client.Client(server_url, user_agent='terminusdb-client-python/10.1.4', \*\*kwargs)
**Bases:** `object`

Client for TerminusDB server.


### server_url()
URL of the server that this client connected.


**Type**

`str`



### api()
API endpoint for this client.


**Type**

`str`



### team()
Team that this client is using. “admin” for local dbs.


**Type**

`str`



### db()
Database that this client is connected to.


**Type**

`str`



### user()
TerminiusDB user that this client is using. “admin” for local dbs.


**Type**

`str`



### branch()
Branch of the database that this client is connected to. Default to “main”.


**Type**

`str`



### ref()
Ref setting for the client. Default to None.


**Type**

`str`, None



### repo()
Repo identifier of the database that this client is connected to. Default to “local”.


**Type**

`str`



### from_json(json_str)

### to_json()

### __init__(server_url, user_agent='terminusdb-client-python/10.1.4', \*\*kwargs)
The WOQLClient constructor.


**Parameter/s**


* **server_url** (``str``) – URL of the server that this client will connect to.


* **user_agent** (`optional`, ``str``) – User agent header when making requests. Defaults to terminusdb-client-python with the version appended.


* **\*\*kwargs** – Extra configuration options




> **Property:**  team()


> **Property:**  db()


> **Property:**  user()


> **Property:**  branch()


> **Property:**  repo()


> **Property:**  ref()

### connect(team='admin', db=None, remote_auth=None, use_token=False, jwt_token=None, api_token=None, key='root', user='admin', branch='main', ref=None, repo='local', \*\*kwargs)
Connect to a Terminus server at the given URI with an API key.

Stores the connection settings and necessary meta-data for the connected server. You need to connect before most database operations.


**Parameter/s**


* **team** (``str``) – Name of the team, default to be “admin”


* **db** (`optional`, ``str``) – Name of the database connected


* **remote_auth** (`optional`, ``str``) – Remote Auth setting


* **key** (`optional`, ``str``) – API key for connecting, default to be “root”


* **user** (`optional`, ``str``) – Name of the user, default to be “admin”


* **use_token** (`bool`) – Use token to connect. If both jwt_token and api_token is not provided (None), then it will use the ENV variable TERMINUSDB_ACCESS_TOKEN to connect as the API token


* **jwt_token** (`optional`, ``str``) – The Bearer JWT token to connect. Default to be None.


* **api_token** (`optional`, `strs`) – The API token to connect. Default to be None.


* **branch** (`optional`, ``str``) – Branch to be connected, default to be “main”


* **ref** (`optional`, ``str``) – Ref setting


* **repo** (`optional`, ``str``) – Local or remote repo, default to be “local”


* **\*\*kwargs** – Extra configuration options.


**Example/s**

```python
client = Client("http://127.0.0.1:6363")
client.connect(key="root", team="admin", user="admin", db="example_db")
```


**Return type/s**

`None`



### close()
Undo connect and close the connection.

The connection will be unusable from this point forward; an Error (or subclass) exception will be raised if any operation is attempted with the connection, unless connect is call again.


**Return type/s**

`None`



### log(team=None, db=None, start=0, count=-1)
Get commit history of a database
:type team: `Optional`[``str``]
:param team: The team from which the database is. Defaults to the class property.
:type team: `str`, optional
:type db: `Optional`[``str``]
:param db: The database. Defaults to the class property.
:type db: `str`, optional
:type start: `int`
:param start: Commit index to start from. Defaults to 0.
:type start: int, optional
:type count: `int`
:param count: Amount of commits to get. Defaults to -1 which gets all.
:type count: int, optional


**Returns**

List of the following commit objects:

{

“@id”:”InitialCommit/hpl18q42dbnab4vzq8me4bg1xn8p2a0”,
“@type”:”InitialCommit”,
“author”:”system”,
“identifier”:”hpl18q42dbnab4vzq8me4bg1xn8p2a0”,
“message”:”create initial schema”,
“schema”:”layer_data:Layer_4234adfe377fa9563a17ad764ac37f5dcb14de13668ea725ef0748248229a91b”,
“timestamp”:1660919664.9129035

}




**Return type/s**

list



### get_commit_history(max_history=500)
Get the whole commit history.
Commit history - Commit id, author of the commit, commit message and the commit time, in the current branch from the current commit, ordered backwards in time, will be returned in a dictionary in the follow format:
{“commit_id”:
{“author”: “commit_author”,
“message”: “commit_message”,
“timestamp: <datetime object of the timestamp>” }
}


**Parameter/s**

**max_history** (`int`, `optional`) – maximum number of commit that would return, counting backwards from your current commit. Default is set to 500. It needs to be nop-negative, if input is 0 it will still give the last commit.


**Example/s**

```python
from terminusdb_client import Client
client = Client("http://127.0.0.1:6363"
client.connect(db="bank_balance_example")
client.get_commit_history()
[{'commit': 's90wike9v5xibmrb661emxjs8k7ynwc', 'author': 'admin', 'message': 'Adding Jane', 'timestamp': datetime.da
tetime(2020, 9, 3, 15, 29, 34)}, {'commit': '1qhge8qlodajx93ovj67kvkrkxsw3pg', 'author': 'gavin@terminusdb.com', 'm
essage': 'Adding Jim', 'timestamp': datetime.datetime(2020, 9, 3, 15, 29, 33)}, {'commit': 'rciy1rfu5foj67ch00ow6f6n
njjxe3i', 'author': 'gavin@terminusdb.com', 'message': 'Update mike', 'timestamp': datetime.datetime(2020, 9, 3, 15,
29, 33)}, {'commit': 'n4d86u8juzx852r2ekrega5hl838ovh', 'author': 'gavin@terminusdb.com', 'message': 'Add mike', '
timestamp': datetime.datetime(2020, 9, 3, 15, 29, 33)}, {'commit': '1vk2i8k8xce26p9jpi4zmq1h5vdqyuj', 'author': 'gav
in@terminusdb.com', 'message': 'Label for balance was wrong', 'timestamp': datetime.datetime(2020, 9, 3, 15, 29, 33)
}, {'commit': '9si4na9zv2qol9b189y92fia7ac3hbg', 'author': 'gavin@terminusdb.com', 'message': 'Adding bank account
object to schema', 'timestamp': datetime.datetime(2020, 9, 3, 15, 29, 33)}, {'commit': '9egc4h0m36l5rbq1alr1fki6jbfu
kuv', 'author': 'TerminusDB', 'message': 'internal system operation', 'timstamp': datetime.datetime(2020, 9, 3, 15,
29, 33)}]
```


**Return type/s**

list



### get_all_branches(get_data_version=False)
Get all the branches available in the database.


### rollback(steps=1)
Curently not implementated. Please check back later.


**Raises**

**NotImplementedError** – Since TerminusDB currently does not support open transactions. This method is not applicable to it’s usage. To reset commit head, use Client.reset



**Return type/s**

`None`



### copy()
Create a deep copy of this client.


**Returns**

The copied client instance.



**Return type/s**

Client


**Example/s**

```python
client = Client("http://127.0.0.1:6363/")
clone = client.copy()
assert client is not clone
```


### set_db(dbid, team=None)
Set the connection to another database. This will reset the connection.


**Parameter/s**


* **dbid** (``str``) – Database identifer to set in the config.


* **team** (``str``) – Team identifer to set in the config. If not passed in, it will use the current one.



**Returns**

The current database identifier.



**Return type/s**

`str`


**Example/s**

```python
client = Client("http://127.0.0.1:6363")
client.set_db("database1")
'database1'
```


### resource(ttype, val=None)
Create a resource identifier string based on the current config.


**Parameter/s**


* **ttype** (*ResourceType*) – Type of resource.


* **val** (``str``, `optional`) – Branch or commit identifier.



**Returns**

The constructed resource string.



**Return type/s**

`str`


**Example/s**

```python
client = Client("http://127.0.0.1:6363")
client.resource(ResourceType.DB)
'<team>/<db>/'
client.resource(ResourceType.META)
'<team>/<db>/_meta'
client.resource(ResourceType.COMMITS)
'<team>/<db>/<repo>/_commits'
client.resource(ResourceType.REF, "<reference>")
'<team>/<db>/<repo>/commit/<reference>'
client.resource(ResourceType.BRANCH, "<branch>")
'<team>/<db>/<repo>/branch/<branch>'
```


### create_database(dbid, team=None, label=None, description=None, prefixes=None, include_schema=True)
Create a TerminusDB database by posting
a terminus:Database document to the Terminus Server.


**Parameter/s**


* **dbid** (``str``) – Unique identifier of the database.


* **team** (``str``, `optional`) – ID of the Team in which to create the DB (defaults to ‘admin’)


* **label** (``str``, `optional`) – Database name.


* **description** (``str``, `optional`) – Database description.


* **prefixes** (*dict*, `optional`) – Optional dict containing `"@base"` and `"@schema"` keys.

@base (`str`)

IRI to use when `doc:` prefixes are expanded. Defaults to `terminusdb:///data`.

@schema (`str`)

IRI to use when `scm:` prefixes are expanded. Defaults to `terminusdb:///schema`.



* **include_schema** (`bool`) – If `True`, a main schema graph will be created, otherwise only a main instance graph will be created.



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server


**Example/s**

```python
client = Client("http://127.0.0.1:6363/")
client.create_database("someDB", "admin", "Database Label", "My Description")
```


**Return type/s**

`None`



### delete_database(dbid=None, team=None, force=False)
Delete a TerminusDB database.

If `team` is provided, then the team in the config will be updated
and the new value will be used in future requests to the server.


**Parameter/s**


* **dbid** (``str``) – ID of the database to delete


* **team** (``str``, `optional`) – the team in which the database resides (defaults to “admin”)


* **force** (`bool`) – 



**Raises**


* **UserWarning** – If the value of dbid is None.


* [**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server.


**Example/s**

```python
client = Client("http://127.0.0.1:6363/")
client.delete_database("<database>", "<team>")
```


**Return type/s**

`None`



### get_triples(graph_type)
Retrieves the contents of the specified graph as triples encoded in turtle format


**Parameter/s**

**graph_type** (``str``) – Graph type, either “instance” or “schema”.



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database



**Return type/s**

`str`



### update_triples(graph_type, turtle, commit_msg)
Updates the contents of the specified graph with the triples encoded in turtle format Replaces the entire graph contents


**Parameter/s**


* **graph_type** (``str``) – Graph type, either “instance” or “schema”.


* **turtle** – Valid set of triples in Turtle format.


* **commit_msg** (``str``) – Commit message.



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database



**Return type/s**

`None`



### insert_triples(graph_type, turtle, commit_msg=None)
Inserts into the specified graph with the triples encoded in turtle format.


**Parameter/s**


* **graph_type** (``str``) – Graph type, either “instance” or “schema”.


* **turtle** – Valid set of triples in Turtle format.


* **commit_msg** (``str``) – Commit message.



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database



**Return type/s**

`None`



### query_document(document_template, graph_type='instance', skip=0, count=None, as_list=False, get_data_version=False, \*\*kwargs)
Retrieves all documents that match a given document template


**Parameter/s**


* **document_template** (*dict*) – Template for the document that is being retrived


* **graph_type** (``str``, `optional`) – Graph type, either “instance” or “schema”.


* **as_list** (`bool`) – If the result returned as list rather than an iterator.


* **get_data_version** (`bool`) – If the data version of the document(s) should be obtained. If True, the method return the result and the version as a tuple.



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database



**Return type/s**

Iterable



### get_document(iri_id, graph_type='instance', get_data_version=False, \*\*kwargs)
Retrieves the document of the iri_id


**Parameter/s**


* **iri_id** (``str``) – Iri id for the docuemnt that is retriving


* **graph_type** (``str``, `optional`) – Graph type, either “instance” or “schema”.


* **get_data_version** (`bool`) – If the data version of the document(s) should be obtained. If True, the method return the result and the version as a tuple.


* **kwargs** – Additional boolean flags for retriving. Currently avaliable: “prefixed”, “minimized”, “unfold”



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database



**Return type/s**

dict



### get_documents_by_type(doc_type, graph_type='instance', skip=0, count=None, as_list=False, get_data_version=False, \*\*kwargs)
Retrieves the documents by type


**Parameter/s**


* **doc_type** (``str``) – Specific type for the docuemnts that is retriving


* **graph_type** (``str``, `optional`) – Graph type, either “instance” or “schema”.


* **skip** (`int`) – The starting posiion of the returning results, default to be 0


* **count** (`int`* or *`none`) – The maximum number of returned result, if None (default) it will return all of the avalible result.


* **as_list** (`bool`) – If the result returned as list rather than an iterator.


* **get_data_version** (`bool`) – If the version of the document(s) should be obtained. If True, the method return the result and the version as a tuple.


* **kwargs** – Additional boolean flags for retriving. Currently avaliable: “prefixed”, “unfold”



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database



**Returns**

Stream of dictionaries



**Return type/s**

iterable



### get_all_documents(graph_type='instance', skip=0, count=None, as_list=False, get_data_version=False, \*\*kwargs)
Retrieves all avalibale the documents


**Parameter/s**


* **graph_type** (``str``, `optional`) – Graph type, either “instance” or “schema”.


* **skip** (`int`) – The starting posiion of the returning results, default to be 0


* **count** (`int`* or *`none`) – The maximum number of returned result, if None (default) it will return all of the avalible result.


* **as_list** (`bool`) – If the result returned as list rather than an iterator.


* **get_data_version** (`bool`) – If the version of the document(s) should be obtained. If True, the method return the result and the version as a tuple.


* **kwargs** – Additional boolean flags for retriving. Currently avaliable: “prefixed”, “unfold”



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database



**Returns**

Stream of dictionaries



**Return type/s**

iterable



### get_existing_classes()
Get all the existing classes (only ids) in a database.


### insert_document(document, graph_type='instance', full_replace=False, commit_msg=None, last_data_version=None, compress=1024, raw_json=False)
Inserts the specified document(s)


**Parameter/s**


* **document** (*dict** or **list of dict*) – Document(s) to be inserted.


* **graph_type** (``str``) – Graph type, either “inference”, “instance” or “schema”.


* **full_replace:** – bool: If True then the whole graph will be replaced. WARNING: you should also supply the context object as the first element in the list of documents  if using this option.


* **commit_msg** (``str``) – Commit message.


* **last_data_version** (``str``) – Last version before the update, used to check if the document has been changed unknowingly


* **compress** (``str``* or *`int`) – If it is an integer, size of the data larger than this (in bytes) will be compress with gzip in the request (assume encoding as UTF-8, 0 = always compress). If it is never it will never compress the data.


* **raw_json** (`bool`) – Update as raw json



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database



**Returns**

list of ids of the inseted docuemnts



**Return type/s**

list



### replace_document(document, graph_type='instance', commit_msg=None, last_data_version=None, compress=1024, create=False, raw_json=False)
Updates the specified document(s)


**Parameter/s**


* **document** (*dict** or **list of dict*) – Document(s) to be updated.


* **graph_type** (``str``) – Graph type, either “instance” or “schema”.


* **commit_msg** (``str``) – Commit message.


* **last_data_version** (``str``) – Last version before the update, used to check if the document has been changed unknowingly


* **compress** (``str``* or *`int`) – If it is an integer, size of the data larger than this (in bytes) will be compress with gzip in the request (assume encoding as UTF-8, 0 = always compress). If it is never it will never compress the data.


* **create** (`bool`) – Create the document if it does not yet exist.


* **raw_json** (`bool`) – Update as raw json



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database



**Return type/s**

`None`



### update_document(document, graph_type='instance', commit_msg=None, last_data_version=None, compress=1024)
Updates the specified document(s). Add the document if not existed.


**Parameter/s**


* **document** (*dict** or **list of dict*) – Document(s) to be updated.


* **graph_type** (``str``) – Graph type, either “instance” or “schema”.


* **commit_msg** (``str``) – Commit message.


* **last_data_version** (``str``) – Last version before the update, used to check if the document has been changed unknowingly


* **compress** (``str``* or *`int`) – If it is an integer, size of the data larger than this (in bytes) will be compress with gzip in the request (assume encoding as UTF-8, 0 = always compress). If it is never it will never compress the data.



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database



**Return type/s**

`None`



### delete_document(document, graph_type='instance', commit_msg=None, last_data_version=None)
Delete the specified document(s)


**Parameter/s**


* **document** (``str``* or **list of `str`*) – Document(s) (as dictionary or DocumentTemplate objects) or id(s) of document(s) to be updated.


* **graph_type** (``str``) – Graph type, either “instance” or “schema”.


* **commit_msg** (``str``) – Commit message.


* **last_data_version** (``str``) – Last version before the update, used to check if the document has been changed unknowingly



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database



**Return type/s**

`None`



### has_doc(doc_id, graph_type='instance')
Check if a certain document exist in a database


**Parameter/s**


* **doc_id** (``str``) – Id of document to be checked.


* **graph_type** (``str``) – Graph type, either “instance” or “schema”.



**Returns**

if the document exist



**Return type/s**

Bool



### get_class_frame(class_name)
Get the frame of the class of class_name. Provide information about all the avaliable properties of that class.


**Parameter/s**

**class_name** (``str``) – Name of the class



**Returns**

Dictionary containing information



**Return type/s**

dict



### commit()
Not implementated: open transactions currently not suportted. Please check back later.


### query(woql_query, commit_msg=None, get_data_version=False, last_data_version=None)
Updates the contents of the specified graph with the triples encoded in turtle format Replaces the entire graph contents


**Parameter/s**


* **woql_query** (*dict** or **WOQLQuery object*) – A woql query as an object or dict


* **commit_mg** (``str``) – A message that will be written to the commit log to describe the change


* **get_data_version** (`bool`) – If the data version of the query result(s) should be obtained. If True, the method return the result and the version as a tuple.


* **last_data_version** (``str``) – Last version before the update, used to check if the document has been changed unknowingly


* **file_dict** (**deprecated**) – File dictionary to be associated with post name => filename, for multipart POST



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database


**Example/s**

```python
Client(server="http://localhost:6363").query(woql, "updating graph")
```


**Return type/s**

dict



### create_branch(new_branch_id, empty=False)
Create a branch starting from the current branch.


**Parameter/s**


* **new_branch_id** (``str``) – New branch identifier.


* **empty** (`bool`) – Create an empty branch if true (no starting commit)



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database



**Return type/s**

`None`



### delete_branch(branch_id)
Delete a branch


**Parameter/s**

**branch_id** (``str``) – Branch to delete



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database



**Return type/s**

`None`



### pull(remote='origin', remote_branch=None, message=None, author=None)
Pull updates from a remote repository to the current database.


**Parameter/s**


* **remote** (``str``) – remote to pull from, default “origin”


* **remote_branch** (``str``, `optional`) – remote branch to pull from, default to be your current barnch


* **message** (``str``, `optional`) – optional commit message


* **author** (``str``, `optional`) – option to overide the author of the operation



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database



**Return type/s**

dict


**Example/s**

```python
client = Client("http://127.0.0.1:6363/")
client.pull()
```


### fetch(remote_id)
Fatch the brach from a remote


**Parameter/s**

**remote_id** (``str``) – id of the remote



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database



**Return type/s**

`dict`



### push(remote='origin', remote_branch=None, message=None, author=None)
Push changes from a branch to a remote repo


**Parameter/s**


* **remote** (``str``) – remote to push to, default “origin”


* **remote_branch** (``str``, `optional`) – remote branch to push to, default to be your current barnch


* **message** (``str``, `optional`) – optional commit message


* **author** (``str``, `optional`) – option to overide the author of the operation



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database


**Example/s**

```python
Client(server="http://localhost:6363").push(remote="origin", remote_branch = "main", author = "admin", message = "commit message"})
```


**Return type/s**

dict



### rebase(branch=None, commit=None, rebase_source=None, message=None, author=None)
Rebase the current branch onto the specified remote branch. Need to specify one of ‘branch’,’commit’ or the ‘rebase_source’.

**Notes**

The “remote” repo can live in the local database.


**Parameter/s**


* **branch** (``str``, `optional`) – the branch for the rebase


* **rebase_source** (``str``, `optional`) – the source branch for the rebase


* **message** (``str``, `optional`) – the commit message


* **author** (``str``, `optional`) – the commit author



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database



**Return type/s**

dict


**Example/s**

```python
client = Client("http://127.0.0.1:6363/")
client.rebase("the_branch")
```


### reset(commit=None, soft=False, use_path=False)
Reset the current branch HEAD to the specified commit path. If soft is not True, it will be a hard reset, meaning reset to that commit in the backend and newer commit will be wipped out. If soft is True, the client will only reference to that commit and can be reset to the newest commit when done.


**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database


**Notes**

The “remote” repo can live in the local database.


**Parameter/s**


* **commit** (*string*) – Commit id or path to the commit (if use_path is True), for instance ‘234980523ffaf93’ or ‘admin/database/local/commit/234980523ffaf93’. If not provided, it will reset to the newest commit (useful when need to go back after a soft reset).


* **soft** (`bool`) – Flag indicating if the reset if soft, that is referencing to a previous commit instead of resetting to a previous commit in the backend and wipping newer commits.


* **use_path** (`bool`) – Wheather or not the commit given is an id or path. Default using id and use_path is False.


**Example/s**

```python
client = Client("http://127.0.0.1:6363/")
client.reset('234980523ffaf93')
client.reset('admin/database/local/commit/234980523ffaf93', use_path=True)
```


**Return type/s**

`None`



### optimize(path)
Optimize the specified path.


**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database


**Notes**

The “remote” repo can live in the local database.


**Parameter/s**

**path** (*string*) – Path to optimize, for instance admin/database/_meta for the repo graph.


**Example/s**

```python
client = Client("http://127.0.0.1:6363/")
client.optimize('admin/database') # optimise database branch (here main)
client.optimize('admin/database/_meta') # optimise the repository graph (actually creates a squashed flat layer)
client.optimize('admin/database/local/_commits') # commit graph is optimised
```


**Return type/s**

`None`



### squash(message=None, author=None, reset=False)
Squash the current branch HEAD into a commit


**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database


**Notes**

The “remote” repo can live in the local database.


**Parameter/s**


* **message** (*string*) – Message for the newly created squash commit


* **author** (*string*) – Author of the commit


* **reset** (`bool`) – Perform reset after squash



**Returns**

commit id to be reset



**Return type/s**

`str`


**Example/s**

```python
client = Client("http://127.0.0.1:6363/")
client.connect(user="admin", key="root", team="admin", db="some_db")
client.squash('This is a squash commit message!')
```


### apply(before_version, after_version, branch=None, message=None, author=None)
Diff two different commits and apply changes on branch


**Parameter/s**


* **before_version** (*string*) – Before branch/commit to compare


* **after_object** (*string*) – After branch/commit to compare


* **branch** (*string*) – Branch to apply to. Optional.



### diff_object(before_object, after_object)
Diff two different objects.


**Parameter/s**


* **before_object** (*string*) – Before object to compare


* **after_object** (*string*) – After object to compare



### diff_version(before_version, after_version)
Diff two different versions. Can either be a branch or a commit


**Parameter/s**


* **before_version** (*string*) – Commit or branch of the before version to compare


* **after_version** (*string*) – Commit or branch of the after version to compare



### diff(before, after, document_id=None)
DEPRECATED

Perform diff on 2 set of document(s), result in a Patch object.

Do not connect when using public API.


**Returns**

Patch object



**Return type/s**

obj


**Example/s**

```python
client = WOQLClient("http://127.0.0.1:6363/")
client.connect(user="admin", key="root", team="admin", db="some_db")
result = client.diff({ "@id" : "Person/Jane", "@type" : "Person", "name" : "Jane"}, { "@id" : "Person/Jane", "@type" : "Person", "name" : "Janine"})
result.to_json = '{ "name" : { "@op" : "SwapValue", "@before" : "Jane", "@after": "Janine" }}'
```


### patch(before, patch)
Apply the patch object to the before object and return an after object. Note that this change does not commit changes to the graph.

Do not connect when using public API.


**Returns**

After object



**Return type/s**

dict


**Example/s**

```python
client = WOQLClient("http://127.0.0.1:6363/")
client.connect(user="admin", key="root", team="admin", db="some_db")
patch_obj = Patch(json='{"name" : { "@op" : "ValueSwap", "@before" : "Jane", "@after": "Janine" }}')
result = client.patch({ "@id" : "Person/Jane", "@type" : Person", "name" : "Jane"}, patch_obj)
print(result)
'{ "@id" : "Person/Jane", "@type" : Person", "name" : "Janine"}'
```


### clonedb(clone_source, newid, description=None)
Clone a remote repository and create a local copy.


**Parameter/s**


* **clone_source** (``str``) – The source url of the repo to be cloned.


* **newid** (``str``) – Identifier of the new repository to create.


* **Description** (``str``, `optional`) – Optional description about the cloned database.



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a database


**Example/s**

```python
client = Client("http://127.0.0.1:6363/")
client.clonedb("http://terminusdb.com/some_user/test_db", "my_test_db")
```


**Return type/s**

`None`



### create_organization(org)
Add a new organization


**Parameter/s**

**org** (``str``) – The id of the organization



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server



**Return type/s**

dict or None if failed



### get_organization_users(org)
Returns a list of users in an organization.


**Parameter/s**

**org** (``str``) – 



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server



**Return type/s**

dict or None if not found



### get_organization_user(org, username)
Returns user info related to an organization.


**Parameter/s**


* **org** (``str``) – 


* **username** (``str``) – 



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server



**Return type/s**

dict or None if not found



### get_organization_user_databases(org, username)
Returns the databases available to a user which are inside an organization


**Parameter/s**


* **org** (``str``) – 


* **username** (``str``) – 



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server



**Return type/s**

dict or None if not found



### get_organizations()
Returns a list of organizations in the database.


**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server



**Return type/s**

dict or None if not found



### get_organization(org)
Returns a specific organization


**Parameter/s**

**org** (``str``) – The id of the organization



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server



**Return type/s**

dict or None if not found



### delete_organization(org)
Deletes a specific organization


**Parameter/s**

**org** (``str``) – The id of the organization



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server



**Return type/s**

dict or None if request failed



### change_capabilities(capability_change)
Change the capabilities of a certain user


**Parameter/s**

**capability_change** (*dict*) – Dict for the capability change request.

Example:
{

> ”operation”: “revoke”,
> “scope”: “UserDatabase/f5a0ef94469b32e1aee321678436c7dfd5a96d9c476672b3282ae89a45b5200e”,
> “user”: “User/admin”,
> “roles”: [

> > > ”Role/consumer”,
> > > “Role/admin”

> > ]

}




**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server



**Return type/s**

dict or None if request failed



### add_role(role)
Add a new role


**Parameter/s**

**role** (*dict*) – The role dict



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server



**Return type/s**

dict or None if failed


**Example/s**

```python
client = Client("http://127.0.0.1:6363")
client.connect(key="root", team="admin", user="admin", db="example_db")
role = {
"name": "Grand Pubah",
"action": [
"branch",
"class_frame",
"clone",
"commit_read_access",
"commit_write_access",
"create_database",
"delete_database",
"fetch",
"instance_read_access",
"instance_write_access",
"manage_capabilities",
"meta_read_access",
"meta_write_access",
"push",
"rebase",
"schema_read_access",
"schema_write_access"
]
}
client.add_role(role)
```


### change_role(role)
Change role actions for a particular role


**Parameter/s**

**role** (*dict*) – Role dict



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server



**Return type/s**

dict or None if failed


**Example/s**

```python
client = Client("http://127.0.0.1:6363")
client.connect(key="root", team="admin", user="admin", db="example_db")
role = {
"name": "Grand Pubah",
"action": [
"branch",
"class_frame",
"clone",
"commit_read_access",
"commit_write_access",
"create_database",
"delete_database",
"fetch",
"instance_read_access",
"instance_write_access",
"manage_capabilities",
"meta_read_access",
"meta_write_access",
"push",
"rebase",
"schema_read_access",
"schema_write_access"
]
}
client.change_role(role)
```


### get_available_roles()
Get the available roles for the current authenticated user


**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server



**Return type/s**

dict or None if failed



### add_user(username, password)
Add a new user


**Parameter/s**


* **username** (``str``) – The username of the user


* **password** (``str``) – The user’s password



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server



**Return type/s**

dict or None if failed



### get_user(username)
Get a user


**Parameter/s**

**username** (``str``) – The username of the user



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server



**Return type/s**

dict or None if failed



### get_users()
Get all users


**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server



**Return type/s**

dict or None if failed



### delete_user(username)
Delete a user


**Parameter/s**

**username** (``str``) – The username of the user



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server



**Return type/s**

dict or None if failed



### change_user_password(username, password)
Change user’s password


**Parameter/s**


* **username** (``str``) – The username of the user


* **password** (``str``) – The new password



**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server



**Return type/s**

dict or None if failed



### get_database(dbid, team=None)
Returns metadata (id, organization, label, comment) about the requested database
:type dbid: ``str``
:param dbid: The id of the database
:type dbid: `str`
:type team: `Optional`[``str``]
:param team: The organization of the database (default self.team)
:type team: `str`


**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server



**Return type/s**

dict or None if not found



### get_databases()
Returns a list of database metadata records for all databases the user has access to


**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server



**Return type/s**

list of dicts



### list_databases()
Returns a list of database ids for all databases the user has access to


**Raises**

[**InterfaceError**](terminusdb_client.md#terminusdb_client.errors.InterfaceError) – if the client does not connect to a server



**Return type/s**

list of dicts


## Module contents

