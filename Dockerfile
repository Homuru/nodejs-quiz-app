FROM node
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Cloning the repo, install dependencies
RUN git clone https://quangdt:zeroaxlx@git.ows.vn/quangdt/nodejs-quiz-app
WORKDIR /usr/src/app/nodejs-quiz-app
RUN npm i
CMD ["npm","start"]



