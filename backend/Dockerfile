# Stage 1: Build
FROM gradle:8.13-jdk17 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon -x test

# Stage 2: Run
FROM openjdk:17-jdk-slim
EXPOSE 8082
RUN mkdir /app
# Создаем папку для загрузок внутри контейнера
RUN mkdir -p /app/uploads/tracks
COPY --from=build /home/gradle/src/build/libs/*.jar /app/auth-service.jar
WORKDIR /app
ENTRYPOINT ["java", "-jar", "auth-service.jar"]