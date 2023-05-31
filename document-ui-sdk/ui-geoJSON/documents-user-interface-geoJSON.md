---
description: Understand how <FrameViewer/> can load geoJSON to display geographic data structures in Create, Edit or View Mode 
---

## Demo 
Click here **[**Playground**](https://documents-ui-playground-geojson.terminusdb.com/Feature)** to view ``<FrameViewier/>`` demo in Create, edit or view mode.

### GeoJSON schema 
Below is the schema for loading geoJSON into a TerminusDB data product.



```
[
    {
        "@base": "terminusdb:///data/",
        "@schema": "terminusdb:///schema#",
        "@type": "@context"
    },
    { "@type" : "Class",
      "@id" : "GeoJSON",
      "@abstract" : [],
      "bbox" : { "@class" : "xsd:decimal",
                 "@dimensions" : 1,
                 "@type" : "Array" }
    },
    { "@type" : "Class",
      "@id" : "FeatureCollection",
      "@inherits": "GeoJSON",
      "@key" : { "@type" : "Random" },
      "@unfoldable" : [],
      "name" : { "@type" : "Optional",
                 "@class" : "xsd:string" },
      "type": "FeatureCollection_Type",
      "crs" : { "@type" : "Optional",
                "@class" : "sys:JSON" },
      "properties" : { "@type" : "Optional",
                       "@class" : "sys:JSON" },
      "features" : { "@type" : "Set",
                     "@class": "Feature"}
    },
    {
        "@id": "Polygon",
        "@inherits": "Geometry",
        "@type": "Class",
        "coordinates": {
            "@class": "xsd:decimal",
            "@dimensions": 3,
            "@type": "Array"
        },
        "type": "Polygon_Type"
    },
    { "@type" : "Class",
      "@id" : "Geometry",
      "@inherits": "GeoJSON",
      "@abstract" : [],
      "@unfoldable" : []
    },
    {
        "@id": "GeometryCollection_Type",
        "@type": "Enum",
        "@value": [
            "GeometryCollection"
        ]
    },
    {
        "@id": "GeometryCollection",
        "@inherits": "Geometry",
        "@type": "Class",
        "geometries": {
            "@class": "Geometry",
            "@type": "Set"
        },
        "type": "GeometryCollection_Type"
    },
    {
        "@id": "MultiPolygon",
        "@inherits": "Geometry",
        "@type": "Class",
        "coordinates": {
            "@class": "xsd:double",
            "@dimensions": 4,
            "@type": "Array"
        },
        "type": "MultiPolygon_Type"
    },
    {
        "@id": "LineString",
        "@inherits": "Geometry",
        "@type": "Class",
        "coordinates": {
            "@class": "xsd:double",
            "@dimensions": 2,
            "@type": "Array"
        },
        "type": "LineString_Type"
    },
    {
        "@id": "Point",
        "@inherits": "Geometry",
        "@type": "Class",
        "coordinates": {
            "@class": "xsd:double",
            "@dimensions": 1,
            "@type": "Array"
        },
        "type": "Point_Type"
    },
    {
        "@id": "Polygon_Type",
        "@type": "Enum",
        "@value": [
            "Polygon"
        ]
    },
    {
        "@id": "Point_Type",
        "@type": "Enum",
        "@value": [
            "Point"
        ]
    },
    {
        "@id": "MultiPolygon_Type",
        "@type": "Enum",
        "@value": [
            "MultiPolygon"
        ]
    },
    {
        "@id": "Name_Type",
        "@type": "Enum",
        "@value": [
            "name"
        ]
    },
    {
        "@id": "LineString_Type",
        "@type": "Enum",
        "@value": [
            "LineString"
        ]
    },
    {
        "@id": "Feature_Type",
        "@type": "Enum",
        "@value": [
            "Feature"
        ]
    },
    {
        "@id": "FeatureCollection_Type",
        "@type": "Enum",
        "@value": [
            "FeatureCollection"
        ]
    },
    {
        "@id": "Feature",
        "@type": "Class",
        "@inherits": "GeoJSON",
        "@unfoldable": [],
        "centerline": {
            "@class": "Geometry",
            "@type": "Optional"
        },
        "geometry": "Geometry",
        "id": {
            "@class": "xsd:string",
            "@type": "Optional"
        },
        "properties": { "@type" : "Optional",
                        "@class" : "sys:JSON" },
        "title": {
            "@class": "xsd:string",
            "@type": "Optional"
        },
        "type": "Feature_Type"
    }
]
```

##  GeoJSON Frames 

The equivalent geoJSON frame that can be retrieved from ``getSchemaFrame()`` call

```json
{
  "@context": {
    "@base": "terminusdb:///data/",
    "@schema": "terminusdb:///schema#",
    "@type": "Context"
  },
  "Feature": {
    "@inherits": [
      "GeoJSON"
    ],
    "@type": "Class",
    "@unfoldable": [],
    "bbox": {
      "@class": "xsd:decimal",
      "@dimensions": 1,
      "@type": "Array"
    },
    "centerline": {
      "@class": [
        "GeometryCollection",
        "LineString",
        "MultiPolygon",
        "Point",
        "Polygon"
      ],
      "@type": "Optional"
    },
    "geometry": [
      "GeometryCollection",
      "LineString",
      "MultiPolygon",
      "Point",
      "Polygon"
    ],
    "id": {
      "@class": "xsd:string",
      "@type": "Optional"
    },
    "properties": {
      "@class": "sys:JSON",
      "@type": "Optional"
    },
    "title": {
      "@class": "xsd:string",
      "@type": "Optional"
    },
    "type": {
      "@id": "Feature_Type",
      "@type": "Enum",
      "@values": [
        "Feature"
      ]
    }
  },
  "FeatureCollection": {
    "@inherits": [
      "GeoJSON"
    ],
    "@key": {
      "@type": "Random"
    },
    "@type": "Class",
    "@unfoldable": [],
    "bbox": {
      "@class": "xsd:decimal",
      "@dimensions": 1,
      "@type": "Array"
    },
    "crs": {
      "@class": "sys:JSON",
      "@type": "Optional"
    },
    "features": {
      "@class": "Feature",
      "@type": "Set"
    },
    "name": {
      "@class": "xsd:string",
      "@type": "Optional"
    },
    "properties": {
      "@class": "sys:JSON",
      "@type": "Optional"
    },
    "type": {
      "@id": "FeatureCollection_Type",
      "@type": "Enum",
      "@values": [
        "FeatureCollection"
      ]
    }
  },
  "FeatureCollection_Type": {
    "@type": "Enum",
    "@values": [
      "FeatureCollection"
    ]
  },
  "Feature_Type": {
    "@type": "Enum",
    "@values": [
      "Feature"
    ]
  },
  "GeoJSON": {
    "@abstract": [],
    "@type": "Class",
    "bbox": {
      "@class": "xsd:decimal",
      "@dimensions": 1,
      "@type": "Array"
    }
  },
  "Geometry": {
    "@abstract": [],
    "@inherits": [
      "GeoJSON"
    ],
    "@type": "Class",
    "@unfoldable": [],
    "bbox": {
      "@class": "xsd:decimal",
      "@dimensions": 1,
      "@type": "Array"
    }
  },
  "GeometryCollection": {
    "@inherits": [
      "GeoJSON",
      "Geometry"
    ],
    "@type": "Class",
    "@unfoldable": [],
    "bbox": {
      "@class": "xsd:decimal",
      "@dimensions": 1,
      "@type": "Array"
    },
    "geometries": {
      "@class": [
        "GeometryCollection",
        "LineString",
        "MultiPolygon",
        "Point",
        "Polygon"
      ],
      "@type": "Set"
    },
    "type": {
      "@id": "GeometryCollection_Type",
      "@type": "Enum",
      "@values": [
        "GeometryCollection"
      ]
    }
  },
  "GeometryCollection_Type": {
    "@type": "Enum",
    "@values": [
      "GeometryCollection"
    ]
  },
  "LineString": {
    "@inherits": [
      "GeoJSON",
      "Geometry"
    ],
    "@type": "Class",
    "@unfoldable": [],
    "bbox": {
      "@class": "xsd:decimal",
      "@dimensions": 1,
      "@type": "Array"
    },
    "coordinates": {
      "@class": "xsd:double",
      "@dimensions": 2,
      "@type": "Array"
    },
    "type": {
      "@id": "LineString_Type",
      "@type": "Enum",
      "@values": [
        "LineString"
      ]
    }
  },
  "LineString_Type": {
    "@type": "Enum",
    "@values": [
      "LineString"
    ]
  },
  "MultiPolygon": {
    "@inherits": [
      "GeoJSON",
      "Geometry"
    ],
    "@type": "Class",
    "@unfoldable": [],
    "bbox": {
      "@class": "xsd:decimal",
      "@dimensions": 1,
      "@type": "Array"
    },
    "coordinates": {
      "@class": "xsd:double",
      "@dimensions": 4,
      "@type": "Array"
    },
    "type": {
      "@id": "MultiPolygon_Type",
      "@type": "Enum",
      "@values": [
        "MultiPolygon"
      ]
    }
  },
  "MultiPolygon_Type": {
    "@type": "Enum",
    "@values": [
      "MultiPolygon"
    ]
  },
  "Name_Type": {
    "@type": "Enum",
    "@values": [
      "name"
    ]
  },
  "Point": {
    "@inherits": [
      "GeoJSON",
      "Geometry"
    ],
    "@type": "Class",
    "@unfoldable": [],
    "bbox": {
      "@class": "xsd:decimal",
      "@dimensions": 1,
      "@type": "Array"
    },
    "coordinates": {
      "@class": "xsd:double",
      "@dimensions": 1,
      "@type": "Array"
    },
    "type": {
      "@id": "Point_Type",
      "@type": "Enum",
      "@values": [
        "Point"
      ]
    }
  },
  "Point_Type": {
    "@type": "Enum",
    "@values": [
      "Point"
    ]
  },
  "Polygon": {
    "@inherits": [
      "GeoJSON",
      "Geometry"
    ],
    "@type": "Class",
    "@unfoldable": [],
    "bbox": {
      "@class": "xsd:decimal",
      "@dimensions": 1,
      "@type": "Array"
    },
    "coordinates": {
      "@class": "xsd:decimal",
      "@dimensions": 3,
      "@type": "Array"
    },
    "type": {
      "@id": "Polygon_Type",
      "@type": "Enum",
      "@values": [
        "Polygon"
      ]
    }
  },
  "Polygon_Type": {
    "@type": "Enum",
    "@values": [
      "Polygon"
    ]
  }
}
```

<<<<<<< HEAD
#### Demo 
Click here **[**Demo**](https://documents-ui-playground-geojson.terminusdb.com/FeatureCollection)** to view ``<FrameViewier/>`` with geoJSON data.
=======
## Demo 
Take a look at the [**Demo Playground**](https://documents-ui-playground-geojson.terminusdb.com/) to view ``<FrameViewier/>`` with geoJSON data.
>>>>>>> 2fae9cb51a7cf619fa160fb4154f03dd8eed5c06

## Example

This example shows how to load a `FeartureCollection` into ``<FrameViewier/>``. 

> Note: In View mode we display the map view of geoJSONs using react-leaflets under the hood.

```javascript
import { FrameViewer } from '@terminusdb/terminusdb-documents-ui'

  return <FrameViewer
    frame={frame}                           // above defined frame          
    formData={{}}                           // formData will be empty
    mode={"Create"}                         // mode 
    type={"FeartureCollection"}/>           // type of document 
```






