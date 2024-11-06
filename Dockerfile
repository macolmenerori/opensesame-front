FROM node:20-alpine
LABEL app="opensesame-front" stack.binary="node" stack.version="20-alpine"

WORKDIR /usr/app

COPY .env ./
COPY src src
COPY public public
COPY package.json ./
COPY yarn.lock ./
COPY .eslintrc.js ./
COPY .npmrc ./
COPY .prettierrc ./
COPY eslint.config.mjs ./
COPY jest-global-setup.js ./
COPY jest.config.js ./
COPY jest.polyfills.js ./
COPY jest.setup.tsx ./
COPY tsconfig.json ./
COPY webpack.config.js ./

RUN yarn install --frozen-lockfile
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]