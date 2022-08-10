import sys
import yaml

def main():
    if len(sys.argv) < 3:
        print("Please provide a filename and version as arguments")
        sys.exit(1)
    filename = sys.argv[1]
    version = sys.argv[2]
    process_yaml(filename, version)


def process_yaml(yaml_file, version):
    tags = {}
    with open(yaml_file, 'r') as f:
        data = yaml.safe_load(f)
        for path, methods in data['paths'].items():
            for method, method_object in methods.items():
                if method not in ['get', 'post', 'delete', 'put', 'head']:
                    continue
                generated_entry = generate_gitbook(path, method, version)
                tag = method_object['tags'][0]
                if tag not in tags:
                    tags[tag] = [generated_entry]
                else:
                    tags[tag].append(generated_entry)
    print_all(tags, version)

def generate_gitbook(path, method, version):
    url = f'https://raw.githubusercontent.com/terminusdb/terminusdb/{version}/docs/openapi.yaml'
    return f'''
{{% swagger src="{url}" path="{path}" method="{method}" %}}
[{url}]({url})
{{% endswagger %}}

'''


def print_all(tags, version):
    print("# HTTP API\n")
    swagger_url = f"https://editor.swagger.io/?url=https://raw.githubusercontent.com/terminusdb/terminusdb/{version}/docs/openapi.yaml"
    print(f"View the HTTP API docs on the [Swagger editor interface]({swagger_url}) as well. It has a better UI\n")
    for tag, values in tags.items():
        print(f"## {tag}")
        for entry in values:
            print(entry)


if __name__ == '__main__':
    main()
