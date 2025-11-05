#!/bin/bash
set -e

NAME="k8"
USERNAME="jordantanaliga100"
IMAGE="$USERNAME/$NAME:1.0.2"

echo "Building docker image .... 🚀🚀🚀"
docker build -t $IMAGE .

echo "Pushing image to Docker Hub .... 🚀🚀🚀"
docker push $IMAGE

echo "Applying Kubernetes manifests ...."
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml

echo "Getting pods..."
kubectl get pods

echo "Getting services..."
kubectl get svc

echo "Fetching the main service..."
kubectl get svc $NAME-service

echo "💡 Checking and Verifying 💡" 
kubectl rollout status deployment $NAME

