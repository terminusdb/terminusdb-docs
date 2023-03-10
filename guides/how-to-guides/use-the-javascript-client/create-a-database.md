---
description: How-to create a database using the TerminusDB JavaScript Client
---

# Create a Database

To create a database with an already [connected client](connect-with-the-javascript-client.md), you can write:

```javascript
const createNewDB = async () => {
  try {
​
      await client.createDatabase('ExampleDatabase', {
          label: "ExampleDatabase",
          comment: "Created new ExampleDatabase",
          schema: true
      });
​
      console.log("Database created Successfully!")
​
  } catch (err) {
      console.error(err)
  }
};
```

After the database is created the client will be connected to it.

{% hint style="info" %}
Try out the [Getting Started with the TerminusDB JavaScript Client ](https://github.com/terminusdb/terminusdb-tutorials/blob/main/getting\_started/javascript-client/lesson\_1.md)five-part tutorial to get to grips with it.
{% endhint %}
