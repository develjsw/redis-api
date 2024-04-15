
## Nest.js redis-api server
- github - [https://github.com/develjsw](https://github.com/develjsw)

2024-03-18 - VM redis (https://github.com/develjsw/nestjs-api/issues/8) ⮕ docker redis 변경
~~~
Dockerfile로 Redis 생성 및 연결

$ cd /d/workspace/redis-api
$ docker build -t redis -f ./dockerfile/Dockerfile-local . (최초 생성시에만 사용)
$ docker run -d --name redis -p 6379:6379 redis
~~~

2024-04-15 - docker redis ⮕ elasticache redis로 임시 변경 및 redis-api dockerfile 생성

### redis-api 구성

| 위치                        | 설명                                 |
|---------------------------|---------------------------------------|
| redis-api                | 프로젝트 최상단                          |
| redis-api > dockerfile   | dockerfile                            |
| redis-api > secret       | DB 접속 정보 등 secret file             |
| redis-api > src > config | 환경별 설정 파일, redis-api endpoint 파일 |

### docker 실행
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

### 컨테이너 오케스트레이션 사용 예정
(Docker Swarm 또는 Kubernetes)