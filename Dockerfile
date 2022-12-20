# Use the latest LTS version of Node.js as the base image
FROM node:lts

# Create the working directory and set it as the working directory
RUN mkdir -p /var/www/animanga
WORKDIR /var/www/animanga

# Install the yarn package manager
RUN apt-get update && apt-get install -yqq yarn && apt-get install -yqq xdg-utils && apt-get clean

# Install the Node.js dependencies
COPY package.json yarn.lock ./
RUN yarn install

## Create a non-root user and group
#RUN groupadd -r app && useradd -r -g app app
#
## Set the ownership and permissions of the files and directories
#RUN chown -R app:app /var/www/animanga
#RUN chmod -R 775 /var/www/animanga

# Expose the application's port
EXPOSE 8080

# Set the default user and group to the non-root user and group
#USER app:app

# Set the default command to start the Vue.js application
CMD ["yarn", "dev"]
