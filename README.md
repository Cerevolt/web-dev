# Neurocognitive Platform

A role-based web application designed to support child assessment, developmental progress monitoring, and collaboration among parents, schools, consultants, and administrators through an integrated digital platform.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Objectives](#2-project-objectives)
3. [Key Features](#3-key-features)
4. [System Architecture](#4-system-architecture)
5. [User Roles and Functionalities](#5-user-roles-and-functionalities)
6. [Technology Stack](#6-technology-stack)
7. [Project Structure](#7-project-structure)
8. [Frontend Architecture](#8-frontend-architecture)
9. [Getting Started](#9-getting-started)
10. [Environment Configuration](#10-environment-configuration)
11. [Development Guidelines](#11-development-guidelines)
12. [API Integration](#12-api-integration)
13. [Machine Learning Integration](#13-machine-learning-integration)
14. [Security Considerations](#14-security-considerations)
15. [Testing and Quality Assurance](#15-testing-and-quality-assurance)
16. [Current Development Status](#16-current-development-status)
17. [Future Enhancements](#17-future-enhancements)
18. [Contributing](#18-contributing)
19. [License](#19-license)

---

## 1. Project Overview

The Neurocognitive Platform is a multi-role web application intended to create a connected environment for monitoring children's assessments, developmental progress, and learning activities.

The platform brings together five primary user categories:

- Administrators
- Consultants
- Schools
- Parents
- Children

Each user category will have a dedicated interface with role-specific functionality and access permissions.

The system is being developed using a modular architecture consisting of a React frontend, a Django backend, and a machine learning component developed independently.

The machine learning component is intended to analyse structured assessment data and generate predictive outputs to support professional evaluation and progress monitoring.

**Project Type:** Full-Stack Web Application with Machine Learning Integration

**Development Approach:** Modular, Role-Based Architecture

**Frontend Responsibility:** React-based user interface and client-side functionality.

---

## 2. Project Objectives

The primary objectives of the platform are:

- Develop a centralised platform for child assessment and progress monitoring.
- Provide dedicated dashboards for different categories of users.
- Facilitate collaboration between parents, schools, and consultants.
- Maintain structured assessment records and developmental histories.
- Integrate machine learning capabilities for assessment-data analysis.
- Present progress information through reports and visual indicators.
- Provide interactive learning activities for children.
- Implement secure authentication and role-based access control.

---

## 3. Key Features

The platform is planned to include the following major modules.

### 3.1 User Authentication and Management

- User registration and login.
- Secure authentication.
- Password recovery and reset.
- Role-based navigation.
- Protected application routes.
- User profile management.

### 3.2 Child Assessment Management

- Structured assessment forms.
- Assessment submission and data validation.
- Assessment history.
- Consultant-led and school-led assessments.
- Integration with the machine learning prediction service.

### 3.3 Progress Monitoring

- Child development tracking.
- Assessment history and comparisons.
- Progress reports.
- Performance colour-scale indicators.
- Behaviour monitoring.
- Daily progress records.

### 3.4 Interactive Learning Environment

- Educational videos.
- Interactive assessments.
- Games and activities.
- Daily learning goals.
- General Knowledge flashcards.
- Reward system.
- Cartoon-based plant growth and progress representation.

### 3.5 Communication and Support

- Parent feedback forms.
- Chatbot interaction.
- Doctor-support options.
- Communication and follow-up support.

---

## 4. System Architecture

The application follows a modular architecture that separates presentation, business logic, data management, and machine learning operations.

```text
                    USERS
                      |
                      v
             REACT FRONTEND
             (Presentation Layer)
                      |
                      v
              DJANGO BACKEND
              (Application Layer)
                      |
          +-----------+-----------+
          |           |           |
          v           v           v
       DATABASE   AUTHENTICATION  API SERVICES
          |                       |
          |                       v
          |                 ML COMPONENT
          |                 (Prediction)
          |                       |
          +-----------<-----------+
                      |
                      v
               RESULT STORAGE
                      |
                      v
             ROLE-BASED REPORTS
```

### Architecture Components

**Frontend Layer**

Responsible for user interaction, application navigation, form handling, dashboards, and visualisation.

**Backend Layer**

Responsible for authentication, business logic, database operations, API management, and integration with the machine learning component.

**Database Layer**

Responsible for maintaining user information, child profiles, assessment records, and progress history.

**Machine Learning Layer**

Responsible for data preprocessing, model training, evaluation, and prediction generation.

---

## 5. User Roles and Functionalities

The platform supports five distinct user roles.

| Role | Planned Functionalities |
|---|---|
| Admin | Product management, consultant management, game management |
| Consultant | Child assessment, content management, progress reports |
| School | Assessments, content management, student progress, behaviour monitoring, reports |
| Parent | Feedback, chatbot, doctor-support options, child progress reports |
| Child | Videos, assessments, games, daily goals, flashcards, rewards |

Each role will have a dedicated dashboard and appropriate access permissions.

---

## 6. Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js | Component-based user interface |
| JavaScript (ES6+) | Application logic |
| HTML5 | Application structure |
| CSS3 | Styling and responsive layouts |
| React Router DOM | Client-side navigation |
| Vite | Development server and build tooling |
| npm | Dependency management |

### Backend

| Technology | Purpose |
|---|---|
| Python | Backend programming language |
| Django | Backend framework |
| Django REST Framework | REST API development |
| SQLite | Current development database |

### Machine Learning

The machine learning implementation is being developed separately.

The final model, libraries, training pipeline, and integration interface will be documented once the ML implementation is established.

---

## 7. Project Structure

The repository is organised into separate frontend and backend directories.

```text
web-dev/
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── Dashboardcard.js
│   │   │   ├── Navbar.js
│   │   │   ├── PerformanceColourScale.js
│   │   │   ├── progressChart.js
│   │   │   └── Sidebar.js
│   │   │
│   │   ├── context/
│   │   │   ├── authContext.js
│   │   │   └── userContext.js
│   │   │
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── children/
│   │   │   ├── common/
│   │   │   ├── consultant/
│   │   │   ├── parents/
│   │   │   └── school/
│   │   │
│   │   ├── routes/
│   │   │   ├── AppRoutes.js
│   │   │   ├── PrivateRoute.js
│   │   │   └── RoleRoute.js
│   │   │
│   │   ├── services/
│   │   │   ├── adminService.js
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── childService.js
│   │   │   ├── consultantService.js
│   │   │   ├── parentService.js
│   │   │   └── schoolService.js
│   │   │
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── validators.js
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── backend/
│   ├── apps/
│   │   ├── accounts/
│   │   ├── adminpanel/
│   │   ├── chatbot/
│   │   ├── children/
│   │   ├── consultant/
│   │   ├── parents/
│   │   ├── reports/
│   │   └── school/
│   │
│   ├── config/
│   ├── manage.py
│   └── requirements.txt
│
├── docs/
│
└── README.md
```

*Note: The directory structure represents the planned and existing project organisation. Some components and modules are still under development.*

---

## 8. Frontend Architecture

The React application follows a modular component-based structure.

### Components

Reusable interface elements shared across multiple pages.

Examples:
- Navigation bars.
- Sidebars.
- Dashboard cards.
- Progress visualisations.
- Performance indicators.

### Pages

Each user role has a separate collection of pages.

This separation improves maintainability and makes it easier to develop role-specific functionality independently.

### Context

React Context API is used to manage shared application state.

The authentication context is intended to manage:
- Authenticated user information.
- Authentication status.
- Loading state.
- Login and logout operations.

### Routes

The routing layer is responsible for:
- Application navigation.
- Private route protection.
- Role-based route access.
- Redirecting unauthorised users.

### Services

The services directory provides a dedicated location for API communication.

This keeps backend communication separate from presentation components.

### Utilities

Reusable validation functions, constants, and common helper logic are maintained independently.

---

## 9. Getting Started

Follow these instructions to set up the frontend development environment.

### Prerequisites

Install the following:

- Node.js (compatible with the installed Vite version).
- npm.
- Git.
- Visual Studio Code or another code editor.

Verify the installation:

```bash
node --version
npm --version
git --version
```

### Step 1: Clone the Repository

```bash
git clone https://github.com/Cerevolt/web-dev.git
```

### Step 2: Navigate to the Frontend

```bash
cd web-dev/frontend
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Development Server

```bash
npm run dev
```

The frontend development server will be available at:

```text
http://localhost:5173/
```

### Step 5: Build for Production

```bash
npm run build
```

The production-ready build will be generated in the `dist/` directory.

### Step 6: Preview the Production Build

```bash
npm run preview
```

---

## 10. Environment Configuration

Environment variables should be used for configuration values that differ between development, testing, and production environments.

For frontend API configuration, create a `.env` file inside the `frontend/` directory when backend integration begins.

Example:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Access the configured value using:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

**Important:**

- Never store passwords, secret keys, or private credentials in frontend environment variables.
- Variables prefixed with `VITE_` are exposed to the browser.
- Keep actual secrets in the backend environment.

---

## 11. Development Guidelines

To maintain code quality and consistency, follow these development practices.

### Component Development

- Create reusable functional components.
- Use clear and meaningful component names.
- Keep components focused on specific responsibilities.
- Avoid unnecessary duplication.
- Separate business logic from UI presentation where practical.

### Styling

- Maintain consistent spacing, colours, and typography.
- Prefer reusable CSS classes and design tokens.
- Ensure responsive layouts.
- Maintain visual consistency across role-based dashboards.

### State Management

- Use React state for local component interactions.
- Use Context API for shared application state where appropriate.
- Avoid unnecessary global state.

### Code Quality

- Use meaningful variable and function names.
- Keep files organised according to their responsibilities.
- Handle loading, empty, and error states.
- Validate user inputs.
- Avoid committing temporary files, build output, or credentials.

---

## 12. API Integration

The frontend communicates with the Django backend through REST APIs.

The integration layer is organised under:

```text
src/services/
```

Planned service responsibilities:

| Service | Responsibility |
|---|---|
| `api.js` | Central API configuration |
| `authService.js` | Authentication operations |
| `adminService.js` | Admin-related operations |
| `childService.js` | Child profiles and assessments |
| `consultantService.js` | Consultant operations |
| `parentService.js` | Parent operations |
| `schoolService.js` | School operations |

API integration will include:

- Request and response handling.
- Authentication headers.
- Error handling.
- Data validation.
- Loading-state management.
- Role-based access coordination.

The final API endpoints and payload structures will be documented after the Django backend contracts are established.

---

## 13. Machine Learning Integration

The platform is designed to integrate with a separately developed machine learning component.

The intended workflow is:

1. A child completes an assessment.
2. The frontend submits the assessment data to Django.
3. Django validates and prepares the data.
4. The backend communicates with the ML prediction service.
5. The ML component processes the supplied data.
6. Prediction results are returned to Django.
7. Django stores the results and makes authorised information available to the frontend.
8. The frontend displays relevant assessment and progress information.

The exact input features, prediction format, model architecture, and integration mechanism will depend on the final ML implementation.

**Clinical safety:** Machine learning predictions are intended to support assessment and professional evaluation. They must not be presented as confirmed medical diagnoses without appropriate clinical assessment.

---

## 14. Security Considerations

Because the platform handles information relating to children, privacy and security are essential.

The implementation should consider:

- Secure authentication.
- Strong password hashing.
- Role-based access control.
- Backend-side permission enforcement.
- Input validation and sanitisation.
- Secure API communication using HTTPS in production.
- Appropriate protection of child-related information.
- Restricted access to assessment and progress records.
- Secure handling of authentication tokens.
- Avoidance of sensitive information in application logs.

Frontend route protection must never be treated as a replacement for backend authorisation.

---

## 15. Testing and Quality Assurance

Testing will be performed throughout development.

### Frontend Testing

Planned testing areas include:

- Component rendering.
- Form validation.
- Navigation and routing.
- Role-based access behaviour.
- Responsive layouts.
- API integration.
- Error and loading states.

### Backend Testing

Planned testing areas include:

- Authentication endpoints.
- Database operations.
- Assessment submission.
- Permission enforcement.
- API validation.
- ML service communication.

### Integration Testing

The complete application will be tested to verify communication between React, Django, the database, and the ML component.

---

## 16. Current Development Status

The project is actively under development.

| Module | Current Status |
|---|---|
| React project setup | Completed |
| Frontend directory structure | Created |
| Global design system | Initial implementation |
| Login interface | Initial implementation |
| Authentication integration | Pending |
| Registration interface | Pending |
| Password recovery interface | Pending |
| Application routing | In progress |
| Role-based dashboards | Pending |
| Role-specific pages | Pending |
| Django authentication | Pending implementation |
| Backend API integration | Pending |
| ML model integration | Under separate development |
| Reports and progress visualisation | Planned |
| End-to-end testing | Pending |

Statuses describe the development state at the time of this documentation and should be updated as implementation progresses.

---

## 17. Future Enhancements

Planned improvements include:

- Complete role-based dashboards.
- Fully integrated authentication.
- Assessment management interfaces.
- ML-powered assessment result visualisation.
- Interactive progress charts.
- Child learning and reward interfaces.
- Parent and consultant communication features.
- Responsive mobile and tablet layouts.
- Comprehensive automated testing.
- Production deployment and monitoring.

---

## 18. Contributing

Contributions from project team members should follow the established project structure.

### Suggested Workflow

1. Pull the latest changes from the main branch.
2. Create a separate feature branch.
3. Implement the assigned functionality.
4. Test the changes locally.
5. Commit with a meaningful commit message.
6. Push the feature branch.
7. Submit a pull request for review.

### Branch Naming Convention

```text
feature/feature-name
fix/issue-description
docs/documentation-update
```

### Commit Message Examples

```text
feat: implement user registration interface
feat: add consultant dashboard
fix: resolve login form validation
docs: update project documentation
```

Avoid committing generated build files, local databases, credentials, and unnecessary dependencies.

---

## 19. License

The licensing terms for this project are to be determined by the project owners.

Until a license is added to the repository, all rights remain with the respective copyright holders. No permission to reuse, distribute, or modify the project should be assumed.

---

## Project Information

**Repository:** [Cerevolt/web-dev](https://github.com/Cerevolt/web-dev)

**Frontend Framework:** React.js

**Backend Framework:** Django

**Project Category:** Full-Stack Development | Machine Learning Integration | Child Assessment and Progress Monitoring

**Development Status:** In Progress

---

*Built collaboratively with a focus on modular development, maintainability, accessibility, and responsible technology integration.*
