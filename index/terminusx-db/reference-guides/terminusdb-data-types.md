# TerminusDB Data Types

## Core data types

| **Type**      | **Description**                                           |
| ------------- | --------------------------------------------------------- |
| `xsd:string`  | Character strings (but not all Unicode character strings) |
| `xsd:boolean` | true, false                                               |
| `xsd:decimal` | Arbitrary-precision decimal numbers                       |
| `xsd:integer` | Arbitrary-size integer numbers                            |

## IEEE floating-point numbers

| **Type**     | **Description**                                   |
| ------------ | ------------------------------------------------- |
| `xsd:double` | 64-bit floating point numbers incl. ∓Inf, ∓0, NaN |
| `xsd:float`  | 32-bit floating point numbers incl. ∓Inf, ∓0, NaN |

## Time and date

| **Type**            | **Description**                               |
| ------------------- | --------------------------------------------- |
| `xsd:date`          | Dates (yyyy-mm-dd) with or without timezone   |
| `xsd:time`          | Times (hh:mm:ss.sss) with or without timezone |
| `xsd:dateTime`      | Date and time with or without timezone        |
| `xsd:dateTimeStamp` | Date and time with required timezone          |

## Recurring and partial dates

| **Type**                | **Description**                                       |
| ----------------------- | ----------------------------------------------------- |
| `xsd:gYear`             | Gregorian calendar year                               |
| `xsd:gMonth`            | Gregorian calendar month                              |
| `xsd:gDay`              | Gregorian calendar day of the month                   |
| `xsd:gYearMonth`        | Gregorian calendar year and month                     |
| `xsd:gMonthDay`         | Gregorian calendar month and day                      |
| `xsd:duration`          | Duration of time                                      |
| `xsd:yearMonthDuration` | Duration of time (months and years only)              |
| `xsd:dayTimeDuration`   | Duration of time (days, hours, minutes, seconds only) |

## Limited-range integer numbers

| **Type**                 | **Description**                                      |
| ------------------------ | ---------------------------------------------------- |
| `xsd:byte`               | -128...+127 (8 bit)                                  |
| `xsd:short`              | -32768...+32767 (16 bit)                             |
| `xsd:int`                | -2147483648...+2147483647 (32 bit)                   |
| `xsd:long`               | -9223372036854775808...+9223372036854775807 (64 bit) |
| `xsd:unsignedByte`       | 0...255 (8 bit)                                      |
| `xsd:unsignedShort`      | 0...65535 (16 bit)                                   |
| `xsd:unsignedInt`        | 0...4294967295 (32 bit)                              |
| `xsd:unsignedLong`       | 0...18446744073709551615 (64 bit)                    |
| `xsd:positiveInteger`    | Integer numbers >0                                   |
| `xsd:nonNegativeInteger` | Integer numbers ≥0                                   |
| `xsd:negativeInteger`    | Integer numbers <0                                   |
| `xsd:nonPositiveInteger` | Integer numbers ≤0                                   |

## Encoded binary data

| **Type**           | **Description**            |
| ------------------ | -------------------------- |
| `xsd:hexBinary`    | Hex-encoded binary data    |
| `xsd:base64Binary` | Base64-encoded binary data |

## Miscellaneous XSD types

| **Type**               | **Description**                                                              |
| ---------------------- | ---------------------------------------------------------------------------- |
| `xsd:anyURI`           | Absolute or relative URIs and IRIs                                           |
| `xsd:language`         | Language tags per [BCP47](https://en.wikipedia.org/wiki/IETF\_language\_tag) |
| `xsd:normalizedString` | Whitespace-normalized strings                                                |
| `xsd:token`            | Tokenized strings                                                            |
| `xsd:NMTOKEN`          | XML NMTOKENs                                                                 |
| `xsd:Name`             | XML Names                                                                    |
| `xsd:NCName`           | XML NCNames                                                                  |
