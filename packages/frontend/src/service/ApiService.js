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

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(error);
});

class ApiService {
  auth = async (data) => {
    try {
      return await api.post('/signin', data);
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      return error;
    }
  }

  me = async () => {
    try {
      return await api.get('/users/me');
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      return error;
    }
  }

  // ------------------------------ registers teacher ans students

  addUser = async (user) => {
    try {
      return await api.post('/signup', user);
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      return error;
    }
  }

  // -------------------------------------- users

  fetchUsers = async (type) => {
    try {
      return await api.get(`/users/${type}`); // ??????
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      return error;
    }
  }

  fetchUser = async (user) => {
    try {
      return await api.get(`/users/${user}`); // ???????
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      return error;
    }
  }

editUser = async (user) => {
  try {
    return await api.post('/edit-profile', user); // ??????
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    return error;
  }
}

// deleteUser = async (user) => {
//   try {
//     return await api.put(`/users/${user}`);// ?????????????
//   } catch (error) {
//     if (error.response) {
//       return error.response;
//     }
//     return error;
//   }
// }

editAvatarUser = async (avatar) => {
  try {
    return await api.post('/change-avatar', avatar, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'pt-BR,pt-br;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${avatar._boundary}`,
      }
    });
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    return error;
  }
}

// ----------------------------------------------------- students applications

fetchAssessmentsApplication = async () => {
  try {
    return await api.get('/lista.de.avaliacoes.nao.respondidas');// ?????????????
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    return error;
  }
}

addAssessmentApplication = async (answers) => {
  try {
    return await api.post('/respostas.avaliacao.um.aluno', answers);// ?????????????
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    return error;
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
    if (error.response) {
      return error.response;
    }
    return error;
  }
}

// ----------------------------------- assessments to correction

fetchAssessmentsCorrection = async () => {
  try {
    return await api.get('/lista.de.avaliacoes.respondidas.para.correcao');// ?????????????
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    return error;
  }
}

fetchAssessmentCorrection = async (id) => {
  try {
    return await api.get('/avaliacao.especifica.para.correcao', id);// ?????????????
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    return error;
  }
}

fetchAnswersAssessmentCorrection = async (id) => {
  try {
    return await api.get('/respostas.avaliacao.especifica.para.correcao', id);// ?????????????
  } catch (error) {
    if (error.response) {
      return error.response;
    }
    return error;
  }
}

// ------------------------------------courses

  addCourse = async (course) => {
    try {
      return await api.post('/courses/add', course);
      // {
      //   'Content-Type': 'multipart/form-data',
      // });
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      return error;
    }
  }

  fetchCourses = async () => {
    try {
      return await api.get('/courses');// ?????????????
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      return error;
    }
  }

  fetchCourseById = async (id) => {
    try {
      return await api.get(`/course/${id}`); // ???????
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      return error;
    }
  }

  editCourse = async (course) => {
    try {
      return await api.put('/courses/', course);// ?????????????);
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      return error;
    }
  }

  deleteCourse = async (id) => {
    try {
      return await api.put('/courses/'`${id}`);// ?????????????
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      return error;
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
    if (error.response) {
      return error.response;
    }
    return error;
  }
}
// ------------------------- classrooms

  addClassRoom = async (classroom) => {
    try {
      return await api.post('/courses/classes/add', classroom);// ?????????????
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      return error;
    }
  }

  fetchClassRooms = async () => {
    try {
      return await api.get('/classrooms');// ?????????????
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      return error;
    }
  }

  fetchClassRoomById = async (id) => {
    try {
      return await api.get(`/course/class/${id}`); // ???????
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      return error;
    }
  }

  editClassRoom = async (classroom) => {
    try {
      return await api.put('/courses/class/', classroom);// ?????????????
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      return error;
    }
  }

  deleteClassRoom = async (id) => {
    try {
      return await api.put('/courses/classes/'`${id}`);// ?????????????
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      return error;
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
      if (error.response) {
        return error.response;
      }
      return error;
    }
  }

  // ------------------------- aasessments and applications

  addAssessment = async (assessment) => {
    try {
      return await api.post('/questionnaires/add', assessment);// ?????????????
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      return error;
    }
  }

  addApplicationAnswers = async (questionnaireId, answers) => {
    try {
      return await api.post(`/questionnaires/${questionnaireId}`, answers);// ?????????????
    } catch (error) {
      if (error.response) {
        return error.response;
      }
      return error;
    }
  }
}

export default new ApiService();
