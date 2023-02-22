# Repo schema

This is the Repo schema. It is a specification for repository metadata management.

**Authored by:** Gavin Mendel-Gleason, Matthijs van Otterdijk

---

### Local

<p class="tdb-f">A local repository.</p>

**Class:** `Local`

**Super class:** `Repository`

---

### Remote

<p class="tdb-f">A remote repository.</p>

**Class:** `Remote`

**Super class:** `Repository`

**Properties:**

| Property | Range  | Desc |
| -------- | ------ | ---- |
| `remote_url` | `undefined` | The url of the remote repository. |

---

### RemotePath

<p class="tdb-f">A remote repository path (sharing local storage). It is a subdocument</p>

**Class:** `RemotePath`

**Properties:**

| Property | Range  | Desc |
| -------- | ------ | ---- |
| `database` | `xsd:string` | The database name of the remote repository. |
| `organization` | `xsd:string` | The organization for this remote. |

---

### Repository

<p class="tdb-f">A repository.</p>

**Class:** `Repository`

**Properties:**

| Property | Range  | Desc |
| -------- | ------ | ---- |
| `head` | `layer:Layer` | The current most recent layer of the repository. |
| `name` | `xsd:string` | The name of the repository. |

---

### layer:Layer

<p class="tdb-f">A layer object which has the identifier used in storage.</p>

**Class:** `layer:Layer`

**Properties:**

| Property | Range  | Desc |
| -------- | ------ | ---- |
| `layer:identifier` | `xsd:string` | The layer identifier. |

---