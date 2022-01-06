# Install from Source Code

> **On this page:** Everything you need to install TerminusDB from source code.

## Key topics

[Requirements](install-from-source-code.md#requirements)

[Install steps](install-from-source-code.md#install-steps)

## Requirements

A list of prerequisite components depending on your operating system. Click on the required component to download it from the provider's website.

#### Table: Installation requirements

| Component                                                | Version  | Required to:                            | Arch Linux | Debian or Ubuntu | Fedora or Red Hat | macOS | <p><img src="../../../img/ico/terminusdb-icon-windows.svg" alt="info"><br>Windows<br><br></p> |
| -------------------------------------------------------- | -------- | --------------------------------------- | :--------: | :--------------: | :---------------: | :---: | :-------------------------------------------------------------------------------------------: |
| [apt](https://pkgs.org/download/apt)                     | `Latest` | Install SWI-Prolog.                     |            |         ✔        |                   |       |                                                                                               |
| [clang](https://releases.llvm.org)                       | `Latest` | Make the **terminusdb-cli** library.    |      ✔     |         ✔        |         ✔         |       |                                                                                               |
| [git](https://git-scm.com/downloads)                     | `Latest` | Clone TerminusDB from GitHub.           |      ✔     |         ✔        |         ✔         |   ✔   |                                                                                               |
| [GitBash](https://git-scm.com/downloads)                 | `Latest` | Recommended shell.                      |      ✔     |         ✔        |         ✔         |   ✔   |                                               ✔                                               |
| [Homebrew](https://brew.sh)                              | `Latest` | Install Rust and SWI-Prolog.            |            |                  |                   |   ✔   |                                                                                               |
| [Rust](https://www.rust-lang.org/tools/install)          | `Latest` | Compile terminusdb.                     |      ✔     |         ✔        |         ✔         |   ✔   |                                               ✔                                               |
| [sudo](https://www.sudo.ws/download.html)                | `Latest` | Install SWI-Prolog.                     |      ✔     |         ✔        |         ✔         |       |                                                                                               |
| [SWI-Prolog](https://www.swi-prolog.org/download/stable) | `Latest` | Install **terminusdb-store**.           |      ✔     |         ✔        |         ✔         |   ✔   |                                                                                               |
| [WSL](https://ubuntu.com/wsl)                            | `Latest` | Install a Windows Sub-system for Linux. |            |         ✔        |                   |       |                                                                                               |

## Install steps

Install, build and run TerminusDB from source code with the following steps.

* [Install SWI-Prolog](install-from-source-code.md#install-swi-prolog)
* [Run SWI-Prolog](install-from-source-code.md#run-swi-prolog)
* [Clone the TerminusDB repository](install-from-source-code.md#clone-the-terminusdb-repository)
* [Make the TerminusDB Command Line Interface](install-from-source-code.md#make-the-terminusdb-command-line-interface)
* [Run the TerminusDB system database](install-from-source-code.md#run-the-terminusdb-system-database)

?> ![info](../../../img/ico/terminusdb-icon-windows.svg) **Install from source code on Windows:**\
\
Install [WSL](https://ubuntu.com/wsl) and [Ubuntu](https://ubuntu.com/#download)\
\
In Ubuntu terminal: `sudo apt install make`\
\
In Ubuntu terminal: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`\
\
Follow the install steps below for **Debian or Ubuntu**

### Install SWI-Prolog

\\

### **Linux**

![info](../../../img/ico/terminusdb-icon-linux.svg)

Install [Rust](https://www.rust-lang.org/tools/install) by following the Rust installation guide.

**Arch Linux**

Install all dependencies of all the required libraries using [sudo](https://www.sudo.ws/download.html) and [git](https://git-scm.com/downloads).

```bash
sudo pacman -S git swi-prolog make automake autoconf libtool zlib pkgconf gcc
```

**Debian or Ubuntu**

Install using [apt package manager](https://pkgs.org/download/apt) and [sudo](https://www.sudo.ws/download.html).

```bash
cat /etc/*release | grep ubuntu > /dev/null && (sudo apt-get install software-properties-common; sudo apt-add-repository ppa:swi-prolog/stable)

sudo apt-get update

sudo apt install swi-prolog
```

**Fedora or Red Hat**

Install using [sudo](https://www.sudo.ws/download.html).

```bash
sudo dnf install pl pl-devel
```

### **macOS**

![info](../../../img/ico/terminusdb-icon-apple.svg)

Install `swi-prolog` and `rust` using [homebrew](https://brew.sh).

```bash
brew install swi-prolog
brew install rust
```

### Run SWI-Prolog

\\

### **Linux**

![info](../../../img/ico/terminusdb-icon-linux.svg)

```bash
swipl

pack_install(terminus_store_prolog).

pack_install(tus).

halt.
```

### **macOS**

![info](../../../img/ico/terminusdb-icon-apple.svg)

```bash
swipl

pack_install(terminus_store_prolog).

pack_install(tus).

halt.
```

### Clone the TerminusDB repository

Identical for all operating systems: Clone the `terminusdb` repository from GitHub.

```bash
git clone https://github.com/terminusdb/terminusdb
```

### Make the TerminusDB Command Line Interface

`make` the `terminusdb` [Command Line Interface (CLI)](../../../terminusdb/install/reference/reference-cli/) binary.

### **Linux**

![info](../../../img/ico/terminusdb-icon-linux.svg)

```bash
sudo apt install clang

cd terminusdb

make
```

### **macOS**

![info](../../../img/ico/terminusdb-icon-apple.svg)

```bash
cd terminusdb

make
```

### Run the TerminusDB system database

\\

### **Linux**

![info](../../../img/ico/terminusdb-icon-linux.svg)

* Initialize the system database and choose a password for the admin user.
* Server starts on https://127.0.0.1:6363

```bash
./terminusdb store init --key "my_password_here"

./terminusdb serve
```

### **macOS**

![info](../../../img/ico/terminusdb-icon-apple.svg)

* Initialize the system database.
* Server starts on https://127.0.0.1:6363

```bash
./terminusdb store init --key root

./terminusdb serve
```

## See also

### The TerminusDB Command Line Interface

[The TerminusDB Command Line Interface](../../../terminusdb/install/reference/reference-cli/)

### Install a JavaScript Client

[Install a JavaScript Client](../../../terminusdb/install/install/install-javascript-client/)

### Install a Python Client

[Install a Python Client](../../../terminusdb/install/install/install-python-client/)
