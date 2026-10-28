# ==========================================
# Etapa 1: Instalación y compilación (Build)
# ==========================================
FROM node:20-alpine AS builder

# Habilitar Corepack para usar pnpm de forma nativa
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copiar archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias utilizando la caché de pnpm
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copiar el resto del código fuente
COPY . .

ARG VITE_LINK_API
ARG VITE_API_LOCAL

# Compilar la aplicación de React (genera la carpeta 'dist' o 'build')
RUN pnpm build

# ==========================================
# Etapa 2: Servidor de producción con Nginx
# ==========================================
FROM nginx:1.25-alpine AS production

# Copiar los archivos compilados desde la etapa anterior
# (Nota: cambia 'dist' por 'build' si tu proyecto usa Create React App en lugar de Vite)
COPY --from=builder /app/dist /usr/share/nginx/html

# (Opcional) Copiar una configuración personalizada de Nginx si la tienes
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
