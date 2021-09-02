# Getting your Key

In order to use TerminusX you will need an API key. You can get this
in the user interface by logging in to
[cloud.terminusdb.com](https://cloud.terminusdb.com). Once logged in,
navigate to the upper right hand corner of the screen, and select your profile.

This will bring you to a page which will contain a code snippet for
*python* or *javascript*. Once you have copied this code, you can
generate a key by entering a key name and clicking *generate*.

This key needs to be set as an environment variable before you start
your client. You can do this in `bash` with the following:

```bash
$ export TERMINUSDB_ACCESS_TOKEN="my very long token here"
```
Now you are ready to start your client!
