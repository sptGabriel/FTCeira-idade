import React from 'react';
import { Navigate } from 'react-router-dom';

import UserLayout from 'src/layouts/UserLayout';
import MainLayout from 'src/layouts/MainLayout';

import TesteView from 'src/views/teste/TesteView';

import DashboardView from 'src/views/dashboard/DashboardView';

import LoginView from 'src/views/auth/LoginView';
import ResetView from 'src/views/auth/ResetView';
import RecoverView from 'src/views/auth/RecoverView';
import RegisterView from 'src/views/auth/RegisterView';
import AccountView from 'src/views/account/AccountView';

import HomeView from 'src/views/home/HomeView';

import EnrollmentListView from 'src/views/enrollment/EnrollmentListView';
import EnrollmentEdit from 'src/views/enrollment/EnrollmentEdit';

import CoordinatorListView from 'src/views/coordinator/CoordinatorListView';
import CoordinatorEdit from 'src/views/coordinator/CoordinatorEdit';

import TeacherListView from 'src/views/teacher/TeacherListView';
import TeacherEdit from 'src/views/teacher/TeacherEdit';

import StudentListView from 'src/views/student/StudentListView';
import StudentEdit from 'src/views/student/StudentEdit';
import StudentPerformanceView from 'src/views/student/StudentPerformanceView';
import StudentAssessmentApplicationView from 'src/views/student/StudentAssessmentApplicationView';
import StudentAssessmentApplication from 'src/views/student/StudentAssessmentApplication';
import StudentAssessmentCorrection from 'src/views/student/StudentAssessmentCorrection';

import AssessmentView from 'src/views/assessment/AssessmentView';
import AssessmentListView from 'src/views/assessment/AssessmentListView';
import AssessmentRegister from 'src/views/assessment/AssessmentRegister';
import AssessmentEdit from 'src/views/assessment/AssessmentEdit';

import ClassRoomGridView from 'src/views/classroom/ClassRoomGridView';
import ClassRoomRegister from 'src/views/classroom/ClassRoomRegister';
import ClassRoomEdit from 'src/views/classroom/ClassRoomEdit';
import ClassRoomPerformanceView from 'src/views/classroom/ClassRoomPerformanceView';

import CourseGridView from 'src/views/course/CourseGridView';
import CourseView from 'src/views/course/CourseView';
import CourseEdit from 'src/views/course/CourseEdit';
import CourseRegister from 'src/views/course/CourseRegister';
import CoursePerformanceView from 'src/views/course/CoursePerformanceView';

import NotFoundView from 'src/views/errors/NotFoundView';

const routes = [
  {
    path: 'app',
    element: <UserLayout />,
    children: [
      { path: 'teste', element: <TesteView /> },

      { path: 'home', element: <HomeView /> },
      { path: 'dashboard', element: <DashboardView /> },

      { path: 'coordinators', element: <CoordinatorListView /> },
      { path: 'coordinator-edit', element: <CoordinatorEdit /> },

      { path: 'teachers', element: <TeacherListView /> },
      { path: 'teacher-edit', element: <TeacherEdit /> },

      { path: 'students', element: <StudentListView /> },
      { path: 'student-edit', element: <StudentEdit /> },
      { path: 'student-performance', element: <StudentPerformanceView /> },
      { path: 'student-assessment-applications', element: <StudentAssessmentApplicationView /> },
      { path: 'student-assessment-application', element: <StudentAssessmentApplication /> },
      { path: 'student-assessment-correction', element: <StudentAssessmentCorrection /> },

      { path: 'enrollments', element: <EnrollmentListView /> },
      { path: 'enrollment-edit', element: <EnrollmentEdit /> },

      { path: 'courses', element: <CourseGridView /> },
      { path: 'course-view', element: <CourseView /> },
      { path: 'course-edit', element: <CourseEdit /> },
      { path: 'course-register', element: <CourseRegister /> },
      { path: 'course-performance', element: <CoursePerformanceView /> },

      { path: 'assessment', element: <AssessmentView /> },
      { path: 'assessments', element: <AssessmentListView /> },
      { path: 'assessment-edit', element: <AssessmentEdit /> },
      { path: 'assessment-register', element: <AssessmentRegister /> },

      { path: 'classrooms', element: <ClassRoomGridView /> },
      { path: 'classroom-edit', element: <ClassRoomEdit /> },
      { path: 'classroom-register', element: <ClassRoomRegister /> },
      { path: 'classroom-performance', element: <ClassRoomPerformanceView /> },

      { path: 'account', element: <AccountView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'reset', element: <ResetView /> },
      { path: 'recover', element: <RecoverView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/login" /> }, //  <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },

];

export default routes;
