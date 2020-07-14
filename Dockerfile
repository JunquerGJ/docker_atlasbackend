FROM node:12.16.3-stretch
WORKDIR /Backend_Prisma
EXPOSE 5000
COPY . .
RUN npm install 
CMD ["npm","start"]