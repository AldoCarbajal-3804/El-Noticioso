# ---- Etapa 1: compilar el proyecto con Maven Wrapper ----
FROM eclipse-temurin:25-jdk AS build
WORKDIR /app

COPY mvnw pom.xml ./
COPY .mvn .mvn
RUN chmod +x mvnw

COPY src src
RUN ./mvnw -B -DskipTests package

# ---- Etapa 2: solo el runtime de Java y el .jar ----
FROM eclipse-temurin:25-jre
WORKDIR /app

# No correr la aplicación como root
RUN useradd --system --uid 1001 spring
USER spring

COPY --from=build /app/target/*.jar app.jar

# Puerto interno que usa el gateway (efemerides:8000)
ENV PORT=8000
EXPOSE 8000

# Las variables (API_KEY, MODEL_AI, PROMPT_AI) se pasan al ejecutar el contenedor,
# nunca se copian dentro de la imagen.
ENTRYPOINT ["sh", "-c", "exec java -jar app.jar --server.port=${PORT}"]
