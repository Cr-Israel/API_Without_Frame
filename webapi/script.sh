echo -e "\n\n requesting all heroes"
curl localhost:3000/heroes

echo -e "\n\n requesting batman"
curl localhost:3000/heroes/1

echo -e "\n\n requisting with wrong body"
curl --silent -X POST \
    --data-binary '{"invalid": "data"}' \
        localhost:3000/heroes

echo -e "\n\n creating Asa Noturna"
CREATE=$(curl --silent -X POST \
    --data-binary '{"name": "Asa Noturna", "age": 25, "power": "Várias coisas"}' \
        localhost:3000/heroes)

echo $CREATE

ID=$(echo $CREATE | jq .id)

echo -e "\n\n requisting Asa Nortuna"
curl localhost:3000/heroes/$ID