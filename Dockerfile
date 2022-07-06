FROM public.ecr.aws/docker/library/node:latest as builder
## Install node deps
COPY package*.json ./
RUN npm install

FROM public.ecr.aws/docker/library/node:latest as development
WORKDIR /usr/src/app
COPY --from=builder node_modules ./node_modules
COPY package*.json ./
COPY . .
RUN npm run build


FROM public.ecr.aws/docker/library/node:latest as production
EXPOSE 80
WORKDIR /usr/src/app
COPY package*.json ./
COPY --from=builder node_modules ./node_modules
COPY --from=development /usr/src/app/dist ./dist
CMD ["node", "dist/main"]