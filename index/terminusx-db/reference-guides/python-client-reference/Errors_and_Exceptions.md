# Errors and Exceptions


### _exception_ terminusdb_client.errors.Error()
**Bases:** `Exception`

Exception that is base class for all other error exceptions.


### __init__()

### _exception_ terminusdb_client.errors.InterfaceError(message)
**Bases:** `Error`

Exception raised for errors that are related to the database interface rather than the database itself.


### message()
Error message.


**Type**

`str`



### __init__(message)

### _exception_ terminusdb_client.errors.DatabaseError(response=None)
**Bases:** `Error`

Exception for errors related to the database.


### message()
Error message.


**Type**

`str`



### error_obj()
Whole error object in json format


**Type**

dict



### status_code()
status_code from the request.Response


**Type**

int



### __init__(response=None)
Exception for errors related to the database.


**Parameter/s**

**response** (*request.Response*) – response from the api call



### _exception_ terminusdb_client.errors.OperationalError(response=None)
**Bases:** `DatabaseError`

Exception for operational errors related to the database.


### _exception_ terminusdb_client.errors.AccessDeniedError(response=None)
**Bases:** `DatabaseError`


### _exception_ terminusdb_client.errors.APIError(message=None, url=None, err_obj=None, status_code=None)
**Bases:** `DatabaseError`

Exceptions to do with return messages from HTTP


### message()
Error message.


**Type**

`str`



### error_obj()
Whole error object in json format


**Type**

dict



### status_code()
status_code from the request.Response


**Type**

int



### url()
url causeing the Error


**Type**

`str`



### __init__(message=None, url=None, err_obj=None, status_code=None)
Exceptions to do with return messages from HTTP


**Parameter/s**


* **message** (``str``) – Error message.


* **error_obj** (*dict*) – Whole error object in json format


* **status_code** (`int`) – status_code from the request.Response


* **url** (``str``) – url causeing the Error



### _exception_ terminusdb_client.errors.InvalidURIError()
**Bases:** `Error`

