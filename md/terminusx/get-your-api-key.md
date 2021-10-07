# Get your API key

> **On this page:** Get your API key and configure your enviroment to use the your client.

## Generate your API key

An API key is required to use TerminusX. Get this from the user interface using the steps below.

- Log into the user interface dashboard [dashboard.terminusdb.com](https://dashboard.terminusdb.com)

- Select your profile at the upper right corner of the screen.

- Copy the **JavaScript** or **Python** code snippet.

- Enter a `key name` and click `generate` to generate a key.

## Set up your environment

Assign your key to environment variable `TERMINUSDB_ACCESS_TOKEN`. An example in `bash` below.

#### Code: API key environment configuration

```bash
export TERMINUSDB_ACCESS_TOKEN="my API key here"
```

You are now ready to use your client!