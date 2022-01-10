# Install a JavaScript Client

> **On this page:** Everything you need to install and run a browser and promise-based TerminusDB JavaScript Client.

**Key topics**

[Requirements](install-javascript-client.md#requirements)

[Install steps](install-javascript-client.md#install-steps)

## Requirements

A list of prerequisite components depending on your operating system. Click on the required component to download it from the provider's website.

#### Table: Installation requirements

| Component                                     | Version  | Required to:                                                                                          | Linux | macOS | Windows |
| --------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------- | :---: | :---: | :-----: |
| [GitBash](https://git-scm.com/downloads)      | `Latest` | Use the `npm` CLI.                                                                                    |   ✔   |   ✔   |    ✔    |
| [NodeJS](https://nodejs.org/en/)              | `0.10+`  | Use NodeJS event functionality. Version `0.10` or higher is required, version `8.1.4` is recommended. |   ✔   |   ✔   |    ✔    |
| [npm](https://www.npmjs.com/package/download) | `Latest` | Use NodeJS package manager.                                                                           |   ✔   |   ✔   |    ✔    |

## Install steps

You can install and use the TerminusDB client as a [NodeJS module](install-javascript-client.md#install-client-as-a-nodejs-module) using `npm` or directly as a [minified JavaScript file](install-javascript-client.md#install-client-as-a-minified-script).

### Install client as a NodeJS module

Install TerminusDB client using `npm`.

```bash
$ npm install --save @terminusdb/terminusdb-client
```

### Install client as a minified script

Use the minified script `terminusdb-client.min.js` [in a CDN](install-javascript-client.md#use-in-a-cdn) or [download](install-javascript-client.md#download) it to a location of your choice.

#### Use in a CDN

Use the minified script in your Content Delivery Network (CDN.)

```html
<script src="https://unpkg.com/@terminusdb/terminusdb-client/dist/terminusdb-client.min.js"></script>
```

#### Download the script

Download the minified script from `https://unpkg.com/browse/@terminusdb/terminusdb-client@4.3.1/dist/` and save it to `[your-location]`.

```html
<script src="http://[your-location]/terminusdb-client.min.js"></script>
```

## See also

### Start with a Client API

An example use of the JavaScript client in [Start with a Client API](../quick-start/start-with-client.md).

### Client reference

[JavaScript Client reference guides](../../terminusx-db/reference-guides/client.md).

### Tutorials

More [JavaScript and Python Client tutorials](../../terminusx-db/tutorials/javascript-and-python-tutorials.md).
