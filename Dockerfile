
# Etapa 1: Build
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Etapa 2: Runtime
FROM openjdk:21-slim
WORKDIR /opt/app
COPY --from=build /app/target/*.jar app.jar

# (Opcional) Variables de entorno
ENV SPRING_PROFILES_ACTIVE=prod

EXPOSE 2222
ENTRYPOINT ["java", "-jar", "app.jar"]
