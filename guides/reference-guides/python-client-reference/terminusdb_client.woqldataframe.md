<a id="terminusdb_client.woqldataframe"></a>

# terminusdb\_client.woqldataframe

<a id="terminusdb_client.woqldataframe.woqlDataframe"></a>

# terminusdb\_client.woqldataframe.woqlDataframe

<a id="terminusdb_client.woqldataframe.woqlDataframe.result_to_df"></a>

#### result\_to\_df

```python
def result_to_df(all_records, keepid=False, max_embed_dep=0, client=None)
```

Turn result documents into pandas DataFrame, all documents should eb the same type. If max_embed_dep > 0, a client need to be provide to get objects to embed in DataFrame.

