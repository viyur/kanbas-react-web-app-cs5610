
# Kanbas React Web App

A role-based learning platform inspired by Canvas, developed with React. This project features a responsive design and interactive user interfaces tailored for different roles (Faculty, Student, and Admin).

## Live Demo
Check out the live demo hosted on Netlify:  
[Kanbas Live Demo](https://a4--kanbas5610.netlify.app/#/Kanbas/Account/Signin)

## Backend Repository
The backend code for this project is available on GitHub:  
[Kanbas Node Server](https://github.com/viyur/kanbas-node-server-app)

## Setup Instructions
To run the project locally and enable all functionalities, follow these steps:

### Prerequisites
1. Clone the backend repository and set it up by following the instructions in the backend's `README.md`.
2. **MongoDB Setup**:  
   - Install MongoDB and ensure the service is running.  
   - Create a new database (e.g., `kanbasDB`) with the following collections:  
     - `assignments`, `courses`, `enrollments`, `modules`, `questions`, `quizAttempts`, `quizzes`, `users`.  
   - These collections can be empty initially, as new courses, modules, and quizzes can be added by registering as a `Faculty` user.  
3. Use the `quiz` branch in both the frontend and backend repositories for full feature support.

### Environment Variables
Create a `.env.local` file in the root directory of this project and add the following variable:
```env
REACT_APP_REMOTE_SERVER=http://localhost:4000
```

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/viyur/kanbas-react-web-app-cs5610.git
   cd kanbas-react-web-app-cs5610
   ```
2. Switch to the `quiz` branch:
   ```bash
   git checkout quiz
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

### Backend Setup
Follow the backend setup instructions provided in its repository. Ensure the backend is running at `http://localhost:4000`.

## Features and Page Interactions
This project uses **React Bootstrap** for responsive and visually appealing designs. The user interface adjusts seamlessly across devices.

### Role-based Functionalities
- **General Features**:  
  - Users can register as new accounts, log in, and update their profile information.
  
- **Faculty**:  
  - Add, edit, or delete courses.
  - Manage modules and assignments within courses.
  - Create and update quizzes, including questions and scoring.

- **Students**:  
  - Enroll or unenroll in courses.
  - View modules, assignments, and quizzes for enrolled courses.
  - Take quizzes and track their scores.

- **Admin**:  
  - Access and manage all user information.
  - Oversee courses and assignments across the platform.

## Responsive Design
The entire platform is built with a mobile-first approach, ensuring usability on devices of all screen sizes. The design leverages **React Bootstrap** components to maintain a clean and professional appearance.

## Contributing
Contributions are welcome! If you encounter any issues or have suggestions, feel free to submit an issue or a pull request.

---

Enjoy exploring the **Kanbas React Web App**!
