## TerminusDB Client Python

The terminusdb_client library consists of 4 major components: WOQLClient, WOQLQuery, WOQLViews and WOQLDataFrame (optional, included only if installed with the [dataframe] option). In this guide, we will show the basic usage of each component. For detail documentation of the Python client, please refer to the [full documentation](https://terminusdb.github.io/terminusdb-client-python/). For a full example of using all the code shown below, see the [bike example in Jupyter notebook](https://github.com/terminusdb/terminusdb-tutorials/blob/master/bike-tutorial/python/Create%20TerminusDB%20Graph%20with%20Python%20Client.ipynb).

### WOQLClient

A connection object that allows you to connect to TerminusX (or
TerminusDB). To create an client object, you will have to provide a
URL to the server. You can get a code snippet from TerminusX in your
profile page which will have all of these variables filled out for you.

NOTE: *You will need to have an access key set*. This is available in
your profile page and you can set it in your environment as:

```shell
$ export TERMINUSDB_ACCESS_TOKEN="my very long token here"
```

At the begining of your python script you can simply write:

```python
from terminusdb_client import WOQLClient
user = f"jimbo"
team = f"logicistics" # My Team name
endpoint = f"https://cloud-dev.dcm.ist/{team}/"
client = WOQLClient(endpoint)
client.connect(user=user,team=team,use_token=True)
```

The most common way to use the client is to:
1. connected to an existing database or
2. create a brand new database.

To connect to an existing database:

```python
client.connect(team=team, user="admin", db="example_db")
```

To create a new database:
```python
client.connect(key="root", account="admin", user="admin")
client.create_database("example_db")
```

### Document Interface

Once we have created a database or connected to an existing one, we
will need to put some data in it. First we need to add a schema. (See
[Documents](../Explanation/DOCUMENTS.md) for a more general overview).

Supposing the data I'm initially interested in is the following player
roster.

name | position
--------------
George | Centre Back
Doug | Full Back
Karen | Centre Forward

The schema which corresponds to this might look as follows:

```python
schema = { "@type" : "Class",
           "@id" : "Player",
           "@key" : {"@type" : "Lexical", "@fields" : ["name"]},
           "name" : "xsd:string",
           "position" : "xsd:string" }
```

This tells us that we have an object with `name` and `position` and
which can always be uniquely identified by `name`.

We can load this class into the schema with:

```python
client.insert_document(schema,
                       graph_type="schema",
                       commit_msg = "Adding Player Schema")
```

Once loaded, we can start submitting documents that correspond to this
schema.

The above table would be the following:

```python
objects = [{"@type" : "Player",
            "name" : "George",
            "position" : "Centre Back"},
           {"@type" : "Player",
            "name" : "Doug",
            "position" : "Full Back"},
           {"@type" : "Player",
            "name" : "Karen",
            "position" : "Centre Forward"}]
client.insert_document(objects,commit_msg = f"Inserting player data")
```

Now you can retrieve the documents. We could search for a suitable
*full back* with the following:

```python
documents = client.query_document({"@type" : "Player",
                                   "position" : "Full Back})
```

The `documents` variable is actually an iterator, but we can create a
list with:

```
matches = list(documents)
```

`matches` will have the value:

```python
[{"@type" : "Player",
  "name" : "Doug",
  "position" : "Full Back"}]
```

You should now be ready to make more elaborate documents!
