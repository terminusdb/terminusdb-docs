# Install from Source Code

> **On this page:** Everything you need to install TerminusDB from source code.

## Key topics

[Requirements](#requirements)

[Install steps](#install-steps)

## Requirements

A list of prerequisite components depending on your operating system. Click on the required component to download it from the provider's website.

#### Table: Installation requirements

| Component | Version | Required to | ![info](../../img/ico/terminusdb-icon-linux.png)<br>Arch Linux | ![info](../../img/ico/terminusdb-icon-linux.png)<br>Debian or Ubuntu | ![info](../../img/ico/terminusdb-icon-linux.png)<br>Fedora or Red Hat | ![info](../../img/ico/terminusdb-icon-apple.png)<br>Mac&nbsp;&nbsp;OS<br><br> | ![info](../../img/ico/terminusdb-icon-windows.png)<br>Windows<br><br> |
| - | - | - | :-: | :-: | :-: | :-: | :-: |
| [apt](https://pkgs.org/download/apt) | `Latest` | Install SWI-Prolog                       |          | &#10004; |          |          | |
| [git](https://git-scm.com/downloads) | `Latest` | Clone TerminusDB rom GitHub              | &#10004; | &#10004; | &#10004; | &#10004; | | 
| [GitBash](https://git-scm.com/downloads) | `Latest` | Recommended shell                    | &#10004; | &#10004; | &#10004; | &#10004; | &#10004; |
| [Homebrew](https://brew.sh/) | `Latest` | Install Rust and SWI-Prolog         |          |          |          | &#10004; | |
| [Rust](https://www.rust-lang.org/tools/install) | `Latest` | Compile terminusdb                      | &#10004; | &#10004; | &#10004; | &#10004; | &#10004; |
| [sudo](https://www.sudo.ws/download.html) | `Latest` | Install SWI-Prolog                      | &#10004; | &#10004; | &#10004; |          | |
| [SWI-Prolog](https://www.swi-prolog.org/download/stable) | `Latest` | Install **terminusdb-store** | &#10004; | &#10004; | &#10004; | &#10004; | |
| [WSL](https://ubuntu.com/wsl) | `Latest` | Install a Windows Sub-system for Linux   | &#10004; | &#10004; | &#10004; | &#10004; | &#10004; | 

## Install steps

Install, build and run TerminusDB from source code with the following steps.  

- [Install SWI-Prolog](#install-swi-prolog)
- [Run SWI-Prolog](#run-swi-prolog)
- [Clone the TerminusDB repository](#clone-the-terminusdb-repository)
- [Make the TerminusDB Command Line Interface](#make-the-terminusdb-command-line-interface)
- [Run the TerminusDB system database](#run-the-terminusdb-system-database)

>:information_source:&nbsp;<i class="tdb-i">![info](../../img/ico/terminusdb-icon-windows.png)</i>**Install from source code on Windows:**<br>
> - Install a [WSL](https://ubuntu.com/wsl) and install [Ubuntu](https://ubuntu.com/#download)
> 
>
> - In Ubuntu terminal: `sudo apt install make`
>
> 
> - In Ubuntu terminal: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
>
> 
> - Follow the install steps below for **Debian or Ubuntu**
<!-- to-do: install rust for Mac (combine with SWI-Prolog?) -->
### Install SWI-Prolog

<br>

<!-- tabs:start -->

### **Debian or Ubuntu**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-linux.png)</i>

Install using [apt package manager](https://pkgs.org/download/apt) and [sudo](https://www.sudo.ws/download.html).

```bash
cat /etc/*release | grep ubuntu > /dev/null && (sudo apt-get install software-properties-common; sudo apt-add-repository ppa:swi-prolog/stable)

sudo apt-get update

sudo apt install swi-prolog
```

### **Fedora or Red Hat**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-linux.png)</i>

Install using [sudo](https://www.sudo.ws/download.html).

```bash
sudo dnf install pl pl-devel
```

### **Arch Linux**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-linux.png)</i>

Install using [sudo](https://www.sudo.ws/download.html) and [git](https://git-scm.com/downloads).

```bash
sudo pacman -S git swi-prolog make automake autoconf libtool zlib pkgconf gcc
```

### **Mac OS**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-apple.png)</i>

Install using [homebrew](https://brew.sh/).

```bash
brew install swi-prolog
```

<!-- tabs:end -->

### Run SWI-Prolog

<br>

<!-- tabs:start -->

### **Linux**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-linux.png)</i>

```bash
swipl

pack_install(terminus_store_prolog).
```

### **Mac OS**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-apple.png)</i>

```bash
swipl

pack_install(terminus_store_prolog).
```
<!-- tabs:end -->

### Clone the TerminusDB repository

Identical for all operating systems: Clone the `terminusdb` repository from GitHub. 

```bash
git clone https://github.com/terminusdb/terminusdb
```

### Make the TerminusDB CLI

Identical for all operating systems: Run `make` to make the `terminusdb` [Command Line Interface (CLI)](reference-guides/reference-cli) binary. 


```bash
cd terminusdb

make
```

### Run the TerminusDB system database

<br>

<!-- tabs:start -->

### **Linux**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-linux.png)</i>

- Initialize the system database and choose a password for the admin user.
- Start the server.  

```bash
./terminusdb store init --key "my_password_here"

./terminusdb serve
```

### **Mac OS**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-apple.png)</i>

- Initialize the system database.
- Start the server on `https://127.0.0.1:6363`.

```bash
./terminusdb store init --key root

./terminusdb serve
```

<!-- tabs:end -->

## See also

### The TerminusDB Command Line Interface

[The TerminusDB Command Line Interface](reference-guides/reference-cli)

### Install a JavaScript Client

[Install a JavaScript Client](install/install-javascript-client)

### Install a Python Client

[Install a Python Client](install/install-python-client)
