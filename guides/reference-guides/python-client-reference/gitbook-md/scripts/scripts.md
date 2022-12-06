<a id="scripts.scripts"></a>

# scripts.scripts

<a id="scripts.scripts.startproject"></a>

## startproject

```python
@click.command()
def startproject()
```

Create the template files into current working directory

<a id="scripts.scripts.sync"></a>

## sync

```python
@click.command()
def sync()
```

Pull the current schema plan in database to schema.py

<a id="scripts.scripts.commit"></a>

## commit

```python
@click.command()
@click.option(
    "-m",
    "--message",
    help="Commit message for the commit",
)
def commit(message)
```

Push the current schema plan in schema.py to database.

<a id="scripts.scripts.deletedb"></a>

## deletedb

```python
@click.command()
def deletedb()
```

Delete the database in this project.

<a id="scripts.scripts.importcsv"></a>

## importcsv

```python
@click.command()
@click.argument("csv_file")
@click.argument("keys", nargs=-1)
@click.option(
    "--classname",
    "class_name",
    help=
    "Customize the class name that the data from the CSV will be import as",
)
@click.option(
    "--chunksize",
    default=1000,
    show_default=True,
    help="Large files will be load into database in chunks, size of the chunks",
)
@click.option(
    "--schema",
    is_flag=True,
    help="Specify if schema to be updated if existed, default False",
)
@click.option(
    "--na",
    default="optional",
    type=click.Choice(["skip", "optional", "error"], case_sensitive=False),
    help=
    "Specify how to handle NAs: 'skip' will skip entries with NAs, 'optional' will make all properties optional in the database, 'error' will just throw an error if there's NAs",
)
@click.option("--id",
              "id_",
              help="Specify column to be used as ids instead of generated ids")
@click.option("-e",
              "--embedded",
              multiple=True,
              help="Specify embedded columns")
@click.option(
    "-m",
    "--message",
    help="Commit message for the import",
)
@click.option(
    "--sep",
    default=",",
    show_default=True,
    help="Specify separator character in the CSV",
)
def importcsv(csv_file, keys, class_name, chunksize, schema, na, id_, embedded,
              message, sep)
```

Import CSV file into pandas DataFrame then into TerminusDB, with read_csv() options.
Options like chunksize, sep etc

<a id="scripts.scripts.exportcsv"></a>

## exportcsv

```python
@click.command()
@click.argument("class_obj")
@click.option(
    "--keepid",
    is_flag=True,
    help=
    "If used, the id of the object and the other meta (@) is to be kept as is in the CSV",
)
@click.option(
    "--maxdep",
    default=2,
    show_default=True,
    help=
    "Specify the depth of the embedding operation. When maximum is hit, the values will be kept as object ids",
)
@click.option(
    "--filename",
    help=
    "File name if the exported file, if not specify it will use the name of the class e.g. 'ClassName.csv'",
)
def exportcsv(class_obj, keepid, maxdep, filename=None)
```

Export all documents in a TerminusDB class into a flatten CSV file.

<a id="scripts.scripts.alldocs"></a>

## alldocs

```python
@click.command()
@click.option("-s",
              "--schema",
              is_flag=True,
              help="Specify if getting schema object instead")
@click.option("-t",
              "--type",
              "type_",
              help="Type of the objects to be getting back")
@click.option(
    "-q",
    "--query",
    multiple=True,
    help=
    "Use query to filter out objects getting back. Need to be used with -t/--type",
)
@click.option("-h",
              "--head",
              help="Show/ export only set number of documents max",
              type=int)
@click.option(
    "-e",
    "--export",
    is_flag=True,
    help=
    "Specify if the result to be export as CSV. Only usable when using –t/--type and not -s/-–schema",
)
@click.option(
    "--keepid",
    is_flag=True,
    help="Option for export: if the id of the object is to be kept in the CSV",
)
@click.option(
    "--maxdep",
    default=2,
    show_default=True,
    help="Option for export: specify the depth of the embedding operation",
)
@click.option("--filename",
              help="Option for export: file name if the exported file")
def alldocs(schema, type_, query, head, export, keepid, maxdep, filename=None)
```

Get all documents in the database, use --schema to specify schema, --type to select type and -q to make queries (e.g. -q date=2021-07-01)

If using --type and not --schema, can export using -e with options: --keepid, --maxdep and --filename

<a id="scripts.scripts.branch"></a>

## branch

```python
@click.command()
@click.argument("branch_name", required=False)
@click.option(
    "-d",
    "--delete",
    multiple=True,
    help="Branch(es) to be deleted",
)
def branch(branch_name, delete)
```

Create or list branch.

<a id="scripts.scripts.checkout"></a>

## checkout

```python
@click.command()
@click.argument("branch_name")
@click.option("-b", "--branch", "new_branch", is_flag=True)
def checkout(branch_name, new_branch)
```

Switch branches. Use -b to create and switch to new branch.

<a id="scripts.scripts.rebase"></a>

## rebase

```python
@click.command()
@click.argument("branch_name")
def rebase(branch_name)
```

Reapply commits on top of another base tip on another branch.

<a id="scripts.scripts.status"></a>

## status

```python
@click.command()
def status()
```

Show the working status of the project.

<a id="scripts.scripts.log"></a>

## log

```python
@click.command()
def log()
```

Show commit log of the project.

<a id="scripts.scripts.reset"></a>

## reset

```python
@click.command()
@click.argument("commit", required=False)
@click.option(
    "--soft",
    is_flag=True,
    help=
    "Soft reset (referencing that commit) instead of hard reset (default, reset the state of the commit for the database, not reversible)",
)
def reset(commit, soft)
```

Reset the head of the commit to a certain commit with id as input. Default to be a hard reset (newer commit will be wipped, not reversible). If no commit is is provided, it will reset to the newest commit.

<a id="scripts.scripts.config"></a>

## config

```python
@click.command()
@click.argument("set_config", required=False, nargs=-1)
@click.option(
    "-d",
    "--delete",
    multiple=True,
    help="Keys of items in the config.json to be deleted",
)
def config(set_config, delete)
```

Show or set config.json of the project. To set a config, use <key>=<value>, e.g. streams=MyClass or streams=[Class1, Class2]

