# 镜像仓库命名空间
namespace ?= busymango

# 镜像仓库地址
host ?= ccr.ccs.tencentyun.com

# 项目名称
name ?= $(shell node -p "require(\"./package.json\").name")

# 项目版本
version ?= $(shell node -p "require(\"./package.json\").version")

# docker image tag
tag ?= ${host}/${namespace}/${name}:${version}

echo:
	$(info current is ${tag})

clean: 
	$(info current is temporary)
	rm -rf dist

# 使用 docker 构建前端项目静态资源并输出到当前目录dist文件夹下
dist: clean
	docker image build -f dockerfile.build -t temporary .
	docker run -it -v ./dist:/usr/src/app/dist --rm temporary
	docker rmi temporary

docker: echo
	yes | docker image prune -a
	docker image build -f dockerfile.image -t ${tag} .
	docker container create -e TZ="Asia/Shanghai" --network host ${tag}

run: echo
	yes | docker container prune
	docker run -idt -p 8080:80 --name ${name} ${tag}