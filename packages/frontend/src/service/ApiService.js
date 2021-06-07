import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  // headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('userToken');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

api.interceptors.response.use((response) => {
  if (response.status === 204) {
    console.log('Successfully');
  }
  return response;
}, (error) => {
  return Promise.reject(error);
});

class ApiService {
  auth = async (data) => {
    try {
      return await api.post('/signin', data);
    } catch (error) {
      return error.response.data;
    }
  }

  me = async () => {
    try {
      return await api.get('/users/me');
    } catch (error) {
      return error.response.data;
    }
  }

  // ------------------------------ registers teacher ans students

  addUser = async (user) => {
    try {
      return await api.post('/signup', user);
    } catch (error) {
      return error.response.data;
    }
  }

  // -------------------------------------- users

  fetchUsers = async (type) => {
    try {
      return await api.get(`/users/${type}`); // ??????
    } catch (error) {
      return error.response.data;
    }
  }

  fetchUser = async (user) => {
    try {
      return await api.get(`/users/${user}`); // ???????
    } catch (error) {
      return error.response.data;
    }
  }

editUser = async (user) => {
  try {
    return await api.post('/edit-profile', user);
  } catch (error) {
    return error.response.data;
  }
}

// deleteUser = async (user) => {
//   try {
//     return await api.put(`/users/${user}`);// ?????????????
//   } catch (error) {
//     return error.response;
//   }
// }

editAvatarUser = async (avatar) => {
  try {
    return await api.post('/change-avatar', avatar, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
  } catch (error) {
    return error.response;
  }
}

// ----------------------------------------------------- students applications

fetchAssessmentsApplication = async () => {
  try {
    return await api.get('/lista.de.avaliacoes.nao.respondidas');// ?????????????
  } catch (error) {
    return error.response.data;
  }
}

addAssessmentApplication = async (answers) => {
  try {
    return await api.post('/respostas.avaliacao.um.aluno', answers);// ?????????????
  } catch (error) {
    return error.response.data;
  }
}

fetchStudentsPerformance = async (data) => {
  let endpoint = '';
  switch (data.type) {
    case 'course':
      endpoint = '??????';
      break;
    case 'classroom':
      endpoint = '??????';
      break;
    case 'student':
      endpoint = '??????';
      break;
    default:
      break;
  }

  try {
    return await api.get(`/${endpoint}`);// ?????????????
  } catch (error) {
    return error.response.data;
  }
}

// ----------------------------------- assessments to correction

fetchAssessmentsCorrection = async () => {
  try {
    return await api.get('/lista.de.avaliacoes.respondidas.para.correcao');// ?????????????
  } catch (error) {
    return error.response.data;
  }
}

fetchAssessmentCorrection = async (id) => {
  try {
    return await api.get('/avaliacao.especifica.para.correcao', id);// ?????????????
  } catch (error) {
    return error.response.data;
  }
}

fetchAnswersAssessmentCorrection = async (id) => {
  try {
    return await api.get('/respostas.avaliacao.especifica.para.correcao', id);// ?????????????
  } catch (error) {
    return error.response.data;
  }
}

// ------------------------------------courses

  addCourse = async (course) => {
    try {
      return await api.post('/courses/add', course,
        {
          'Content-Type': 'multipart/form-data',
        });
    } catch (error) {
      return error.response.data;
    }
  }

  fetchCoursesAll = async () => {
    try {
      return await api.get('/courses/all');
    } catch (error) {
      return error.response.data;
    }
  }

  fetchCourses = async () => {
    try {
      return await api.get('/courses');
    } catch (error) {
      return error.response.data;
    }
  }

  fetchCourseById = async (id) => {
    try {
      return await api.get(`/course/${id}`); // ???????
    } catch (error) {
      return error.response.data;
    }
  }

  editCourse = async (course) => {
    try {
      return await api.put('/courses/', course);// ?????????????);
    } catch (error) {
      return error.response.data;
    }
  }

  deleteCourse = async (id) => {
    try {
      return await api.put('/courses/'`${id}`);// ?????????????
    } catch (error) {
      return error.response.data;
    }
  }

fetchCoursePerformance = async (data) => {
  let endpoint = '';
  switch (data.type) {
    case 'classroom':
      endpoint = '??????';
      break;
    case 'student':
      endpoint = '??????';
      break;
    default:
      break;
  }

  try {
    return await api.get(`/${endpoint}`);// ?????????????
  } catch (error) {
    return error.response.data;
  }
}

// ------------------------- classrooms

  addClassRoom = async (classroom) => {
    try {
      return await api.post('/courses/classes/add', classroom);// ?????????????
    } catch (error) {
      return error.response.data;
    }
  }

  fetchClassRooms = async () => {
    try {
      return await api.get('/courses/classes');// ?????????????
    } catch (error) {
      return error.response.data;
    }
  }

  fetchClassRoomById = async (id) => {
    try {
      return await api.get(`/course/class/${id}`); // ???????
    } catch (error) {
      return error.response.data;
    }
  }

  editClassRoom = async (classroom) => {
    try {
      return await api.put('/courses/class/', classroom);// ?????????????
    } catch (error) {
      return error.response.data;
    }
  }

  deleteClassRoom = async (id) => {
    try {
      return await api.put('/courses/classes/'`${id}`);// ?????????????
    } catch (error) {
      return error.response.data;
    }
  }

  fetchClassRoomPerformance = async (data) => {
    let endpoint = '';
    switch (data.type) {
      case 'course':
        endpoint = '??????';
        break;
      case 'student':
        endpoint = '??????';
        break;
      default:
        break;
    }

    try {
      return await api.get(`/${endpoint}`);// ?????????????
    } catch (error) {
      return error.response.data;
    }
  }

  // ------------------------- aasessments and applications

  fetchAssessments = async () => {
    try {
      return await api.get('/questionnaires');
    } catch (error) {
      return error.response.data;
    }
  }

  addAssessment = async (assessment) => {
    try {
      return await api.post('/questionnaires/add', assessment);
    } catch (error) {
      return error.response.data;
    }
  }

  addApplicationAnswers = async (questionnaireId, answers) => {
    try {
      return await api.post(`/questionnaires/${questionnaireId}`, answers);
    } catch (error) {
      return error.response.data;
    }
  }
}

export default new ApiService();
