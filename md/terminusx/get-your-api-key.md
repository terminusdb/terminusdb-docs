# Get your API key

> **On this page:** Get your API key and configure your enviroment to use the your client.

## Generate your API key

An API key is required to use TerminusX. Get this from the user interface using the steps below.

**1. Log in**

Log into the user interface dashboard [dashboard.terminusdb.com](https://dashboard.terminusdb.com)

**2. Select your profile**

Select your `Profile` by clicking on <span style="color: goldenrod; font-size: 20px;">&#x25BC;</span> at the top-right corner of the screen.

**3. Generate a Personal Access Token**

Enter a description in `Add a Token Description` then click `Generate New Token`. Copy the token generated.

**4. Copy the required code snippet**

Select the `Python` or `JavaScript` tab then copy the code snippet.

## Set up your environment

Assign your token to the environment variable `TERMINUSDB_ACCESS_TOKEN` in your code snippet. An example in `bash` below.

#### Code: API key environment configuration

```bash
export TERMINUSDB_ACCESS_TOKEN="my API key here"
```

You are now ready to use your client!

## See Also

### Detailed install

Links to [detailed installation](terminusx/install) instructions for JavaScript and Python clients.