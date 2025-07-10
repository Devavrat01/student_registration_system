# Student Registration System

A comprehensive web application for managing student registrations, course types, courses, and course offerings. Built with React and modern web technologies.

## Features

### Course Types Management
- ✅ Create new course types (e.g., Individual, Group, Special)
- ✅ List existing course types
- ✅ Update the names of existing course types
- ✅ Delete existing course types

### Courses Management
- ✅ Create new courses (e.g., Hindi, English, Urdu)
- ✅ List existing courses
- ✅ Update the names of existing courses
- ✅ Delete existing courses

### Course Offerings Management
- ✅ Create new course offerings by associating a course with a course type
- ✅ List all available course offerings
- ✅ Update the association between a course and course type
- ✅ Delete existing course offerings

### Student Registrations
- ✅ Allow students to register for available course offerings
- ✅ List all registered students for a specific course offering
- ✅ Filter to show available course offerings based on selected course type
- ✅ Edit and delete student registrations

### Technical Features
- ✅ Intuitive and user-friendly interface
- ✅ Data validation and error handling
- ✅ Responsive design for all devices
- ✅ Local storage for data persistence
- ✅ Modern UI with smooth animations

## Getting Started

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd student_registration_system
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Usage Guide

### 1. Dashboard
The dashboard provides an overview of all data in the system:
- Statistics cards showing counts of course types, courses, offerings, and registrations
- Recent items from each section
- Quick navigation to all features

### 2. Course Types
- Navigate to "Course Types" to manage different types of courses
- Add new types like "Individual", "Group", or "Special"
- Edit existing types by clicking the edit icon
- Delete types by clicking the delete icon

### 3. Courses
- Navigate to "Courses" to manage individual courses
- Add new courses like "Hindi", "English", or "Urdu"
- Edit and delete courses as needed

### 4. Course Offerings
- Navigate to "Course Offerings" to create combinations of course types and courses
- Select a course type and course to create an offering
- Examples: "Individual - English", "Group - Hindi"
- Edit or delete offerings as needed

### 5. Student Registrations
- Navigate to "Student Registrations" to manage student enrollments
- Register new students by providing:
  - Student name
  - Course offering selection
  - Email address
  - Phone number (optional)
- Filter offerings by course type
- View all registrations for each offering
- Edit or delete registrations

## Data Persistence

The application uses browser localStorage to persist data. This means:
- Data is saved locally in your browser
- Data persists between browser sessions
- No server or database setup required
- Data is specific to each browser/device

## Technology Stack

- **Frontend Framework**: React 19
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Styling**: Custom CSS with modern design principles
- **State Management**: React Hooks (useState, useEffect)

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Navigation component
│   ├── Dashboard.jsx           # Dashboard overview
│   ├── CourseTypes.jsx         # Course types management
│   ├── Courses.jsx             # Courses management
│   ├── CourseOfferings.jsx     # Course offerings management
│   └── StudentRegistrations.jsx # Student registrations
├── App.jsx                     # Main application component
├── App.css                     # Application styles
├── main.jsx                    # Application entry point
└── index.css                   # Global styles
```

## Features in Detail

### Data Validation
- Required field validation
- Email format validation
- Duplicate entry prevention
- Confirmation dialogs for deletions

### User Experience
- Responsive design for mobile, tablet, and desktop
- Smooth animations and transitions
- Intuitive navigation
- Clear error messages
- Loading states and feedback

### Data Management
- Real-time updates across all components
- Automatic data persistence
- Efficient state management
- Optimized re-renders

## Deployment

### GitHub Pages
1. Create a GitHub repository
2. Push your code to the repository
3. Enable GitHub Pages in repository settings
4. Set the source to the main branch

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

### Vercel
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the React app
3. Deploy with default settings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

If you encounter any issues or have questions:
1. Check the documentation above
2. Review the code comments
3. Create an issue in the repository

## Future Enhancements

Potential improvements for future versions:
- Backend API integration
- Database storage
- User authentication
- Advanced reporting
- Email notifications
- Bulk operations
- Data export/import
- Advanced filtering and search
# student_registration_system
