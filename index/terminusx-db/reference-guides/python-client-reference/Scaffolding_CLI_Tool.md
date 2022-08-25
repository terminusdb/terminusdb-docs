# Scaffolding CLI Tool

## terminusdb

```shell
terminusdb [OPTIONS] COMMAND [ARGS]...
```

## alldocs

Get all documents in the database, use –schema to specify schema, –type to select type and -q to make queries (e.g. -q date=2021-07-01)\`

If using –type and not –schema, can export using -e with options: –keepid, –maxdep and –filename

```shell
terminusdb alldocs [OPTIONS]
```

**Options**

* `-s, --schema()` Specify if getting schema object instead
* `-t, --type <type_>` Type of the objects to be getting back
* `-q, --query <query>` Use query to filter out objects getting back. Need to be used with -t/–type
* `-h, --head <head>` Show/ export only set number of documents max
* `-e, --export()` Specify if the result to be export as CSV. Only usable when using –t/–type and not -s/-–schema
* `--keepid()` Option for export: if the id of the object is to be kept in the CSV
* `--maxdep <maxdep>` Option for export: specify the depth of the embedding operation
*   **Default**

    2
* `--filename <filename>` Option for export: file name if the exported file

## branch

Create or list branch.

```shell
terminusdb branch [OPTIONS] [BRANCH_NAME]
```

**Options**

* `-d, --delete <delete>` Branch(es) to be deleted

**Arguments**

* `BRANCH_NAME()` Optional argument

## checkout

Switch branches. Use -b to create and switch to new branch.

```shell
terminusdb checkout [OPTIONS] BRANCH_NAME
```

**Options**

* `-b, --branch()`

**Arguments**

* `BRANCH_NAME()` Required argument

## commit

Push the current schema plan in schema.py to database.

```shell
terminusdb commit [OPTIONS]
```

**Options**

* `-m, --message <message>` Commit message for the commit

## config

Show or set config.json of the project. To set a config, use =, e.g. streams=MyClass or streams=\[Class1, Class2]

```shell
terminusdb config [OPTIONS] [SET_CONFIG]...
```

**Options**

* `-d, --delete <delete>` Keys of items in the config.json to be deleted

**Arguments**

* `SET_CONFIG()` Optional argument(s)\`

## deletedb

Delete the database in this project.

```shell
terminusdb deletedb [OPTIONS]
```

## exportcsv

Export all documents in a TerminusDB class into a flatten CSV file.

```shell
terminusdb exportcsv [OPTIONS] CLASS_OBJ
```

**Options**

* `--keepid()` If used, the id of the object and the other meta (@) is to be kept as is in the CSV
* `--maxdep <maxdep>` Specify the depth of the embedding operation. When maximum is hit, the values will be kept as object ids
*   **Default**

    2
* `--filename <filename>` File name if the exported file, if not specify it will use the name of the class e.g. ‘ClassName.csv’

**Arguments**

* `CLASS_OBJ()` Required argument

## importcsv

Import CSV file into pandas DataFrame then into TerminusDB, with read\_csv() options. Options like chunksize, sep etc

```shell
terminusdb importcsv [OPTIONS] CSV_FILE [KEYS]...
```

**Options**

* `--classname <class_name>` Customize the class name that the data from the CSV will be import as
* `--chunksize <chunksize>` Large files will be load into database in chunks, size of the chunks
*   **Default**

    1000
* `--schema()` Specify if schema to be updated if existed, default False
* `--na <na>` Specify how to handle NAs: ‘skip’ will skip entries with NAs, ‘optional’ will make all properties optional in the database, ‘error’ will just throw an error if there’s NAs
*   **Options**

    skip | optional | error
* `--id <id_>` Specify column to be used as ids instead of generated ids
* `-e, --embedded <embedded>` Specify embedded columns
* `-m, --message <message>` Commit message for the import
* `--sep <sep>` Specify separator character in the CSV
*   **Default**

    ,

**Arguments**

* `CSV_FILE()` Required argument
* `KEYS()` Optional argument(s)\`

## log

Show commit log of the project.

```shell
terminusdb log [OPTIONS]
```

## rebase

Reapply commits on top of another base tip on another branch.

```shell
terminusdb rebase [OPTIONS] BRANCH_NAME
```

**Arguments**

* `BRANCH_NAME()` Required argument

## reset

Reset the head of the commit to a certain commit with id as input. Default to be a hard reset (newer commit will be wipped, not reversible). If no commit is is provided, it will reset to the newest commit.

```shell
terminusdb reset [OPTIONS] [COMMIT]
```

**Options**

* `--soft()` Soft reset (referencing that commit) instead of hard reset (default, reset the state of the commit for the database, not reversible)\`

**Arguments**

* `COMMIT()` Optional argument

## startproject

Create the template files into current working directory

```shell
terminusdb startproject [OPTIONS]
```

## status

Show the working status of the project.

```shell
terminusdb status [OPTIONS]
```

## sync

Pull the current schema plan in database to schema.py

```shell
terminusdb sync [OPTIONS]
```
