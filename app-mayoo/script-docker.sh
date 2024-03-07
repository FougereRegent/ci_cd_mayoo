#!/bin/bash

container_name="mayoo-app"
image_name="app-mayoo"

build_container() {
	docker build -t "$image_name" .
}

create_container() {
	docker run --name "$container_name" \
		-it \
		-p 19000:19000 \
		"$image_name"
}

create_and_build() {
	build_container
	create_container
}

result_docker=$(docker ps -aq -f "name=$container_name")
if [ "$result_docker" = "" ]; then
	create_and_build
else
	docker rm $(docker ps -aq --filter="name=$container_name")
	create_and_build
fi
