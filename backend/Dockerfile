FROM amazoncorretto:21 AS build
COPY ./ /home/app
RUN cd /home/app && ./gradlew build -x test --no-daemon

FROM amazoncorretto:22-alpine
COPY --from=build /home/app/build/libs/ktlog-0.0.1-SNAPSHOT.jar /usr/local/lib/ktlog-deploy.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","-Dfile.encoding=UTF-8","/usr/local/lib/ktlog-deploy.jar"]
