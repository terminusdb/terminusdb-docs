---
description: How-to use the Python Client to clone a database
---

# Clone a Project

This how-to will show how to clone a public database from TerminusCMS into your own TerminusCMS team.

### Running the Python client with the API Token

Be sure to construct the Python client object first, and set the appropriate authentication token.

```python
from terminusdb_client import Client

client = Client('https://cloud.terminusdb.com/MyTeam')
client.connect(team='MyTeam', api_token='YOUR_API_TOKEN_HERE')
```

### Cloning the database

Check the TerminusCMS dashboard for a database that you want to clone. In this how-to, we will be using the Lego database as an example.

```python
clone_url = 'https://cloud.terminusdb.com/MyTeam/Terminusdb_demo/lego'
client.clonedb(clone_url, 'my_lego', remote_auth={'type': 'token': 'key': 'YOUR_API_TOKEN_HERE'})
```

You now have the my\_lego database cloned in your TerminusCMS team.

To verify whether the database has been successfully cloned, you can run:

```python
client.get_database('my_lego')
```
