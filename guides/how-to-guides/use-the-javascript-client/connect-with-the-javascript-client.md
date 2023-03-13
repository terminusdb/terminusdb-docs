---
description: How to connect to TerminusDB and TerminusCMS using the JavaScript Client
---

# Connect with the JavaScript Client

Ensure you have installed the JavaScript Client. See here for [installation instructions](../../../terminusdb/install-client/install-javascript-client.md)

### Connecting with the JavaScript Client

Depending on whether you are connecting to an instance you have set up yourself, or whether you are using TerminusCMS in the cloud, there are two different methods of connection.

In both cases, you should load the TerminusDB client in your script with the following:

```javascript
const TerminusClient = require("@terminusdb/terminusdb-client");
```

### TerminusCMS

The TerminusCMS endpoint has the form https://cloud.terminusdb.com/TEAM/ where TEAM is the name of the team you are using in TerminusCMS for the data products you want to access. In order to connect to this team, you will need to [get your API key](../../../terminuscms/get-api-key.md) after selecting the team you want to use. To create a client use the following code within your script, ensuring to use your credentials.

```javascript
const client = new TerminusClient.WOQLClient('https://cloud.terminusdb.com/Team',
                     {user:"myemail@something.com", organization:'Team'})
​
client.setApiKey(MY_ACCESS_TOKEN)
```

### Connecting to a TerminusDB installation

Whether you are connecting to a local docker, a local server, or a server that you've set up somewhere, you can use the following to log in to TerminusDB.

```javascript
const client = new TerminusClient.WOQLClient(SERVER_URL,{user:"admin",key:"myKey"})

async function getSchema() {
     client.db("DB_NAME")
     const schema = await client.getSchema()
}
```

{% hint style="info" %}
Try out the [Getting Started with the TerminusDB JavaScript Client ](https://github.com/terminusdb/terminusdb-tutorials/blob/main/getting\_started/javascript-client/lesson\_1.md)five-part tutorial to get to grips with it.
{% endhint %}
