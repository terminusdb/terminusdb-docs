# Errors and Exceptions

### _exception_ terminusdb\_client.errors.Error()

**Bases:** `Exception`

Exception that is base class for all other error exceptions.

### **init**()

### _exception_ terminusdb\_client.errors.InterfaceError(message)

**Bases:** `terminusdb_client.errors.Error`

Exception raised for errors that are related to the database interface rather than the database itself.

### message()

Error message.

**Type**

`str`

### **init**(message)

### _exception_ terminusdb\_client.errors.DatabaseError(response=None)

**Bases:** `terminusdb_client.errors.Error`

Exception for errors related to the database.

### message()

Error message.

**Type**

`str`

### error\_obj()

Whole error object in json format

**Type**

dict

### status\_code()

status\_code from the request.Response

**Type**

int

### **init**(response=None)

Exception for errors related to the database.

**Parameter/s**

**response** (_request.Response_) – response from the api call

### _exception_ terminusdb\_client.errors.OperationalError(response=None)

**Bases:** `terminusdb_client.errors.DatabaseError`

Exception for operational errors related to the database.

### _exception_ terminusdb\_client.errors.AccessDeniedError(response=None)

**Bases:** `terminusdb_client.errors.DatabaseError`

### _exception_ terminusdb\_client.errors.APIError(message=None, url=None, err\_obj=None, status\_code=None)

**Bases:** `terminusdb_client.errors.DatabaseError`

Exceptions to do with return messages from HTTP

### message()

Error message.

**Type**

`str`

### error\_obj()

Whole error object in json format

**Type**

dict

### status\_code()

status\_code from the request.Response

**Type**

int

### url()

url causeing the Error

**Type**

`str`

### **init**(message=None, url=None, err\_obj=None, status\_code=None)

Exceptions to do with return messages from HTTP

**Parameter/s**

* **message** (`str`) – Error message.
* **error\_obj** (_dict_) – Whole error object in json format
* **status\_code** (`int`) – status\_code from the request.Response
* **url** (`str`) – url causeing the Error

### _exception_ terminusdb\_client.errors.InvalidURIError()

**Bases:** `terminusdb_client.errors.Error`
