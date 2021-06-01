import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    admission: '20-04-2021',
    course: 'Curso de redes sociais II',
    classroom: 'CRS00122',
    status: 'pendente'
  },
  {
    id: uuid(),
    admission: '01-04-2021',
    course: 'Curso de redes sociais I',
    classroom: 'CRS00121',
    status: 'ativa'
  },
  {
    id: uuid(),
    admission: '01-01-2021',
    course: 'Curso de redes sociais I',
    classroom: 'CRS00121',
    status: 'concluído'
  }
];
