---
description: >-
  An introduction to data modeling and modeling terminology common to relational
  and graph databases.
---

# Data Modeling Basics

## Key topics

[The importance of data modeling](broken-reference)

[Modeling an organization](data-modeling-basics.md#modeling-an-organization)

## The importance of data modeling

The correct organization of data and the correct definition of the underlying database model or schema are critical to a business. TerminusDB organizes data in an object structure to facilitate modeling a business and the real world generally.

## Modeling an organization

Using a small organization as an example, use the steps below to model and define a schema for the `organization` and its **elements** - `team`, `project`, `task`, and `employee`.

**Data modeling steps**

[Step 1. Identify the elements of the organization](data-modeling-basics.md#step-1.-identify-the-elements-of-the-organization)

[Step 2. Identify the properties of each element](data-modeling-basics.md#step-2.-identify-the-properties-of-each-element)

[Step 3. Identify the relationships between elements](data-modeling-basics.md#step-3.-identify-the-relationships-between-elements)

### Element relationship modeling

For relational and graph databases, an entity or element relationship model is a good way of implementing these steps. This helps to identify the components of the schema - its **elements**, **properties**, and **relationships**.

#### Diagram: An element relationship model

![](../../../../.gitbook/assets/terminusdb-data-modeling-organization-min.png)

### Step 1. Identify the elements of the organization

{% hint style="info" %}
**Elements** are similar to entities in relational database terminology.
{% endhint %}

#### Table: Elements of an organization

| **Element**    | **Description**                      |
| -------------- | ------------------------------------ |
| `organization` | The main organization.               |
| `team`         | The teams within the `organization.` |
| `employee`     | The employee assigned to `task`.     |
| `project`      | The projects that a `team` creates.  |
| `task`         | The tasks of the `project`.          |

### Step 2. Identify the properties of each element

{% hint style="info" %}
**Properties** are similar to attributes in relational database terminology. A property is an item of data describing the element.
{% endhint %}

#### Table: The properties of elements

| **Element**    | **Properties**                                     |
| -------------- | -------------------------------------------------- |
| `organization` | `name`, `desc`, `start-date`                       |
| `team`         | `name`, `desc`, `start-date`                       |
| `employee`     | `name`, `date-of-birth`, `start-date`, `role`      |
| `project`      | `name`, `start-date`, `end-date`, `desc`, `status` |
| `task`         | `name`, `start-date`, `end-date`, `desc`, `status` |

### Step 3. Identify the relationships between elements

{% hint style="info" %}
**Relationships** are the same in graph and relational database terminology. Relationships define the associations or interactions between elements.
{% endhint %}

#### Table: The relationship between elements

| **Element**    | **Element** | **Relationship (phrasal verb)** | **Relationship description**            |
| -------------- | ----------- | ------------------------------- | --------------------------------------- |
| `organization` | `team`      | `consists-of`                   | An `organization` `consists of` `team`s |
| `team`         | `project`   | `collaborates-on`               | A `team` `collaborates-on` `project`s   |
| `project`      | `task`      | `divided-into`                  | A `project` is `divided-into` `task`s   |
| `task`         | `employee`  | `assigned-to`                   | A `task` is `assigned-to` an `employee` |

