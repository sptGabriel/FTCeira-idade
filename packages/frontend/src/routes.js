import React from 'react';
import { Navigate } from 'react-router-dom';

import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';

import DashboardView from 'src/views/dashboard/DashboardView';

import LoginView from 'src/views/auth/LoginView';
import ResetView from 'src/views/auth/ResetView';
import RecoverView from 'src/views/auth/RecoverView';
import RegisterView from 'src/views/auth/RegisterView';
import AccountView from 'src/views/account/AccountView';

// import HomeView from 'src/views/home/HomeView';

import EnrollmentListView from 'src/views/enrollment/EnrollmentListView';
// import EnrollmentRegister from 'src/views/enrollment/EnrollmentRegister';
import EnrollmentEdit from 'src/views/enrollment/EnrollmentEdit';

import TeacherListView from 'src/views/teacher/TeacherListView';
import TeacherRegister from 'src/views/teacher/TeacherRegister';
import TeacherEdit from 'src/views/teacher/TeacherEdit';

import StudentListView from 'src/views/student/StudentListView';
import StudentEdit from 'src/views/student/StudentEdit';
import StudentPerformanceView from 'src/views/student/StudentPerformanceView';
// import StudentDelete from 'src/views/student/StudentDelete';

import AssessmentListView from 'src/views/assessment/AssessmentListView';
import AssessmentRegister from 'src/views/assessment/AssessmentRegister';

import QuestionListView from 'src/views/question/QuestionListView';
import QuestionRegister from 'src/views/question/QuestionRegister';
import QuestionEdit from 'src/views/question/QuestionEdit';
// import QuestionDelete from 'src/views/question/QuestionDelete';

import ClassRoomListView from 'src/views/classroom/ClassRoomListView';
import ClassRoomPerformanceView from 'src/views/classroom/ClassRoomPerformanceView';

import CourseListView from 'src/views/course/CourseListView';
import CourseEdit from 'src/views/course/CourseEdit';
import CourseRegister from 'src/views/course/CourseRegister';
import CoursePerformanceView from 'src/views/course/CoursePerformanceView';
// import CourseDelete from 'src/views/course/CourseDelete';

import NotFoundView from 'src/views/errors/NotFoundView';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'dashboard', element: <DashboardView /> },

      { path: 'teachers', element: <TeacherListView /> },
      { path: 'teacher-edit', element: <TeacherEdit /> },
      { path: 'teacher-register', element: <TeacherRegister /> },
      // { path: 'teacher-delete', element: <TeacherDelete /> },

      { path: 'students', element: <StudentListView /> },
      { path: 'student-edit', element: <StudentEdit /> },
      //  { path: 'student-delete', element: <StudentDelete /> },
      { path: 'student-performance', element: <StudentPerformanceView /> },

      { path: 'enrollments', element: <EnrollmentListView /> },
      { path: 'enrollment-edit', element: <EnrollmentEdit /> },
      // { path: 'enrollment-register', element: <EnrollmentRegister /> },
      //  { path: 'enrollment-delete', element: <EnrollmentDelete /> },

      { path: 'courses', element: <CourseListView /> },
      { path: 'course-edit', element: <CourseEdit /> },
      { path: 'course-register', element: <CourseRegister /> },
      { path: 'course-performance', element: <CoursePerformanceView /> },
      // { path: 'course-delete', element: <CourseDelete /> },

      { path: 'assessments', element: <AssessmentListView /> },
      // { path: 'assessment-edit', element: <AssessmentEdit /> },
      { path: 'assessment-register', element: <AssessmentRegister /> },
      // { path: 'assessment-delete', element: <AssessmentDelete /> },

      { path: 'questions', element: <QuestionListView /> },
      { path: 'question-edit', element: <QuestionEdit /> },
      { path: 'question-register', element: <QuestionRegister /> },
      // { path: 'question-delete', element: <QuestionDelete /> },

      { path: 'classrooms', element: <ClassRoomListView /> },
      // { path: 'classroom-edit', element: <ClassRoomEdit /> },
      // { path: 'classroom-register', element: <ClassRoomRegister /> },
      // { path: 'classroom-delete', element: <ClassRoomDelete /> },
      { path: 'classroom-performance', element: <ClassRoomPerformanceView /> },

      { path: 'account', element: <AccountView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // { path: 'home', element: <HomeView /> },
      { path: 'login', element: <LoginView /> },
      { path: 'reset', element: <ResetView /> },
      { path: 'recover', element: <RecoverView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/login" /> }, //  <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
