---
description: How to write filters in WOQL
---

# Filter Documents

{% hint style="info" %}
To use this How-To, first [clone the Star Wars demo](../cloning-a-demo-project.md) into your team on TerminusCMS. You will then have full access to the data needed for this tutorial
{% endhint %}

Since WOQL is a datalog, filters are just part of the query. You can express negative information, or constraints on the variables in order to get a restriction down to the things you want.

For instance, we can write the following query in the query panel for the Star Wars demo:

```javascript
let v = Vars("person","person_name","vehicle","vehicle_name");
limit(10)
.select(v.person_name, v.vehicle_name)
  .and(triple(v.vehicle, "pilot", v.person),
       triple(v.vehicle, "label", v.vehicle_name),
       triple(v.person, "label", v.person_name))
```

This results in:

```json
[ {"person_name": {"@type":"xsd:string", "@value":"Chewbacca"},
   "vehicle_name": {"@type":"xsd:string", "@value":"Millennium Falcon"}},
  {"person_name": {"@type":"xsd:string", "@value":"Han Solo"},
   "vehicle_name": {"@type":"xsd:string", "@value":"Millennium Falcon"}},
  {"person_name": {"@type":"xsd:string", "@value":"Lando Calrissian"},
   "vehicle_name": {"@type":"xsd:string", "@value":"Millennium Falcon"}},
  {"person_name": {"@type":"xsd:string", "@value":"Nien Nunb"},
   "vehicle_name": {"@type":"xsd:string", "@value":"Millennium Falcon"}},
  {"person_name": {"@type":"xsd:string", "@value":"Luke Skywalker"},
   "vehicle_name": {"@type":"xsd:string", "@value":"X-wing"}},
  {"person_name": {"@type":"xsd:string", "@value":"Wedge Antilles"},
   "vehicle_name": {"@type":"xsd:string", "@value":"X-wing"}},
  {"person_name": {"@type":"xsd:string", "@value":"Jek Tono Porkins"},
   "vehicle_name": {"@type":"xsd:string", "@value":"X-wing"}},
  {"person_name": {"@type":"xsd:string", "@value":"Biggs Darklighter"},
   "vehicle_name": {"@type":"xsd:string", "@value":"X-wing"}},
  {"person_name": {"@type":"xsd:string", "@value":"Darth Vader"},
   "vehicle_name": {"@type":"xsd:string", "@value":"TIE Advanced x1"}},
  {"person_name": {"@type":"xsd:string", "@value":"Boba Fett"},
   "vehicle_name": {"@type":"xsd:string", "@value":"Slave 1"}}
]
```

We can ask for a _specific_ example of a vehicle name by filtering on equality.

For instance:

```javascript
let v = Vars("person","person_name","vehicle","vehicle_name");
select(v.person_name, v.vehicle_name)
  .and(triple(v.vehicle, "pilot", v.person),
       triple(v.vehicle, "label", v.vehicle_name),
       triple(v.person, "label", v.person_name),
       eq(v.vehicle_name, string("Millennium Falcon")))
```

Which results in:

```json
[ {"person_name": {"@type":"xsd:string", "@value":"Chewbacca"},
   "vehicle_name": {"@type":"xsd:string", "@value":"Millennium Falcon"}},
  {"person_name": {"@type":"xsd:string", "@value":"Han Solo"},
   "vehicle_name": {"@type":"xsd:string", "@value":"Millennium Falcon"}},
  {"person_name": {"@type":"xsd:string", "@value":"Lando Calrissian"},
   "vehicle_name": {"@type":"xsd:string", "@value":"Millennium Falcon"}},
  {"person_name": {"@type":"xsd:string", "@value":"Nien Nunb"},
   "vehicle_name": {"@type":"xsd:string", "@value":"Millennium Falcon"}}
]
```

We can also write:

```javascript
let v = Vars("person","person_name","vehicle","vehicle_name");
select(v.person_name, v.vehicle_name)
  .and(triple(v.vehicle, "pilot", v.person),
       triple(v.vehicle, "label", v.vehicle_name),
       triple(v.person, "label", v.person_name),
       not(eq(v.vehicle_name, string("Millennium Falcon"))))
```

In which we get the complement of the above.

Or, we can use the regex operator to get a wider variety, for instance:

```javascript
let v = Vars("person","person_name","vehicle","vehicle_name","pattern");
select(v.person_name, v.vehicle_name)
  .and(triple(v.vehicle, "pilot", v.person),
       triple(v.vehicle, "label", v.vehicle_name),
       triple(v.person, "label", v.person_name),
       regex("W.*", v.vehicle_name, [v.pattern]))
```

In this case, we get:

```json
[ {"person_name": {"@type":"xsd:string", "@value":"Darth Vader"},
   "vehicle_name": {"@type":"xsd:string", "@value":"TIE Advanced x1"}},
  {"person_name": {"@type":"xsd:string", "@value":"Arvel Crynyd"},
   "vehicle_name": {"@type":"xsd:string", "@value":"A-wing"}},
  {"person_name": {"@type":"xsd:string", "@value":"Chewbacca"},
   "vehicle_name": {"@type":"xsd:string", "@value":"AT-ST"}}
]
```
