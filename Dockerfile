FROM node
# Create app directory
RUN mkdir -p /usr/src/nodejs-quiz-app
# Copy the code
COPY ./ /usr/src/nodejs-quiz-app/
# Change working directory
WORKDIR /usr/src/nodejs-quiz-app
RUN npm i
CMD ["npm","start"]



