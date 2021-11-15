#Image de node 14 alpine
FROM node:14-alpine
#Directorio de trabajo de la app
WORKDIR /usr/src/app
#Copiar dependencias en carpeta de trabajo
COPY ["package.json", "package-lock.json", "./"]
#Instalar dependencias
RUN npm install 
#Copiar contenido en carpeta raiz definida en workdir
COPY . .
#Exponer puerto 3000
EXPOSE 3000
#Dar permisos a la carpeta app para el usuario node
RUN chown -R node /usr/src/app
#Definicion del usuario node
USER node
#Comando a ejecutar
CMD ["npm", "start"]