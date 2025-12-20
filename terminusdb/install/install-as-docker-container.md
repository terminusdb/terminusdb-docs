---
description: >-
  Everything you need to install and run TerminusDB server as a docker container
  on your computer or on a remote server
---

# Install as a Docker Container

### Requirements

The container script is distributed via GitHub, so you will need Git to clone and update the TerminusDB bootstrap repo. You will also need Docker running.

A list of prerequisite components depending on your operating system. Click on the required component to download it from the provider's website.

#### Table: Installation requirements

<table><thead><tr><th width="149">Component</th><th width="114">Version</th><th>Required to:</th><th width="82" align="center">Linux</th><th width="105" align="center">macOS</th><th width="107" align="center">Windows</th></tr></thead><tbody><tr><td><a href="https://git-scm.com/downloads">Git</a></td><td><code>Latest</code></td><td>Clone the TerminusDB bootstrap and run the container script.</td><td align="center">✔</td><td align="center">✔</td><td align="center">✔</td></tr><tr><td><a href="https://git-scm.com/downloads">Git Bash</a></td><td><code>Latest</code></td><td>Windows users should use the application "Git Bash" for all terminal commands described below, this application comes with Git for Windows.</td><td align="center"></td><td align="center"></td><td align="center">✔</td></tr><tr><td><a href="https://www.sudo.ws/download.html">Sudo</a></td><td><code>Latest</code></td><td>Access security (optional).</td><td align="center">✔</td><td align="center">✔</td><td align="center"></td></tr><tr><td><a href="https://www.docker.com/products/docker-desktop">Docker</a></td><td><code>Latest</code></td><td>Use the TerminusDB docker container.</td><td align="center">✔</td><td align="center">✔</td><td align="center">✔</td></tr></tbody></table>

{% hint style="info" %}
**Docker memory allocation on Windows**\
On Windows, the default memory allocated for the Docker is **2GB**. TerminusDB is an in-memory database so it is advised to increase the allocation in Docker desktop settings.
{% endhint %}

{% hint style="success" %}
**Install TerminusDB on Windows with Docker Guide**

For a comprehensive guide to installing on Windows, our friends at DFRNT put this blog together - [Run TerminusDB on Windows with Docker](https://dfrnt.com/blog/2023-02-25-run-terminusdb-on-windows-with-docker/)
{% endhint %}

{% hint style="info" %}
**Linux package manager**\
On Linux, use your distro's package manager for containerized deployments or find more information here: [https://www.docker.com/products/container-runtime](https://www.docker.com/products/container-runtime)
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

Run the container using `terminusdb-container` script.

#### Running for the first time

Run the container with the parameter `run`. See [Environment configuration](install-as-docker-container.md#environment-configuration) for further configuration options.

```bash
./terminusdb-container run
```

This generates the message: `terminusdb-server container started http://127.0.0.1:6363/`. This is the TerminusDB Server and [Console](install-as-docker-container.md#use-the-console) URL.

#### Subsequent runs

* Stop the container if it is running.
* Remove previous volumes. Enter `y` to confirm removal when prompted.
* Rerun the container.

{% hint style="danger" %}
**Warning:** Removing previous volumes will erase local data.
{% endhint %}

```bash
./terminusdb-container stop
./terminusdb-container rm
./terminusdb-container run
```

### Use the console

Open the TerminusDB console in a web browser using the URL.

```http
http://127.0.0.1:6363/dashboard
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

### Use the Dashboard

The TerminusDB local dashboard is included within terminusdb-bootstrap. The dashboard is a UI to create and manage data products, model data, and test queries. To use the dashboard visit:

```
localhost:6363/dashboard/ 
```

### Use GraphQL

TerminusDB hosts a GraphQL endpoint at:

```
SERVERNAME/api/graphql/ORG/DATAPRODUCT
```

For instance, with a data product named `admin/people`, and a locally installed TerminusDB, you can query it at:

```
http://127.0.0.1:6363/api/graphql/admin/people
```

TerminusDB ships with a GraphiQL graphical GraphQL query interface and schema browser. This is a quick way to get acquainted with GraphQL in TerminusDB.

You can reach this browser at:

```
http://127.0.0.1:6363/api/graphiql/admin/people
```

You will need to set your Authorization header in the Header dialog box at the bottom center.

For instance, in the default install, as:

```json
{
  "Authorization": "Basic YWRtaW46cm9vdA=="
}
```

## Environment configuration

The container script uses a set of environment variables with default values. You can configure the environment by setting these variables.

#### The environment file

The `terminusdb-bootstrap` directory contains the file `ENV.example`. This file holds all configurable environment variables. The container script uses the file `ENV` **if** it exists in the `terminusdb-bootstrap` directory.

To run the container script with values specific to your environment:

* Copy `ENV.example` to `ENV`: `cp ENV.example ENV`
* Edit `ENV` to uncomment and set environment variable/s: `vi ENV`
* Run the container as usual: `./terminusdb-container run`

#### Environment variables reference

A description of some of the environment variables in `ENV.example` and their defaults.

#### Table: Environment variables reference

| Environment variable name | Default value                  | Description                                                |
| ------------------------- | ------------------------------ | ---------------------------------------------------------- |
| `TERMINUSDB_DOCKER`       | `sudo docker`                  | Default docker command                                     |
| `TERMINUSDB_CONTAINER`    | `terminusdb-server`            | Name of the running container                              |
| `TERMINUSDB_REPOSITORY`   | `terminusdb/terminusdb-server` | TerminusDB docker image                                    |
| `TERMINUSDB_NETWORK`      | `bridge`                       | Docker network mode                                        |
| `TERMINUSDB_TAG`          | `latest`                       | The latest version of the `terminusdb-server` docker image |
| `TERMINUSDB_STORAGE`      | `terminusdb_storage_local`     | Storage volume name                                        |
| `TERMINUSDB_PORT`         | `6363`                         | The port used for TerminusDB                               |
| `TERMINUSDB_LOCAL`        | `your-folder-name`             | Local folder to mount inside container                     |
| `TERMINUSDB_SERVER`       | `127.0.0.1`                    | Server on which TerminusDB runs                            |
| `TERMINUSDB_PASS`         | `root`                         | Password for accessing TerminusDB                          |

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

By default, the Docker container binds to IP `127.0.0.1`. This prevents insecure deployments and ensures the TerminusDB server is accessible on a local computer only.

### Remote server deployment

To deploy the TerminusDB server to a remote machine:

* Enable HTTPS with a remote proxy like Nginx
* [Run the container](install-as-docker-container.md#run-the-container-1)

#### Run the container

Run the container script with the `run` parameter as usual.

```bash
./terminusdb-container run
```
