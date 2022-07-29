# HTTP API

## Connection

{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/" method="get" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}



{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/info" method="get" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}



{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/ok" method="get" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}


## Database

{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/db/" method="get" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}



{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/db/{organization}/{database}" method="get" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}



{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/db/{organization}/{database}" method="head" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}



{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/db/{organization}/{database}" method="post" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}



{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/db/{organization}/{database}" method="delete" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}



{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/db/{organization}/{database}" method="put" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}


## Document

{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/document/{path}" method="get" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}



{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/document/{path}" method="post" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}



{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/document/{path}" method="delete" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}



{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/document/{path}" method="put" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}


## Frame

{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/schema" method="get" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}


## WOQL

{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/woql" method="post" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}



{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/woql/{path}" method="post" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}


## Collaboration

{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/clone/{organization}/{database}" method="post" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}



{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/fetch/{path}" method="post" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}



{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/push/{path}" method="post" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}



{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/pull/{path}" method="post" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}


## Branches

{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/branch/{path}" method="post" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}



{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/branch/{path}" method="delete" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}



{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/squash/{path}" method="get" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}



{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/reset/{path}" method="post" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}


## Optimize

{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/optimize/{path}" method="post" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}


## Prefixes

{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/prefixes/{path}" method="get" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}


## Change management

{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/diff" method="post" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}



{% swagger src="https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml" path="/patch" method="post" %}
[https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml](https://raw.githubusercontent.com/terminusdb/terminusdb/main/docs/openapi.yaml)
{% endswagger %}


