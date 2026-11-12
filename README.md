# El Noticioso

Aplicación de noticias organizada en microservicios y ejecutada con Docker Compose.

| Servicio | Carpeta | Tecnología | Puerto interno | Función |
|---|---|---|---|---|
| `frontend` | `el-noticioso-frontend` | React + Vite + TypeScript | 80 (host: **8080**) | Interfaz de usuario |
| `gateway` | `Caddyfile.local` | Caddy 2 | 80 (host: **8081**) | Punto de entrada único para la API y CORS |
| `backend` | `el-noticioso-backend` | Spring Boot 4, Java 25 | 8080 | Noticias, favoritos y perfil (PostgreSQL en Supabase) |
| `efemerides` | `el-noticioso-ia` | Spring Boot 4, Java 25 | 8000 | Efemérides del día (lee `efemerides.txt`) |
| `scrapping` | `el-noticioso-scrapping` | Spring Boot 4 + jsoup | 8090 | Noticias extra de elcomercio.pe (caché de 24 h) |

Solo el frontend (8080) y el gateway (8081) se publican en tu computadora. Los demás servicios solo son accesibles dentro de la red de Docker.

---

## 1. Requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y en ejecución.
- Git (opcional, para clonar el repositorio).
- Solo si vas a ejecutar algo **sin Docker**: Java 25, Node.js 20 o superior.

---

## 2. Configuración de variables de entorno

Crea los archivos `.env` en cada carpeta indicada. Ninguno se sube a Git, así que cada persona debe crear el suyo.

### `el-noticioso-backend/.env`

```env
LINK_DATABASE=jdbc:postgresql://<host>:<puerto>/<base>
USERNAME_DATABASE=<usuario>
PASSWORD_DATABASE=<contraseña>
SUPABASE_JWKS_URL=https://<proyecto>.supabase.co/auth/v1/.well-known/jwks.json
SUPABASE_JWT_ISSUER=https://<proyecto>.supabase.co/auth/v1
```

### `el-noticioso-ia/.env`

El servicio de efemérides ya no llama a ninguna IA: lee el archivo `src/main/resources/efemerides.txt`. Las variables `API_KEY`, `MODEL_AI` y `PROMPT_AI` ya no se usan en el código. Si el servicio no arranca por falta de `API_KEY`, agrega cualquier valor temporal para esa variable.

### `el-noticioso-frontend/.env`

```env
VITE_API_LOCAL=http://localhost:8081/api
VITE_SUPABASE_URL=<url de tu proyecto de Supabase>
VITE_SUPABASE_PUBLISHABLE_KEY=<clave publicable de Supabase>
```

> Las variables `VITE_*` se incorporan al compilar el frontend. Si las cambias, reconstruye ese servicio (ver sección 5).
> Revisa los nombres exactos de las variables de Supabase en `src/services/supabase.ts`, porque pueden diferir de los de este ejemplo.

### `el-noticioso-scrapping`

No necesita `.env`.

---

## 3. Ejecutar todo con Docker

Desde la carpeta raíz (donde está `docker-compose.yml`):

```bash
# Construir las imágenes y levantar todos los servicios en segundo plano
docker compose up --build -d

# Ver el estado de los contenedores
docker compose ps

# Ver los logs de un servicio (últimas 50 líneas)
docker compose logs efemerides --tail 50

# Detener y eliminar los contenedores (los datos no se pierden: la base está en Supabase)
docker compose down
```

Cuando todo esté arriba:

| Qué | Dónde |
|---|---|
| Aplicación web | http://localhost:8080 |
| API (vía gateway) | http://localhost:8081/api/... |

### Endpoints principales

| Método | Ruta | Servicio | Caché | Auth |
|---|---|---|---|---|
| GET | `/api/noticias?ubicacion=&categoria=&busqueda=` | backend | 24 h (se limpia al crear, editar o borrar) | No |
| POST / PUT / DELETE | `/api/noticias` | backend | — | Admin |
| GET / POST / DELETE | `/api/favoritos` | backend | No | Usuario |
| GET / PUT | `/api/perfil` | backend | No | Usuario |
| GET | `/api/efemerides` | efemerides | Por día (cambia a las 12:00, hora de Lima) | No |
| GET | `/api/scraping/ultimas-noticias` | scrapping | 24 h | No |

Prueba rápida desde PowerShell o CMD:

```bash
curl.exe -i http://localhost:8081/api/efemerides
curl.exe -i http://localhost:8081/api/scraping/ultimas-noticias
curl.exe -i "http://localhost:8081/api/noticias?ubicacion=LOCAL"
```

> Los valores de `ubicacion` y `categoria` deben ir en **mayúsculas**: `LOCAL`, `REGIONAL`, `NACIONAL`, `INTERNACIONAL`; `CULTURALES`, `DEPORTIVAS`, `ENTRETENIMIENTO`, `POLICIAL`, `POLITICA`, `TECNOLOGIA`.

---

## 4. Flujo de trabajo habitual

### Cambios en un solo servicio

```bash
docker compose build efemerides
docker compose up -d efemerides
```

O, en un solo paso:

```bash
docker compose up --build -d efemerides
```

### Cambios en el gateway (`Caddyfile.local`)

Caddy lee el archivo solo al arrancar, así que hay que reiniciarlo:

```bash
docker compose restart gateway
```

### Cambios en las variables `.env` del backend o de efemérides

Los `env_file` se leen al crear el contenedor. Recréalo:

```bash
docker compose up -d --force-recreate backend
```

### Cambios en las variables `VITE_*` del frontend

Hay que reconstruir la imagen sin caché:

```bash
docker compose build --no-cache frontend
docker compose up -d frontend
```

### Reconstruir todo desde cero

```bash
docker compose down
docker compose build --no-cache
docker compose up -d
```

---

## 5. Desarrollo sin Docker (opcional)

Útil para depurar un servicio con recarga rápida. Si ejecutas el backend con Spring en el puerto 8080, detén el contenedor del frontend (`docker compose stop frontend`) o usa otro puerto, porque ambos usan 8080 en tu máquina.

**Backend:**

```bash
cd el-noticioso-backend
./mvnw spring-boot:run          # Windows: mvnw.cmd spring-boot:run
```

**Efemérides:**

```bash
cd el-noticioso-ia
./mvnw spring-boot:run
```

**Scraping:**

```bash
cd el-noticioso-scrapping
./mvnw spring-boot:run
```

**Frontend:**

```bash
cd el-noticioso-frontend
npm install
npm run dev                     # http://localhost:5173
```

Si el frontend apunta al backend directamente y no a través del gateway, cambia `VITE_API_LOCAL` a `http://localhost:8080/api` y reinicia `npm run dev`.

---

## 6. Solución de problemas

| Síntoma | Causa probable | Qué hacer |
|---|---|---|
| `404` en `localhost:8081/api/...` con una ruta nueva | El gateway no recargó `Caddyfile.local` | `docker compose restart gateway` |
| `502` en el gateway | El servicio de destino no está corriendo | `docker compose ps`, luego `docker compose up -d <servicio>` |
| `500` en `/api/efemerides` | Falta `efemerides.txt` en `src/main/resources` o el día no existe en el archivo | Revisa `docker compose logs efemerides` |
| `500` en `/api/scraping/...` | elcomercio.pe cambió su HTML o no hay conexión | Revisa `docker compose logs scrapping`; puede ser necesario ajustar los selectores de `ServiceScraping.java` |
| El frontend no muestra cambios de `VITE_*` | La imagen se construyó con los valores anteriores | `docker compose build --no-cache frontend` |
| Las noticias no se actualizan tras editarlas | Caché de noticias | Debería limpiarse al crear, editar o borrar; si no, reinicia el backend |
| Error de conexión a la base de datos en el backend | Credenciales o `LINK_DATABASE` incorrectos en `el-noticioso-backend/.env` | Revisa el `.env` y `docker compose logs backend` |
| Puerto ocupado (`port is already allocated`) | Otro programa usa 8080 u 8081 | Detén ese programa o cambia el puerto publicado en `docker-compose.yml` |

Para ver el error exacto de cualquier servicio:

```bash
docker compose logs <servicio> --tail 100
```

---

## 7. Estructura del repositorio

```
El-Noticioso/
├── docker-compose.yml
├── Caddyfile.local
├── README.md
├── el-noticioso-frontend/      # React + Vite
├── el-noticioso-backend/       # API principal (noticias, favoritos, perfil)
├── el-noticioso-ia/            # Efemérides (efemerides.txt)
└── el-noticioso-scrapping/     # Scraping de elcomercio.pe
```

---

## Notas

- El archivo `efemerides.txt` debe estar en `el-noticioso-ia/src/main/resources/` antes de construir la imagen.
- `CorsConfig.java` del backend ya no es necesario: el gateway agrega los encabezados CORS.
- `ServiceNews.ts` en el frontend ya no se usa; puede eliminarse junto con `VITE_LINK_API`.
