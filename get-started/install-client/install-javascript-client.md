---
description: >-
  Everything you need to install and run a browser and promise-based TerminusDB
  JavaScript Client
---

# Install JavaScript Client

### Requirements

A list of prerequisite components depending on your operating system. Click on the required component to download it from the provider's website.

**Table: Installation requirements**

| Component                                     | Version  | Required to:                                                                                          | Linux | macOS | Windows |
| --------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------- | :---: | :---: | :-----: |
| [GitBash](https://git-scm.com/downloads)      | `Latest` | Use the `npm` CLI.                                                                                    |   ✔   |   ✔   |    ✔    |
| [NodeJS](https://nodejs.org/en/)              | `0.10+`  | Use NodeJS event functionality. Version `0.10` or higher is required, version `8.1.4` is recommended. |   ✔   |   ✔   |    ✔    |
| [npm](https://www.npmjs.com/package/download) | `Latest` | Use NodeJS package manager.                                                                           |   ✔   |   ✔   |    ✔    |

### Install steps

You can install and use the TerminusDB client as a NodeJS module using `npm` or directly as a minified JavaScript file.

#### Install client as a NodeJS module

Using npm we can install the package in a new NodeJs project or existing one using following commands:

Go to a NodeJs project folder:

```bash
$ cd ../projectfolder/
```

Install the package

```bash
$ npm install --save @terminusdb/terminusdb-client
```

#### Install client as a minified script

Use the minified script `terminusdb-client.min.js` in a CDN or download it to a location of your choice.

**Use in a CDN**

Use the minified script in your Content Delivery Network (CDN.)

```html
<script src="https://unpkg.com/@terminusdb/terminusdb-client/dist/terminusdb-client.min.js"></script>
```

**Download the script**

Download the minified script from [https://unpkg.com/browse/@terminusdb/terminusdb-client/dist/](https://unpkg.com/browse/@terminusdb/terminusdb-client/dist/) and save it to `[your-location]`.

```html
<script src="http://[your-location]/terminusdb-client.min.js"></script>
```

### Further reading

#### [JavaScript Client API Basics](../../guides/interface-guides/javascript-client.md)

#### [JavaScript Client Reference Guide](../../guides/reference-guides/javascript-client-reference/woqlclient.md)

#### [Getting Started with the JavaScript Client Tutorials](https://github.com/terminusdb/terminusdb-tutorials/tree/master/getting\_started/javascript-client)

### &#x20;<a href="#further-reading" id="further-reading"></a>
