---
description: Traverse edges with path regular expressions in WOQL
---

# Path Queries

TerminusDB & TerminusCMS allows _regular path expressions_ as a way to describe multi-hop searches in a concise fashion. When you need to follow a link repeatedly for shortest path queries or to find all linked documents meeting some specification you can often use a _path query_.

{% hint style="info" %}
For guidance on back-links and path queries using GraphQL visit the [GraphQL reference guide](graphql-reference/graphql\_query.md#backlinks-\_property\_of\_class)
{% endhint %}

The syntax of path expressions, for expressions `A`, `B` and fields `F` is as follows:

<table><thead><tr><th width="166">Expression</th><th width="151">Example</th><th width="114">Name</th><th>Description</th></tr></thead><tbody><tr><td><code>A,B</code></td><td><code>friend,name</code></td><td>Sequence</td><td>First follow expression <code>A</code>, then from that node expression <code>B</code></td></tr><tr><td><code>A|B</code></td><td><code>friend|foe</code></td><td>Choice</td><td>Follow expression <code>A</code> or expression <code>B</code></td></tr><tr><td><code>F+</code></td><td><code>friend+</code></td><td>Plus</td><td>Follow the field <code>F</code> any number of times, but at least once</td></tr><tr><td><code>F*</code></td><td><code>friend*</code></td><td>Star</td><td>Follow the field <code>F</code> any number of times, including zero</td></tr><tr><td><code>.</code></td><td><code>.</code></td><td>Any</td><td>Follow any field <code>F</code> regardless of name</td></tr><tr><td><code>F</code></td><td><code>friend</code></td><td>Field</td><td>Follow the field <code>F</code></td></tr><tr><td><code>F{n,m}</code></td><td><code>friend{1,3}</code></td><td>Times</td><td>Follow the field <code>F</code> between <code>n</code> and <code>m</code> times</td></tr><tr><td><code>(A)</code></td><td><code>(friend|foe)</code></td><td>Group</td><td>Group the expression for inclusion in a larger expression</td></tr><tr><td><code>F></code></td><td><code>friend></code></td><td>Forward</td><td>Follow the field <code>F</code> forward. This is the same as <code>F</code>.</td></tr><tr><td><code>&#x3C;F</code></td><td><code>&#x3C;friend</code></td><td>Backward</td><td>Follow the field <code>F</code> backward (who is linked to this node by <code>F</code></td></tr></tbody></table>

### Example: Ancestry

To understand the use of Path expressions we will use a family tree to exhibit the above operations and their meanings.

#### Data Ingestion

First we will use the following schema which has exactly one class, `Person`. We will add a `father` and `mother` field which are optional (as we will have to truncate our tree at some point, the non-existence is therefore an end of our knowledge rather than a statement that these do not exist).

```json
{ "@type" : "Class",
  "@id" : "Person",
  "@key" : {"@type" : "Lexical", "@fields" : ["name"]},
  "name" : "xsd:string",
  "mother" : {"@type" : "Optional", "@class" : "Person" },
  "father" : {"@type" : "Optional", "@class" : "Person" }}
```

Using the CLI we can create and add this schema as follows:

```shell
terminusdb db create admin/ancestor
echo '{ "@type" : "Class",
  "@id" : "Person",
  "@key" : {"@type" : "Lexical", "@fields" : ["name"]},
  "name" : "xsd:string",
  "mother" : {"@type" : "Optional", "@class" : "Person" },
  "father" : {"@type" : "Optional", "@class" : "Person" }}' | terminusdb doc insert admin/ancestor -g schema
```

Next, we need to add some people. The following three generations of family tree is enough to be illustrative. We will add it to a file named `family.json` and import it on the command line.

```json
{ "@capture" : "Charles II of Spain",
  "name" : "Charles II of Spain",
  "mother" : { "@ref" : "Mariana of Austria" },
  "father" : { "@ref" : "Philip IV of Spain" } }
{ "@capture" : "Philip IV of Spain",
  "name" : "Philip IV of Spain",
  "mother" : { "@ref" : "Margarita of Austria" },
  "father" : { "@ref" : "Philip III of Spain" } }
{ "@capture" : "Mariana of Austria",
  "name" : "Mariana of Austria",
  "mother" : { "@ref" : "Maria Anna of Spain" },
  "father" : { "@ref" : "Ferdinand III, Holy Roman Emperor" } }
{ "@capture" : "Maria Anna of Spain",
  "name" : "Maria Anna of Spain",
  "mother" : { "@ref" : "Margarita of Austria" },
  "father" : { "@ref" : "Philip III of Spain" } }
{ "@capture" : "Ferdinand III, Holy Roman Emperor",
  "name" : "Ferdinand III, Holy Roman Emperor",
  "mother" : { "@ref" : "Maria Anna of Bavaria (1574)" },
  "father" : { "@ref" : "Ferdinand II, Holy Roman Emperor" } }
{ "@capture" : "Philip III of Spain",
  "name" : "Philip III of Spain",
  "mother" : { "@ref" : "Anne of Austria" },
  "father" : { "@ref" : "Philip II of Spain" } }
{ "@capture" : "Margarita of Austria",
  "name" : "Margarita of Austria",
  "mother" : { "@ref" : "Maria Anna of Bavaria (1551)" },
  "father" : { "@ref" : "Charles II of Austria" } }
{ "@capture" : "Ferdinand II, Holy Roman Emperor",
  "name" : "Ferdinand II, Holy Roman Emperor",
  "mother" : { "@ref" : "Maria Anna of Bavaria (1551)" },
  "father" : { "@ref" : "Ferdinand II, Holy Roman Emperor" } }
{ "@capture" : "Maria Anna of Bavaria (1574)",
  "name" : "Maria Anna of Bavaria (1574)",
  "mother" : { "@ref" : "Renata of Lorraine" },
  "father" : { "@ref" : "William V, Duke of Bavaria" } }
{ "@capture" : "Philip II of Spain",
  "name" : "Philip II of Spain",
  "mother" : { "@ref" : "Isabella of Portugal" },
  "father" : { "@ref" : "Charles V, Holy Roman Emperor" } }
{ "@capture" : "Anne of Austria",
  "name" : "Anne of Austria",
  "mother" : { "@ref" : "Maria of Spain" },
  "father" : { "@ref" : "Maximilian II, Holy Roman Emperor" } }
{ "@capture" : "Maria Anna of Bavaria (1551)",
  "name" : "Maria Anna of Bavaria (1551)",
  "mother" : { "@ref" : "Anne of Habsburg" },
  "father" : { "@ref" : "Albert V, Duke of Bavaria" } }
{ "@capture" : "William V, Duke of Bavaria",
  "name" : "William V, Duke of Bavaria",
  "mother" : { "@ref" : "Anne of Habsburg" },
  "father" : { "@ref" : "Albert V, Duke of Bavaria" } }
{ "@capture" : "Renata of Lorraine",
  "name" : "Renata of Lorraine",
  "mother" : { "@ref" : "Christina of Denmark" },
  "father" : { "@ref" : "Francis I, Duke of Lorraine" } }
{ "@capture" : "Maria of Spain",
  "name" : "Maria of Spain",
  "mother" : { "@ref" : "Isabella of Portugal" },
  "father" : { "@ref" : "Charles V, Holy Roman Emperor" } }
{ "@capture" : "Maximilian II, Holy Roman Emperor",
  "name" : "Maximilian II, Holy Roman Emperor",
  "mother" : { "@ref" : "Ferdinand I, Holy Roman Emperor" },
  "father" : { "@ref" : "Anna of Bohemia and Hungary" } }
{ "@capture" : "Charles II of Austria",
  "name" : "Charles II of Austria",
  "mother" : { "@ref" : "Ferdinand I, Holy Roman Emperor" },
  "father" : { "@ref" : "Anna of Bohemia and Hungary" } }
{ "@capture" : "Anne of Habsburg",
  "name" : "Anne of Habsburg",
  "mother" : { "@ref" : "Ferdinand I, Holy Roman Emperor" },
  "father" : { "@ref" : "Anna of Bohemia and Hungary" } }
{ "@capture" : "Albert V, Duke of Bavaria",
  "name" : "Albert V, Duke of Bavaria" }
{ "@capture" : "Christina of Denmark",
  "name" : "Christina of Denmark",
  "mother" : { "@ref" : "Isabella of Burgundy" },
  "father" : { "@ref" : "Christian II of Denmark" } }
{ "@capture" : "Francis I, Duke of Lorraine",
  "name" : "Francis I, Duke of Lorraine" }
{ "@capture" : "Isabella of Portugal",
  "name" : "Isabella of Portugal" }
{ "@capture" : "Charles V, Holy Roman Emperor",
  "name" : "Charles V, Holy Roman Emperor",
  "mother" : { "@ref" : "Philip of Castile" },
  "father" : { "@ref" : "Joanna of Castile" } }
{ "@capture" : "Ferdinand I, Holy Roman Emperor",
  "name" : "Ferdinand I, Holy Roman Emperor",
  "mother" : { "@ref" : "Philip of Castile" },
  "father" : { "@ref" : "Joanna of Castile" } }
{ "@capture" : "Anna of Bohemia and Hungary",
  "name" : "Anna of Bohemia and Hungary" }
{ "@capture" : "Isabella of Burgundy",
  "name" : "Isabella of Burgundy",
  "mother" : { "@ref" : "Philip of Castile" },
  "father" : { "@ref" : "Joanna of Castile" } }
{ "@capture" : "Christian II of Denmark",
  "name" : "Christian II of Denmark" }
{ "@capture" : "Philip of Castile",
  "name" : "Philip of Castile" }
{ "@capture" : "Joanna of Castile",
  "name" : "Joanna of Castile" }
```

#### Path Query

Using the `Product explorer` dashboard, we can issue queries using path queries to find answers to various questions.

**All ancestors**

To see the names of _all_ ancestors of Charles II of Spain, we can write the following:

```javascript
and(triple("v:Person", "name", string("Charles II of Spain")),
           path("v:Person", "(mother|father)*,name", "v:Name"))
```

This asks for the name of anyone who is a mother or father, any number of times, including Charles himself.

**All inbred ancestors**

Any distinct ancestors who have an ancestor reachable through _both_ the mother and the father.

```javascript
distinct("v:Ancestor",
  and(
    triple("v:Person", "name", string("Charles II of Spain")),
    path("v:Person", "(mother|father)*", "v:Ancestor"),
    path("v:Ancestor", "mother,(mother|father)*", "v:Shared_Ancestor"),
    path("v:Ancestor", "father,(mother|father)*", "v:Shared_Ancestor"),
    triple("v:Ancestor", "name", "v:Name")
  )
)
```

**All those whose parents are nieces or nephews of each other**

The following query finds all distinct ancestors of Charles II whose parents have an uncle-niece relationship to each other. The query specifically asks, is there an ancestor (someone related by `(mother|father)*`) who has their father's father, as the father of their mother's mother. We walk up the tree to the father's father, and down the tree through the mother backwards to arrive at the same individual.

```javascript
distinct("v:Ancestor",
  and(
    triple("v:Person", "name", string("Charles II of Spain")),
    path("v:Person", "(mother|father)*", "v:Ancestor"),
    path("v:Ancestor", "(father,father,<father,<mother,<mother)", "v:Ancestor"),
    triple("v:Ancestor", "name", "v:Name")
  )
)
```

This will yield: Charles II of Spain, Margarita of Austria, and Philip III of Spain.
