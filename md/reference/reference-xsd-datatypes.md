# XSD data types Reference

TerminusDB aims to be compliant with the [W3C XSD data type](https://www.w3.org/TR/2012/REC-xmlschema11-2-20120405/).

## XSD data types

The following XSD data types are supported:

`xsd:anySimpleType`

`xsd:string`

`xsd:boolean`

`xsd:decimal` (see [Decimal limitations](#decimal-limitations))

`xsd:double`

`xsd:float`

`xsd:time`

`xsd:date`

`xsd:dateTime`

`xsd:dateTimeStamp`

`xsd:gYear`

`xsd:gMonth`

`xsd:gDay`

`xsd:gYearMonth`

`xsd:gMonthDay`

`xsd:duration`

`xsd:yearMonthDuration`

`xsd:dayTimeDuration`

`xsd:byte`

`xsd:short`

`xsd:int`

`xsd:long`

`xsd:unsignedByte`

`xsd:unsignedShort`

`xsd:unsignedInt`

`xsd:unsignedLong`

`xsd:integer`

`xsd:positiveInteger`

`xsd:nonNegativeInteger`

`xsd:negativeInteger`

`xsd:nonPositiveInteger`

`xsd:base64Binary`

`xsd:hexBinary`

`xsd:anyURI`

`xsd:language`

`xsd:normalizedString`

`xsd:token`

`xsd:NMTOKEN`

`xsd:Name`

`xsd:NCName`

## RDF data types

The following RDF data types are supported:

`rdf:PlainLiteral`

`rdf:langString`

`rdf:Literal` <!-- to-do: rdfs#L... or rdf:L...-->

## Extended data types

TermminusDB has the following extended data types:

http://terminusdb.com/schema/

| Extended data type | Form | Represents |
| ------------------ | ---- | ---------- |
| `xdd#coordinate` | Coordinates | `"[3.3, 43.1]"` | 
| `xdd#coordinatePolygon` | Coordinate polygons (closed polylines) | `"[ [3.3,43.1], [15.3,27.1] ]"` | 
| `xdd#coordinatePolyline` | Coordinate polylines | `"[ [3.3,43.1], [15.3,27.1] ]"` |
| `xdd#dateRange` | Ranges of dates | `"[2017-10-09, 2017-10-09]"` |
| `xdd#gYearRange` | Ranges of years | `"[2017, 2525]"` |
| `xdd#integerRange` | Ranges of years | `"[-123, 2525]"` |
| `xdd#decimalRange` |  Ranges of decimals (see [Decimal limitations](#decimal-limitations)) |`"[-123.234, 2525.432]"` |
| `xdd#json` | A JSON object as a string ||
| `xdd#url` | A fully specified absolute URL ||
| `xdd#email` | A valid email address ||
| `xdd#html` | A HTML document or fragment ||

## Decimal limitations

Applies to `xsd:decimal` and `xdd#decimalRange`.

Currently, large floating-point decimals are treated as `double` and large integers are treated as `bignum`. Later releases will support arbitrary precision decimals.