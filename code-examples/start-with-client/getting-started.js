const TerminusDBClient = require("@terminusdb/terminusdb-client");

// TODO: change the team name 
const team = "cloud";
const client = new TerminusDBClient.WOQLClient(`https://cloud-dev.dcm.ist/${team}/`, {
    user: "user@email.com",
    organization: team
});

//set the key as an environment variable.
client.setApiKey(process.env.TERMINUSDB_ACCESS_TOKEN)

const connectToServer = async () => {
    try {
        await client.connect();
    } catch (err) {
        console.error(err)
    }

    console.log("Connected to TerminusDB successfully!")
};

const createNewDB = async () => {
    try {

        await client.createDatabase('ExampleDatabase12e3', {
            label: "ExampleDatabase32",
            comment: "Created new ExampleDatabase",
        });

        console.log("Database created Successfully!")

    } catch (err) {
        console.error(err)
    }
};

const insertSchema = async () => {

    const schema = {
        "@type": "Class",
        "@id": "Player",
        "@key": {
            "@type": "Lexical",
            "@fields": ["name"]
        },
        name: "xsd:string",
        position: "xsd:string"
    };

    await client.addDocument(schema, {
        graph_type: "schema"
    });

    console.log("Schema Inserted Successfully!");

}

const insertDocuments = async () => {
    const objects = [{
            "@type": "Player",
            name: "George",
            position: "Center Back",
        },
        {
            "@type": "Player",
            name: "Doug",
            position: "Full Back",
        },
        {
            "@type": "Player",
            name: "Karen",
            position: "Center Forward"
        }
    ];

    await client.addDocument(objects);
    console.log("Documents Inserted Successfully!");
}

const getDocs = async () => {
    const documents = await client.getDocument({
        as_list: "true"
    });
    console.log("All Documents",documents)
}

const queryDocuments = async () => {
    const query = {
        "type": "Player",
        "query": {
            "position": "Full Back"
        },
    }
    const result = await client.queryDocument(query, {
        "as_list": true
    });
    console.log("Query Documents",result)
}

const runFunctions = async () => {
    await connectToServer();
    await createNewDB();
    await insertSchema();
    await insertDocuments();
    await getDocs();
    await queryDocuments();
}

runFunctions();
