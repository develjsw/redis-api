
## Nest.js Redis-Api Server
- github - [https://github.com/develjsw](https://github.com/develjsw)

2024-03-18 - VM redis (https://github.com/develjsw/nestjs-api/issues/8) ⮕ docker redis 변경
~~~
Dockerfile로 Redis 생성 및 연결

$ cd /d/workspace/redis-api
$ docker build -t redis -f ./dockerfile/Dockerfile-local . (최초 생성시에만 사용)
$ docker run -d --name redis -p 6379:6379 redis
~~~