## Building/Publishing the Docker Image

```
docker build -t mahata/render-sample . --platform=linux/amd64
docker login
docker push mahata/render-sample:latest
```

```
docker run -ti mahata/render-sample:latest 
```
