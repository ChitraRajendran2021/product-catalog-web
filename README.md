## This application is interface to search and display products.

## Prerequisites
- **Docker** (for containerized deployment)
- **Node.js** (if building locally, recommended version is 18)

### STEP1 : Clone the repository:
git clone git@github.com:ChitraRajendran2021/product-catalog-web.git

### STEP2 : Move to the base directory
cd product-catalog-web

### Building the Application

### STEP3 : Local Build:
### Execute the below commands
   npm install
      npm run build
		npm start
        http://localhost:3000

### OR

### STEP4 :  Build the Docker:
### Execute the below commands
   docker build -t product-catalog-web . //MAke Sure Docker deamon is up and running
   docker run -p 80:80 product-catalog-web
   http://localhost/ or http://localhost:80
  
### Stopping the Application
docker stop <container_id>