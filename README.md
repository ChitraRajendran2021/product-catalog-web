## Prerequisites
- **Docker** (for containerized deployment)
- **Node.js** (if building locally, recommended version is 18)


### Move to the base directory
cd product-catalog-web

## Building the Application

## Dev Build:
   npm install
      npm run build
		npm start
        http://localhost:3000

###  Build the Docker:
   docker build -t product-catalog-web . //MAke Sure Docker deamon is up and running
   docker run -p 80:80 product-catalog-web
   http://localhost/ or http://localhost:80
  
## Stopping the Application
docker stop <container_id>