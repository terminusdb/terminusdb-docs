<a id="errors"></a>

# errors

<a id="errors.Error"></a>

# Error Objects

```python
class Error(Exception)
```

Exception that is base class for all other error exceptions.

<a id="errors.InterfaceError"></a>

# InterfaceError Objects

```python
class InterfaceError(Error)
```

Exception raised for errors that are related to the database interface rather than the database itself.

**Arguments**:

- `message` (`str`): Error message.

<a id="errors.DatabaseError"></a>

# DatabaseError Objects

```python
class DatabaseError(Error)
```

Exception for errors related to the database.

**Arguments**:

- `message` (`str`): Error message.
- `error_obj` (`dict`): Whole error object in json format
- `status_code` (`int`): status_code from the request.Response

<a id="errors.DatabaseError.__init__"></a>

## \_\_init\_\_

```python
def __init__(self, response=None)
```

Exception for errors related to the database.

**Arguments**:

- `response` (`request.Response`): response from the api call

<a id="errors.OperationalError"></a>

# OperationalError Objects

```python
class OperationalError(DatabaseError)
```

Exception for operational errors related to the database.

<a id="errors.APIError"></a>

# APIError Objects

```python
class APIError(DatabaseError)
```

Exceptions to do with return messages from HTTP

**Arguments**:

- `message` (`str`): Error message.
- `error_obj` (`dict`): Whole error object in json format
- `status_code` (`int`): status_code from the request.Response
- `url` (`str`): url causeing the Error

<a id="errors.APIError.__init__"></a>

## \_\_init\_\_

```python
def __init__(self, message=None, url=None, err_obj=None, status_code=None)
```

Exceptions to do with return messages from HTTP

**Arguments**:

- `message` (`str`): Error message.
- `error_obj` (`dict`): Whole error object in json format
- `status_code` (`int`): status_code from the request.Response
- `url` (`str`): url causeing the Error

