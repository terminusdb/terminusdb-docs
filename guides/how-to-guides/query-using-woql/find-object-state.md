---
description: Find an object state at a given time using the Python client.
---

# Find an Object State

### Step 1. Connect to a database <a href="#step-1-connect-to-a-database" id="step-1-connect-to-a-database"></a>

Connect to an existing database with multiple commit activities.

#### Code: Connect to an existing database

```python
import os
import time
import datetime
from   terminusdb_client import WOQLClient
from   terminusdb_client import WOQLQuery as WOQL

server_url = "http://127.0.0.1:6363"
db         = "seshat"
user       = "admin"
account    = "admin"
key        = "root"
client     = WOQLClient(server_url)

client.connect(user=user, account=account, key=key, db=db)
```

### Step 2. Get the initial commit

Get the `timestamp` of the last commit **before** the date specified in `date_string`, using the `timetuple()` method.

#### Code: Get the timestamp of a commit

```python
date_string = "14/10/2020"
timestamp   = time.mktime(datetime.datetime.strptime(date_string, "%d/%m/%Y").timetuple())
```

### Step 3. Get the subsequent commit

Get the **next** commit after the `timestamp` retrieved in [step 2](find-object-state.md#step-2.-get-the-initial-commit) and store commit data in `commit_query`.

#### Code: Get the details of the subsequent commit

```python
commit_query = WOQL().using("admin/seshat/local/_commits",
    WOQL().limit(1,
       WOQL.woql_and(
           WOQL().triple("v:Branch", "ref:branch_name",      "v2"),
           WOQL().triple("v:Branch", "ref:ref_commit", "     v:Head"),
           WOQL().path("v:Head",     "ref:commit_parent+",   "v:Tail", "v:Path"),
           WOQL().triple("v:Tail",   "ref:commit_id",        "v:TailID"),
           WOQL().triple("v:Tail",   "ref:commit_timestamp", "v:TimeStamp"),
           WOQL().greater(timestamp, "v:TimeStamp"),
)))
```

### Step 4. Get the commit identifier

Get the commit identifier into variable `commit_id` after running the `commit_query` defined in [step 3](find-object-state.md#step-3-get-the-subsequent-commit).

#### Code: Get the commit id

```python
results   = client.query(commit_query)
commit_id = results['bindings'][0]['TailID']['@value']
```

### Step 5. Get the commit object state

Get the commit object associated with the `commit_id` obtained in [step 4](find-object-state.md#get-the-commit-identifier). Note the full `path` of the `commit_id`.

#### Code: Get the commit object state

```python
path = f"admin/seshat/local/commit/{commit_id}"

object_query = WOQL().using(path,
        WOQL().read_object("terminusdb:///data/afghazn", "v:Document"))

results = client.query(object_query)

print(results)
```
