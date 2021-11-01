# How to Update Data

> **On this page:** A how-to guide to update a WOQL triple.
 
<!-- to-do: TRANSLATE -->

When updating a WOQL triple with an unknown value that may or may not exist, first retrieve the old value. If there are multiple values, this will delete all values and replace them with one value.

## Update the gender of a person

Update the `"scm:gender"` of `"doc:Person_1"` to `"Male"`.

#### Code: Update gender

<br>

<!-- tabs:start -->

### **JavaScript**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-node-js.png)</i>Update a triple using a JavaScript client.

```javascript
when
(
    triple("doc:Person_1", "scm:gender", "v:Value"),
    and
    (
        delete_triple("doc:Person_1", "scm:gender", "v:Value"),
        add_triple("doc:Person_1",    "scm:gender", literal("Male", "string"))
    )
)
```

### **Python**

<i class="tdb-i">![info](../../img/ico/terminusdb-icon-python.png)</i>Update a triple using a Python client.

```python
query = WOQL().when
(
    WOQL().triple("doc:my_document", "scm:my_property", "v:Value"),
    WOQL().woql_and
    (
        WOQL().delete_triple("doc:my_document", "scm:my_property","v:Value"),
        WOQL().add_triple("doc:my_document",    "scm:my_property", 
            WOQL().literal("New Value",         "xsd:string"))
    )
),
client.query(query)
```

<!-- tabs:end -->