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

# Cloud Run asigna el puerto en la variable PORT; en local se usa 8080
ENV PORT=8080
EXPOSE 8080

# Las variables de Supabase (SUPABASE_JWKS_URL, SUPABASE_JWT_ISSUER, datos de la base)
# se pasan al ejecutar el contenedor, nunca se copian dentro de la imagen.
ENTRYPOINT ["sh", "-c", "exec java -jar app.jar --server.port=${PORT}"]
