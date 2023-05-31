# Choice Sub Documents
This example shows how ``<FrameViewier/>`` appears for a document called ``Student`` with choice subdocument fields in Create/ Edit or View mode. 

``Student`` has a mandatory ``favorite_subject`` property with the choices of Zoology, Botony or Maths, an optional ``"second_favorite_subject"`` property with the same document choices, a set ``studied`` property with the above choices, and a list ``study_time_table`` property with the same choices in an ordered fashion.

## Demo 
Take a look at the **[**Demo**](https://documents-ui-playground.terminusdb.com/Choice%20SubDocuments)** to view ``<FrameViewier/>`` with Choice subdocuments in Create, edit or view mode.

The below Frames show the definition of Zoology, Botony or Maths which are subdocuments.

## Frame 
The frame below consists of a `Student` document -

```javascript
  let frame = {
    "@context": {
      "@base": "terminusdb:///data/",
      "@schema": "terminusdb:///schema#",
      "@type": "Context",
      "xsd": "http://www.w3.org/2001/XMLSchema#"
    },
    "Student": {
      "@key": {
        "@type": "Random"
      },
      "@type": "Class",
      "favorite_subject": [
        {
          "@class": "Zoology",
          "@subdocument": []
        },
        {
          "@class": "Botony",
          "@subdocument": []
        },
        {
          "@class": "Maths",
          "@subdocument": []
        }
      ],
      "second_favorite_subject": {
        "@class": [
          {
            "@class": "Zoology",
            "@subdocument": []
          },
          {
            "@class": "Botony",
            "@subdocument": []
          },
          {
            "@class": "Maths",
            "@subdocument": []
          }
        ],
        "@type": "Optional"
      },
      "studied": {
        "@class": [
          {
            "@class": "Zoology",
            "@subdocument": []
          },
          {
            "@class": "Botony",
            "@subdocument": []
          },
          {
            "@class": "Maths",
            "@subdocument": []
          }
        ],
        "@type": "Set"
      },
      "study_time_table": {
        "@class": [
          {
            "@class": "Zoology",
            "@subdocument": []
          },
          {
            "@class": "Botony",
            "@subdocument": []
          },
          {
            "@class": "Maths",
            "@subdocument": []
          }
        ],
        "@type": "List"
      }
    },
    "Zoology": {
      "@documentation": [
        {
          "@language": "en",
          "@properties": {
            "Number_of_classes_attended": {
              "@comment": "Number of Classes Attended",
              "@label": "Classes Attended"
            },
            "course_start_date": {
              "@comment": "Course Start Date",
              "@label": "Start Date"
            }
          }
        },
        {
          "@language": "ka",
          "@properties": {
            "Number_of_classes_attended": {
              "@comment": "კლასების რაოდენობა",
              "@label": "კლასები დაესწრო"
            },
            "course_start_date": {
              "@comment": "კურსის დაწყების თარიღი",
              "@label": "Დაწყების თარიღი"
            }
          }
        }
      ],
      "@key": {
        "@type": "Random"
      },
      "@subdocument": [],
      "@type": "Class",
      "Grade": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "Notes": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "Number_of_classes_attended": {
        "@class": "xsd:integer",
        "@type": "Optional"
      },
      "course_start_date": {
        "@class": "xsd:dateTime",
        "@type": "Optional"
      }
    }
    "Botony": {
      "@documentation": [
        {
          "@language": "en",
          "@properties": {
            "Number_of_classes_attended": {
              "@comment": "Number of Classes Attended",
              "@label": "Classes Attended"
            },
            "course_start_date": {
              "@comment": "Course Start Date",
              "@label": "Start Date"
            }
          }
        },
        {
          "@language": "ka",
          "@properties": {
            "Number_of_classes_attended": {
              "@comment": "კლასების რაოდენობა",
              "@label": "კლასები დაესწრო"
            },
            "course_start_date": {
              "@comment": "კურსის დაწყების თარიღი",
              "@label": "Დაწყების თარიღი"
            }
          }
        }
      ],
      "@key": {
        "@type": "Random"
      },
      "@subdocument": [],
      "@type": "Class",
      "Grade": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "Number_of_classes_attended": {
        "@class": "xsd:integer",
        "@type": "Optional"
      },
      "course_start_date": {
        "@class": "xsd:dateTime",
        "@type": "Optional"
      },
      "number_of_assignments": {
        "@class": "xsd:integer",
        "@type": "Optional"
      }
    },
    "Maths": {
      "@documentation": [
        {
          "@comment": "Maths",
          "@label": "Maths",
          "@language": "en",
          "@properties": {
            "Number_of_classes_attended": {
              "@comment": "Number of Classes Attended",
              "@label": "Classes Attended"
            },
            "course_start_date": {
              "@comment": "Course Start Date",
              "@label": "Start Date"
            },
            "level": {
              "@comment": "Math level",
              "@label": "Level"
            },
            "love_maths": {
              "@comment": "a choice to love maths",
              "@label": "Do you like Maths?"
            }
          }
        },
        {
          "@comment": "მათემატიკა",
          "@label": "მათემატიკა",
          "@language": "ka",
          "@properties": {
            "Number_of_classes_attended": {
              "@comment": "კლასების რაოდენობა",
              "@label": "კლასები დაესწრო"
            },
            "course_start_date": {
              "@comment": "კურსის დაწყების თარიღი",
              "@label": "Დაწყების თარიღი"
            },
            "level": {
              "@comment": "მათემატიკის დონე",
              "@label": "დონე"
            },
            "love_maths": {
              "@comment": "არჩევანი გიყვარდეს მათემატიკა",
              "@label": "მოგწონთ მათემატიკა?"
            }
          }
        }
      ],
      "@key": {
        "@type": "Random"
      },
      "@subdocument": [],
      "@type": "Class",
      "Number_of_classes_attended": {
        "@class": "xsd:integer",
        "@type": "Optional"
      },
      "course_start_date": {
        "@class": "xsd:dateTime",
        "@type": "Optional"
      },
      "level": {
        "@class": "xsd:string",
        "@type": "Optional"
      },
      "love_maths": {
        "@class": "xsd:boolean",
        "@type": "Optional"
      }
    }
  }
```


## Create

```javascript
import { FrameViewer } from '@terminusdb/terminusdb-documents-ui'

  return <FrameViewer
    frame={frame}               // above defined frame          
    formData={{}}               // formData will be empty
    mode={"Create"}             // mode 
    type={"Student"}/>           // type of document 
```

## Edit & View
Note - make sure the document is filled in View mode. The form will be in read only mode for View.

```javascript
let data = {
	"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51",
	"@type": "Student",
	"favorite_subject": {
		"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/favorite_subject/Botony/aef9f22fe04ece720d19f6630edcad27f85e546810a907e4724ee0b57aba4b52",
		"@type": "Botony",
		"Grade": "A",
		"Number_of_classes_attended": 4,
		"course_start_date": "2022-08-17T09:21:09Z", 
		"number_of_assignments": 5
	},
	"second_favorite_subject": {
		"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/second_favorite_subject/Zoology/2f0ab12e837a6d1bdbb15b41e556940b288167e7909061e1b32e56d91005431b",
		"@type": "Zoology",
		"Grade": "A",
		"Notes": "loves zoology",
		"Number_of_classes_attended": 5,
		"course_start_date": "2022-08-17T09:21:20Z"
	},
	"studied": [
	   {
			"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/studied/Botony/cc7e311138c8244f9ba043ad5f96e846c6a0961d9190210ee3f297f96976fd00",
			"@type": "Botony",
			"Grade": "A",
			"Number_of_classes_attended": 67,
			"course_start_date": "2022-08-17T09:21:53Z",
			"number_of_assignments": 23
	   },
	   {
			"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/studied/Maths/666ce31233a834b895f4c42e72b0b5250188ea4dcf2f2bb8bc0dc32e710ceb26",
			"@type": "Maths",
			"Number_of_classes_attended": 45,
			"course_start_date": "2022-08-17T09:21:37Z",
			"level": "Medium",
			"love_maths": true
	   }
	],
	"study_time_table": [
	   {
			"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/study_time_table/0/Zoology/d0cade9042e0baee8e0b91a8ed0e85ec09db40084d0ff56532d92a454ff67c57",
			"@type": "Zoology",
			"Grade": "A",
			"Notes": "Best student",
			"Number_of_classes_attended": 5,
			"course_start_date": "2022-08-17T09:22:06Z"
	   },
	   {
	 		"@id": "Student/6bf39891b3aaab89771cecdd88a7771dad8c613cfc0530d07bb79bdde6d55d51/study_time_table/1/Botony/be10b1f3c70c1fe28eb52ad3113352356ae53d3375436ae6719abe019dc28f76",
			"@type": "Botony",
			"Grade": "B",
			"Number_of_classes_attended": 54,
			"course_start_date": "2022-08-17T09:22:32Z",
			"number_of_assignments": 34
	   }
	]
}

return <FrameViewer
  frame={frame}
  mode={"View"}
  formData={data}
  type={"Student"}/>
```
