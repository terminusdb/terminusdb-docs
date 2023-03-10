---
description: >-
  How to install the TerminusDB Python Client to work with TerminusDB and
  TerminusCMS in Python
---

# Install the Python Client

It is recommended that you install the TerminusDB Python client (which works with [Python >= 3.7](https://www.python.org/downloads)) in a [separate Python environment](https://docs.python.org/3/tutorial/venv.html). In the example, we use `venv` which comes with the standard installation of Python 3. First, we create the new environment:

```python
$ python3 -m venv ~/.virtualenvs/terminusdb
$ source ~/.virtualenvs/terminusdb/bin/activate
```

Then we can install using pip:

```python
$ python3 -m pip install terminusdb-client
```
