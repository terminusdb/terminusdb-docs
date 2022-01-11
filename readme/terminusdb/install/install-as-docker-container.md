# Install as a Docker Container

> **On this page:** Everything you need to install and run TerminusDB server as a docker container on your computer or on a remote server.

**Key topics**

[Requirements](install-as-docker-container.md#requirements)

[Install steps](install-as-docker-container.md#install-steps)

[Environment configuration](install-as-docker-container.md#environment-configuration)

[Server deployment](install-as-docker-container.md#server-deployment)

## Requirements

A list of prerequisite components depending on your operating system. Click on the required component to download it from the provider's website.

#### Table: Installation requirements

| Component                                                            | Version  | Required to:                                                 | Linux | macOS | Windows |
| -------------------------------------------------------------------- | -------- | ------------------------------------------------------------ | :---: | :---: | :-----: |
| [Git](https://git-scm.com/downloads)                                 | `Latest` | Clone the TerminusDB bootstrap and run the container script. |   ✔   |   ✔   |    ✔    |
| [Git Bash](https://git-scm.com/downloads)                            | `Latest` | Clone the TerminusDB bootstrap and run the container script. |   ✔   |   ✔   |    ✔    |
| [Sudo](https://www.sudo.ws/download.html)                            | `Latest` | Access security.                                             |   ✔   |   ✔   |    ✔    |
| [Docker](https://www.docker.com/products/docker-desktop)             | `Latest` | Use the TerminusDB docker container.                         |       |   ✔   |    ✔    |
| [Package manager](https://www.docker.com/products/container-runtime) | `Latest` | Implement docker for Linux systems.                          |   ✔   |       |         |

{% hint style="info" %}
**Docker memory allocation on Windows**\
On Windows, the default memory allocated for the Docker is **2GB**. TerminusDB is an in-memory database so it is advised to increase the allocation in Docker desktop settings.
{% endhint %}

{% hint style="info" %}
**Linux package manager**\
On Linux, use your distro's package manager for containerized deployments. Click on the Package manager link in the requirements table above for more information.
{% endhint %}

## Install steps

Install and run the TerminusDB container with the following steps.

* [Clone the TerminusDB bootstrap](install-as-docker-container.md#clone-the-terminusdb-bootstrap)
* [Run the container](install-as-docker-container.md#run-the-container)
* [Use the console](install-as-docker-container.md#use-the-console)

### Clone the TerminusDB bootstrap

`clone` the `terminusdb-bootstrap` repository and `cd` to it.

```bash
git clone https://github.com/terminusdb/terminusdb-bootstrap
```

```bash
cd terminusdb-bootstrap
```

### Run the container

Run the container using script `terminusdb-container`.

#### Running for the first time

Set the runtime environment to the development release `TERMINUSDB_TAG=dev` and run the container with parameter `run`. See [Environment configuration](install-as-docker-container.md#environment-configuration) for further configuration options.

```bash
TERMINUSDB_TAG=dev ./terminusdb-container run
```

This generates the message: `terminusdb-server container started https://127.0.0.1:6363/`. This is the TerminusDB Server and [Console](install-as-docker-container.md#use-the-console) URL.

#### Subsequent runs

* Stop the container if it is running.
* Remove previous volumes. Enter `y` to confirm removal when prompted.
* Rerun the container.

{% hint style="danger" %}
**Warning:** Removing previous volumes will erase local data.
{% endhint %}

```bash
TERMINUSDB_TAG=dev 
./terminusdb-container stop
./terminusdb-container rm
./terminusdb-container run
```

### Use the console

Open the TerminusDB console in a web browser using the container [script](install-as-docker-container.md#script) or the [URL](install-as-docker-container.md#URL).

#### Script

```bash
./terminusdb-container console
```

#### URL

```http
https://127.0.0.1:6363/
```

#### Console commands

Run container script without a parameter to list the available commands.

```bash
./terminusdb-container 
```

The available commands are listed as follows.

```
USAGE:
  terminusdb-container [COMMAND]

  help        show usage
  run         run container
  stop        stop container
  console     launch console in web browser
  attach      attach to prolog shell
  exec        execute a command inside the container
  rm          remove volumes
```

## Environment configuration

The container script uses a set of environment variables with default values. You can configure the environment by setting these variables.

### The environment file

The `terminusdb-bootstrap` directory contains the file `ENV.example`. This file holds all configurable environment variables. The container script uses the file `ENV` **if** it exists in the `terminusdb-bootstrap` directory.

To run the container script with values specific to your environment:

* Copy `ENV.example` to `ENV`: `cp ENV.example ENV`
* Edit `ENV` to uncomment and set environment variable/s: `vi ENV`
* Run the container as usual: `./terminusdb-container run`

### Environment variables reference

A description of some of the environment variables in `ENV.example` and their defaults.

#### Table: Environment variables reference

| Environment variable name     | Default value                                                                                             | Description                                                |
| ----------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `TERMINUSDB_DOCKER`           | `sudo docker`                                                                                             | Default docker command                                     |
| `TERMINUSDB_CONTAINER`        | `terminusdb-server`                                                                                       | Name of the running container                              |
| `TERMINUSDB_REPOSITORY`       | `terminusdb/terminusdb-server`                                                                            | TerminusDB docker image                                    |
| `TERMINUSDB_NETWORK`          | `bridge`                                                                                                  | Docker network mode                                        |
| `TERMINUSDB_TAG`              | `latest`                                                                                                  | The latest version of the `terminusdb-server` docker image |
| `TERMINUSDB_STORAGE`          | `terminusdb_storage_local`                                                                                | Storage volume name                                        |
| `TERMINUSDB_PORT`             | `6363`                                                                                                    | The port used for TerminusDB                               |
| `TERMINUSDB_LOCAL`            | `your-folder-name`                                                                                        | Local folder to mount inside container                     |
| `TERMINUSDB_SERVER`           | `127.0.0.1`                                                                                               | Server on which TerminusDB runs                            |
| `TERMINUSDB_PASS`             | `root`                                                                                                    | Password for accessing TerminusDB                          |
| `TERMINUSDB_AUTOLOGIN`        | `false`                                                                                                   | Automatic login as administration console                  |
| `TERMINUSDB_CONSOLE`          | [URL of the TerminusDB console](http://127.0.0.1/console)                                                 |                                                            |
| `TERMINUSDB_CONSOLE_BASE_URL` | [URL of the hosted console](https://unpkg.com/@terminusdb/terminusdb-console@SOME\_VERSION/console/dist/) |                                                            |
| `TERMINUSDB_HTTPS_ENABLED`    | `false`                                                                                                   | Enable `HTTPS`                                             |
| `TERMINUSDB_SSL_CERT`         | _A self-signed cert_                                                                                      | Path to SSL cert inside `terminusdb-server` container      |
| `TERMINUSDB_SSL_CERT_KEY`     | _A self-created private key_                                                                              | Path to private key for SSL cert inside container          |

### Examples of setting environment variables

Examples of environment variables you can set when running the container script. Replace the `[COMMAND]` property in the examples below with the parameter you want to use.

#### Mount a local directory inside the container

```bash
TERMINUSDB_LOCAL=/path/to/dir ./terminusdb-container [COMMAND]
```

#### Set the Docker Volume name

```bash
TERMINUSDB_STORAGE=terminus_storage_local ./terminusdb-container [COMMAND]
```

#### Use the latest release

```bash
TERMINUSDB_TAG=latest ./terminusdb-container [COMMAND]
```

#### Use the development release

```bash
TERMINUSDB_TAG=dev ./terminusdb-container [COMMAND]
```

#### Use a specific release instead of the latest release

```bash
TERMINUSDB_TAG=v1.1.2 ./terminusdb-container [COMMAND]
```

#### Use local version of the TerminusDB console instead of the published version

```bash
TERMINUSDB_CONSOLE_BASE_URL=//127.0.0.1:3005 ./terminusdb-container [COMMAND]
```

#### Do not use sudo even when sudo is available

```bash
TERMINUSDB_DOCKER=docker ./terminusdb-container [COMMAND]
```

#### Use podman instead of docker

```bash
TERMINUSDB_DOCKER="podman" ./terminusdb-container [COMMAND]
```

## Server deployment

{% hint style="info" %}
The TerminusDB server is deployed to your computer by default.
{% endhint %}

### Local computer deployment

HTTPS is disabled by default (`TERMINUSDB_HTTPS_ENABLED=false`) as it is not possible to provide a valid SSL certificate for `localhost`.

By default, the Docker container binds to IP `127.0.0.1`. This prevents insecure deployments and ensures the TerminusDB server is accessible on a local computer only.

### Remote server deployment

To deploy the TerminusDB server to a remote machine:

* [Enable HTTPS](install-as-docker-container.md#enable-https).
* [Specify a valid SSL certificate](install-as-docker-container.md#specify-a-valid-ssl-certificate).
* [Enable automatic login](install-as-docker-container.md#enable-automatic-login).
* [Run the container](install-as-docker-container.md#run-the-container-1)

#### Enable HTTPS

Enable HTTPS and accept any \*\* self-signed cert\*\* warnings issued by the browser.

```bash
TERMINUSDB_HTTPS_ENABLED=true 
```

#### Specify a valid SSL certificate

If possible, specify a valid certificate by setting paths to the certificate and certificate key. This also eliminates browser warnings.

```bash
TERMINUSDB_HTTPS_ENABLED=true
TERMINUSDB_SSL_CERT=/etc/letsencrypt/live/example.com/fullchain.pem
TERMINUSDB_SSL_CERT_KEY=/etc/letsencrypt/live/example.com/privkey.pem
```

#### Enable automatic login

Make your server available across the network by setting `TERMINUSDB_AUTOLOGIN` to `false`.

```bash
TERMINUSDB_AUTOLOGIN=false
```

#### Run the container

Run the container script with the `run` parameter as usual.

```bash
./terminusdb-container run
```
