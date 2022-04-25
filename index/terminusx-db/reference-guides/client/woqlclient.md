# WOQLClient

## class terminusdb\_client.WOQLClient(server\_url, \*\*kwargs)

**Bases:** `object`

Client for querying a TerminusDB server using WOQL queries.

### server\_url()

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

### **init**(server\_url, \*\*kwargs)

The WOQLClient constructor.

**Parameter/s**

* **server\_url** (`str`) – URL of the server that this client will connect to.
* **\*\*kwargs** – Extra configuration options

> **Property:** team()

> **Property:** db()

> **Property:** user()

> **Property:** branch()

> **Property:** repo()

> **Property:** ref()

### connect(team='admin', db=None, remote\_auth=None, use\_token=False, jwt\_token=None, api\_token=None, key='root', user='admin', branch='main', ref=None, repo='local', \*\*kwargs)

Connect to a Terminus server at the given URI with an API key.

Stores the connection settings and necessary meta-data for the connected server. You need to connect before most database operations.

**Parameter/s**

* **team** (`str`) – Name of the team, default to be “admin”
* **db** (`optional`, `str`) – Name of the database connected
* **remote\_auth** (`optional`, `str`) – Remote Auth setting
* **key** (`optional`, `str`) – API key for connecting, default to be “root”
* **user** (`optional`, `str`) – Name of the user, default to be “admin”
* **use\_token** (`bool`) – Use token to connect. If both jwt\_token and api\_token is not provided (None), then it will use the ENV variable TERMINUSDB\_ACCESS\_TOKEN to connect as the API token
* **jwt\_token** (`optional`, `str`) – The Bearer JWT token to connect. Default to be None.
* **api\_token** (`optional`, `strs`) – The API token to connect. Default to be None.
* **branch** (`optional`, `str`) – Branch to be connected, default to be “main”
* **ref** (`optional`, `str`) – Ref setting
* **repo** (`optional`, `str`) – Local or remote repo, default to be “local”
* **\*\*kwargs** – Extra configuration options.

**Example/s**

```python
client = WOQLClient("https://127.0.0.1:6363")
client.connect(key="root", team="admin", user="admin", db="example_db")
```

**Return type/s**

`None`

### close()

Undo connect and close the connection.

The connection will be unusable from this point forward; an Error (or subclass) exception will be raised if any operation is attempted with the connection, unless connect is call again.

**Return type/s**

`None`

### get\_commit\_history(max\_history=500)

Get the whole commit history. Commit history - Commit id, author of the commit, commit message and the commit time, in the current branch from the current commit, ordered backwards in time, will be returned in a dictionary in the follow format: {“commit\_id”: {“author”: “commit\_author”, “message”: “commit\_message”, “timestamp: ” } }

**Parameter/s**

**max\_history** (`int`, `optional`) – maximum number of commit that would return, counting backwards from your current commit. Default is set to 500. It need to be nop-negitive, if input is 0 it will still give the last commit.

**Example/s**

```python
from terminusdb_client import WOQLClient
client = WOQLClient("https://127.0.0.1:6363"
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

### get\_all\_branches(get\_data\_version=False)

Get all the branches available in the database.

### rollback(steps=1)

Curently not implementated. Please check back later.

**Raises**

**NotImplementedError** – Since TerminusDB currently does not support open transactions. This method is not applicable to it’s usage. To reset commit head, use WOQLClient.reset

**Return type/s**

`None`

### copy()

Create a deep copy of this client.

**Returns**

The copied client instance.

**Return type/s**

WOQLClient

**Example/s**

```python
client = WOQLClient("https://127.0.0.1:6363/")
clone = client.copy()
assert client is not clone
```

### set\_db(dbid, team=None)

Set the connection to another database. This will reset the connection.

**Parameter/s**

* **dbid** (`str`) – Database identifer to set in the config.
* **team** (`str`) – Team identifer to set in the config. If not passed in, it will use the current one.

**Returns**

The current database identifier.

**Return type/s**

`str`

**Example/s**

```python
client = WOQLClient("https://127.0.0.1:6363")
client.set_db("database1")
'database1'
```

### resource(ttype, val=None)

Create a resource identifier string based on the current config.

**Parameter/s**

* **ttype** (_ResourceType_) – Type of resource.
* **val** (`str`, `optional`) – Branch or commit identifier.

**Returns**

The constructed resource string.

**Return type/s**

`str`

**Example/s**

```python
client = WOQLClient("https://127.0.0.1:6363")
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

### create\_database(dbid, team=None, label=None, description=None, prefixes=None, include\_schema=True)

Create a TerminusDB database by posting a terminus:Database document to the Terminus Server.

**Parameter/s**

* **dbid** (`str`) – Unique identifier of the database.
* **team** (`str`, `optional`) – ID of the Team in which to create the DB (defaults to ‘admin’)
* **label** (`str`, `optional`) – Database name.
* **description** (`str`, `optional`) – Database description.
* **prefixes** (_dict_, `optional`) – Optional dict containing `"@base"` and `"@schema"` keys.

@base (`str`)

IRI to use when `doc:` prefixes are expanded. Defaults to `terminusdb:///data`.

@schema (`str`)

IRI to use when `scm:` prefixes are expanded. Defaults to `terminusdb:///schema`.

* **include\_schema** (`bool`) – If `True`, a main schema graph will be created, otherwise only a main instance graph will be created.

**Raises**

**InterfaceError** – if the client does not connect to a server

**Example/s**

```python
client = WOQLClient("https://127.0.0.1:6363/")
client.create_database("someDB", "admin", "Database Label", "My Description")
```

**Return type/s**

`None`

### delete\_database(dbid=None, team=None, force=False)

Delete a TerminusDB database.

If `team` is provided, then the team in the config will be updated and the new value will be used in future requests to the server.

**Parameter/s**

* **dbid** (`str`) – ID of the database to delete
* **team** (`str`, `optional`) – the team in which the database resides (defaults to “admin”)
* **force** (`bool`) –

**Raises**

* **UserWarning** – If the value of dbid is None.
* **InterfaceError** – if the client does not connect to a server.

**Example/s**

```python
client = WOQLClient("https://127.0.0.1:6363/")
client.delete_database("<database>", "<team>")
```

**Return type/s**

`None`

### get\_triples(graph\_type)

Retrieves the contents of the specified graph as triples encoded in turtle format

**Parameter/s**

**graph\_type** (`str`) – Graph type, either “instance” or “schema”.

**Raises**

**InterfaceError** – if the client does not connect to a database

**Return type/s**

`str`

### update\_triples(graph\_type, turtle, commit\_msg)

Updates the contents of the specified graph with the triples encoded in turtle format Replaces the entire graph contents

**Parameter/s**

* **graph\_type** (`str`) – Graph type, either “instance” or “schema”.
* **turtle** – Valid set of triples in Turtle format.
* **commit\_msg** (`str`) – Commit message.

**Raises**

**InterfaceError** – if the client does not connect to a database

**Return type/s**

`None`

### insert\_triples(graph\_type, turtle, commit\_msg=None)

Inserts into the specified graph with the triples encoded in turtle format.

**Parameter/s**

* **graph\_type** (`str`) – Graph type, either “instance” or “schema”.
* **turtle** – Valid set of triples in Turtle format.
* **commit\_msg** (`str`) – Commit message.

**Raises**

**InterfaceError** – if the client does not connect to a database

**Return type/s**

`None`

### query\_document(document\_template, graph\_type='instance', skip=0, count=None, as\_list=False, get\_data\_version=False, \*\*kwargs)

Retrieves all documents that match a given document template

**Parameter/s**

* **document\_template** (_dict_) – Template for the document that is being retrived
* **graph\_type** (`str`, `optional`) – Graph type, either “instance” or “schema”.
* **as\_list** (`bool`) – If the result returned as list rather than an iterator.
* **get\_data\_version** (`bool`) – If the data version of the document(s) should be obtained. If True, the method return the result and the version as a tuple.

**Raises**

**InterfaceError** – if the client does not connect to a database

**Return type/s**

Iterable

### get\_document(iri\_id, graph\_type='instance', get\_data\_version=False, \*\*kwargs)

Retrieves the document of the iri\_id

**Parameter/s**

* **iri\_id** (`str`) – Iri id for the docuemnt that is retriving
* **graph\_type** (`str`, `optional`) – Graph type, either “instance” or “schema”.
* **get\_data\_version** (`bool`) – If the data version of the document(s) should be obtained. If True, the method return the result and the version as a tuple.
* **kwargs** – Additional boolean flags for retriving. Currently avaliable: “prefixed”, “minimized”, “unfold”

**Raises**

**InterfaceError** – if the client does not connect to a database

**Return type/s**

dict

### get\_documents\_by\_type(doc\_type, graph\_type='instance', skip=0, count=None, as\_list=False, get\_data\_version=False, \*\*kwargs)

Retrieves the documents by type

**Parameter/s**

* **doc\_type** (`str`) – Specific type for the docuemnts that is retriving
* **graph\_type** (`str`, `optional`) – Graph type, either “instance” or “schema”.
* **skip** (`int`) – The starting posiion of the returning results, default to be 0
* **count** (`int`\* or \*`none`) – The maximum number of returned result, if None (default) it will return all of the avalible result.
* **as\_list** (`bool`) – If the result returned as list rather than an iterator.
* **get\_data\_version** (`bool`) – If the version of the document(s) should be obtained. If True, the method return the result and the version as a tuple.
* **kwargs** – Additional boolean flags for retriving. Currently avaliable: “prefixed”, “unfold”

**Raises**

**InterfaceError** – if the client does not connect to a database

**Returns**

Stream of dictionaries

**Return type/s**

iterable

### get\_all\_documents(graph\_type='instance', skip=0, count=None, as\_list=False, get\_data\_version=False, \*\*kwargs)

Retrieves all avalibale the documents

**Parameter/s**

* **graph\_type** (`str`, `optional`) – Graph type, either “instance” or “schema”.
* **skip** (`int`) – The starting posiion of the returning results, default to be 0
* **count** (`int`\* or \*`none`) – The maximum number of returned result, if None (default) it will return all of the avalible result.
* **as\_list** (`bool`) – If the result returned as list rather than an iterator.
* **get\_data\_version** (`bool`) – If the version of the document(s) should be obtained. If True, the method return the result and the version as a tuple.
* **kwargs** – Additional boolean flags for retriving. Currently avaliable: “prefixed”, “unfold”

**Raises**

**InterfaceError** – if the client does not connect to a database

**Returns**

Stream of dictionaries

**Return type/s**

iterable

### get\_existing\_classes()

Get all the existing classes (only ids) in a database.

### insert\_document(document, graph\_type='instance', full\_replace=False, commit\_msg=None, last\_data\_version=None)

Inserts the specified document(s)

**Parameter/s**

* **document** (_dict_\* or \*_list of dict_) – Document(s) to be inserted.
* **graph\_type** (`str`) – Graph type, either “inference”, “instance” or “schema”.
* **full\_replace:** – bool: If True then the whole graph will be replaced. WARNING: you should also supply the context object as the first element in the list of documents if using this option.
* **commit\_msg** (`str`) – Commit message.
* **last\_data\_version** (`str`) – Last version before the update, used to check if the document has been changed unknowingly

**Raises**

**InterfaceError** – if the client does not connect to a database

**Returns**

list of ids of the inseted docuemnts

**Return type/s**

list

### replace\_document(document, graph\_type='instance', commit\_msg=None, last\_data\_version=None, create=False)

Updates the specified document(s)

**Parameter/s**

* **document** (_dict_\* or \*_list of dict_) – Document(s) to be updated.
* **graph\_type** (`str`) – Graph type, either “instance” or “schema”.
* **commit\_msg** (`str`) – Commit message.
* **last\_data\_version** (`str`) – Last version before the update, used to check if the document has been changed unknowingly
* **create** (`bool`) – Create the document if it does not yet exist.

**Raises**

**InterfaceError** – if the client does not connect to a database

**Return type/s**

`None`

### update\_document(document, graph\_type='instance', commit\_msg=None, last\_data\_version=None)

Updates the specified document(s). Add the document if not existed.

**Parameter/s**

* **document** (_dict_\* or \*_list of dict_) – Document(s) to be updated.
* **graph\_type** (`str`) – Graph type, either “instance” or “schema”.
* **commit\_msg** (`str`) – Commit message.
* **last\_data\_version** (`str`) – Last version before the update, used to check if the document has been changed unknowingly

**Raises**

**InterfaceError** – if the client does not connect to a database

**Return type/s**

`None`

### delete\_document(document, graph\_type='instance', commit\_msg=None, last\_data\_version=None)

Delete the specified document(s)

**Parameter/s**

* **document** (`str`\* or \*\*list of `str`\*) – Document(s) (as dictionary or DocumentTemplate objects) or id(s) of document(s) to be updated.
* **graph\_type** (`str`) – Graph type, either “instance” or “schema”.
* **commit\_msg** (`str`) – Commit message.
* **last\_data\_version** (`str`) – Last version before the update, used to check if the document has been changed unknowingly

**Raises**

**InterfaceError** – if the client does not connect to a database

**Return type/s**

`None`

### has\_doc(doc\_id, graph\_type='instance')

Check if a certain document exist in a database

**Parameter/s**

* **doc\_id** (`str`) – Id of document to be checked.
* **graph\_type** (`str`) – Graph type, either “instance” or “schema”.

**Returns**

if the document exist

**Return type/s**

Bool

### get\_class\_frame(class\_name)

Get the frame of the class of class\_name. Provide information about all the avaliable properties of that class.

**Parameter/s**

**class\_name** (`str`) – Name of the class

**Returns**

Dictionary containing information

**Return type/s**

dict

### commit()

Not implementated: open transactions currently not suportted. Please check back later.

### query(woql\_query, commit\_msg=None, get\_data\_version=False, last\_data\_version=None)

Updates the contents of the specified graph with the triples encoded in turtle format Replaces the entire graph contents

**Parameter/s**

* **woql\_query** (_dict_\* or \*_WOQLQuery object_) – A woql query as an object or dict
* **commit\_mg** (`str`) – A message that will be written to the commit log to describe the change
* **get\_data\_version** (`bool`) – If the data version of the query result(s) should be obtained. If True, the method return the result and the version as a tuple.
* **last\_data\_version** (`str`) – Last version before the update, used to check if the document has been changed unknowingly
* **file\_dict** (**deprecated**) – File dictionary to be associated with post name => filename, for multipart POST

**Raises**

**InterfaceError** – if the client does not connect to a database

**Example/s**

```python
WOQLClient(server="http://localhost:6363").query(woql, "updating graph")
```

**Return type/s**

dict

### create\_branch(new\_branch\_id, empty=False)

Create a branch starting from the current branch.

**Parameter/s**

* **new\_branch\_id** (`str`) – New branch identifier.
* **empty** (`bool`) – Create an empty branch if true (no starting commit)

**Raises**

**InterfaceError** – if the client does not connect to a database

**Return type/s**

`None`

### delete\_branch(branch\_id)

Delete a branch

**Parameter/s**

**branch\_id** (`str`) – Branch to delete

**Raises**

**InterfaceError** – if the client does not connect to a database

**Return type/s**

`None`

### pull(remote='origin', remote\_branch=None, message=None, author=None)

Pull updates from a remote repository to the current database.

**Parameter/s**

* **remote** (`str`) – remote to pull from, default “origin”
* **remote\_branch** (`str`, `optional`) – remote branch to pull from, default to be your current barnch
* **message** (`str`, `optional`) – optional commit message
* **author** (`str`, `optional`) – option to overide the author of the operation

**Raises**

**InterfaceError** – if the client does not connect to a database

**Return type/s**

dict

**Example/s**

```python
client = WOQLClient("https://127.0.0.1:6363/")
client.pull()
```

### fetch(remote\_id)

Fatch the brach from a remote

**Parameter/s**

**remote\_id** (`str`) – id of the remote

**Raises**

**InterfaceError** – if the client does not connect to a database

**Return type/s**

`dict`

### push(remote='origin', remote\_branch=None, message=None, author=None)

Push changes from a branch to a remote repo

**Parameter/s**

* **remote** (`str`) – remote to push to, default “origin”
* **remote\_branch** (`str`, `optional`) – remote branch to push to, default to be your current barnch
* **message** (`str`, `optional`) – optional commit message
* **author** (`str`, `optional`) – option to overide the author of the operation

**Raises**

**InterfaceError** – if the client does not connect to a database

**Example/s**

```python
WOQLClient(server="http://localhost:6363").push(remote="origin", remote_branch = "main", author = "admin", message = "commit message"})
```

**Return type/s**

dict

### rebase(branch=None, commit=None, rebase\_source=None, message=None, author=None)

Rebase the current branch onto the specified remote branch. Need to specify one of ‘branch’,’commit’ or the ‘rebase\_source’.

**Notes**

The “remote” repo can live in the local database.

**Parameter/s**

* **branch** (`str`, `optional`) – the branch for the rebase
* **rebase\_source** (`str`, `optional`) – the source branch for the rebase
* **message** (`str`, `optional`) – the commit message
* **author** (`str`, `optional`) – the commit author

**Raises**

**InterfaceError** – if the client does not connect to a database

**Return type/s**

dict

**Example/s**

```python
client = WOQLClient("https://127.0.0.1:6363/")
client.rebase("the_branch")
```

### reset(commit=None, soft=False, use\_path=False)

Reset the current branch HEAD to the specified commit path. If soft is not True, it will be a hard reset, meaning reset to that commit in the backend and newer commit will be wipped out. If soft is True, the client will only reference to that commit and can be reset to the newest commit when done.

**Raises**

**InterfaceError** – if the client does not connect to a database

**Notes**

The “remote” repo can live in the local database.

**Parameter/s**

* **commit** (_string_) – Commit id or path to the commit (if use\_path is True), for instance ‘234980523ffaf93’ or ‘admin/database/local/commit/234980523ffaf93’. If not provided, it will reset to the newest commit (useful when need to go back after a soft reset).
* **soft** (`bool`) – Flag indicating if the reset if soft, that is referencing to a previous commit instead of resetting to a previous commit in the backend and wipping newer commits.
* **use\_path** (`bool`) – Wheather or not the commit given is an id or path. Default using id and use\_path is False.

**Example/s**

```python
client = WOQLClient("https://127.0.0.1:6363/")
client.reset('234980523ffaf93')
client.reset('admin/database/local/commit/234980523ffaf93', use_path=True)
```

**Return type/s**

`None`

### optimize(path)

Optimize the specified path.

**Raises**

**InterfaceError** – if the client does not connect to a database

**Notes**

The “remote” repo can live in the local database.

**Parameter/s**

**path** (_string_) – Path to optimize, for instance admin/database/\_meta for the repo graph.

**Example/s**

```python
client = WOQLClient("https://127.0.0.1:6363/")
client.optimize('admin/database') # optimise database branch (here main)
client.optimize('admin/database/_meta') # optimise the repository graph (actually creates a squashed flat layer)
client.optimize('admin/database/local/_commits') # commit graph is optimised
```

**Return type/s**

`None`

### squash(message=None, author=None, reset=False)

Squash the current branch HEAD into a commit

**Raises**

**InterfaceError** – if the client does not connect to a database

**Notes**

The “remote” repo can live in the local database.

**Parameter/s**

* **message** (_string_) – Message for the newly created squash commit
* **author** (_string_) – Author of the commit
* **reset** (`bool`) – Perform reset after squash

**Returns**

commit id to be reset

**Return type/s**

`str`

**Example/s**

```python
client = WOQLClient("https://127.0.0.1:6363/")
client.connect(user="admin", key="root", team="admin", db="some_db")
client.squash('This is a squash commit message!')
```

### diff(before, after)

Perform diff on 2 set of document(s), result in a Patch object

**Returns**

Patch object

**Return type/s**

obj

**Example/s**

```python
client = WOQLClient("https://127.0.0.1:6363/")
client.connect(user="admin", key="root", team="admin", db="some_db")
result = client.diff({ "@id" : "Person/Jane", "@type" : "Person", "name" : "Jane"}, { "@id" : "Person/Jane", "@type" : "Person", "name" : "Janine"})
result.to_json = '{ "name" : { "@op" : "SwapValue", "@before" : "Jane", "@after": "Janine" }}'
```

### patch(before, patch)

Apply the patch object to the before object and return an after object. Note that this change does not commit changes to the graph.

**Returns**

After object

**Return type/s**

dict

**Example/s**

```python
client = WOQLClient("https://127.0.0.1:6363/")
client.connect(user="admin", key="root", team="admin", db="some_db")
patch_obj = Patch(json='{"name" : { "@op" : "ValueSwap", "@before" : "Jane", "@after": "Janine" }}')
result = client.patch({ "@id" : "Person/Jane", "@type" : Person", "name" : "Jane"}, patch_obj)
print(result)
'{ "@id" : "Person/Jane", "@type" : Person", "name" : "Janine"}'
```

### clonedb(clone\_source, newid, description=None)

Clone a remote repository and create a local copy.

**Parameter/s**

* **clone\_source** (`str`) – The source url of the repo to be cloned.
* **newid** (`str`) – Identifier of the new repository to create.
* **Description** (`str`, `optional`) – Optional description about the cloned database.

**Raises**

**InterfaceError** – if the client does not connect to a database

**Example/s**

```python
client = WOQLClient("https://127.0.0.1:6363/")
client.clonedb("http://terminusdb.com/some_user/test_db", "my_test_db")
```

**Return type/s**

`None`

### get\_database(dbid)

Returns metadata (id, organization, label, comment) about the requested database :type dbid: `str` :param dbid: The id of the database :type dbid: `str`

**Raises**

**InterfaceError** – if the client does not connect to a server

**Return type/s**

dict or None if not found

### get\_databases()

Returns a list of database metadata records for all databases the user has access to

**Raises**

**InterfaceError** – if the client does not connect to a server

**Return type/s**

list of dicts

### list\_databases()

Returns a list of database ids for all databases the user has access to

**Raises**

**InterfaceError** – if the client does not connect to a server

**Return type/s**

list of dicts
