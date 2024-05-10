# 构建环境
env ?= sit

# 部署端口
port ?= 8080

# 镜像仓库命名空间
namespace ?= busymango

# 镜像仓库地址
host ?= ccr.ccs.tencentyun.com

# 项目名称
name ?= $(shell node -p "require(\"./package.json\").name")

# 项目版本
version ?= $(shell node -p "require(\"./package.json\").version")

# docker image tag
tag ?= ${host}/${namespace}/${name}:${env}-${version}

# 根据构建环境指定部署端口
ifeq ($(env), dev)
	port := 8079
else ifeq ($(env), sit) 
	port := 8080
else ifeq ($(env), uat) 
	port := 8081
else ifeq ($(env), pro) 
	port := 80
else 
	port := 8080
endif

echo:
	$(info current is ${tag})

clean:
	rm -rf dist

# 使用 docker 构建前端项目静态资源并输出到当前目录dist文件夹下
dist: clean
	docker image build -f dockerfile.build -t temporary .
	docker run -it -v ./dist:/usr/src/app/dist --rm temporary
	docker rmi temporary

docker: echo
	docker image build -f dockerfile.image -t ${tag} .
	docker container create -e TZ="Asia/Shanghai" --network host ${tag}

run: echo
	docker ps -ap --fliter "name=${name}-${env}-" | xargs docker stop
	docker run -idt -p ${port}:80 --name ${name}-${env}-${version} ${tag}
	yes | docker container prune