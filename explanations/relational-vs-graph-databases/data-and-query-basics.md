---
description: >-
  A comparative introduction to organizing and querying data in relational and
  graph databases.
---

# Data and Query Basics

## Organizing data

Relational and graph databases organize data is distinctly different ways.

### Relational databases

Traditional relational databases divide data into tables, columns, and rows.

### Graph databases

Similar to other graph databases, TerminusDB organizes data in objects. Objects have properties, properties link to other objects. A network of interlinked objects forms a graph structure - the foundation of graph databases.

Using objects rather than cells enables the creation of databases that closely model the real world.

## Example using a family tree

A family tree database stores data representing individuals, their parents, and grandparents.

### Relational databases

The table below represents a model for storing this scenario in a relational database.

### Graph databases

The diagram further below illustrates the equivalent graph database model. An advantage of the graph model is that it represents real-world objects more accurately, making the model intuitive and easier to understand.

#### Table: Family tree in a relational database

| **person\_id** | **name**  | **DOB**      | **mother\_id** | **father\_id** |
| -------------- | --------- | ------------ | -------------- | -------------- |
| `1`            | `Bob`     | `01/10/1979` | `2`            | `3`            |
| `2`            | `Zoe`     | `04/02/1956` | `4`            | `5`            |
| `3`            | `Bob Snr` | `28/11/1952` | `6`            | `7`            |
| `4`            | `Ada`     | `17/04/1922` | NULL           | NULL           |
| `5`            | `Tom`     | `01/09/1909` | NULL           | NULL           |
| `6`            | `Eva`     | `17/04/1923` | NULL           | NULL           |
| `7`            | `Ray`     | `03/10/1913` | NULL           | NULL           |

#### Diagram: Family tree in a graph database

![](../../.gitbook/assets/terminusdb-data-modeling-family-tree-min.png)

## Querying data

### Relational database queries

Many relational databases use the Structured Query Language (SQL.) The example below uses a two-query approach to get the name of mother, then grandmother. Note the second query uses two nested sub-queries.

### Graph database queries

TerminusDB's purpose-built Web Object Query Language (WOQL) is an easier-to-use alternative to SQL. The example below demonstrates the same query using WOQL. WOQL uses triple patterns to get both names in one short query. There are no joins - joins are implied by using the same ID in different parts of the query. Using `v:mother_id` multiple times creates the chain:

`v:person_id = mother => v:mother = mother => v:grandmother`

#### Code: Family tree traversal using SQL

```sql
select  name 
from table_name 
where person_id = (
        select  mother_id
        from table_name 
        where name = "Bob")

select  name 
from table_name 
where person_id = (
        select mother_id
        from table_name 
        where person_id = (
                select mother_id
                from table_name 
                where name = "Bob"))
```

#### Code: Family tree traversal using WOQL

```javascript
WOQL.and
(
   WOQL.triple("v:person", "mother", "v:mother_id"),
   WOQL.triple("v:mother_id", "name", "v:mother_name"),
   WOQL.triple("v:mother_id", "mother", "v:grandmother_id"),
   WOQL.triple("v:grandmother_id", "name", "v:grandmother_name"),
)
```

