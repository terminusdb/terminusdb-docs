---
description: Time travel through your database history to a specific commit
---

# Time Travel

Assuming you have [connected with the Python Client](../../use-the-python-client/connect-with-the-python-client.md), created a database, and made a few commits, you can time travel to inspect them to see what they looked like.

### Get the commits list

You can use the Python Client Library method to get a list of branch commits. This example uses pagination to get the last 10 commits starting from the branch head -

```python
// For TerminusCMS
from terminusdb_client import Client

client = Client('https://cloud.terminusdb.com/MyTeam')
client.connect(team='MyTeam' db='your_db', api_token='YOUR_API_TOKEN_HERE')
commits = client.logs(count=10)
print(commits)

// For TerminusDB
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

### Time travel and point the client to a specific commit

To travel back in time to a particular commit, you need to specify the commit ID in the ref property. To obtain the commit ID, refer to the code snippet above. All your calls after will be made for this commit.

```python
client.ref = "hpl18q42dbnab4vzq8me4bg1xn8p2a0")
docs = client.get_all_documents()
```
