# Install a Python Client

> **On this page:** Everything you need to install and run a TerminusDB Python client.

**Key topics**

[Requirements](#requirements)

[Install steps](#install-steps)

## Requirements

A list of prerequisite components depending on your operating system. Click on the required component to download it from the provider's website.

#### Installation requirements

| Required                                    | Version   | Required to:                             | ![info](../../img/ico/terminusdb-icon-linux.png)<br>Linux | ![info](../../img/ico/terminusdb-icon-apple.png)<br>MacOS | ![info](../../img/ico/terminusdb-icon-windows.png)<br>Windows |
| ------------------------                    | --------- | ------------------------                 | :------: | :------: | :------: |
| [TerminusDB bootstrap](install/install-as-docker-container) | `Latest`  | Install the TerminusDB server as a Docker container | &#10004; | &#10004; | &#10004; |
| [Git](https://git-scm.com/downloads)        | `Latest`  | Build and install the Python client from source. | &#10004; | &#10004; | &#10004; |
| [GitBash](https://git-scm.com/downloads)    | `Latest ` | Use the Python CLI (recommended shell)   | &#10004; | &#10004; | &#10004; |
| [Python](https://www.python.org/downloads/) | `3.6+`    | Use the TerminusDB Python client         | &#10004; | &#10004; | &#10004; |

## Install steps

Install and use the TerminusDB Python client with the following steps.  

- [Install the TerminusDB bootstrap](#install-the-terminusdb-bootstrap)
- [Install the latest Python components](#install-the-latest-python-components)
- [Install the TerminusDB Python client](#install-the-terminusdb-python-client)

### Install the TerminusDB bootstrap

Follow the [TerminusDB bootstrap](install/install-as-docker-container) instructions to install the TerminusDB server `terminusdb-server` as a Docker container. 

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

## See also

### Start with a Client API

An example use of the Python client in [Start with a Client API](terminusx/start-with-a-client?id=connect-with-woqlclient).

### Client reference

[Python client reference guides](reference/reference-client?id=python-client-reference).

### Tutorials

More [JavaScript and Python client tutorials](reference/reference-client?id=tutorials).