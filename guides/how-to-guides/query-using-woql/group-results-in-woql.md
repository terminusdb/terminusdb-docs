---
description: >-
  A how to guide to show you how to group query results using WOQL in TerminusDB
  and TerminusCMS
---

# Group Results in WOQL

{% hint style="info" %}
To use this How-To, first [clone the Star Wars demo](../cloning-a-demo-project.md) into your team on TerminusCMS. You will then have full access to the data needed for this tutorial
{% endhint %}

### How to use `group_by`

If we need to group variables according to some criteria, we can create an aggregate of solutions using `group_by`.

A group by is composed of a _focus_, a _template_, and a _group_ together with a query.

We will demonstrate this with the following query:

```javascript
let v = Vars("person", "label", "eyes", "group");
limit(1)
.group_by(
  "eyes",
  ["label"],
  v.group,
  and(triple(v.person, "rdf:type", "@schema:People"),
      triple(v.person, "label", v.label),
      triple(v.person, "eye_color", v.eyes)))
```

The first argument, here `"eyes"` refers to the eyes variable, and is the variable around which to form the group, the _focus_.

The second `["label"]` is the _template_, which refers to the variable `"label"`. The template will be those things grouped under the first variable.

The third variable `v.group`, is the _group_ variable, which will include groups of templates for each set of solutions which shares a _focus_.

This raw query output will be:

```json
{
	"eyes": {
		"@type": "xsd:string",
		"@value": "black"
	},
	"group": [
		[{
			"@type": "xsd:string",
			"@value": "Greedo"
		}],
		[{
			"@type": "xsd:string",
			"@value": "Nien Nunb"
		}],
		[{
			"@type": "xsd:string",
			"@value": "Gasgano"
		}],
		[{
			"@type": "xsd:string",
			"@value": "Kit Fisto"
		}],
		[{
			"@type": "xsd:string",
			"@value": "Plo Koon"
		}],
		[{
			"@type": "xsd:string",
			"@value": "Lama Su"
		}],
		[{
			"@type": "xsd:string",
			"@value": "Taun We"
		}],
		[{
			"@type": "xsd:string",
			"@value": "Shaak Ti"
		}],
		[{
			"@type": "xsd:string",
			"@value": "Tion Medon"
		}],
		[{
			"@type": "xsd:string",
			"@value": "BB8"
		}]
	],
	"label": null,
	"person": null
}
```
