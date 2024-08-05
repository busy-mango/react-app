#!/bin/bash

# 当前脚本仅适用于 macOS 和 Linux

# 获取 30 天前的日期
if date --version >/dev/null 2>&1; then
  # Linux
  TARGET_DATE=$(date -d "30 days ago" "+%Y-%m-%dT%H:%M:%S")
else
  # macOS
  TARGET_DATE=$(date -v -30d "+%Y-%m-%dT%H:%M:%S")
fi

# 获取正在使用的镜像
USED_IMAGES=$(docker ps -a --format "{{.Image}}")

# 指定不删除的镜像列表（用空格分隔镜像ID或镜像名称）
EXCLUDE_IMAGES=("node:18.20-alpine" "nginx:1.27.0-alpine-slim")

# 将正在使用的镜像添加到排除列表
for USED_IMAGE in $USED_IMAGES; do
  EXCLUDE_IMAGES+=("$USED_IMAGE")
done

# 获取所有镜像的 ID、名称和创建时间
IMAGES=$(docker images --format "{{.ID}} {{.Repository}}:{{.Tag}} {{.CreatedAt}}" | grep -v "<none>")

# 遍历每个镜像并删除超过 30 天未使用且不在排除列表中的镜像
while IFS=' ' read -r IMAGE_ID IMAGE_NAME CREATED_AT; do
  # 检查镜像是否在排除列表中
  SKIP=false
  for EXCLUDE_IMAGE in "${EXCLUDE_IMAGES[@]}"; do
    if [[ "$IMAGE_ID" == "$EXCLUDE_IMAGE" || "$IMAGE_NAME" == "$EXCLUDE_IMAGE" ]]; then
      SKIP=true
      break
    fi
  done
  if $SKIP; then
    echo -e "\033[32m[Skipping exclude] $IMAGE_NAME($IMAGE_ID)\033[0m"
    continue
  fi

  # 检查镜像是否超过 30 天未使用
  if [[ "$CREATED_AT" < "$TARGET_DATE" ]]; then
    echo -e "\033[31m[Deleting older] $IMAGE_NAME($IMAGE_ID)\033[0m"
    docker rmi "$IMAGE_ID"
  else
    echo -e "\033[34m[Skipping newer] $IMAGE_NAME($IMAGE_ID)\033[34m"
  fi
done <<< "$IMAGES"

# - yes | docker system prune -a -f
