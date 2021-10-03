# WOQL class reference

> **On this page:** The JSON-LD definition of the WOQL language.

<!-- to-do: CHECK URL -->

Implement clients for TerminusDB by constructing JSON-LD messages according to the [WOQL syntax schema](http://terminusdb.com/schema/woql) described below.  

## WOQL classes

 ### AddData 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:AddData`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### AddLink 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:AddLink`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### AddTriple 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:AddTriple`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### AddedData 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:AddedData`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### AddedLink 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:AddedLink`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### AddedTriple 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:AddedTriple`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### And 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:And`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### ArithmeticExpression 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:ArithmeticExpression`

 **Superclass:** None.

 **Properties:** None.

--- 

 ### ArithmeticValue 

 <p class="tdb-fs">A variable or node. It is a subdocument</p>

 **Class:** `woql:ArithmeticValue`

 **Superclass:** `woql:ArithmeticExpression`

 **Properties:** 

| Property | Range  | Desc | 
| -------- | ------ | ---- |
| `woql:data` | `xsd:anySimpleType` | An xsd data type value. |
| `woql:variable` | `xsd:string` | A variable. |

--- 

 ### Column 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Column`

 **Superclass:** None.

 **Properties:** None.

--- 

 ### Concatenate 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Concatenate`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Count 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Count`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Data 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Data`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### DataValue 

 <p class="tdb-fs">A variable or node. It is a subdocument</p>

 **Class:** `woql:DataValue`

 **Superclass:** None.

 **Properties:** 

| Property | Range  | Desc | 
| -------- | ------ | ---- |
| `woql:data` | `xsd:anySimpleType` | An xsd data type value. |
| `woql:variable` | `xsd:string` | A variable. |
| `woql:list` | `DataValue` | A list of datavalues |

--- 

 ### DeleteDocument 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:DeleteDocument`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### DeleteLink 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:DeleteLink`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### DeleteTriple 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:DeleteTriple`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### DeletedLink 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:DeletedLink`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### DeletedTriple 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:DeletedTriple`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Distinct 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Distinct`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Div 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Div`

 **Superclass:** `woql:ArithmeticExpression`

 **Properties:** None.

--- 

 ### Divide 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Divide`

 **Superclass:** `woql:ArithmeticExpression`

 **Properties:** None.

--- 

 ### Dot 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Dot`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Equals 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Equals`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Eval 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Eval`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Exp 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Exp`

 **Superclass:** `woql:ArithmeticExpression`

 **Properties:** None.

--- 

 ### Floor 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Floor`

 **Superclass:** `woql:ArithmeticExpression`

 **Properties:** None.

--- 

 ### FormatType 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:FormatType`

 **Superclass:** None.

 **Properties:** None.

--- 

 ### From 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:From`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Get 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Get`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Greater 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Greater`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### GroupBy 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:GroupBy`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### HashKey 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:HashKey`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### If 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:If`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Immediately 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Immediately`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Indicator 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Indicator`

 **Superclass:** None.

 **Properties:** None.

--- 

 ### Into 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Into`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### InversePathPredicate 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:InversePathPredicate`

 **Superclass:** `woql:PathPattern`

 **Properties:** None.

--- 

 ### IsA 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:IsA`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Join 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Join`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Length 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Length`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Less 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Less`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### LexicalKey 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:LexicalKey`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Like 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Like`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Limit 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Limit`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Link 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Link`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Lower 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Lower`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Member 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Member`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Minus 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Minus`

 **Superclass:** `woql:ArithmeticExpression`

 **Properties:** None.

--- 

 ### NamedParametricQuery 

 <p class="tdb-fs">A named parametric query which names a specific query for later retrieval and re-use and allows the specification of bindings for a specific set of variables in the query.</p>

 **Class:** `woql:NamedParametricQuery`

 **Superclass:** None.

 **Properties:** 

| Property | Range  | Desc | 
| -------- | ------ | ---- |
| `woql:name` | `xsd:string` | The name of the NamedParametricQuery to be retrieved. |
| `woql:parameters` | `xsd:string` | Variable name list for auxilliary bindings. |
| `woql:query` | `Query` | The query AST as WOQL JSON. |

--- 

 ### NamedQuery 

 <p class="tdb-fs">A named query names a specific query for later retrieval and re-use</p>

 **Class:** `woql:NamedQuery`

 **Superclass:** None.

 **Properties:** 

| Property | Range  | Desc | 
| -------- | ------ | ---- |
| `woql:name` | `xsd:string` | The name of the NamedQuery to be retrieved |
| `woql:query` | `Query` | The query AST as WOQL JSON |

--- 

 ### NodeValue 

 <p class="tdb-fs">A variable or node. It is a subdocument</p>

 **Class:** `woql:NodeValue`

 **Superclass:** None.

 **Properties:** 

| Property | Range  | Desc | 
| -------- | ------ | ---- |
| `woql:node` | `xsd:string` | A URI representing a resource. |
| `woql:variable` | `xsd:string` | A variable. |

--- 

 ### Not 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Not`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Once 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Once`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Optional 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Optional`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Or 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Or`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Order 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Order`

 **Superclass:** None.

 **Properties:** None.

--- 

 ### OrderBy 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:OrderBy`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### OrderTemplate 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:OrderTemplate`

 **Superclass:** None.

 **Properties:** None.

--- 

 ### Pad 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Pad`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Path 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Path`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### PathOr 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:PathOr`

 **Superclass:** `woql:PathPattern`

 **Properties:** None.

--- 

 ### PathPattern 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:PathPattern`

 **Superclass:** None.

 **Properties:** None.

--- 

 ### PathPlus 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:PathPlus`

 **Superclass:** `woql:PathPattern`

 **Properties:** None.

--- 

 ### PathPredicate 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:PathPredicate`

 **Superclass:** `woql:PathPattern`

 **Properties:** None.

--- 

 ### PathSequence 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:PathSequence`

 **Superclass:** `woql:PathPattern`

 **Properties:** None.

--- 

 ### PathStar 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:PathStar`

 **Superclass:** `woql:PathPattern`

 **Properties:** None.

--- 

 ### PathTimes 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:PathTimes`

 **Superclass:** `woql:PathPattern`

 **Properties:** None.

--- 

 ### Plus 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Plus`

 **Superclass:** `woql:ArithmeticExpression`

 **Properties:** None.

--- 

 ### Put 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Put`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Query 

 <p class="tdb-fs">An abstract class which represents an arbitrary query AST. It is a subdocument</p>

 **Class:** `woql:Query`

 **Superclass:** None.

 **Properties:** None.

--- 

 ### QueryResource 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:QueryResource`

 **Superclass:** None.

 **Properties:** None.

--- 

 ### RandomKey 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:RandomKey`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### ReadDocument 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:ReadDocument`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Regexp 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Regexp`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Select 

 <p class="tdb-fs">Select specific variables from a query to return.</p>

 **Class:** `woql:Select`

 **Superclass:** `woql:Query`

 **Properties:** 

| Property | Range  | Desc | 
| -------- | ------ | ---- |
| `woql:variables` | `xsd:string` | The variables to select from the query. |
| `woql:query` | `Query` | The query which will be run prior to selection. |

--- 

 ### Size 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Size`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Source 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Source`

 **Superclass:** None.

 **Properties:** None.

--- 

 ### Split 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Split`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Start 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Start`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Substring 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Substring`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Subsumption 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Subsumption`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Sum 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Sum`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Times 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Times`

 **Superclass:** `woql:ArithmeticExpression`

 **Properties:** None.

--- 

 ### Trim 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Trim`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Triple 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Triple`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### TripleCount 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:TripleCount`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### True 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:True`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Typecast 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Typecast`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### UpdateDocument 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:UpdateDocument`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Upper 

 <p class="tdb-fs">Description pending.</p>

 **Class:** `woql:Upper`

 **Superclass:** `woql:Query`

 **Properties:** None.

--- 

 ### Using 

 <p class="tdb-fs">Select a specific collection for query.</p>

 **Class:** `woql:Using`

 **Superclass:** `woql:Query`

 **Properties:** 

| Property | Range  | Desc | 
| -------- | ------ | ---- |
| `woql:collection` | `xsd:string` | The resource over which to run the query. |
| `woql:query` | `Query` | The query which will be run on the selected collection. |

--- 

 ### Value 

 <p class="tdb-fs">A variable, node or data point. It is a subdocument</p>

 **Class:** `woql:Value`

 **Superclass:** None.

 **Properties:** 

| Property | Range  | Desc | 
| -------- | ------ | ---- |
| `woql:node` | `xsd:string` | A URI representing a resource. |
| `woql:variable` | `xsd:string` | A variable. |
| `woql:list` | `Value` | A list of datavalues |
| `woql:data` | `xsd:anySimpleType` | An xsd data type value. |