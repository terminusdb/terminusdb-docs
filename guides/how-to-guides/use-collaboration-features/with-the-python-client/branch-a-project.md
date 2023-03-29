---
description: >-
  How-to create a new branch in TerminusDB and TerminusCMS using the Python
  Client
---

# Branch a Project

Assuming you have [connected with the Python Client](../../use-the-python-client/connect-with-the-python-client.md) and [created a database](../../use-the-python-client/create-a-database.md) you can then create a branch of your project.

Creating a branch is the same for TerminusDB and TerminusCMS. By default in TerminusDB or TerminusCMS you are working in the main branch.

### Create a new branch from main branch

Use this code to create a new branch starting from branch main head.

```python
client.create_branch("mybranch")
client.branch("mybranch")
```

If you add documents to the `mybranch`, they won't end up in the `main` branch unless you merge them.

### Create a new branch from mybranch branch

Now you are in the branch called `mybranch`.

You can create a new branch starting from the `mybranch` head. Since we are checked out on the "mybranch" already, we can just create a new branch from there. It will have `mybranch` as its parent.

```python
client.create_branch("branch_from_mybranch")
client.branch("branch_from_mybranch")
```

### Get a branch list

Get all of the data product's branches in a list using a method

```python
branches = client.get_all_branches()
print(branches)
```

Response example

```json
[
      {
         "Branch":"terminusdb://ref/data/Branch/main",
         "Head":"terminusdb://ref/data/InitialCommit/ohj33rrh5kmnmr9cq6vzfajfxog0629",
         "Name":{
            "@type":"xsd:string",
            "@value":"main"
         },
         "Timestamp":{
            "@type":"xsd:decimal",
            "@value":1678385706.694406
         },
         "commit_identifier":{
            "@type":"xsd:string",
            "@value":"ohj33rrh5kmnmr9cq6vzfajfxog0629"
         }
      },
      {
         "Branch":"terminusdb://ref/data/Branch/mybranch",
         "Head":"terminusdb://ref/data/ValidCommit/prh0yvftqmsrgctn8gqvdxv7gc4i8p8",
         "Name":{
            "@type":"xsd:string",
            "@value":"mybranch"
         },
         "Timestamp":{
            "@type":"xsd:decimal",
            "@value":1678385762.7790234
         },
         "commit_identifier":{
            "@type":"xsd:string",
            "@value":"prh0yvftqmsrgctn8gqvdxv7gc4i8p8"
         }
      },
      {
         "Branch":"terminusdb://ref/data/Branch/branch_from_mybranch",
         "Head":"terminusdb://ref/data/ValidCommit/prh0yvftqmsrgctn8gqvdxv7gc4i8p8",
         "Name":{
            "@type":"xsd:string",
            "@value":"branch_from_mybranch"
         },
         "Timestamp":{
            "@type":"xsd:decimal",
            "@value":1678385762.7790234
         },
         "commit_identifier":{
            "@type":"xsd:string",
            "@value":"prh0yvftqmsrgctn8gqvdxv7gc4i8p8"
         }
      }
   ]
```
