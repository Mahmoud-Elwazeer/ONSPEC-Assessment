# Candidate Hub API

## Overview

The Candidate Hub API allows you to store and update job candidate contact information. It creates new records if the candidate's email doesn't exist, or updates an existing record if the email already exists and also sends emails after receiving applications from candidates.

## Features

- **Create/Update Candidate**: Accepts candidate data and creates a new candidate record if the email doesn't exist, or updates an existing candidate record if the email already exists.
- **Caching**: Utilizes Redis for caching candidate data to improve performance and reduce database load.
- **Background Jobs**: BullMQ is used for background job processing to send emails after receiving applications from candidates.
- **Rate Limiting**: Implements rate limiting to prevent DDOS attacks and ensure the security of the API.
- **Input Validation**: Validating incoming request data, ensuring that all fields (like email, phone, etc.) are correctly formatted and prevent invalid data from being processed.
- **Docker Compose**: The application is containerized using Docker Compose for easy local development and deployment.
- **CI/CD Automation**: Set up continuous integration and deployment for automated testing and deployment processes.
- **AWS ECS Deployment**: The API is deployed to AWS ECS for scalability and high availability.
- **Web Server**: Nginx is used as a web server to serve the API and handle HTTPS/SSL for secure communication.
- **Application Server**: PM2 is used to manage the Node.js application server, ensuring reliability and performance.
- **Secure Data Transmission**: All communications are secured with HTTPS/SSL to protect sensitive candidate information.

## Documentation

For detailed documentation, refer to the following:

- **[API Documentation](docs/api/README.md)**: Detailed documentation for all API endpoints.
- **[Guides](docs/guides/README.md)**: This folder contains helpful guides to understand and work with the **Candidate Hub API** project.
- **[Images](docs/imgs/)**: this folder contains demo images showcasing **Candidate Hub API**.
- **Demo**: Explore the API in action using postman and this url. https://onspec.elwazeer.tech

## Tech Stack

- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis
- **Background Job Processing**: BullMQ
- **Validation:** Zod for Input Validation
- **Security**: Rate Limiting, HTTPS/SSL
- **Deployment**: Docker Compose, AWS ECS, Nginx, PM2
- **CI/CD**: GitHub Actions

## **Getting Started**

## Prerequisites

- Docker and Docker Compose
- **OR**
- Node.js and npm
- PostgreSQL
- Redis

## **Installation**

### 1. **Running Locally**

To run the application locally, follow these steps:

1. **Clone the repository**:
    
    ```
    git clone https://github.com/Mahmoud-Elwazeer/ONSPEC-Assessment.git
    
    ```
    
2. **Install dependencies**:
    
    ```
    cd ONSPEC-Assessment/Express
    npm install
    ```
    
3. **Set up environment variables**:
    - Copy the `.env.dev.example` file to `.env`:
        
        ```
        cp .env.dev.example .env
        ```
        
    - Update the `.env` file with your custom configuration (e.g., DATABASE URL , Redis host, etc.).
4. **Run the application in development mode**:
    
    ```
    ## migrate data
    npx prisma migrate dev
    npx prisma generate
    
    # run tests
    npm run test

    ## Run app
    npm run dev
    ```
    
5. **Access the Application**
    - The backend will be available at `http://localhost:<BACKEND_PORT>`, where `<BACKEND_PORT>` is the port defined in your `.env` file (default is `3000`).

---

### 2. **Running with Docker**

You can run the application using Docker. 

1. **Set up environment variables**:
    - Copy the `.env.docker.example` file to `.env`:
        
        ```
        cd ONSPEC-Assessment
        cp .env.docker.example .env
        ```
        
    - Update the `.env` file with your custom configuration.
2. **Run the application**:
    - For **development mode**, use:
        
        ```
        docker-compose build
        docker-compose up
        ```
        
- This will build and run the application in containers, setting up all services, including PostgreSQL, Redis, and the application server.
1. **Access the Application**
    - The backend will be available at `http://localhost:<BACKEND_PORT>`, where `<BACKEND_PORT>` is the port defined in your `.env` file (default is `3000`).

---

## **Cloud Deployment on AWS**

The backend API is deployed on **AWS EC2** using **Docker**, **PM2**, and **NGINX**. Below is an explanation of the deployment process:

### **1. AWS EC2 Instance Setup**

- Launched an **Amazon EC2** instance with Ubuntu Server.
- Configured security groups to allow inbound traffic for:
    - **HTTP (Port 80)**
    - **HTTPS (Port 443)**
    - **SSH (Port 22)**

### **2. Docker Setup**

- Use commands that we have explained above:

### **3. PM2 for Process Management**

- Used PM2 to start the application inside the Docker container:

### **4. NGINX as a Reverse Proxy**

- Configured NGINX to route traffic from **Port 80 (HTTP)** and **Port 443 (HTTPS)** to the application running on **Port 3000**.

### **5. SSL/TLS Configuration**

- Used **Let's Encrypt** to obtain a free SSL certificate for the domain `onspec.elwazeer.tech`.
- Installed **Certbot** and configured NGINX to serve the application over HTTPS:

## **Security Enhancements**

- **Decision:** Implemented security best practices to protect the API.
- **Justification:**
    - **Rate limiting applied to public endpoints** using middleware to prevent excessive requests and protect against **Denial of Service (DoS) attacks**.
    - **Input validation & sanitization using Zod** to prevent injection attacks.
    - **Used secure HTTP headers** to protect against XSS, CSRF, and clickjacking attacks.

---

## **Rate Limiting for API Protection**

- **Decision:** Used rate limiting on public API endpoints.
- **Justification:**
    - Prevents **Denial of Service (DoS) attacks** and **brute-force attempts** on authentication endpoints.
    - Ensures fair usage and prevents API abuse.
    - Implemented using **Express Rate Limit** middleware to **restrict the number of requests per IP**.

## **Conclusion**

The **Candidate Hub API** is **a secure, scalable solution** for managing candidate data, with features like background email processing, input validation using Zod, and robust caching. Built with modern technologies and deployed with CI/CD on AWS ECS, it’s ready for seamless integration into larger systems.

📌 **Built with ❤️ by [Mahmoud Elwazeer]** 🚀
