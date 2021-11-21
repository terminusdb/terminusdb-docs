# How to Add a Date and Time

> **On this page:** A how-to guide to add a date and time in Python.

## Steps

[Step 1. Set up a database](#step-1-set-up-a-database)

[Step 2. Create a schema](#step-2-create-a-schema)

[Step 3. Add a date and time](#step-3-add-a-date-and-time)

### Step 1. Set up a database

Import `time` and `datetime` libraries and set up a new test database.

#### Code: Set up a test database

```python
import os
import time
import datetime
from   terminusdb_client import WOQLClient
from   terminusdb_client import WOQLQuery as WOQL

# Connect to the server

server_url  = "https://127.0.0.1:6363"
db          = "test_db"
label       = "test db"
description = "test db"
user        = "admin"
account     = "admin"
key         = "root"
client      = WOQLClient(server_url)

client.connect(user=user, account=account, key=key, db=db)

try:
    client.create_database(db,user,label=label, description=description)

except Exception as E:

    pass
```

### Step 2. Create a schema

Create a simple schema with the `dateTime` property `created_dt`.

#### Code: Create schema with the date and time property

```python
schema = 
    WOQL().doctype("Object", label="Object").property(
                   "created_dt", "dateTime", label="created time")
```

### Step 3. Add a date and time 

Add a formatted date and time to the `created_dt` property. 

#### Code: Add a formatted date and time

```python
client.query(schema)

dt = datetime.datetime.now().strftime("%Y-%m-%dT%H:%M:%S"))

query = WOQL().woql_and
(
    WOQL().insert("doc:my_obj", "@schema:Object"),
    WOQL().add_triple("doc:my_obj", "created_dt", WOQL().datetime(dt))
)

client.query(query)
```