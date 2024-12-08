**User Management API Specification**

### 1. Get All Users

**Method:** `GET /api/users`  
**Description:** Retrieves a list of all users.  
**Query Parameters (optional):**
- `page` (number): Pagination page number.
- `limit` (number): Number of users per page.
- `sortBy` (string): Field to sort by (e.g., `createdAt`, `userName`).
- `order` (string): Sort order (`asc` or `desc`).

**Response:**
- List of users: `userName`, `email`, `isActive`, `role`, `createdAt`, `updatedAt`.

### 2. Create New User

**Method:** `POST /api/users`  
**Description:** Creates a new user.  
**Request Body:**
- `userName` (string, required): Username.
- `email` (string, required, unique): Email.
- `password` (string, required): Password (hashed before saving).
- `role` (string, optional, default: `user`): Role (`user`, `admin`, etc.).

**Response:**
- Created user without the `password` field.

### 3. Get User by ID

**Method:** `GET /api/users/{id}`  
**Description:** Retrieves user details by their ID.  
**Path Parameter:**
- `id` (string, required): User ID.

**Response:**
- User details: `userName`, `email`, `isActive`, `role`, `createdAt`, `updatedAt`.

### 4. Update User

**Method:** `PUT /api/users/{id}`  
**Description:** Updates user information.  
**Path Parameter:**
- `id` (string, required): User ID.

**Request Body:**
- Fields to update: `userName`, `email`, `password`, `isActive`, `role`.
- **Note:** Hash password if updated.

**Response:**
- Updated user without the `password` field.

### 5. Delete (Deactivate) User

**Method:** `DELETE /api/users/{id}`  
**Description:** Deactivates the user by setting `isActive` to `false`.  
**Path Parameter:**
- `id` (string, required): User ID.

**Response:**
- Success message.

### 6. Get Active Users

**Method:** `GET /api/users/active`  
**Description:** Retrieves a list of active users.  
**Query Parameters (optional):**
- `role` (string): Filter by role (`user`, `admin`, etc.).

**Response:**
- List of active users.

### 7. Search Users

**Method:** `GET /api/users/search`  
**Description:** Search for users by different criteria.  
**Query Parameters (optional):**
- `userName` (string): Partial match on user name.
- `email` (string): Partial match on email.
- `isActive` (boolean): Filter by active status.
- `role` (string): Search by role.
- `createdAfter` (string, optional): Filter users created after a specific date (ISO 8601 format).
- `createdBefore` (string, optional): Filter users created before a specific date (ISO 8601 format).
- `invalidEmail` (boolean, optional): Search for users with invalid email formats.

**Response:**
- List of users matching the criteria.

### 8. Activate/Deactivate User

**Method:** `PATCH /api/users/{id}/status`  
**Description:** Activate or deactivate a user.  
**Path Parameter:**
- `id` (string, required): User ID.

**Request Body:**
- `isActive` (boolean, required): New active status (`true` or `false`).

**Response:**
- Updated status of the user.

### 9. Change User Password

**Method:** `PATCH /api/users/{id}/password`  
**Description:** Changes the user's password.  
**Path Parameter:**
- `id` (string, required): User ID.

**Request Body:**
- `newPassword` (string, required): New password (hashed before saving).

**Response:**
- Success message.

### Additional Requirements

**Authentication & Authorization:**
- Protect methods like create, update, delete, activate/deactivate with appropriate permissions (e.g., only `admin`).

**Data Validation:**
- Ensure `email` is unique.
- Validate `email` format and `password` complexity.

**Error Handling:**
- Handle errors such as user not found or invalid data.
- Return informative error messages with relevant HTTP statuses (`400 Bad Request`, `404 Not Found`, `500 Internal Server Error`).

[//]: # (  7762842818:AAG4iDWbsaWlwmshdkEUn5p3OYcoBzOIDOs)

