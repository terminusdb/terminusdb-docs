---
description: Everything you need to install TerminusDB from source code
---

# Install from Source Code

## Requirements

A list of prerequisite components depending on your operating system. Click on the required component to download it from the provider's website.

#### Table: Installation requirements

| Component                                                | Version  | Required to:                            | Arch Linux | Debian or Ubuntu | Fedora or Red Hat | macOS | Windows |
| -------------------------------------------------------- | -------- | --------------------------------------- | :--------: | :--------------: | :---------------: | :---: | :-----: |
| [clang](https://releases.llvm.org)                       | `Latest` | Make the **terminusdb-store** library.  |      ✔     |         ✔        |         ✔         |       |         |
| [git](https://git-scm.com/downloads)                     | `Latest` | Clone TerminusDB from GitHub.           |      ✔     |         ✔        |         ✔         |   ✔   |         |
| [GitBash](https://git-scm.com/downloads)                 | `Latest` | Recommended shell for Windows.          |            |                  |                   |       |    ✔    |
| [Homebrew](https://brew.sh)                              | `Latest` | Install Rust and SWI-Prolog.            |            |                  |                   |   ✔   |         |
| [Rust](https://www.rust-lang.org/tools/install)          | `Latest` | Compile terminusdb.                     |      ✔     |         ✔        |         ✔         |   ✔   |    ✔    |
| [sudo](https://www.sudo.ws/download.html)                | `Latest` | Install SWI-Prolog.                     |      ✔     |         ✔        |         ✔         |       |         |
| [SWI-Prolog](https://www.swi-prolog.org/download/stable) | `Latest` | Install **terminusdb-store**.           |      ✔     |         ✔        |         ✔         |   ✔   |         |
| [WSL](https://ubuntu.com/wsl)                            | `Latest` | Install a Windows Sub-system for Linux. |            |                  |                   |       |    ✔    |

## Install steps

Install, build and run TerminusDB from source code with the following steps.

* [Install SWI-Prolog](install-from-source-code.md#install-swi-prolog)
* [Clone the TerminusDB repository](install-from-source-code.md#clone-the-terminusdb-repository)
* [Make the TerminusDB Command Line Interface](install-from-source-code.md#make-the-terminusdb-command-line-interface)
* [Run the TerminusDB system database](install-from-source-code.md#run-the-terminusdb-system-database)

{% hint style="info" %}
**Install from source code on Windows:**\
\
Install [WSL](https://ubuntu.com/wsl) and [Ubuntu](https://ubuntu.com/#download)\
\
In Ubuntu terminal: `sudo apt install make libgmp-dev`\
\
In Ubuntu terminal: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`\
\
Follow the install steps below for **Debian or Ubuntu**
{% endhint %}

### Install SWI-Prolog, Rust and clang

{% tabs %}
{% tab title="Linux" %}
Install [Rust](https://www.rust-lang.org/tools/install) by following the Rust installation guide.

***

**Arch Linux**

Install all dependencies of all the required libraries using [sudo](https://www.sudo.ws/download.html) and [git](https://git-scm.com/downloads).

```bash
sudo pacman -S git swi-prolog make automake autoconf libtool zlib pkgconf gcc clang gmp
```

***

**Debian or Ubuntu**

Install using the apt package manager.

```bash
cat /etc/*release | grep ubuntu > /dev/null && (sudo apt-get install software-properties-common; sudo apt-add-repository ppa:swi-prolog/stable)
sudo apt-get update
sudo apt install swi-prolog clang libgmp-dev
```

***

**Fedora or Red Hat**

Install using [sudo](https://www.sudo.ws/download.html).

```bash
sudo dnf install pl pl-devel clang gmp-devel
```
{% endtab %}

{% tab title="macOS" %}
Install `swi-prolog` and `rust` using [homebrew](https://brew.sh).

```bash
brew install gmp
brew install swi-prolog
brew install rust
```
{% endtab %}
{% endtabs %}

### Clone the TerminusDB repository

Identical for all operating systems: Clone the `terminusdb` repository from GitHub.

```bash
git clone https://github.com/terminusdb/terminusdb
```

### Make the TerminusDB Command Line Interface

`make` the `terminusdb` [Command Line Interface (CLI)](../../guides/reference-guides/cli.md) binary.

{% tabs %}
{% tab title="Linux" %}
```bash
cd terminusdb
make install-tus
make
make install-dashboard
```
{% endtab %}

{% tab title="macOS" %}
```
cd  terminusdb
make install-tus
make
make install-dashboard
```
{% endtab %}
{% endtabs %}

### Run the TerminusDB system database

{% tabs %}
{% tab title="Linux" %}
* Initialize the system database and choose a password for the admin user.
* Server starts on `http://127.0.0.1:6363`

```
./terminusdb store init --key "my_password_here"
./terminusdb serve
```
{% endtab %}

{% tab title="macOS" %}
* Initialize the system database.
* Server starts on `http://127.0.0.1:6363`

```
./terminusdb store init --key root
./terminusdb serve
```
{% endtab %}
{% endtabs %}

## Further Reading

[**The TerminusDB Command Line Interface**](../../guides/reference-guides/cli.md)

[**Install a JavaScript Client**](../install-client/install-javascript-client.md)

[**Install a Python Client**](../install-client/install-python-client.md)
