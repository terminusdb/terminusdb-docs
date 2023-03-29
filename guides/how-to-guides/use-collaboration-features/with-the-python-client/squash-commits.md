---
description: How to use the Python client to squash commits in your branch's history.
---

# Squash Commits

Squashing allows you to combine multiple commits in your branch's history into a single commit. This how-to assumes that you are [connected to a database already](../../use-the-python-client/connect-to-a-database.md).

```python
    client.branch = "mybranch"
    commitMessage = "merge all the commits"
    result = client.squash(commitMessage);
```

The result will contain the new commit id. You can use it to reset the HEAD to the new squashed commit.

```
client.reset(result)
```
