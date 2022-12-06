<a id="woql_type"></a>

# woql\_type

<a id="woql_type.from_woql_type"></a>

## from\_woql\_type

```python
def from_woql_type(input_type: Union[str, dict],
                   skip_convert_error=False,
                   as_str=False)
```

Converting the TerminusDB datatypes into Python types, it will not detect self define types (i.e. object properties) so if converting object properties, skip_convert_error need to be True.

**Arguments**:

- `input_type` (`str or dict`): TerminusDB datatypes to be converted.
- `skip_convert_error` (`bool`): Will an error be raised if the datatype given cannot be convert to Python types. If set to True (and as_type set to False) and type cannot be converted, the type will be returned back without convertion.
- `as_str` (`bool`): Will convert the type and present it as string (e.g. used in constructing scripts). It will always skip convert error if set to True.

<a id="woql_type.datetime_to_woql"></a>

## datetime\_to\_woql

```python
def datetime_to_woql(dt_obj)
```

Convert datetime objects into strings that is recognize by woql.
Do nothing and return the object as it if it is not one of the supported datetime object.

<a id="woql_type.datetime_from_woql"></a>

## datetime\_from\_woql

```python
def datetime_from_woql(dt_str, woql_type)
```

Convert woql datetime objects (str format) to datetime object.
Raise ValueError if cannot be converted.

