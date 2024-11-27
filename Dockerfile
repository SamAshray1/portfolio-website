# Step 1: Use the official Node.js 16 image as the base image
FROM node:16

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the `package.json` and `package-lock.json` (if present) to the container
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Expose the port that your application will run on (optional, but recommended)
EXPOSE 3000

# Step 7: Run the application
CMD ["npm", "start"]
