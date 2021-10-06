# Install a JavaScript Client

> **On this page:** Everything you need to install and run a browser and promise-based TerminusDB JavaScript Client.

**Key topics**

[Requirements](#requirements)

[Install steps](#install-steps)

## Requirements

A list of prerequisite components depending on your operating system. Click on the required component to download it from the provider's website.

| Component | Version | Required to: | ![info](../../img/ico/terminusdb-icon-linux.png)<br>Linux | ![info](../../img/ico/terminusdb-icon-apple.png)<br>MacOS | ![info](../../img/ico/terminusdb-icon-windows.png)<br>Windows |
| ------------------------                      | -------  | - | :---------: | :------: | :------: |
| [GitBash](https://git-scm.com/downloads)      | `Latest` | Use the `npm` CLI | &#10004; | &#10004; | &#10004; |
| [NodeJS](https://nodejs.org/en/)              | `0.10+` | Use NodeJS event functionality | &#10004; | &#10004; | &#10004; |
| [npm](https://www.npmjs.com/package/download) | `Latest` | Use NodeJS package manager     | &#10004; | &#10004; | &#10004; |

>:information_source:&nbsp;<i class="tdb-i">![info](../../img/ico/terminusdb-icon-node-js.png)</i>**NodeJS version**<br>
NodeJS version 0.10 or higher is required. NodeJS version 8.1.4 is recommended.

## Install steps

You can install and use the TerminusDB client as a [NodeJS module](#install-client-as-a-nodejs-module) using `npm` or directly as a [minified JavaScript file](#install-client-as-a-minified-script). 

### Install client as a NodeJS module

Install TerminusDB client using `npm`.

```bash
$ npm install --save @terminusdb/terminusdb-client
```

### Install client as a minified script

Use the minified script `terminusdb-client.min.js` [in a CDN](#use-in-a-cdn) or [download](#download) it to a location of your choice. 

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

An example use of the JavaScript Client in [Start with a Client API](terminusx/start-with-a-client?id=connect-with-woqlclient).

### Detailed documentation

Refer to the [JavaScript](reference-guides/reference-client?id=javascript) Client Reference. 

