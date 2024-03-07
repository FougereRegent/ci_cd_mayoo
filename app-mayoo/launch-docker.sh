#!/bin/bash

containerName="mayoo-react-app"
imageName="app-mayoo"

docker_kill_and_rm() {
	docker rm $1
}

build_image() {
	docker build -t "$imageName:latest" .
}

run_container() {
	docker run \
		-it \
		-p 19000:19000 \
		-p 19006:19006 \
		-v "$(pwd)/src:/app/src" \
		-v "$(pwd)/assets:/app/assets" \
		-v "$(pwd)/App.tsx:/app/App.tsx" \
		--name=$containerName \
		$imageName
}

containerHash=$(docker ps -aq --filter="name=$containerName")
echo $containerHash

docker_kill_and_rm $containerName
build_image
run_container
