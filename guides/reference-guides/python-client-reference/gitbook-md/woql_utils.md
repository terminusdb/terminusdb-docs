<a id="woql_utils"></a>

# woql\_utils

<a id="woql_utils.encode_uri_component"></a>

## encode\_uri\_component

```python
def encode_uri_component(value)
```

Encode a URI.

**Arguments**:

- `value` (`Value which needs to be encoded`): None

<a id="woql_utils.uri_encode_payload"></a>

## uri\_encode\_payload

```python
def uri_encode_payload(payload)
```

Encode the given payload

**Arguments**:

- `payload` (`dict`): None

<a id="woql_utils.add_params_to_url"></a>

## add\_params\_to\_url

```python
def add_params_to_url(url, payload)
```

Add params / payload to given url

**Arguments**:

- `url` (`str`): None
- `payload` (`dict`): None

<a id="woql_utils.add_namespaces_to_variable"></a>

## add\_namespaces\_to\_variable

```python
def add_namespaces_to_variable(var)
```

Adds namespace to given variable

**Arguments**:

- `var` (`str`): Variable

<a id="woql_utils.add_namespaces_to_variables"></a>

## add\_namespaces\_to\_variables

```python
def add_namespaces_to_variables(variables)
```

Adds namespace to given variables

**Arguments**:

- `variables` (`list [str]`): None

<a id="woql_utils.empty"></a>

## empty

```python
def empty(obj)
```

* is the object empty?
* returns true if the json object is empty

<a id="woql_utils.shorten"></a>

## shorten

```python
def shorten(url, prefixes=None)
```

Get shortened url

**Arguments**:

- `url` (`str`): None
- `prefixes` (`dict`): None

<a id="woql_utils.is_data_type"></a>

## is\_data\_type

```python
def is_data_type(stype)
```

Checks if the given type is a datatype or not

**Arguments**:

- `stype` (`str`): None

**Returns**:

`bool`: 

<a id="woql_utils.valid_url"></a>

## valid\_url

```python
def valid_url(string)
```

Checks if the given url is valid

**Arguments**:

- `string` (`str`): Url which needs to be validated

**Returns**:

`bool`: 

<a id="woql_utils.url_fraqment"></a>

## url\_fraqment

```python
def url_fraqment(url)
```

Gets the url fragment

**Arguments**:

- `url` (`str`): None

**Returns**:

`str`: url fragment

<a id="woql_utils.label_from_url"></a>

## label\_from\_url

```python
def label_from_url(url)
```

Get the label from url

**Arguments**:

- `url` (`str`): None

**Returns**:

`str`: Label

