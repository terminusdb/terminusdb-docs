---
description: How-to use the JS WOQLClient to squash commits in your branch's history
---

# Squash a Branch

Squashing allows you to combine multiple commits in your branch's history into a single commit.

```javascript
const squashBranch = async () => {
    const branchName = "mybranch"   
    const commitMessage = "merge all the commits"
    await client.squashBranch(branchName,commitMessage);
    // get mybranch commits list 
    const commits = await TerminusClient.WOQL.lib().commits("mybranch");
    console.log("Show my commit after squash", JSON.stringify(commits.bindings,null,4))
}
```

An example response -

```json
[
      {
         "Author":{
            "@type":"xsd:string",
            "@value":"myuser@terminusdb.com"
         },
         "Commit ID":{
            "@type":"xsd:string",
            "@value":"vn7l94v4broiaz28346mdhwtgxvvy6p"
         },
         "Message":{
            "@type":"xsd:string",
            "@value":"merge all the commits"
         },
         "Parent ID":null,
         "Time":{
            "@type":"xsd:decimal",
            "@value":1678402502.1979887
         }
      }
   ]
```
