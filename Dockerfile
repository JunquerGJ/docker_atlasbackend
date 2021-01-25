FROM node:15.5.1-stretch
WORKDIR /Backend_Prisma
EXPOSE 5000
COPY . .
RUN npm install 
CMD ["npm","start"]