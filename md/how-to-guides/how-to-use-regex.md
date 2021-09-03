# How to Use Regular Expressions

> **On this page:** A how-to guide to using regular expressions with WOQL.

WOQL provides [Pearl Compatible Regular Expressions](https://en.wikipedia.org/wiki/Perl_Compatible_Regular_Expressions) (PCRE) using the predicate `regexp` with the structure:

```regex

regexp(pattern, string, match_list)


```

## Regular expressions examples

Examples of basic regular expression pattern matching with WOQL.

### Match a string in sub position 1

Match a string to pattern `"t(..)t"`.

#### Code: String match sub position 1
           
```regex

regexp("t(..)t", "test", ["v:All", "v:Match"])


```

Results

| v:All | v:Match |
| ----- | ------- |
| `"test"` | `"es"` |

### Match a string in sub position 2

Match a string to pattern `"m..h"`.

#### Code: String match sub position 2 

```regex

regexp("m...h", "this is a match of a string", ["v:All"])


```

Results

| v:All |
| ----- |
| `"match"` |


### Match start and end of a string

Match start `^` and end `$` of a string to pattern `"^m...h$"`.


#### Code: String match start and end 

```regex

regexp("^m...h$", "this is a match of a string", ["v:All"])

regexp("^m...h$", "match", ["v:All"])


```

Results

| v:All |
| ----- |
| `(no match)` |
| `"match"` |

### Match multiple parts of a string

Match start and end of the string to pattern `"^(....)-(..)-(..)$"`.

#### Code: String match multiple parts

```regex

regexp("^(....)-(..)-(..)$", "2020-10-12", ["v:All", "v:Year", "v:Month", "v:Day"])


```

Results

| v:All | v:Year | v:Month | v:Day |
| ----- | ------ | ------- | ----- |
| `"2020-10-12"` | `"2020"` | `"10"` | `"12"` |