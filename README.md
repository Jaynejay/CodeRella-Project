# CodeRella Project

A comprehensive exam management system built with React.js frontend and Spring Boot backend with MySQL database.

## Project Structure

```
CodeRella-Project/
├── client/                 # React.js Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   └── axios.js       # Axios configuration
└── server/                # Spring Boot Backend
    └── coderellaProject/
        └── coderellaProject/
            └── src/main/java/com/example/coderellaProject/
                ├── controller/    # REST API controllers
                ├── model/         # JPA entities
                ├── repository/    # Data access layer
                ├── service/       # Business logic
                └── config/        # Configuration classes
```

## Features

### Backend (Spring Boot)
- **Paper Setter Management**: CRUD operations for paper setters
- **Subject Management**: Manage subjects with course associations
- **Course Management**: Handle course information
- **Exam Management**: Exam creation and management
- **RESTful APIs**: Complete REST API endpoints
- **MySQL Database**: Persistent data storage
- **JPA/Hibernate**: Object-relational mapping

### Frontend (React.js)
- **Paper Setter List**: Display and search paper setters
- **Real-time Search**: Filter paper setters by name or registration ID
- **Responsive Design**: Modern UI with Tailwind CSS
- **Error Handling**: Proper error states and loading indicators
- **API Integration**: Seamless backend communication

## Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- MySQL 8.0 or higher
- Maven 3.6 or higher

## Database Setup

1. Create a MySQL database named `Coderella_db`
2. Update database credentials in `server/coderellaProject/coderellaProject/src/main/resources/application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/Coderella_db
spring.datasource.username=your_username
spring.datasource.password=your_password
```

## Backend Setup

1. Navigate to the backend directory:
```bash
cd server/coderellaProject/coderellaProject
```

2. Build the project:
```bash
mvn clean install
```

3. Run the Spring Boot application:
```bash
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

## Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Paper Setters
- `GET /api/paper-setters` - Get all paper setters
- `GET /api/paper-setters/{id}` - Get paper setter by ID
- `GET /api/paper-setters/registration/{registrationId}` - Get by registration ID
- `POST /api/paper-setters` - Create new paper setter
- `PUT /api/paper-setters/{id}` - Update paper setter
- `DELETE /api/paper-setters/{id}` - Delete paper setter
- `GET /api/paper-setters/search?keyword={keyword}` - Search paper setters

### Subjects
- `GET /api/subjects` - Get all subjects
- `GET /api/subjects/{id}` - Get subject by ID
- `GET /api/subjects/code/{code}` - Get subject by code
- `GET /api/subjects/course/{courseId}` - Get subjects by course
- `POST /api/subjects` - Create new subject
- `PUT /api/subjects/{id}` - Update subject
- `DELETE /api/subjects/{id}` - Delete subject
- `GET /api/subjects/search?keyword={keyword}` - Search subjects

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/{id}` - Get course by ID
- `GET /api/courses/code/{code}` - Get course by code
- `POST /api/courses` - Create new course
- `PUT /api/courses/{id}` - Update course
- `DELETE /api/courses/{id}` - Delete course
- `GET /api/courses/search?keyword={keyword}` - Search courses

## Sample Data

The application includes sample data for:
- 3 courses (DTET, DICT, DAM)
- 6 subjects (Technical Drawing, Engineering Mathematics, etc.)
- 8 paper setters with registration IDs and contact information

## Technologies Used

### Backend
- Spring Boot 3.4.5
- Spring Data JPA
- Spring Security
- MySQL Connector
- Lombok
- Maven

### Frontend
- React 18
- Vite
- Tailwind CSS
- Axios
- React Router

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. 