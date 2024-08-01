# 构建环境
env ?= sit

# 部署端口
port ?= 8080

# 镜像仓库命名空间
namespace ?= busymango

# 镜像仓库地址
host ?= ccr.ccs.tencentyun.com

# 使用commit-id作为hash
hash ?= $(shell git rev-parse HEAD | cut -c1-8)

# 项目名称
name ?= $(shell node -p "require(\"./package.json\").name")

# 项目版本
version ?= $(shell node -p "require(\"./package.json\").version")

# docker image tag
tag ?= ${host}/${namespace}/${name}:${env}-${version}-${hash}

# docker 镜像名前缀
prefix ?= ${name}-${env}-

# 根据构建环境指定部署端口
ifeq ($(env), dev)
	port := 8079
else ifeq ($(env), sit) 
	port := 8080
else ifeq ($(env), pro) 
	port := 80
else 
	port := 8080
endif

echo:
	$(info docker image ${tag})

clean:
	rm -rf dist
	- docker rm -f ${hash}
	- chmod +x ./docker.clean.sh && ./docker.clean.sh

dist: clean
	docker image build -f dockerfile.build -t ${hash} .
	docker run -it -v ./dist:/usr/src/app/dist --rm ${hash}

docker: echo
	docker image build -f dockerfile.image -t ${tag} .
	docker container create -e TZ="Asia/Shanghai" --network host ${tag}
	- docker ps -ap --fliter "name=${prefix}" | xargs docker stop
	- yes | docker container prune
	docker run -idt -p ${port}:80 --name ${prefix}-${version} ${tag}

.PHONY:echo
.PHONY:dist