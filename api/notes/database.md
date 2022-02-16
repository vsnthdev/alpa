## Preparing to migrate to RedisJSON and RediSearch

Firstly, run the docker container of RediSearch with RedisJSON 👇

```bash
docker run -it -p 6379:6379 --rm --name redis redislabs/redisearch:2.4.0
```

then, execute `redis-cli` within the running docker container 👇

```bash
docker exec -it redis redis-cli
```

Now list all the indexes using the following RediSearch command 👇

```
FT._LIST
```

If the `codes` index isn't found, we execute this command 👇 to create a new index with that name.

```
FT.CREATE userIdx ON JSON SCHEMA $.user.name AS name TEXT $.user.tags AS tags TAG SEPARATOR ";"
```

Then we can normally insert data using the following RedisJSON schema 👇

```
JSON.SET myDoc $ '{"user":{"name":"John Smith","tags":"foo;bar","hp":1000, "dmg":150}}'
```

Example search queries which can used within the Websocket 👇

```
FT.SEARCH userIdx '@name:(John)'
FT.SEARCH userIdx '@tags:{foo | bar}'
```
