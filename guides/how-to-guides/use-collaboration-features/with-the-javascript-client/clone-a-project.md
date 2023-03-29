---
description: How-to use the JS Client to clone a database
---

# Clone a Project

### Clone a database from terminusdb.com to your local machine

Assuming you have [connected with the JavaScript Client](../../use-the-javascript-client/connect-with-the-javascript-client.md) you can clone your database.

Cloning a database pulls down a full copy of all data at that point in time, including all document and schema versions.

If the database that you are cloning is not public, you need to provide an APIKey to the client setting the remoteAuth For more info visit the ['How to get your API key'](../../../../terminuscms/get-api-key.md) page.

```javascript
const cloneLocally = async () => {
   client.remoteAuth( {"type":"apikey" , "key":myApiKey})
   const cloneDetails = {remote_url: "http://cloud.terminusdb.com/MyTeam/MyTeam/mydb", 
                        label "Cloned DB",
                        comment: "Cloned from mydb"}
   await  client.clonedb(cloneDetails, "new_mydb")

   console.log("the database has been cloned")
}
```
