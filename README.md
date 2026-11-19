# Cerevolt – Neurocognitive Support Platform

A role-based web application designed to support child assessment, developmental progress monitoring, learning activities, and collaboration among parents, schools, consultants, and administrators.

Cerevolt combines a React frontend, Django backend, SQLite development database, and a separately developed machine learning component.

**Project Repository:** https://github.com/Cerevolt/web-dev

**Project Type:** Full-Stack Web Application with Machine Learning Integration

**Development Status:** In Progress

---

# Table of Contents

1. [Project Overview](#1-project-overview)
2. [Project Objectives](#2-project-objectives)
3. [User Roles](#3-user-roles)
4. [Key Features](#4-key-features)
5. [Technology Stack](#5-technology-stack)
6. [System Architecture](#6-system-architecture)
7. [Project Structure](#7-project-structure)
8. [Requirements Before Installation](#8-requirements-before-installation)
9. [Download and Open the Project](#9-download-and-open-the-project)
10. [Frontend Setup and Execution](#10-frontend-setup-and-execution)
11. [Backend Setup and Execution](#11-backend-setup-and-execution)
12. [Running Frontend and Backend Together](#12-running-frontend-and-backend-together)
13. [Environment Configuration](#13-environment-configuration)
14. [How to Access and Test the Application](#14-how-to-access-and-test-the-application)
15. [Frontend Architecture](#15-frontend-architecture)
16. [API Integration](#16-api-integration)
17. [Machine Learning Integration](#17-machine-learning-integration)
18. [Common Errors and Solutions](#18-common-errors-and-solutions)
19. [Development Guidelines and Git Workflow](#19-development-guidelines-and-git-workflow)
20. [Testing and Quality Assurance](#20-testing-and-quality-assurance)
21. [Future Enhancements](#21-future-enhancements)
22. [Contributing](#22-contributing)
23. [License](#23-license)

---

# 1. Project Overview

Cerevolt is a multi-role web application intended to create a connected environment for monitoring children's assessments, developmental progress, and learning activities.

The platform brings together five types of users:

- Administrator
- Consultant
- School
- Parent
- Child

Each role has a separate dashboard and role-specific navigation.

The application follows a modular architecture:

- **React.js:** Frontend and user interface.
- **Django:** Backend application.
- **Django REST Framework:** REST API development.
- **SQLite:** Current development database.
- **Machine Learning:** A separately developed component for assessment-data analysis.

The objective is to provide a centralised platform where authorised users can access relevant information and collaborate in supporting children's development.

---

# 2. Project Objectives

The main objectives of Cerevolt are:

- Develop a centralised platform for child assessment and progress monitoring.
- Provide separate dashboards for different categories of users.
- Facilitate collaboration between parents, schools, and consultants.
- Maintain structured assessment records and developmental histories.
- Integrate machine learning capabilities for assessment-data analysis.
- Present progress information through reports and visual indicators.
- Provide interactive learning activities for children.
- Implement authentication and role-based access control.

---

# 3. User Roles

Cerevolt supports five user roles.

| Role | Purpose |
|---|---|
| Admin | Manage users and oversee the platform. |
| Consultant | Manage assessments, content, and child progress. |
| School | Manage student assessments, progress, and behaviour monitoring. |
| Parent | Monitor child progress and access support features. |
| Child | Access learning activities, assessments, and rewards. |

Each user should access only the pages and information permitted for their role.

---

# 4. Key Features

## 4.1 Authentication and User Management

- User login.
- User registration and management through the administrative interface.
- Role-based navigation.
- Protected application routes.
- Session persistence after refreshing the browser.
- Logout functionality across all five dashboards.

## 4.2 Child Assessment Management

- Structured assessment interfaces.
- Assessment submission.
- Assessment history.
- Consultant-led and school-led assessments.
- Planned machine learning integration.

## 4.3 Progress Monitoring

- Child development tracking.
- Assessment history and comparisons.
- Progress reports.
- Performance colour-scale indicators.
- Behaviour monitoring.
- Daily progress records.

## 4.4 Interactive Learning Environment

Planned learning features include:

- Educational videos.
- Interactive assessments.
- Games and activities.
- Daily learning goals.
- General Knowledge flashcards.
- Reward system.
- Cartoon-based plant growth and progress representation.

## 4.5 Communication and Support

Planned features include:

- Parent feedback forms.
- Chatbot interaction.
- Doctor-support options.
- Communication and follow-up support.

---

# 5. Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React.js | User interface |
| JavaScript ES6+ | Application logic |
| HTML5 | Page structure |
| CSS3 | Styling and responsive layouts |
| React Router DOM | Navigation |
| Vite | Development server and build tool |
| npm | Package management |

## Backend

| Technology | Purpose |
|---|---|
| Python | Backend programming |
| Django | Backend framework |
| Django REST Framework | REST API development |
| SQLite | Development database |

## Machine Learning

The ML component is developed separately. Its final model, libraries, and integration interface will be documented when implementation is established.

---

# 6. System Architecture

The application follows a modular architecture.

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
          +---------+---------+
          |         |         |
          v         v         v
       DATABASE  AUTH      API SERVICES
                              |
                              v
                       ML COMPONENT
                        (Prediction)
                              |
                              v
                        RESULT STORAGE
                              |
                              v
                       ROLE-BASED REPORTS
```

### Architecture Components

**Frontend:** Handles user interaction, navigation, dashboards, forms, and visualisation.

**Backend:** Handles authentication, business logic, API operations, and database communication.

**Database:** Stores application information such as user records, child profiles, assessment records, and progress history.

**Machine Learning:** Processes structured assessment data and generates outputs for professional evaluation.

---

# 7. Project Structure

The repository contains separate frontend and backend folders.

```text
web-dev/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── children/
│   │   │   ├── common/
│   │   │   ├── consultant/
│   │   │   ├── parents/
│   │   │   └── school/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── App.css
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
│   ├── config/
│   ├── manage.py
│   └── requirements.txt
│
├── docs/
└── README.md
```

**Important:** This is a representative structure to help contributors understand the project. Some files and folders may change as development continues. The actual files in the repository are the source of truth.

---

# 8. Requirements Before Installation

Before running Cerevolt, install the following software on your computer.

You only need to install these tools once.

## 8.1 Install Visual Studio Code

Visual Studio Code (VS Code) is the application we use to open the project, view files, edit code, and run commands.

1. Open your browser.
2. Visit https://code.visualstudio.com/
3. Download the Windows version.
4. Open the downloaded installer.
5. Follow the installation instructions.
6. Open VS Code after installation.

You do not need to know how to write code just to complete the initial setup.

## 8.2 Install Git

Git is a tool used to download the project from GitHub and share changes with the team.

1. Visit https://git-scm.com/downloads
2. Download Git for Windows.
3. Run the installer.
4. Continue with the recommended installation options.
5. Finish the installation.

### Check whether Git is installed

1. Press the Windows key.
2. Search for `PowerShell`.
3. Open Windows PowerShell.
4. Copy and paste:

```powershell
git --version
```

5. Press Enter.

If Git is installed correctly, a version number will appear.

For example:

```text
git version 2.x.x
```

The exact version may be different.

## 8.3 Install Node.js and npm

Node.js is required to run the React frontend.

npm is the package manager installed alongside Node.js. It downloads and manages the packages needed by the frontend.

1. Visit https://nodejs.org/
2. Download the recommended LTS version.
3. Install it using the recommended options.
4. Restart PowerShell or VS Code if it was already open.

### Check the installation

Run:

```powershell
node --version
```

Then:

```powershell
npm --version
```

Both commands should display version numbers.

If either command is not recognised, Node.js may not have been installed correctly or may not be available in PATH.

## 8.4 Install Python

Python is required to run the Django backend.

1. Visit https://www.python.org/downloads/
2. Download a Python version compatible with the backend dependencies.
3. Run the installer.
4. On Windows, select **Add Python to PATH** if that option is available.
5. Complete the installation.

### Check the installation

Open a new PowerShell window and run:

```powershell
python --version
```

If that command does not work, try:

```powershell
py --version
```

A Python version number should appear.

**Important:** Do not install multiple Python versions randomly to fix an error. Check the backend dependencies and coordinate with the team if your installed version is incompatible.

## 8.5 Recommended VS Code Extensions

Open VS Code, click the Extensions icon on the left, and search for these extensions:

- Python
- Pylance
- Django
- ES7+ React/Redux/React-Native snippets
- Prettier

Click Install for the extensions you want.

These extensions make development easier, but they are not required just to open the application.

---

# 9. Download and Open the Project

Now that the required software is installed, we can download Cerevolt.

Follow the steps in order.

## Step 1: Open PowerShell

1. Press the Windows key.
2. Type `PowerShell`.
3. Open Windows PowerShell.

You will see a terminal window.

A terminal is simply a place where we type commands to tell the computer what to do.

You do not need to understand every technical detail. Copy the commands shown in this README carefully.

## Step 2: Choose where to save the project

For this example, we will save Cerevolt on the Desktop.

Run:

```powershell
cd Desktop
```

Press Enter.

The `cd` command means **change directory**. It moves the terminal into the folder you specify.

If you prefer another location, navigate to that folder instead.

## Step 3: Download Cerevolt from GitHub

Copy this command:

```powershell
git clone https://github.com/Cerevolt/web-dev.git
```

Press Enter.

What happens now?

- Git connects to the Cerevolt GitHub repository.
- It downloads the project files.
- It creates a folder named `web-dev` in your current location.

Wait until the download finishes.

Do not close the terminal while Git is downloading the project.

## Step 4: Enter the downloaded project folder

Run:

```powershell
cd web-dev
```

Press Enter.

You are now inside the main Cerevolt project folder.

## Step 5: Open the project in VS Code

Run:

```powershell
code .
```

Press Enter.

The dot (`.`) tells VS Code to open the current folder.

If `code .` does not work, open VS Code manually:

1. Open VS Code.
2. Click **File**.
3. Click **Open Folder**.
4. Find the `web-dev` folder you downloaded.
5. Select the folder.
6. Click **Select Folder**.

You should now see the project files in the Explorer panel on the left.

Look for these two folders:

```text
frontend
backend
```

Congratulations! You have downloaded and opened Cerevolt.

---

# 10. Frontend Setup and Execution

The frontend is the part of Cerevolt that you see in your browser.

It contains the login page, dashboards, navigation menus, buttons, forms, and other visual elements.

We will now prepare and start it.

## Step 1: Open a VS Code terminal

In VS Code:

1. Look at the top menu.
2. Click **Terminal**.
3. Click **New Terminal**.

A terminal will appear at the bottom of VS Code.

This is where we will enter frontend commands.

## Step 2: Enter the frontend folder

Copy:

```powershell
cd frontend
```

Press Enter.

Your terminal location should now end with:

```text
web-dev\frontend
```

Why are we doing this?

Because the React application is stored inside the `frontend` folder. We must enter that folder before running its commands.

## Step 3: Install the frontend packages

Copy:

```powershell
npm install
```

Press Enter.

What does this command do?

The React application depends on packages such as React, React Router, and Vite.

The names of these packages are already listed in the frontend's `package.json` and lock file.

`npm install` reads those files and downloads the required packages.

It creates a folder named:

```text
node_modules
```

This folder contains the downloaded packages.

**Important:**

- You need an internet connection.
- The installation may take a few minutes.
- Do not close the terminal while installation is running.
- You do not need to download React separately.
- You do not need to copy `node_modules` from another computer.
- Do not delete `package-lock.json`.

Wait until the command finishes and the terminal becomes ready for another command.

## Step 4: Start the frontend

Copy:

```powershell
npm run dev
```

Press Enter.

This starts the React development server using Vite.

You should see output similar to:

```text
VITE ready

Local: http://localhost:5173/
```

The exact message may differ slightly.

## Step 5: Open Cerevolt in your browser

Open Google Chrome or another browser.

Enter:

```text
http://localhost:5173/
```

Press Enter.

The Cerevolt frontend should appear.

**Important:** Keep the frontend terminal open while using the website.

If you close the terminal, the frontend server stops.

### How to stop the frontend

When you want to stop the frontend server:

1. Click inside the terminal running Vite.
2. Press `Ctrl + C`.
3. Wait for the server to stop.

You do not need to do this while you are using the application.

---

# 11. Backend Setup and Execution

The backend handles application operations such as authentication, database communication, and API requests.

The backend is developed using Python, Django, and Django REST Framework.

The frontend and backend are separate applications, so we need to start the backend separately.

## Step 1: Open a second VS Code terminal

**Do not close the terminal running the frontend.**

Instead:

1. Go to the VS Code top menu.
2. Click **Terminal**.
3. Click **New Terminal**.

You now have two terminals:

- Terminal 1: Frontend
- Terminal 2: Backend

Make sure you are using the new terminal for the backend instructions.

## Step 2: Enter the backend folder

Copy:

```powershell
cd backend
```

Press Enter.

Your terminal location should now end with:

```text
web-dev\backend
```

This is important because the Django project and its requirements file are inside the backend folder.

## Step 3: Create a Python virtual environment

Copy:

```powershell
python -m venv venv
```

Press Enter.

What is a virtual environment?

Think of it as a separate workspace for Python packages.

Cerevolt needs certain Python packages to work. Other projects on your computer may need different versions of those packages.

A virtual environment keeps Cerevolt's packages separate from your other Python projects.

The command creates a folder named:

```text
venv
```

inside the backend folder.

**You only need to create this environment once on your computer.**

If the `venv` folder already exists because you previously completed this setup, do not create another environment. Continue to the activation step.

## Step 4: Activate the virtual environment

Copy:

```powershell
.\venv\Scripts\Activate.ps1
```

Press Enter.

If activation succeeds, you should see `(venv)` at the beginning of the terminal line.

For example:

```text
(venv) PS C:\...\web-dev\backend>
```

This means the virtual environment is active.

**Important:** Activate the virtual environment whenever you open a new backend terminal before running backend Python commands.

### If PowerShell blocks activation

Sometimes Windows prevents PowerShell scripts from running.

If you see an execution-policy error, run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

This changes the execution policy only for the current PowerShell session.

Then try activating again:

```powershell
.\venv\Scripts\Activate.ps1
```

If the error continues, stop and share the complete error message with the team.

Do not change the computer's permanent execution policy.

## Step 5: Upgrade pip

Once the virtual environment is active, run:

```powershell
python -m pip install --upgrade pip
```

pip is the tool Python uses to install packages.

This command updates the package installer inside the active environment.

Wait for it to finish.

## Step 6: Install backend dependencies

Make sure the terminal is still inside:

```text
web-dev\backend
```

Also make sure `(venv)` is visible.

Now run:

```powershell
pip install -r requirements.txt
```

What does this command do?

The backend has a file named:

```text
requirements.txt
```

It contains the Python packages required by Cerevolt.

This command reads that file and installs the listed packages inside the virtual environment.

The installation may take a few minutes.

Wait until it finishes.

If installation fails, do not start installing random packages individually. Share the error with the team.

## Step 7: Prepare the local database

This step is important, so read it before running the command.

Cerevolt currently uses SQLite for local development.

The SQLite database file is not included in a fresh GitHub clone. Each developer therefore needs a local database on their own computer.

Django uses files called **migrations** to describe how database tables should be created or updated.

The project already contains migration files. We use those existing files to prepare the local database.

### Run the database setup command

Make sure:

- You are inside the `backend` folder.
- Your virtual environment is active.
- Backend dependencies have been installed.

Now run:

```powershell
python manage.py migrate
```

What does this command do?

1. Django checks the existing migration files.
2. It checks which database changes have not yet been applied.
3. It creates or updates the required database tables in the local SQLite database.
4. It records which migrations have been applied.

This prepares the database structure. It does not automatically create all application users or sample assessment records.

### Important database safety rules

- Do not run `makemigrations` just to start the project.
- Do not delete the `migrations` folders.
- Do not delete `db.sqlite3` to fix an error.
- Do not manually modify migration files.
- Do not copy another developer's database over your own.
- Do not reset the database or change database settings without consulting the backend developer.

If Django displays a migration conflict, missing migration, or database error, stop and share the complete message with the backend developer.

**The purpose of this step is to apply the migrations already supplied with the project, not to create new ones.**

## Step 8: Start the Django backend server

After the database setup completes successfully, run:

```powershell
python manage.py runserver
```

Press Enter.

You should see output similar to:

```text
Starting development server at http://127.0.0.1:8000/
```

The Django backend is now running.

Keep this terminal open.

To stop the backend server, click inside the terminal and press:

```text
Ctrl + C
```

---

# 12. Running Frontend and Backend Together

This is one of the most important things to understand.

Cerevolt has two separate servers.

| Application | Address | Purpose |
|---|---|---|
| React frontend | http://localhost:5173/ | Displays the website |
| Django backend | http://127.0.0.1:8000/ | Handles backend operations and APIs |

Both servers should be running for the complete application to work.

## What should your VS Code look like?

You should have two terminal sessions.

### Terminal 1 – Frontend

Location:

```text
web-dev\frontend
```

Command:

```powershell
npm run dev
```

### Terminal 2 – Backend

Location:

```text
web-dev\backend
```

First activate the virtual environment:

```powershell
.\venv\Scripts\Activate.ps1
```

Then start Django:

```powershell
python manage.py runserver
```

Now open the website:

```text
http://localhost:5173/
```

You can use Cerevolt while both servers are running.

## Remember

| What you want to do | What must be running? |
|---|---|
| View frontend-only pages | Frontend |
| Log in using backend authentication | Frontend + Backend |
| Fetch dashboard data from APIs | Frontend + Backend |
| Submit backend-connected forms | Frontend + Backend |
| Test complete application workflows | Frontend + Backend |

If you close the frontend terminal, the frontend stops.

If you close the backend terminal, the backend stops.

You do not need to repeat the installation process every time you want to work on Cerevolt.

Once the initial setup is complete, starting both servers is normally sufficient.

---

# 13. Environment Configuration

Environment variables allow an application to use configuration values that may differ between computers.

The frontend API service already has a default local backend address:

```text
http://127.0.0.1:8000
```

The frontend also supports an optional environment variable named:

```text
VITE_API_BASE_URL
```

**For normal local setup, do not create an additional `.env` file unless the existing configuration or a team instruction specifically requires it.**

If an environment file is required for a particular development setup:

1. Check `frontend/src/services/api.js`.
2. Confirm the expected variable name.
3. Confirm the expected URL format.
4. Ask the project maintainer if you are unsure.
5. Do not create duplicate or conflicting configuration values.

### Security rules

- Never put passwords or private credentials in frontend environment files.
- Never upload personal credentials to GitHub.
- Do not overwrite existing environment configuration.
- Do not share secret keys in public messages or screenshots.

If a backend feature requires an additional API key, follow the backend team's specific instructions. Such keys are not automatically required just to start the React frontend.

---

# 14. How to Access and Test the Application

After starting both servers, open:

```text
http://localhost:5173/
```

The login page should appear.

Cerevolt supports five roles.

| Role | Dashboard route |
|---|---|
| Admin | `/admin/dashboard` |
| Child | `/child/dashboard` |
| Parent | `/parent/dashboard` |
| Consultant | `/consultant/dashboard` |
| School | `/school/dashboard` |

These routes are application navigation paths. A user must log in with an account that has the corresponding role.

## How to test the application

Follow these steps:

1. Open the login page.
2. Enter the credentials supplied by the project administrator or development team.
3. Click Login.
4. Check whether the correct role dashboard appears.
5. Explore the available sidebar links.
6. Test the available buttons and forms.
7. Refresh the browser.
8. Check whether the login session persists.
9. Click Logout.
10. Check whether the application redirects to the login page.

Repeat the process for the other roles using their respective test accounts.

### Important: Test accounts and local databases

Every developer has their own local database.

Downloading the GitHub repository does not automatically give you another developer's database or login credentials.

If you cannot log in:

- First check that both servers are running.
- Confirm that you are using the correct credentials.
- Ask the backend developer or project administrator for an appropriate test account.
- Do not create random database records or change authentication code to bypass login.

The administrative registration interface may be used where the supported account-creation process is available.

---

# 15. Frontend Architecture

The React frontend follows a modular component-based architecture.

## Components

Reusable UI elements are maintained in the components directory.

Examples include:

- Sidebars.
- Navigation bars.
- Dashboard cards.
- Progress visualisations.
- Performance indicators.
- Logout button.

## Pages

Each role has its own collection of pages.

This separation keeps the application organised and makes role-specific development easier.

## Context

React Context API manages shared application state.

The authentication context manages:

- Authenticated user information.
- Authentication status.
- Login operations.
- Logout operations.
- Session-related state.

## Routes

The routing layer handles:

- Application navigation.
- Protected routes.
- Role-based route access.
- Redirecting unauthorised users.

## Services

The services directory contains code responsible for communicating with backend APIs.

This keeps API communication separate from UI components.

## Utilities

Common validation functions, constants, and helper logic are maintained independently.

---

# 16. API Integration

The frontend communicates with Django through REST APIs.

API service files are maintained under:

```text
frontend/src/services/
```

Typical service responsibilities include:

| Service | Responsibility |
|---|---|
| `api.js` | Central API configuration |
| `authService.js` | Authentication operations |
| `adminService.js` | Administrative operations |
| `childService.js` | Child profiles and assessments |
| `consultantService.js` | Consultant operations |
| `parentService.js` | Parent operations |
| `schoolService.js` | School operations |

The frontend integration should handle:

- Request and response processing.
- Authentication headers.
- API errors.
- Data validation.
- Loading states.
- Empty states.
- Success messages.

The final API endpoints and payload structures should follow the backend team's established API contracts.

**Important:** Do not invent API endpoints or change the request format just because a frontend feature is not working. Check the backend API contract with the responsible developer first.

---

# 17. Machine Learning Integration

The platform is designed to integrate with a separately developed machine learning component.

The intended workflow is:

1. A child completes an assessment.
2. The frontend submits the assessment data to Django.
3. Django validates and prepares the data.
4. The backend communicates with the ML service.
5. The ML component processes the supplied data.
6. Prediction results are returned to Django.
7. Django stores the results.
8. The frontend displays authorised assessment and progress information.

The exact input features, prediction format, model architecture, and integration mechanism depend on the final ML implementation.

### Clinical safety

ML predictions should support professional evaluation. They must not be presented as confirmed medical diagnoses without appropriate clinical assessment.

---

# 18. Common Errors and Solutions

If something goes wrong, do not panic.

Read the error message carefully and follow the relevant instructions below.

**General rule:** If the suggested solution does not work, stop and share the complete error message with the team. Do not repeatedly try unrelated commands.

## Problem 1: `git is not recognized`

**Reason:** Git may not be installed correctly or may not be available in PATH.

**Solution:**

1. Install Git from https://git-scm.com/downloads
2. Finish the installation.
3. Close PowerShell.
4. Open a new PowerShell window.
5. Run:

```powershell
git --version
```

## Problem 2: `node is not recognized` or `npm is not recognized`

**Reason:** Node.js may not be installed correctly or may not be available in PATH.

**Solution:**

1. Install Node.js from https://nodejs.org/
2. Restart VS Code or PowerShell.
3. Run:

```powershell
node --version
npm --version
```

If the problem continues, share the error message.

## Problem 3: `npm install` fails

**Possible reasons:**

- No internet connection.
- Incorrect Node.js version.
- Package installation interrupted.

**Solution:**

First confirm that the terminal is inside:

```text
web-dev\frontend
```

Then try the installation again:

```powershell
npm install
```

Do not delete `package-lock.json` or change dependency versions to fix an installation error without consulting the team.

## Problem 4: The website shows a blank white screen

**Possible reasons:**

- JavaScript error.
- Missing dependency.
- Incorrect import path.
- React component error.

**Solution:**

1. Check the frontend terminal for errors.
2. Open the website in your browser.
3. Press `F12`.
4. Select the **Console** tab.
5. Look for red error messages.
6. Copy the error message.
7. Share it with the frontend developer.

Do not delete project files or reinstall everything immediately.

## Problem 5: `python is not recognized`

**Reason:** Python may not be installed correctly or may not be available in PATH.

**Solution:**

Try:

```powershell
py --version
```

If this works, Python is installed through the Windows Python launcher.

Use the appropriate Python command consistently when creating and activating your virtual environment.

If neither command works, check the Python installation.

## Problem 6: `No module named django`

**Reason:** Backend dependencies may not have been installed in the active virtual environment.

**Solution:**

Make sure you are inside:

```text
web-dev\backend
```

Activate the virtual environment:

```powershell
.\venv\Scripts\Activate.ps1
```

Make sure `(venv)` appears at the beginning of the terminal line.

Then run:

```powershell
pip install -r requirements.txt
```

## Problem 7: PowerShell blocks virtual environment activation

**Reason:** Windows may prevent PowerShell scripts from running.

**Solution:**

Run:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

Then activate again:

```powershell
.\venv\Scripts\Activate.ps1
```

This affects only the current PowerShell session.

## Problem 8: `Port 5173 is already in use`

**Reason:** Another Vite server may already be using the port.

**Solution:**

1. Check whether another terminal is already running the frontend.
2. If it is, use the existing server.
3. Otherwise, Vite may automatically select another available port.
4. Open the exact URL displayed in the terminal.

Do not terminate random processes.

## Problem 9: `Port 8000 is already in use`

**Reason:** Another Django server may already be running.

**Solution:**

1. Check your other terminal windows.
2. If the existing server belongs to Cerevolt, use it.
3. If you cannot identify the process, ask the backend developer before stopping anything.

## Problem 10: Login is not working

**Possible reasons:**

- Backend server is not running.
- Incorrect credentials.
- API configuration is incorrect.
- User does not exist in the local database.
- User has an incorrect role.
- Authentication API error.

**Solution:**

1. Confirm that the frontend is running.
2. Confirm that the backend is running.
3. Check that you are using the correct credentials.
4. Check the browser Console and Network tabs.
5. Ask the backend developer to verify the account and API response.

Do not modify authentication code just to bypass a login problem.

## Problem 11: Database or migration error

**Reason:** The local database may not have the required migrations or may be inconsistent with the backend code.

**Solution:**

Do not immediately run additional database commands.

1. Copy the complete error message.
2. Share it with the backend developer.
3. Wait for instructions before changing database files.

**Never delete `db.sqlite3`, delete migration folders, run `makemigrations`, or reset the database to fix an error without approval from the backend developer.**

## Problem 12: Frontend cannot communicate with backend

**Possible reasons:**

- Django is not running.
- Incorrect API base URL.
- CORS configuration issue.
- Incorrect API endpoint.
- Authentication token issue.

**Solution:**

1. Confirm that both servers are running.
2. Check the API configuration.
3. Open the browser's Developer Tools.
4. Select the Network tab.
5. Identify the failed request.
6. Share the request URL and error response with the relevant developer.

Do not randomly change the API URL or backend CORS settings.

## Problem 13: `ModuleNotFoundError` for another Python package

**Reason:** A required backend package may not have been installed or the virtual environment may not be active.

**Solution:**

1. Check that you are inside the backend folder.
2. Check that `(venv)` appears in the terminal.
3. Run the requirements installation command again:

```powershell
pip install -r requirements.txt
```

If the error continues, share it with the backend developer. Do not install random package versions.

---

# 19. Development Guidelines and Git Workflow

This section is especially important because Cerevolt is a collaborative project.

Multiple developers work on the same repository. Therefore, everyone must follow the same Git workflow.

## 19.1 Understand the Git workflow

The main branch is protected.

**No contributor should push changes directly to `main`.**

All contributors must work on their own feature branches and submit Pull Requests.

The workflow is:

```text
             GITHUB REPOSITORY
                     |
                     v
                  MAIN
                     |
                     v
              CREATE BRANCH
                     |
                     v
              MAKE YOUR CHANGES
                     |
                     v
               TEST LOCALLY
                     |
                     v
              PUSH YOUR BRANCH
                     |
                     v
              CREATE PULL REQUEST
                     |
                     v
             MAINTAINER REVIEWS
                     |
                     v
               APPROVAL
                     |
                     v
              MERGE INTO MAIN
```

The project maintainer reviews the changes and decides whether to approve and merge them.

## 19.2 First-time setup: Clone the repository

If you have not downloaded Cerevolt before, follow Section 9.

After cloning, open the project folder in VS Code.

## 19.3 Create your own feature branch

A branch is a separate working area for your changes.

It allows you to work without directly changing the shared main branch.

Open a terminal in the main project folder:

```text
web-dev
```

Make sure you are not inside `frontend` or `backend`.

First, switch to main:

```powershell
git switch main
```

Download the latest approved changes:

```powershell
git pull origin main
```

Now create your own feature branch:

```powershell
git switch -c feature/your-feature-name
```

For example:

```powershell
git switch -c feature/parent-dashboard
```

Replace `your-feature-name` with a short description of your work.

You should now be working on your own branch.

### Check your current branch

Run:

```powershell
git branch
```

The branch with an asterisk (`*`) is your current branch.

For example:

```text
* feature/parent-dashboard
  main
```

This means you are working on `feature/parent-dashboard`.

## 19.4 Make your changes

Now you can work on the assigned part of the project.

Before editing:

- Understand the existing files.
- Check whether another developer is working on the same files.
- Avoid changing unrelated modules.
- Do not overwrite another contributor's work.
- Ask the responsible developer if you are unsure about a shared file.

Save your changes in VS Code.

## 19.5 Test your changes

Before submitting your work:

1. Start the frontend and backend if your feature requires both.
2. Open the application.
3. Test the feature you implemented.
4. Check for errors.
5. Confirm that unrelated pages still work.

Do not submit untested changes if you can test them locally.

## 19.6 Check which files you changed

Open a terminal in the project root and run:

```powershell
git status
```

This command shows the files you have modified, added, or deleted.

Read the output carefully.

Only stage files related to your work.

## 19.7 Stage your changes

Staging means selecting which changed files you want to include in your next commit.

For example:

```powershell
git add frontend/src/components/ParentSidebar.jsx
```

Replace the example path with the actual file you changed.

If you changed multiple files, stage each intended file.

**Avoid `git add .` unless you have checked every changed and untracked file.** It may include files you did not intend to submit.

## 19.8 Commit your changes

A commit is a saved record of your work in Git.

Run:

```powershell
git commit -m "Describe your changes"
```

Example:

```powershell
git commit -m "Add parent dashboard navigation"
```

Use a short, meaningful message.

## 19.9 Push your feature branch to GitHub

After committing, upload your branch:

```powershell
git push -u origin feature/your-feature-name
```

For example:

```powershell
git push -u origin feature/parent-dashboard
```

This pushes your feature branch, not the protected main branch.

## 19.10 Create a Pull Request

After pushing:

1. Open https://github.com/Cerevolt/web-dev
2. Sign in to your GitHub account.
3. Open the repository.
4. Look for the message suggesting that your recently pushed branch can create a Pull Request.
5. Click **Compare & pull request** if it appears.

If it does not appear:

1. Click the **Pull requests** tab.
2. Click **New pull request**.
3. Select `main` as the **base** branch.
4. Select your feature branch as the **compare** branch.
5. Review the changes displayed by GitHub.
6. Add a clear title.
7. Explain what you changed in the description.
8. Click **Create pull request**.

Example PR title:

```text
Add parent dashboard navigation
```

Example PR description:

```text
Changes made:
- Updated parent dashboard navigation.
- Added the required sidebar links.
- Tested the navigation locally.

Ready for review.
```

## 19.11 Wait for review and approval

After creating the Pull Request:

- The project maintainer will review your changes.
- The maintainer may approve the PR.
- The maintainer may request changes.
- If changes are requested, make them on the same feature branch and push another commit.
- GitHub will update the existing PR automatically.

**Do not merge your own Pull Request into `main`.**

The project maintainer is responsible for reviewing and merging approved changes.

## 19.12 Start your next task

After your PR has been merged:

1. Return to your project terminal.
2. Switch to main:

```powershell
git switch main
```

3. Download the latest approved code:

```powershell
git pull origin main
```

4. Create a new branch for your next task:

```powershell
git switch -c feature/next-task-name
```

This keeps each task separate.

### Important Git rules

| Rule | Instruction |
|---|---|
| Main branch | Protected; do not push directly. |
| Development | Use your own feature branch. |
| Before starting a task | Pull the latest approved main branch. |
| Before submitting | Test your changes. |
| Staging | Stage only intended files. |
| Submission | Create a Pull Request targeting main. |
| Approval | Wait for maintainer review. |
| Merging | Only the authorised maintainer should merge. |

### Never commit these files

- Passwords.
- Secret keys.
- Personal credentials.
- Virtual environment folders.
- `node_modules`.
- Temporary files.
- Unnecessary database backups.
- Local-only configuration files containing secrets.

---

# 20. Testing and Quality Assurance

Testing should be performed throughout development.

## Frontend Testing

- Component rendering.
- Form validation.
- Navigation and routing.
- Role-based access behaviour.
- Responsive layouts.
- API integration.
- Loading and error states.
- Session persistence.
- Logout behaviour.

## Backend Testing

- Authentication endpoints.
- Database operations.
- Assessment submission.
- Permission enforcement.
- API validation.
- ML service communication.

## Integration Testing

The complete application should be tested to verify communication between React, Django, the database, and the ML component.

## Frontend Production Build

To check whether the frontend can be built successfully, open a terminal inside the frontend folder:

```powershell
cd frontend
```

Then run:

```powershell
npm run build
```

If the build succeeds, Vite generates the production files inside:

```text
frontend/dist/
```

This is a build-output folder. Do not edit its generated files manually.

## Preview the production build

Run:

```powershell
npm run preview
```

Vite starts a local preview server. Open the exact address shown in the terminal.

To stop the preview server, press `Ctrl + C`.


---

# 21. Future Enhancements

Planned improvements include:

- Complete assessment workflows.
- ML-powered assessment result visualisation.
- Interactive progress charts.
- Child learning and reward interfaces.
- Parent and consultant communication features.
- Responsive mobile and tablet layouts.
- Comprehensive automated testing.
- Production deployment and monitoring.

---

# 22. Contributing

Cerevolt is a collaborative development project.

All contributors are encouraged to:

1. Read this README before starting.
2. Install the required software.
3. Follow the setup instructions in the correct order.
4. Run the frontend and backend successfully.
5. Understand the existing project structure before editing files.
6. Coordinate with the relevant team members.
7. Work on separate feature branches.
8. Test changes locally.
9. Submit a Pull Request targeting `main`.
10. Wait for maintainer review and approval.
11. Keep the README updated when project setup or architecture changes.

### If you are unable to run the project

Please do not immediately change project files or run random commands.

Instead, share:

- The step number you reached.
- The exact command you entered.
- The complete error message.
- A screenshot of the terminal, if possible.

This makes it easier for the team to identify the actual problem.

### If you are unsure before modifying something

Ask the relevant developer before changing:

- Authentication logic.
- Database configuration.
- Migration files.
- Shared API services.
- Protected routes.
- Another contributor's work.

The goal is to keep the shared project stable while everyone works on their assigned tasks.

---

# 24. License

The licensing terms for this project are to be determined by the project owners.

Until an official license is added, all rights remain with the respective copyright holders.

---

# Project Information

**Project Name:** Cerevolt

**Repository:** https://github.com/Cerevolt/web-dev

**Frontend:** React.js

**Backend:** Django and Django REST Framework

**Database:** SQLite (current development configuration)

**Project Category:** Full-Stack Development | Machine Learning Integration | Child Assessment and Progress Monitoring

**Development Status:** In Progress

---

*Built collaboratively with a focus on modular development, maintainability, accessibility, and responsible technology integration.*
