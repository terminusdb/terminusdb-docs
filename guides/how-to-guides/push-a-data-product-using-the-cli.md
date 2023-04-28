---
description: >-
  Push a local TerminusDB data product to TerminusCMS using the command line
  interface
---

# Push a Data Product Using the CLI

If you have a local copy of TerminusDB or the TerminusDB Docker container, you can push your local data product to TerminusCMS in the following way.

### Step 1: Create an empty data product on TerminusCMS

Go to TerminusCMS, choose the Team you want to operate in, and click on "New Data Product". Enter the name you would like to use.

On the right-hand side of the screen, just after creating the data product, there is a _clone url_ that you can copy.

### Step 2: Setup a remote with the CLI

If you are using the CLI tool, just copy the shell commands directly from the following examples. If you are using the Docker, you should replace `terminusdb` with `./terminusdb-container cli`

Connect your local data product to the remote:

```sh
$ terminusdb remote add admin/supply_chain origin 'https://cloud.terminusdb.com/TeamName/TeamName/SupplyChain'
Successfully added remote origin with url https://cloud-dev.terminusdb.com/TeamName/TeamName/SupplyChain
```

### Step 3: Fetch remote

Place your TerminusCMS access token for the `TeamName` (using whatever your team is actually called) in a protected file accessible only by you. We will use the name `.TeamName_token_file`.

You need to fetch the empty remote before pushing. You can do this by calling TerminusDB as follows:

```sh
$ terminusdb fetch admin/supply_chain -t`cat .TeamName_token_file`
admin/supply_chain fetch: "823213c111d0cbe912d65f60b0b23f76d35f1056" with updated repository head = true
```

If you specified a remote other than origin, you'll have to use the `-r` flag to specify it explicitly.

### Step 4: Push your Data Product

```shell
$ terminusdb push admin/supply_chain -t`cat .TeamName_token_file`
Pushing to remote 'origin'
Remote updated (head is 66c36efbfde90f46ac981184d044eb165cfb518d)
```

Now you have your data on TerminusCMS!
