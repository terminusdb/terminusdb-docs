# Install a Python Client

> **On this page:** Everything you need to install and run a TerminusDB Python client.

**Key topics**

[Requirements](install-python-client.md#requirements)

[Install steps](install-python-client.md#install-steps)

## Requirements

A list of prerequisite components depending on your operating system. Click on the required component to download it from the provider's website.

#### Installation requirements

| Required                                                                        | Version  | Required to:                                         | Linux | macOS | Windows |
| ------------------------------------------------------------------------------- | -------- | ---------------------------------------------------- | :---: | :---: | :-----: |
| [TerminusDB bootstrap](../../terminusdb/install/install-as-docker-container.md) | `Latest` | Install the TerminusDB server as a Docker container. |   ✔   |   ✔   |    ✔    |
| [Git](https://git-scm.com/downloads)                                            | `Latest` | Build and install the Python client from source.     |   ✔   |   ✔   |    ✔    |
| [GitBash](https://git-scm.com/downloads)                                        | `Latest` | Use the Python CLI (recommended shell.)              |   ✔   |   ✔   |    ✔    |
| [Python](https://www.python.org/downloads/)                                     | `3.6+`   | Use the TerminusDB Python client.                    |   ✔   |   ✔   |    ✔    |

## Install steps

Install and use the TerminusDB Python client with the following steps.

* [Install the TerminusDB bootstrap](install-python-client.md#install-the-terminusdb-bootstrap)
* [Install the latest Python components](install-python-client.md#install-the-latest-python-components)
* [Install the TerminusDB Python client](install-python-client.md#install-the-terminusdb-python-client)

### Install the TerminusDB bootstrap

Install the TerminusDB server `terminusdb-server` as a [Docker container](../../terminusdb/install/install-as-docker-container.md).

### Install the latest Python components

In an **administrator** shell, run the command below to update `pip`, `setuptools`, and `wheel`.

{% tabs %}
{% tab title="Linux/macOS" %}
```
python3 -m pip install --upgrade pip setuptools wheel
```
{% endtab %}

{% tab title="Windows" %}
```
py -m pip install --upgrade pip setuptools wheel
```
{% endtab %}
{% endtabs %}

### Install the TerminusDB Python client

Choose one of the following Python client install options.

* [Install the core](install-python-client.md#install-the-core)
* [Install with dataframe](install-python-client.md#install-with-dataframe)
* [Install from source](install-python-client.md#install-from-source)

#### Install the core

Install the core Python client. The core includes `WOQLClient` and `WOQLQuery`.

```bash
python -m pip install terminusdb-client
```

#### Install with dataframe

Install the Python client with the WOQL `dataframe`. The [WOQLDataFrame](https://terminusdb.github.io/terminusdb-client-python/woqlDataframe.html) enables query results to be converted to different formats such as [Pandas](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html).

```bash
python -m pip install terminusdb-client[dataframe]
```

If you are using a shell other than `bash`, such as `zsh`, you may need to use quotes.

```
python -m pip install 'terminusdb-client[dataframe]'
```

#### Install from source

Build and install the Python client from source.

```bash
python -m pip install git+https://github.com/terminusdb/terminusdb-client-python.git
```

## See also

### Start with a Client API

An example use of the Python client in [Start with a Client API](../quick-start/start-with-client.md).

### Client reference

[Python Client reference guides](../../terminusx-db/reference-guides/client.md#python-client-reference).

### Tutorials

More [JavaScript and Python Client tutorials](../../terminusx-db/tutorials/javascript-and-python-tutorials.md).
