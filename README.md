
## Nest.js redis-api server
- github - [https://github.com/develjsw](https://github.com/develjsw)

2024-03-18 - VM redis (https://github.com/develjsw/nestjs-api/issues/8) ⮕ docker redis 변경

2024-04-15 - docker redis ⮕ elasticache redis로 임시 변경 및 redis-api dockerfile 생성

2024-04-28 dockerfile ⮕ dockerfile + docker-compose.yml 변경

### redis-api 구성

| 위치                        | 설명                                 |
|---------------------------|---------------------------------------|
| redis-api                | 프로젝트 최상단                          |
| redis-api > dockerfile   | dockerfile                            |
| redis-api > secret       | DB 접속 정보 등 secret file             |
| redis-api > src > config | 환경별 설정 파일, redis-api endpoint 파일 |

### ~~Dockerfile로 Redis 생성 및 연결~~ (** 미사용 **)
~~~
$ cd /d/workspace/redis-api
$ docker build -t redis -f ./dockerfile/Dockerfile-local . (최초 생성시에만 사용)
$ docker run -d --name redis -p 6379:6379 redis
~~~

### ~~dockerfile을 통한 docker 실행~~ (** 미사용 **)
~~~
# redis-api 프로젝트로 위치 이동
$ cd /d/www/nest-msa-api/redis-api

# 도커 이미지 빌드 (local)
$ docker build -t redis-api -f ./dockerfile/Dockerfile-local .

# 도커 컨테이너 실행
$ docker run -d --name redis-api -p 9001:9001 redis-api

----------------------------------------------------------------
** 문제 발생 시 확인 (docker gui tool을 활용해도 됨) **

# 종료된 컨테이너 재실행
$ docker start redis-api

# 컨테이너 로그 확인 
$ docker logs redis-api

# 컨테이너 접속하여 정상 실행중인지 확인
$ docker ps
$ docker exec -it <container_id> bash
~~~

### dockerfile + docker-compose.yml을 통한 docker 실행
~~~
# redis-api 프로젝트로 위치 이동
$ cd /d/www/nest-msa-api/redis-api

# 이미지 빌드 및 컨테이너 실행 (백그라운드로 실행)
$ docker-compose up -d --build
~~~

### docker container ip 확인
~~~
[ 1번 방식 ]

# docker network 조회
$ docker network ls

# 위에서 조회한 값 중에 내가 설정한 네트워크 값으로 조회
$ docker network inspect <docker network name>
ex) docker network inspect redis-api_msa-api-network
→ containers에 표시되어 있는 IP를 통해 확인 가능하며, 해당 아이피는 외부 접근이 아닌 container끼리 통신할 때 사용
~~~
~~~
[ 2번 방식 ]

# 컨테이너 접속 (쉘 종류에 따라 사용 가능한 명령어 차이 존재)
$ docker exec -it <container id> </bin/sh | /bin/bash | bash>
ex) docker exec -it a4e61eccfb72 /bin/sh

# 아이피 조회
$ ip addr
~~~
~~~
[ 3번 방식 ]

# 특정 container의 docker network 정보 확인
$ docker inspect "{{ .NetworkSettings }}" <container id>
→ NetworkSettings.Networks.<설정한 네트워크>.IPAddress를 통해 container ip 확인
~~~

### docker container 통신 확인
1. host ↔ api container 통신
    - [ 1번 방식 ] : browser에서 localhost:9001로 접속하여 확인
    - [ 2번 방식 ] : host CLI(cmd/powershell/git bash)에서 아래 명령어 실행
   ~~~
   # host에서 curl 명령어를 통해 확인
   $ curl http://localhost:9001
   ~~~ 
2. api container ↔ redis server container 통신
   ~~~
   # api 컨테이너 접속 (쉘 종류에 따라 사용 가능한 명령어 차이 존재)
   $ docker exec -it <container id> </bin/sh | /bin/bash | bash>
   ex) docker exec -it 73d5bcc8feaf /bin/sh
   
   # 'api 컨테이너 내부'에서 '호스트명:redis server 컨테이너 포트'에 연결되는지 확인
   $ telnet host.docker.internal:6379
   ~~~

### Redis 접속 확인
host에서 redis client tool을 사용하여 docker-compose.yml 파일에서 설정한 ports 값으로 접속 확인   
ex)
- host : localhost,
- port : 6379

### 컨테이너 오케스트레이션 사용 예정
(Docker Swarm 또는 Kubernetes)