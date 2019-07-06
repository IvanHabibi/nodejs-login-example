FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./



RUN npm install
RUN npm install chromedriver

# RUN wget http://chromedriver.storage.googleapis.com/76.0.3809.25/chromedriver_linux64.zip
# RUN unzip chromedriver_linux64.zip
# RUN mv chromedriver /usr/bin/chromedriver
# RUN chown root:root /usr/bin/chromedriver
# RUN chmod +x /usr/bin/chromedriver
RUN curl http://chromedriver.storage.googleapis.com/76.0.3809.25/chromedriver_linux64.zip -o chromedriver
RUN chmod +x chromedriver

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]