---
description: How-to time travel to a specific commit
---

# Time Travel

Assuming you have [connected with the JavaScript Client](../../use-the-javascript-client/connect-with-the-javascript-client.md), created a database, and made a few commits, you can time travel to inspect them to see what they looked like.

### Get the branch commits list

You can use the JS WOQL Client Library method to get a list of branch commits. This example uses paginationto get the last 10 commits starting from the branch head -

```javascript
const getCommits= async () => {
    const commits = await TerminusClient.WOQL.lib().commits("mybranch", 10 ,0);
    console.log("Show the last 10 commits", JSON.stringify(commits.bindings,null,4))
}
```

### Get the branch commits list starting with a specific timestamp

You can also get a list of commits from a specific timestamp. The timestamp can be obtained from the log -

```javascript
const getCommitsByTime= async () => {
    const commits = await TerminusClient.WOQL.lib().commits("mybranch", 10 ,0, 1678385999.7790234);
    console.log("Show the last 10 commits before the timestamp", JSON.stringify(commits.bindings,null,4))
}
```

An exampe response -&#x20;

```json
[
      {
         "Author":{
            "@type":"xsd:string",
            "@value":"myuser@terminusdb.com"
         },
         "Commit ID":{
            "@type":"xsd:string",
            "@value":"prh0yvftqmsrgctn8gqvdxv7gc4i8p8"
         },
         "Message":{
            "@type":"xsd:string",
            "@value":"Update from model builder"
         },
         "Parent ID":"terminusdb://ref/data/ValidCommit/onckvm1q9u98j5momtsfxia3optjkdi",
         "Time":{
            "@type":"xsd:decimal",
            "@value":1678385762.7790234
         }
      },
      {
         "Author":{
            "@type":"xsd:string",
            "@value":"myuser@terminusdb.com"
         },
         "Commit ID":{
            "@type":"xsd:string",
            "@value":"onckvm1q9u98j5momtsfxia3optjkdi"
         },
         "Message":{
            "@type":"xsd:string",
            "@value":"Update from model builder"
         },
         "Parent ID":null,
         "Time":{
            "@type":"xsd:decimal",
            "@value":1678385749.9860663
         }
      }
   ]
```

### Time travel and point the client to a specific commit

To travel back in time to a particular commit, you need to specify the commit ID in the JS woqlClient parameters. To obtain the commit ID, refer to the code snippet above. All your calls after will be made for this commit.

```javascript
const getDocumentsAtCommit= async () => {
    client.ref("onckvm1q9u98j5momtsfxia3optjkdi")
    const docs = await client.getDocument({graph_type:"schema"})
}
```
