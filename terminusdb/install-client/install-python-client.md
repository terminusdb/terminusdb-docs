---
description: Everything you need to install and run a TerminusDB Python client
---

# Install Python Client

### Requirements

A list of prerequisite components depending on your operating system. Click on the required component to download it from the provider's website.

**Installation requirements**

<table><thead><tr><th>Required</th><th width="109">Version</th><th>Required to:</th><th width="93" align="center">Linux</th><th width="103" align="center">macOS</th><th width="111" align="center">Windows</th></tr></thead><tbody><tr><td><a href="broken-reference">TerminusDB bootstrap</a></td><td><code>Latest</code></td><td>Install the TerminusDB server as a Docker container.</td><td align="center">✔</td><td align="center">✔</td><td align="center">✔</td></tr><tr><td><a href="https://git-scm.com/downloads">Git</a></td><td><code>Latest</code></td><td>Build and install the Python client from source.</td><td align="center">✔</td><td align="center">✔</td><td align="center">✔</td></tr><tr><td><a href="https://git-scm.com/downloads">GitBash</a></td><td><code>Latest</code></td><td>Use the Python CLI (recommended shell.)</td><td align="center">✔</td><td align="center">✔</td><td align="center">✔</td></tr><tr><td><a href="https://www.python.org/downloads/">Python</a></td><td><code>3.6+</code></td><td>Use the TerminusDB Python client.</td><td align="center">✔</td><td align="center">✔</td><td align="center">✔</td></tr></tbody></table>

### Install steps

Install and use the TerminusDB Python client with the following steps.

* [Install the TerminusDB bootstrap](install-python-client.md#install-the-terminusdb-bootstrap)
* [Install the latest Python components](install-python-client.md#install-the-latest-python-components)
* [Install the TerminusDB Python client](install-python-client.md#install-the-terminusdb-python-client)

#### Install the TerminusDB bootstrap

Install the TerminusDB server `terminusdb-server` as a [Docker container](../install/install-as-docker-container.md).

#### Install the latest Python components

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

#### Install the TerminusDB Python client

Choose one of the following Python client install options.

* [Install the core](install-python-client.md#install-the-core)
* [Install with dataframe](install-python-client.md#install-with-dataframe)
* [Install from source](install-python-client.md#install-from-source)

#### **Install the core**

Install the core Python client. The core includes `WOQLClient` and `WOQLQuery`.

```bash
python -m pip install terminusdb-client
```

#### **Install with dataframe**

Install the Python client with the WOQL `dataframe`. The [WOQLDataFrame](https://terminusdb.github.io/terminusdb-client-python/woqlDataframe.html) enables query results to be converted to different formats such as [Pandas](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html).

```bash
python -m pip install terminusdb-client[dataframe]
```

If you are using a shell other than `bash`, such as `zsh`, you may need to use quotes.

```
python -m pip install 'terminusdb-client[dataframe]'
```

#### **Install from source**

Build and install the Python client from source.

```bash
python -m pip install git+https://github.com/terminusdb/terminusdb-client-python.git
```

### Further reading

#### [Python Client API Basics](../../guides/how-to-guides/use-the-python-client/)

#### [Python Client Reference Guide](../../guides/reference-guides/python-client-reference/terminusdb\_client.client.md)

#### [Getting Started with the Python Client Tutorials](https://github.com/terminusdb/terminusdb-tutorials/tree/master/getting\_started/python-client)
