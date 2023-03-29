---
description: How-to use the JS Client to reset a branch
---

# Reset a Project

Assuming you have created a database, and made a few commits, you [can time travel](time-travel-to-previous-commits.md) to inspect them.

You may want to reset the branch to a specific commit. You will need your branch name and commit ID which can be obtained by time traveling.

The below code will rest your branch to a specific commit ID -

```javascript
const resetBranch = async () => {
   await  client.resetBracnh(mybranchName, mycommitid)
   console.log("Successfully reset branch HEAD to mycommitid")
}
```
