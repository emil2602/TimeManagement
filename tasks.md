**Tasks Management API Specification**

### 1. Create Task

**Method:** `POST /api/tasks`  
**Description:** Creates a new task.  
**Request Body:**
- `title` (string, required): The title of the task.
- `description` (string, optional): A detailed description of the task.
- `priority` (string, required): Priority level (`low`, `medium`, `high`).
- `column_id` (integer, required): The ID of the column the task belongs to.
- `creator_id` (integer, required): The ID of the user who created the task.
- `assignee_id` (integer, optional): The ID of the user assigned to the task.

**Response:**
- Created task details including `id`, `created_at`, and `updated_at` timestamps.

### 2. Get Task by ID

**Method:** `GET /api/tasks/{id}`  
**Description:** Retrieves task details by its ID.  
**Path Parameter:**
- `id` (integer, required): Task ID.

**Response:**
- Task details including `id`, `title`, `description`, `priority`, `column_id`, `creator_id`, `assignee_id`, `created_at`, and `updated_at`.

### 3. Update Task

**Method:** `PUT /api/tasks/{id}`  
**Description:** Updates an existing task.  
**Path Parameter:**
- `id` (integer, required): Task ID.

**Request Body:**
- Fields to update: `title`, `description`, `priority`, `column_id`, `assignee_id`.

**Response:**
- Updated task details including `id`, `created_at`, and `updated_at` timestamps.

### 4. Delete Task

**Method:** `DELETE /api/tasks/{id}`  
**Description:** Deletes a task by its ID.  
**Path Parameter:**
- `id` (integer, required): Task ID.

**Response:**
- Success message or confirmation.

### 5. List Tasks

**Method:** `GET /api/tasks`  
**Description:** Retrieves a list of tasks with optional filters.  
**Query Parameters (optional):**
- `column_id` (integer): Filter tasks by column ID.
- `creator_id` (integer): Filter tasks by creator ID.
- `assignee_id` (integer): Filter tasks by assignee ID.
- `priority` (string): Filter tasks by priority (`low`, `medium`, `high`).
- `created_after` (string): Filter tasks created after a specific date (ISO 8601 format).
- `created_before` (string): Filter tasks created before a specific date (ISO 8601 format).

**Response:**
- List of tasks matching the criteria.

### 6. Search Tasks

**Method:** `GET /api/tasks/search`  
**Description:** Searches for tasks by title or description.  
**Query Parameters:**
- `query` (string, required): Search term for title or description.
- `priority` (string, optional): Filter tasks by priority (`low`, `medium`, `high`).

**Response:**
- List of tasks matching the search criteria.

### Additional Requirements

**Authentication & Authorization:**
- Use Api Token (middleware)

**Data Validation:**
- Validate `priority` values (`low`, `medium`, `high`).
- Ensure all required fields are provided.

**Error Handling:**
- Return appropriate HTTP status codes and messages for errors (e.g., `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`).


