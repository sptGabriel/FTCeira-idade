import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    description: 'Description description description description description description description description description description description description description ',
    initial_date: '2021-01-01',
    end_date: '2021-01-11',
    note: 10,
    questions: [{
      id: uuid(),
      questioning: 'Pergunta alguma coisa sert ert se sdfgsdfgs dfgs dfgs dfhgsdfhsfdh sdfhsdfhgsdf hsdrsrhys rtysj srtys tsrh stjsrtjs thsgre jyuddj drtjt ?',
      image: '/static/images/blank.png',
      type: 'objectiva',
      alternatives: [
        '(a) AAA 11111',
        '(b) AAA 22222222222',
        '(c) AAA 33333333',
        '(d) AAA 444444444',
        '(e) AAA 555555555',
        '(f) AAA 6666666666',
        '(g) AAA 77777777777',
        '(h) AAA 88888888888',
        '(i) AAA 9999999'
      ],
    },
    {
      id: uuid(),
      questioning: 'Pergunta alguma coisa?',
      image: '',
      type: 'objetiva',
      alternatives: [
        '(a) BBB 11111',
        '(b) BBB 222222222',
        '(c) BBB 3333333',
      ],
    },
    {
      id: uuid(),
      questioning: 'Pergunta alguma coisa arega tjsry rta jtydhser ?',
      image: '',
      type: 'subjetiva',
      alternatives: [],
    },
    {
      id: uuid(),
      questioning: 'Pergunta alguma coisa areger aerg ergerh erher?',
      image: '/static/images/blank.png',
      type: 'subjetiva',
      alternatives: [],
    },
    {
      id: uuid(),
      questioning: 'Pergunta alguma coisa dhsdr sdrtys dry ssry?',
      image: '/static/images/blank.png',
      type: 'objetiva',
      alternatives: [
        '(a) CCC 111111',
        '(b) CCC 222222',
        '(c) CCC 3333',
      ],
    },
    {
      id: uuid(),
      questioning: 'Pergunta alguma coisa aregaerga rg ergarg aergr e?',
      image: '',
      type: 'objetiva',
      alternatives: [
        '(a) DDD 111111',
        '(b) DDD 22222222',
      ],
    },
    {
      id: uuid(),
      questioning: 'Pergunta alguma coisa dgsadrga sssssss argaer ?',
      image: '',
      type: 'objetiva',
      alternatives: [
        '(a) EEE 111111111',
        '(b) EEE 22222222',
        '(c) EEE 3333333333333',
        '(d) EEE 4444444444',
        '(e) EEE 55555555555',
        '(f) EEE 66666666666',
        '(g) EEE 7777777',
      ],
    },
    {
      id: uuid(),
      questioning: 'Pergunta alguma coisa asfser waer awertg awergame oifg aoen adfa sdfa sdfa ghasdg adsgasd gasdga  goa ern?',
      image: '',
      type: 'subjetiva',
      alternatives: [],
    }
    ]
  }
];
