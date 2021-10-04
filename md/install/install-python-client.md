# Install a Python Client

> **On this page:** Everything you need to install and run a TerminusDB Python client.

**Key topics**

[Requirements](#requirements)

[Install steps](#install-steps)

[Example use](#example-use)

## Requirements

A list of prerequisite components depending on your operating system. Click on the required component to download it from the provider's website.

#### Installation requirements 
| Required                                    | Version   | Required to:                             | ![info](../../img/ico/terminusdb-icon-linux.png)<br>Linux | ![info](../../img/ico/terminusdb-icon-apple.png)<br>MacOS | ![info](../../img/ico/terminusdb-icon-windows.png)<br>Windows |
| ------------------------                    | --------- | ------------------------                 | :------: | :------: | :------: |
| [TerminusDB bootstrap](to-do)               | `Latest`  | Install the TerminusDB server as a Docker container | &#10004; | &#10004; | &#10004; |
| [Git](to-do)                                | `Latest`  | Build and install the Python client from source. | &#10004; | &#10004; | &#10004; |
| [GitBash](to-do)                            | `Latest ` | Use the Python CLI (recommended shell)   | &#10004; | &#10004; | &#10004; |
| [Python](https://www.python.org/downloads/) | `3.6+`    | Use the TerminusDB Python client         | &#10004; | &#10004; | &#10004; |

## Install steps

Install and use the TerminusDB Python client with the following steps.  

- [Install the TerminusDB bootstrap](to-do)
- [Install the latest Python components](#install-the-latest-python-components)
- [Install the TerminusDB Python client](#install-the-terminusdb-python-client)

### Install the TerminusDB bootstrap

Follow the [TerminusDB bootstrap](to-do) instructions to install the TerminusDB server `terminusdb-server` as a Docker container. 

### Install the latest Python components

In an **administrator** shell, run the command below to update `pip`, `setuptools`, and `wheel`.  

<!-- tabs:start -->

### **Linux/Mac OS**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-linux.png)</i><i class="tdb-i">![info](../../img/ico/terminusdb-icon-apple.png)</i>

```bash

python3 -m pip install --upgrade pip setuptools wheel


```

### **Windows**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-windows.png)</i>

```bash

py -m pip install --upgrade pip setuptools wheel


```
<!-- tabs:end -->


### Install the TerminusDB Python client

Choose one of the following Python client install options.

- [Install the core](#install-the-core)
- [Install with dataframe](#install-with-dataframe)
- [Install from source](#install-from-source)


#### Install the core

Install the core Python client. The core includes `WOQLClient` and `WOQLQuery`.

```bash

python -m pip install terminusdb-client


```

#### Install with dataframe

Install the Python client with the WOQL `dataframe`. The [WOQLDataFrame](https://terminusdb.github.io/terminusdb/#/Intro_Tutorials/Start_With_Python?id=woqldataframe) enables query results to be converted to different formats such as [Pandas](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html).

```bash

python -m pip install terminusdb-client[dataframe]


```

If you are using a shell other than `bash`, such as `zsh`, you may need to use quotes.


```zsh

python -m pip install 'terminusdb-client[dataframe]'


```

#### Install from source

Build and install the Python client from source.

```bash

python -m pip install git+https://github.com/terminusdb/terminusdb-client-python.git


```

<!-- to-do: REFACTOR AGAIN AND TEST -->

## Example use

<!-- to-do: Add some text -->

#### Code: Load a Turtle file 

Load a Terse RDF Triple Language (Turtle) file `src/terminus-schema/woql.owl.ttl`. 

```py

#!/usr/bin/python3

import os
import sys
import time
import math

from terminusdb_client import WOQLClient
from terminusdb_client import WOQLQuery as WQ

server_url = "https://127.0.0.1:6363"
user       = "admin"
account    = "admin"
key        = "root"
dbid       = "woql"

#--
# Connect to server.
#--

client = WOQLClient
        (
            server_url, 
            insecure=True
        )

client.connect
        (
            user=user, 
            account=account, 
            key=key, 
            db=dbid, 
            insecure=True
        )

#--
# Open, read, and load a file
# --

filename = f'src/terminus-schema/woql.owl.ttl'

woql_file = open(filename)

contents = woql_file.read()

woql_file.close()

client.update_triples
(
    "schema",
    "main",
    contents,
    f"Adding WOQL schema"
)


```

#### Code: Client bank accounts

Create a database with client accounts and perform simple balance additions and substractions.

```py

#!/usr/bin/python3

from terminusdb_client.woqlquery.woql_query  import WOQLQuery as WQ
from terminusdb_client.woqlclient.woqlClient import WOQLClient

server_url  = "https://127.0.0.1:6363"
user        = "admin"
account     = "admin"
key         = "root"
dbid        = "bank_balance_example"
repository  = "local"
label       = "Bank Balance Example"
description = "An example database bank account operations"

#--
# WOQL attributes.
# --

# label.
_label_label       = "label"
_label_balance     = "balance"
_label_bankAccount = "Bank Account" 
_label_owner       = "owner"

# doc.
_doc_jane          = "doc:Jane"
_doc_jim           = "doc:Jim"
_doc_mike          = "doc:Mike"

# schema.
_scm_bankAccount   = "scm:BankAccount"
_scm_owner         = "scm:Owner"
_scm_balance       = "scm:balance"

# xsd.
_xsd_string        = "xsd:string"
_xsd_nonNegInt     = "xsd:nonNegativeInteger"

#--
# Connect to server.
#--

client = WOQLClient
    (
        server_url
    )

client.connect
    (
        user=user, 
        account=account, 
        key=key, 
        db=dbid
    )

# --
# Delete an old database (optional - comment out if not needed.)
# --

client.delete_database(dbid)

# --
# Create the database.
# --

try:                    
    
    client.create_database(dbid,user,label=label, description=description)

except Exception as err:

    if "api:DatabaseAlreadyExists" == err.get("api:error", {}).get("@type", None):

        print(f'Warning: Database "{dbid}" already exists.\n')

    else:
        
        raise(err)


# --
# Add the schema (can be done repeatedly.)
#--

WQ().woql_and
(
    WQ().doctype        (_scm_bankAccount)
        .label          (_label_bankAccount)
        .description    ("A bank account")
        .property       (_scm_owner, _xsd_string)
            .label      (_label_owner)
            .cardinality(1)
        .property       (_scm_balance, _xsd_nonNegInt)
            .label      (_label_owner)
).execute
    (
        client,          "Adding bank account object to schema"
    )


#############################
# Is this still a bug?????? #
#############################

# Fix bug in schema
WQ().woql_and
(
    WQ().delete_quad
    (
        _scm_balance, 
        _label_label, _label_owner,   
        "schema/main"
    ),
    WQ().add_quad   
    (
        _scm_balance, 
        _label_label, _label_balance, 
        "schema/main"
    )
).execute
    (
        client, "Label for balance was wrong"
    )

# Add the data from csv to the main branch (again idempotent as widget ids are chosen from sku)
WQ().woql_and
(
    WQ().insert
    (
        _doc_mike, _scm_bankAccount
    )
    .property(_scm_owner,  "mike")
    .property(_scm_balance, 123)
).execute
    (
        client, "Add mike"
    )

# try to make mike go below zero

balance, new_balance = WQ().vars(_label_balance, "New Balance")

try:
    WQ().woql_and
    (
        WQ().triple       (_doc_mike, _scm_balance, balance),
        WQ().delete_triple(_doc_mike, _scm_balance, balance),
        WQ().eval
        (
            WQ().minus 
            (
                balance, 130
            ) new_balance
        ),
        WQ().add_triple  (_doc_mike, _scm_balance, new_balance)
    ).execute
        (
            client, "Update mike"
        )

#################
# Weird error message
#################


except Exception as err:
    
    print(f'Witness of failure for mike: {err.error_obj}')


############################################
# Can't these be placed into a function??? #
############################################

# Subtract less
WQ().woql_and(
    WQ().triple(_doc_mike, _scm_balance, balance),
    WQ().delete_triple(_doc_mike, _scm_balance, balance),
    WQ().eval(WQ().minus(balance, 110), new_balance),
    WQ().add_triple(_doc_mike, _scm_balance, new_balance)
).execute(client, "Update mike")

# Make the "branch_office" branch
branch = "branch_office"
try:
    client.branch(branch)
except Exception as E:
    error_obj = E.error_obj
    if "api:BranchExistsError" == error_obj.get("api:error",{}).get("@type",None):
        print(f'Warning: Branch "{branch}" already exists!\n')
    else:
        raise(E)

# Add some data to the branch
client.checkout(branch)
WQ().woql_and(
  WQ().insert(_doc_jim, _scm_bankAccount)
      .property(_label_owner, "jim")
      .property(_label_balance, 8)
).execute(client,"Adding Jim")


# Return to the 'main' branch and add Jane
client.checkout('main')
WQ().woql_and(
  WQ().insert(_doc_jane, _scm_bankAccount)
      .property(_label_owner, "jim")
      .property(_label_balance, 887)
).execute(client,"Adding Jane")

try:
    client.rebase({"rebase_from": f'{user}/{dbid}/{repository}/branch/{branch}',
                   "author": user,
                   "message": "Merging jim in from branch_office"})
except Exception as E:
    error_obj = E.errorObj
    print(f'{error_obj}\n')

```


<!--
This example creates an `Express.js` server to post an account to a database with default user credentials summarized below.  

| Constant | Value | Description |
| --- | --- | --- | 
| `cEnum.database` | `"banker"` | Database name/id |
| `cEnum.user`     | `"admin"`  | Default user id  |
| `cEnum.password` | `"root"`   | Default password |

```python

_sV_journey     = "v:Journey"
_sS_journey     = "scm:Journey"
_sV_start       = "v:Start"
_sV_end         = "v:End"
_sType          = "Type"
_sStation_start = "start_station"
_sStation_end   = "end_station"

from    terminusdb_client 
import  WOQLQuery 
as      woQ
        conditions = woQ
        [
            woQ().triple("v:Journey",     "type",            "scm:Journey"),
            woQ().triple("v:Journey",     "start_station",   "v:Start"),
            woQ().opt().triple("v:Start", _label_label,           "v:Start_Label"),
            woQ().triple("v:Journey",     "end_station",     "v:End"),
            woQ().opt().triple("v:End",   _label_label,           "v:End_Label"),
            woQ().triple("v:Journey",     "journey_bicycle", "v:Bike")
        ]

query = woQ().select
        (
            "v:Start", 
            "v:Start_Label", 
            "v:End",  
            "v:End_Label"
        ).woql_and(*conditions)

result = query.execute(client)
```

## Options

connections options.

To initialize `TerminusDB client` with custom options use

```js
const cEnum  =
{
    // Server/database details

    database: "test_db",
    user    : "admin",
    password: "my_secret_key",    
    path    : "@terminusdb/terminusdb-client",
    url     : "https://127.0.0.1:6363"
}

const cnTDBClient = require(cEnum.path);
const cnWClient   = new cnTDBClient.WOQLClient
(
    cEnum.url, 
    {
        dbid: cEnum.database,
        user: cEnum.user,
        key : cEnum.password,
    }
);
```