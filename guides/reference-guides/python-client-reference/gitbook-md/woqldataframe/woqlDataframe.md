<a id="woqldataframe.woqlDataframe"></a>

# woqldataframe.woqlDataframe

<a id="woqldataframe.woqlDataframe.result_to_df"></a>

## result\_to\_df

```python
def result_to_df(all_records, keepid=False, max_embed_dep=0, client=None)
```

Turn result documents into pandas DataFrame, all documents should be the same type.
If max_embed_dep > 0, a client needs to be provided to get objects to embed in DataFrame.

