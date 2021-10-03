# Install from Source Code

> **On this page:** Everything you need to install TerminusDB from source code.

## Key topics

[Requirements](#requirements)

[Install steps](#install-steps)

## Requirements

A list of prerequisite components depending on your operating system. Click on the required component to download it from the provider's website.

#### Table: Installation requirements

| Component | Version | Required to | ![info](../../img/ico/terminusdb-icon-linux-v2.png)<br>Arch Linux | ![info](../../img/ico/terminusdb-icon-linux.png)<br>Debian or Ubuntu | ![info](../../img/ico/terminusdb-icon-linux.png)<br>Fedora or Red Hat | ![info](../../img/ico/terminusdb-icon-apple.png)<br>Mac&nbsp;&nbsp;OS<br><br> | ![info](../../img/ico/terminusdb-icon-windows.png)<br>Windows<br><br> |
| - | - | - | :-: | :-: | :-: | :-: | :-: |
| [apt](to-do) | `Latest` | Install SWI-Prolog                       |          | &#10004; |          |          | |
| [git](to-do) | `Latest` | Clone TerminusDB rom GitHub              | &#10004; | &#10004; | &#10004; | &#10004; | | 
| [GitBash](to-do) | `Latest` | Recommended shell                    | &#10004; | &#10004; | &#10004; | &#10004; | &#10004; |
| [Homebrew](to-do) | `Latest` | Install Rust and SWI-Prolog         |          |          |          | &#10004; | |
| [Rust](to-do) | `Latest` | Compile terminusdb                      | &#10004; | &#10004; | &#10004; | &#10004; | &#10004; |
| [sudo](to-do) | `Latest` | Install SWI-Prolog                      | &#10004; | &#10004; | &#10004; |          | |
| [SWI-Prolog](to-do) | `Latest` | Install [terminusdb-store](to-do) | &#10004; | &#10004; | &#10004; | &#10004; | |
| [WSL](to-do) | `Latest` | Install a Windows Sub-system for Linux   | &#10004; | &#10004; | &#10004; | &#10004; | &#10004; | 



| Component | Version | Required to | Arch Linux |Debian or Ubuntu | Fedora or Red Hat | Mac OS | Windows |
| - | - | - | :-: | :-: | :-: | :-: | :-: |
| [apt](to-do) | `Latest` | Install SWI-Prolog                       |          | &#10004; |          |          | |
| [git](to-do) | `Latest` | Clone TerminusDB rom GitHub              | &#10004; | &#10004; | &#10004; | &#10004; | | 
| [GitBash](to-do) | `Latest` | Recommended shell                    | &#10004; | &#10004; | &#10004; | &#10004; | &#10004; |
| [Homebrew](to-do) | `Latest` | Install Rust and SWI-Prolog         |          |          |          | &#10004; | |
| [Rust](to-do) | `Latest` | Compile terminusdb                      | &#10004; | &#10004; | &#10004; | &#10004; | &#10004; |
| [sudo](to-do) | `Latest` | Install SWI-Prolog                      | &#10004; | &#10004; | &#10004; |          | |
| [SWI-Prolog](to-do) | `Latest` | Install [terminusdb-store](to-do) | &#10004; | &#10004; | &#10004; | &#10004; | |
| [WSL](to-do) | `Latest` | Install a Windows Sub-system for Linux   | &#10004; | &#10004; | &#10004; | &#10004; | &#10004; | 

## Install steps

Install, build and run TerminusDB from source code with the following steps.  

- [Install SWI-Prolog](#install-swi-prolog)
- [Run SWI-Prolog](#run-swi-prolog)
- [Clone the TerminusDB repository](#clone-the-terminusdb-repository)
- [Make the TerminusDB Command Line Interface](#make-the-terminusdb-command-line-interface)
- [Run the TerminusDB system database](#run-the-terminusdb-system-database)

>:information_source:&nbsp;<i class="tdb-i">![info](../../img/ico/terminusdb-icon-windows.png)</i>**Install from source code on Windows:**<br>
> - Install a [WSL](to-do) and install [Ubuntu](to-do)
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

Install using [apt package manager](to-do) and [sudo](to-do).

```bash

cat /etc/*release | grep ubuntu > /dev/null && (sudo apt-get install software-properties-common; sudo apt-add-repository ppa:swi-prolog/stable)


```

```bash

sudo apt-get update


```

```bash

sudo apt install swi-prolog


```

### **Fedora or Red Hat**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-linux.png)</i>

Install using [sudo](to-do).

```bash

sudo dnf install pl pl-devel


```

### **Arch Linux**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-linux.png)</i>

Install using [sudo](to-do) and [git](to-do).

```bash

sudo pacman -S git swi-prolog make automake autoconf libtool zlib pkgconf gcc


```

### **Mac OS**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-apple.png)</i>

Install using [homebrew](to-do).

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


```

```

pack_install(terminus_store_prolog).


```

### **Mac OS**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-apple.png)</i>

```bash

swipl


```

```bash

pack_install(terminus_store_prolog).


```
<!-- tabs:end -->


### Clone the TerminusDB repository

Identical for all operating systems: Clone the `terminusdb` repository from GitHub. 

```bash

git clone https://github.com/terminusdb/terminusdb


```

### Make the TerminusDB CLI

Identical for all operating systems: Run `make` to make the `terminusdb` [Command Line Interface (CLI)](to-do) binary. 


```bash

cd terminusdb


```


```bash

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


```

```bash

./terminusdb serve


```

### **Mac OS**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-apple.png)</i>

- Initialize the system database.
- Start the server on `https://127.0.0.1:6363`.

```bash

./terminusdb store init --key root


```

```bash

./terminusdb serve


```

<!-- tabs:end -->

## See also

### The TerminusDB Command Line Interface

[The TerminusDB Command Line Interface](command-line-interface)

### Install a JavaScript Client

### Install a Python Client