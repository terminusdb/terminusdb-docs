from terminusdb_client import WOQLClient
from terminusdb_client.woqlschema import WOQLSchema, DocumentTemplate, LexicalKey

user     = "jimbo"
team     = "logicistics" # My team name.
endpoint = f"https://cloud.terminusdb.com/{team}/"
client   = WOQLClient(endpoint)

client.connect(user=user, team=team, use_token=True)

client.create_database("example_db")

schema = WOQLSchema()

class Player(DocumentTemplate):
    _schema = schema
    _key = LexicalKey(["name"])
    name: str
    position: str
      
schema.commit(client, commit_msg = "Adding Player Schema")

objects = [
    Player(name="George", position="Centre Back"),
    Player(name="Doug", position="Full Back"),
    Player(name="Karen", position="Centre Forward")
    ]

client.insert_document(objects, commit_msg = f"Inserting player data")

documents = client.get_all_documents()

# documents comes back as a iterable that can be convert into a list
print("All documents")
print(list(documents))

print("=============")

# getting a specific document by id
player_doug = client.get_document("Player/Doug")
print("Specific document")
print(player_doug)


matches = client.query_document({"@type"   : "Player",
                                   "position": "Full Back"})

# matches comes back as a iterable that can be convert into a list
print(list(matches))
