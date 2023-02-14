---
description: How to get your API key and configure your environment to use with a client.
---

# Get your API key

### Generate your API key

To use the Python or JavaScropt client with TerminusCMS, an API key is required. The API key is obtained in the TerminusCMS dashboard by using the steps below.

**1. Log in**

Log in to the user interface dashboard [dashboard.terminusdb.com](https://dashboard.terminusdb.com)

**2. Select your profile**

Select your `Profile` by clicking on ▼ at the top-right corner of the screen.

**3. Generate a Personal Access Token**

Enter a description in `Add a Token Description` then click `Generate New Token`. Copy the token generated.

**4. Copy the required code snippet**

Select the `Python` or `JavaScript` tab then copy the code snippet.

### Set up your environment

Assign your token to the environment variable `TERMINUSDB_ACCESS_TOKEN` in your code snippet. The example below is in `bash`.

#### Code: API key environment configuration

```bash
export TERMINUSDB_ACCESS_TOKEN="my API key here"
```

You are now ready to[ install and use your client](start-with-client.md)!
