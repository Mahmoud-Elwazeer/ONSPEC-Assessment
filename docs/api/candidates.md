## Candidate Management

### Create Candidate (Admin & Manager)

- **Endpoint**: `POST /candidates`
- **Description**: creates new records if the candidate's email doesn't exist, or updates an existing record if the email already exists
- **Request Body**:
    
    ```
    {
        "firstName": "Mahmoud",
        "lastName": "Elwazeer",
        "email": "mahmoud.m.elwazeer@gmail.com",
        "phoneNumber": "+201021489200",
        "preferredTime": "6:00 PM - 8:00 PM",
        "linkedinUrl": "https://www.linkedin.com/in/mahmoud-elwazeer/",
        "githubUrl": "https://github.com/Mahmoud-Elwazeer",
        "comment": "please explore my portfolio: https://www.elwazeer.tech/"
    }
    
    ```
    

### Get Candidate by ID (Admin & Manager & HR) (Not Active)

- **Endpoint**: `GET /candidates/{candidateId}`
- **Description**: Get details of a specific Candidate by ID.

### Get All Candidate (Admin & Manager & HR) (Not Active)

- **Endpoint**: `GET /candidates`
- **Description**: Get a list of all candidates .

### Update Candidate by ID (Admin & Manager) (Not Active)

- **Endpoint**: `PUT /candidates/{candidateId}`
- **Description**: Update Candidate details by ID.
- **Request Body**:
    
    ```
    {
        "firstName": "Mahmoud",
        "lastName": "Elwazeer",
        "email": "mahmoud.m.elwazeer@gmail.com",
        "phoneNumber": "+201021489200",
        "preferredTime": "6:00 PM - 8:00 PM",
        "linkedinUrl": "https://www.linkedin.com/in/mahmoud-elwazeer/",
        "githubUrl": "https://github.com/Mahmoud-Elwazeer",
        "comment": "please explore my portfolio: https://www.elwazeer.tech/"
    }
    
    ```
    

### Delete Candidate (Admin & Manage) (Not Active)

- **Endpoint**: `DELETE /candidates/{candidateId}`
- **Description**: Delete a Candidate by ID.