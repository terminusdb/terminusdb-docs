# Install a JavaScript Client

> **On this page:** Everything you need to install and run a browser and promise-based TerminusDB JavaScript Client.

**Key topics**

[Requirements](#requirements)

[Install steps](#install-steps)

[Example use](#example-use)

## Requirements

A list of prerequisite components depending on your operating system. Click on the required component to download it from the provider's website.

| Component | Version | Required to: | ![info](../../img/ico/terminusdb-icon-linux.png)<br>Linux | ![info](../../img/ico/terminusdb-icon-apple.png)<br>MacOS | ![info](../../img/ico/terminusdb-icon-windows.png)<br>Windows |
| ------------------------                      | -------  | - | :---------: | :------: | :------: |
| [GitBash](to-do)                              | `Latest` | Use the `npm` CLI | &#10004; | &#10004; | &#10004; |
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

<script src="https://unpkg.com/@terminusdb/terminusdb-client/dist/terminusdb-client.min.js">
</script>


```

#### Download the script

Download the minified script from `https://unpkg.com/browse/@terminusdb/terminusdb-client@4.3.1/dist/` and save it to `[your-location]`.

```html

<script src="http://[your-location]/terminusdb-client.min.js"></script>


```

## Example use

This example creates an `Express.js` server to post an account to a database with default user credentials summarized below.  

| Constant | Value | Description |
| --- | --- | --- | 
| `cEnum.database` | `"banker"` | Database name/id |
| `cEnum.user`     | `"admin"`  | Default user id  |
| `cEnum.password` | `"root"`   | Default password |

For the [full Documentation](https://terminusdb.com/docs/reference/js-client)

```js
const cEnum    =
{
    server     : "express",
    database   : "banker",
    user       : "admin",
    password   : "root",    
    path       : "@terminusdb/terminusdb-client",
    url        : "https://127.0.0.1:6363",
    port       : 3000,

    adminBanker: "admin/banker",
    bankAccount: "scm:BankAccount",
    addAccount : "Add smog's bank account",
    smog       : "smog",
    docSmog    : "doc:smog",
    type       : "type",
    owner      : "owner",
    balance    : "balance",
    account    : "/account",
    amount     : 999,

    generalErr : "ERROR"
}
const cnExpress   = require(cEnum.server); 
const cnApp       = express();                      
const cnTDBClient = require(cEnum.path);            
const cnWClient   = new cnTDBClient.WOQLClient
(
    cEnum.url, 
    {
        dbid: cEnum.database,
        user: cEnum.user,
        key : cEnum.password,
    }
);

cnWClient.db(cEnum.database);
cnWClient.organization(cEnum.user);

async function postAccount() 
{
    try 
    {
        const WOQL          = cnTDBClient.WOQL;
        const cnWOQLQuery   =  
            WOQL.using(cEnum.adminBanker).and
            (
                WOQL.add_triple(cEnum.docSmog, cEnum.type,    cEnum.bankAccount),
                WOQL.add_triple(cEnum.docSmog, cEnum.owner,   cEnum.docSmog),
                WOQL.add_triple(cEnum.docSmog, cEnum.balance, cEnum.amount)
            );

        await cnWClient.connect();

        cnWClient
            .query(cnWOQLQuery, cEnum.addAccount)
            .then
            (
                (response) => 
                {
                    return response;
                }
            )
            .catch
            (
                (error) => 
                {
                    console.log(cEnum.generalErr, error);
                }
            );
    } 
    catch (error) 
    {
        console.log(error);
    }
}

cnApp.post
(
    cEnum.account, (req, res) => 
    {
        postAccount().then
        (
            (dbres) => res.send
            (
                JSON.stringify(dbres)
            )
        );
    }
);

cnApp.listen
(
    cEnum.port, () => 
    {
        console.log(cEnum.port);

        cnWClient
            .connect()
            .then
            (
                function (response) 
                {
                    console.log(response); // Handle success.
                }
            )
            .catch
            (
                function (error) 
                {
                    console.log(error); // Handle error.
                }
            );
    }
);
```

## Options

connections options.

To initialize `TerminusDB client` with custom options use

```js
const cEnum  =
{
    // Server/database details

    database: "test_db",
    user    : "admin",
    password: "my_secret_key",    
    path    : "@terminusdb/terminusdb-client",
    url     : "https://127.0.0.1:6363"
}

const cnTDBClient = require(cEnum.path);
const cnWClient   = new cnTDBClient.WOQLClient
(
    cEnum.url, 
    {
        dbid: cEnum.database,
        user: cEnum.user,
        key : cEnum.password,
    }
);
```

## API

The API is documented at: https://terminusdb.com/docs/reference/js-client/core/#terminusdb-client-api