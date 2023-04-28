---
description: How to connect to TerminusDB and TerminusCMS using the Python Client
---

# Connect with the Python Client

First, you should install the Python Client. For instructions on installing see the [installing python client how-to](install-the-python-client.md).

### Connecting with the Python Client

Depending on whether you are connecting to an instance you have set up yourself, or whether you are using TerminusCMS in the cloud, there are two different methods of connection.

In both cases, you should load TerminusDB in your script with the following:

```python
from terminusdb_client import Client
```

### TerminusCMS

The TerminusCMS endpoint has the form `https://cloud.terminusdb.com/TEAM/` where `TEAM` is the name of the team you are using in TerminusCMS for the data products you want to access.

In order to connect to this team, you will need to [get your API key](../../../terminuscms/get-api-key.md) after selecting the team you want to use.

You should put your access token in your environment, using the environment variable `TERMINUSDB_ACCESS_TOKEN`. This ensures that scripts do not leak the access token when checked into source control.

```python
export TERMINUSDB_ACCESS_TOKEN="..."
```

At this point you can create the client with this code:

```python
from terminusdb_client import Client
user     = "user@email.com"
team     = "Team_Name" 
endpoint = f"https://cloud.terminusdb.com/{team}/"
client   = Client(endpoint)

client.connect(user=user, team=team, use_token=True)
```

### Connecting to a TerminusDB installation

Whether you are connecting to a local docker, a local server, or on a server that you've set up somewhere, you can use the following to log in to TerminusDB.

```python
team="MyTeam",
client = Client("http://localhost:6363/")
client.connect(team=team, password="MyPassword")
```

If you are using TerminusDB locally, and you have not set up a specific team, or changed the password from the default, you can simply connect with:

```python
team="admin",
client = Client("http://localhost:6363/")
client.connect(team=team)
```
