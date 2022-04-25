# WOQLView

## class terminusdb\_client.WOQLView()

**Bases:** `object`

### **init**()

### edges(\*args)

Configure edges for the WOQLView

**Parameter/s**

**args** (_List of edges_) – Edges to be configured in woqlGraphConfig

**Returns**

View object

**Return type/s**

WOQLView object

### height(height\_input)

Configure height for the WOQLView

**Parameter/s**

**height\_input** (_Number_) – Height of the view

**Returns**

View object

**Return type/s**

WOQLView object

### width(width\_input)

Configure width for the WOQLView

**Parameter/s**

**width\_input** (_Number_) – Width of the view

**Returns**

View object

**Return type/s**

WOQLView object

### edge(start, end)

Add Edges in the given range

**Parameter/s**

* **start** (`str`) –
* **end** (`str`) –

**Returns**

View object

**Return type/s**

WOQLView object

### node(\*args)

Configure the list of nodes to graph

**Parameter/s**

**args** (

```
*
```

`str`) –

**Returns**

View object

**Return type/s**

WOQLView object

### text(input\_text)

Configure text for WOQLView

**Parameter/s**

**input\_text** (`str`) – Text of the view

**Returns**

View object

**Return type/s**

WOQLView object

### distance(input\_distance)

Configure distance for the WOQLView

**Parameter/s**

**input\_distance** (_Number_) – distance of the view

**Returns**

View object

**Return type/s**

WOQLView object

### weight(input\_weight)

Configure weight for the WOQLView

**Parameter/s**

**input\_weight** (_Number_) – Weight of the view

**Returns**

View object

**Return type/s**

WOQLView object

### color(input\_color)

Configure colors for the WOQLView

**Parameter/s**

**input\_color** (_list_) – Color list of the view

**Returns**

View object

**Return type/s**

WOQLView object

### icon(input\_dict)

Configure icon for the WOQLView

**Parameter/s**

**input\_dict** (_dict_) – Icons mapped as key value

**Returns**

View object

**Return type/s**

WOQLView object

### size(input\_size)

Configure size for the WOQLView

**Parameter/s**

**input\_size** (_Number_) – Weight of the view

**Returns**

View object

**Return type/s**

WOQLView object

### collision\_radius(input\_radius)

Configure radius for the WOQLView

**Parameter/s**

**input\_radius** (_Number_) – Radius of the view

**Returns**

View object

**Return type/s**

WOQLView object

### hidden(input\_choice)

Configure hidden choice for the WOQLView

**Parameter/s**

**input\_choice** (`bool`) – Hidden Choice of the view

**Returns**

View object

**Return type/s**

WOQLView object

### charge(input\_charge)

Configure charge for the WOQLView

**Parameter/s**

**input\_charge** (_Number_) – Charge of the view

**Returns**

View object

**Return type/s**

WOQLView object

### of(input\_obj)

Configure IN object for the WOQLView

**Parameter/s**

**input\_obj** (`str`) – Object of the view

**Returns**

View object

**Return type/s**

WOQLView object

### show(result)

Show the graph inline in the Jupyter notebook

**Parameter/s**

**result** (_the result that is returning from a query in dict format._) –

### export(filename, result)

Export the graph into an html file

**Parameter/s**

* **filename** (_the file name of the export file_\* (**without extention**)\*\*.\*) –
* **result** (_the result that is returning from a query in dict format._) –

### print\_js\_config()

Print out the JavaScript config

**Parameter/s**

**result** (_the result that is returning from a query in dict format._) –
