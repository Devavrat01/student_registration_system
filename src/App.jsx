

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import CourseTypes from './components/CourseTypes';
import Courses from './components/Courses';
import CourseOfferings from './components/CourseOfferings';
import StudentRegistrations from './components/StudentRegistrations';

function App() {
  const [courseTypes, setCourseTypes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseOfferings, setCourseOfferings] = useState([]);
  const [studentRegistrations, setStudentRegistrations] = useState([]);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedCourseTypes = localStorage.getItem('courseTypes');
    const savedCourses = localStorage.getItem('courses');
    const savedCourseOfferings = localStorage.getItem('courseOfferings');
    const savedStudentRegistrations = localStorage.getItem('studentRegistrations');

    if (savedCourseTypes) setCourseTypes(JSON.parse(savedCourseTypes));
    if (savedCourses) setCourses(JSON.parse(savedCourses));
    if (savedCourseOfferings) setCourseOfferings(JSON.parse(savedCourseOfferings));
    if (savedStudentRegistrations) setStudentRegistrations(JSON.parse(savedStudentRegistrations));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('courseTypes', JSON.stringify(courseTypes));
  }, [courseTypes]);

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('courseOfferings', JSON.stringify(courseOfferings));
  }, [courseOfferings]);

  useEffect(() => {
    localStorage.setItem('studentRegistrations', JSON.stringify(studentRegistrations));
  }, [studentRegistrations]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <Dashboard 
                  courseTypes={courseTypes}
                  courses={courses}
                  courseOfferings={courseOfferings}
                  studentRegistrations={studentRegistrations}
                />
              } 
            />
            <Route 
              path="/course-types" 
              element={
                <CourseTypes 
                  courseTypes={courseTypes}
                  setCourseTypes={setCourseTypes}
                />
              } 
            />
            <Route 
              path="/courses" 
              element={
                <Courses 
                  courses={courses}
                  setCourses={setCourses}
                />
              } 
            />
            <Route 
              path="/course-offerings" 
              element={
                <CourseOfferings 
                  courseTypes={courseTypes}
                  courses={courses}
                  courseOfferings={courseOfferings}
                  setCourseOfferings={setCourseOfferings}
                />
              } 
            />
            <Route 
              path="/student-registrations" 
              element={
                <StudentRegistrations 
                  courseOfferings={courseOfferings}
                  studentRegistrations={studentRegistrations}
                  setStudentRegistrations={setStudentRegistrations}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
