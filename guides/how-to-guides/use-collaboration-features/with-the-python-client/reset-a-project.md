---
description: How to reset to a specific commit using the Python Client
---

# Reset a Project

Assuming you have [connected with the Python Client](../../use-the-python-client/connect-with-the-python-client.md), created a database, and made a few commits, you can reset the HEAD of a database to a particular commit. Just like you would do in `git` with `git reset`.

### Get the commits list

You can use the Python Client Library method to get a list of branch commits. This example uses pagination to get the last commits starting from the branch head -

```python
# For TerminusCMS
from terminusdb_client import Client

client = Client('https://cloud.terminusdb.com/MyTeam')
client.connect(team='MyTeam' db='your_db', api_token='YOUR_API_TOKEN_HERE')
commits = client.logs(count=10)
print(commits)

# For TerminusDB
from terminusdb_client import Client

client = Client('http://localhost:6363')
client.connect(key='root', user='root', team='root' db='your_db')
commits = client.logs(count=10)
print(commits)
```

A response example will be a list of objects like this:

```json
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

### Reset to a specific commit

To reset the HEAD of your database to a particular commit, you need to get the identifier of a particular commit. To obtain the identifier, refer to the code snippet above.

```python
client.reset("hpl18q42dbnab4vzq8me4bg1xn8p2a0")
```
