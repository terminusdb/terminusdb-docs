---
description: >-
  Everything you need to install and run a browser and promise-based TerminusDB
  JavaScript Client
---

# Install JavaScript Client

### Requirements

A list of prerequisite components depending on your operating system. Click on the required component to download it from the provider's website.

**Table: Installation requirements**

<table><thead><tr><th width="143">Component</th><th width="111">Version</th><th>Required to:</th><th width="94" align="center">Linux</th><th width="107" align="center">macOS</th><th width="121" align="center">Windows</th></tr></thead><tbody><tr><td><a href="https://git-scm.com/downloads">GitBash</a></td><td><code>Latest</code></td><td>Use the <code>npm</code> CLI.</td><td align="center">✔</td><td align="center">✔</td><td align="center">✔</td></tr><tr><td><a href="https://nodejs.org/en/">NodeJS</a></td><td><code>0.10+</code></td><td>Use NodeJS event functionality. Version <code>0.10</code> or higher is required, version <code>8.1.4</code> is recommended.</td><td align="center">✔</td><td align="center">✔</td><td align="center">✔</td></tr><tr><td><a href="https://www.npmjs.com/package/download">npm</a></td><td><code>Latest</code></td><td>Use NodeJS package manager.</td><td align="center">✔</td><td align="center">✔</td><td align="center">✔</td></tr></tbody></table>

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

#### [JavaScript Client API Basics](../../guides/how-to-guides/use-the-javascript-client/javascript-client.md)

#### [JavaScript Client Reference Guide](../../guides/reference-guides/javascript-client-reference/woqlclient.md)

#### [Getting Started with the JavaScript Client Tutorials](https://github.com/terminusdb/terminusdb-tutorials/tree/master/getting\_started/javascript-client)

### &#x20;<a href="#further-reading" id="further-reading"></a>
