---
description: An overview of the essential features of the local TerminusDB dashboard
---

# Dashboard

The local TerminusDB dashboard is the perfect place to model data, manage access control, and build queries. This page provides an overview of the dashboard's features.

### Install/Sign Up&#x20;

The TerminusDB local dashboard is included when you [install TerminusDB as a Docker container](../../terminusdb/install/install-as-docker-container.md). To use the dashboard visit:

```
http://localhost:6363/dashboard/
```

#### Initial teams and users&#x20;

[Visit here for guidance](../how-to-guides/manage-access-control.md) on managing access control with the local TerminusDB dashboard.&#x20;

A team and admin user are automatically created with both dashboards.

* TerminusDB - admin user and admin team. The default values are:&#x20;
  * Team: admin
  * User: admin
  * Password: root.

### **Basic layout**

When first logged in, you will see a list of the teams you are part of. Click on a team.

The team selection layout looks as such:

<figure><img src="../../.gitbook/assets/01-dashboard-team-select.jpg" alt=""><figcaption><p><strong>When you first login to the dashboard, select your team</strong></p></figcaption></figure>

When you select a team, the layout looks like:

<figure><img src="../../.gitbook/assets/02-dashboard-team-home.jpg" alt=""><figcaption></figcaption></figure>

1. **Top Menu** - From left to right:&#x20;
   * Create a new data product&#x20;
   * Team - use the dropdown menu to toggle between teams&#x20;
   * User management & profile - Manage access control to teams and data products. In TerminusDB, and log in as different users.
   * Role - see your role for the team or data product.&#x20;
2. **Data Products** - A team can have one or many data products. Data products within a team are shown in this pane.&#x20;
3. **Data Product Tools** - Tools are only available when a data product is selected. From top to bottom:&#x20;
   * Data Product Home - Contains a snapshot of the data product, its recent commits, branch management, and the ability to delete the data product.&#x20;
   * Model Builder - Build schema using our visual modeling tools, or simply import schema as JSON. You can create documents, subdocuments, and enums, and establish document properties and relationships to build your document graph.&#x20;
   * Document Explorer - Once you’ve created your schema, you can explore the document frames and even add data to your database using the automatically generated forms.&#x20;
   * Query Builder - Build and test queries against your data.

### Create a new data product

Creating your first data product is easy.

1. Select ‘New Data Product’&#x20;
2. Give it an ID (only alphabetic characters and underscores are allowed)&#x20;
3. Name it something meaningful to you&#x20;
4. Give it a description so that you and other team members can see its purpose.

<figure><img src="../../.gitbook/assets/03-dashboard-new-data-product.jpg" alt=""><figcaption></figcaption></figure>

### Building your schema&#x20;

A visual data modeling tool to build schema for your data products.

#### Visual data modeling

<figure><img src="../../.gitbook/assets/04-dashboard-model-builder.jpg" alt=""><figcaption></figcaption></figure>

1. Choose Data Product Model from the lefthand menu - the second icon.&#x20;
2. In the window, you will see an oval called your data product name schema. Click on the oval and select the + symbol.&#x20;
3. Add a document or enum.&#x20;
   * JSON documents form the nodes of the graph&#x20;
   * Enumerated types are a set of possible choices&#x20;
4. Select add document.&#x20;
5. On the right, you will see a set of options to define the document:&#x20;
   * Give it a unique ID (no spaces)&#x20;
   * Define the document key, choose from ([this blog will help you decide what key to use](https://terminusdb.com/blog/uri-generation/)):&#x20;
     * Lexical (need to set up document properties first)&#x20;
     * Hash (need to set up document properties first)&#x20;
     * Random&#x20;
     * ValueHash
6. Add the document properties, choose from:&#x20;
   * Enum - Need to create the enums before this option becomes available&#x20;
   * Numeric&#x20;
   * String&#x20;
   * Geo&#x20;
   * Temporal&#x20;
   * Boolean&#x20;
   * JSON&#x20;
   * Link - building the relationships in the graph&#x20;
7. On the next tab, you can see the relationships in the graph, this will show links between objects. You can also set the document as a parent/child of another document.&#x20;
8. The final tab when creating the document shows it in its JSON format.&#x20;
9. Save your document by clicking on the disk icon.

Creating subdocuments and enums can be achieved in much the same way.

#### Importing your schema&#x20;

Using a visual editor to model your data isn’t everyone’s cup of tea. Should you build your schema elsewhere, importing it into the dashboard is straightforward:

<figure><img src="../../.gitbook/assets/05-dashboard-model-builder-json.jpg" alt=""><figcaption></figcaption></figure>

1. Choose Data Product Model from the lefthand menu - the second icon.&#x20;
2. In the window, you will see two tabs, ‘Graph View’ and ‘JSON View’.&#x20;
3. Select JSON View.&#x20;
4. Click on the edit icon.&#x20;
5. Paste your JSON schema into the window and save.

Your schema should now display in the graph view.

### Exploring documents&#x20;

Once you have created your schema you can explore the documents you created. TerminusDB creates document frames based on your schema and you can see what data is in the database, add data, and check out the document structure visually.

<figure><img src="../../.gitbook/assets/06-dashboard-doc-explorer.jpg" alt=""><figcaption></figcaption></figure>

1. From the lefthand menu, select document explorer - third icon.&#x20;
2. The initial window shows you how many documents you have by type. You can select a type to see the individual documents, and drill down further by clicking on the resulting list, here you can:&#x20;
   * Edit the document&#x20;
   * Delete it&#x20;
   * View the JSON.&#x20;
3. To add a document, select the + symbol in the type (from the lefthand column) you want to add.&#x20;
4. The document frame will appear mirroring what you set up in the schema.

<figure><img src="../../.gitbook/assets/07-dashboard-add-doc.jpg" alt=""><figcaption></figcaption></figure>

### **GraphQL & WOQL Query Builder**

Use the query builder to build and test queries against your data products.

1. Select the Query Builder icon from the left&#x20;
2. In the query pane, build your query in JS WOQL or JSON-LD&#x20;
3. Hit Run to see the results.

<figure><img src="../../.gitbook/assets/08-dashboard-query-builder.jpg" alt=""><figcaption></figcaption></figure>

You can add several query panes and use the document selector on the left to build your queries.

### Creating and managing branches

You can create branches of your data product within the local dashboard, to do this follow these instructions:

<figure><img src="../../.gitbook/assets/09-dashboard-branch.jpg" alt=""><figcaption></figcaption></figure>

1. Choose Data Products from the lefthand menu - the first icon.&#x20;
2. Click on branches and select new branch.&#x20;
3. Name your branch and choose whether you want an empty branch, or to create it from the current head.

<figure><img src="../../.gitbook/assets/10-dashboard-branch-options.jpg" alt=""><figcaption></figcaption></figure>

You can now switch between main and your branches by selecting the ellipsis menu where you can also reset to a specific commit, or squash the branch.
