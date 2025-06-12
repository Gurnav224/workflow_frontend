# Workflow

Workflow is a project management application that helps teams and individuals easily manage projects, break them down into tasks, assign responsibilities, and track progress visually.

## Demo Link

[Live Demo](https://workflow-frontend-kappa.vercel.app/)  

---
## Login

> **Guest** <br>
> username:  `johndoe@gmail.com` <br>
> password: `pass@123`


## Demo Video
Watch a walkthrough (5–7 minutes) of all major features of this app:
[Loom Video Link](https://youtu.be/Hr-5BFpETAo?si=68sfzTkMI0tSlhaW)

## Features

- **User Authentication**: Sign up and login functionality with secure token-based authentication.
- **Project Management**: Create, view, and manage multiple projects.
- **Task Management**: Add, assign, and track tasks within projects. Tasks can be filtered and sorted by status, priority, owners, tags, and due dates.
- **Team Management**: Create teams, add members, and assign teams to projects and tasks.
- **Reporting & Analytics**: Visual reports and charts for completed tasks, pending work, and team performance.
- **Responsive UI**: Clean, modern interface built with React, Tailwind CSS, and Chart.js.

## Tech Stack

- **Frontend**: React, Redux Toolkit, React Router, Tailwind CSS, Chart.js, Axios
- **State Management**: Redux Toolkit
- **Data Visualization**: Chart.js, react-chartjs-2
- **API Communication**: Axios

## Getting Started

### Prerequisites

- Node.js (v18 or above recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Gurnav224/workflow_frontend.git
   cd workflow_frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the `frontend` directory and add your API URL:

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

- `src/`
  - `components/` - Shared UI components (Sidebar, Header, etc.)
  - `features/` - Redux slices and feature modules (auth, projects, tasks, team)
  - `pages/` - Top-level pages (Dashboard, Reports, etc.)
  - `app/` - Redux store configuration
  - `index.css` - Tailwind CSS setup

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Customization

- Update the API URL in `.env` as needed.
- Tailwind CSS is used for styling; customize `tailwind.config.js` as required.


---

**Note:** This is the frontend part of the Workflow application. Make sure to set up the backend API for full functionality.

[backend](https://github.com/Gurnav224/workflow_backend)


## Contact
For bugs or feature requests, please reach out to chaudharyg856@gmail.com