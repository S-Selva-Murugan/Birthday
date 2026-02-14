  export const memories = [
    { id: 1, title: 'Our First Pic', img: '/photos/photo1.jpg', caption: "This is the first pic we took together — thanks for loving this coconut-head boy!", joke: "I wish I could relive this moment 🤭" },
    { id: 2, title: 'Hangouts during college days', img: '/photos/photo2.jpeg', caption: 'Very rarely we used to go out and then earth hit with covid quarantine', joke: 'Without you, I would have lived… but I wouldn’t have felt alive the way I do now.' },
    { id: 3, title: 'Surprise Picnic', img: '/photos/photo3.svg', caption: 'Blanket, cupcakes, and the worst playlist I made', joke: 'You pretended to love my playlist — bless you' },
    { id: 4, title: 'Surprise Picnic2', img: '/photos/photo3.svg', caption: 'Blanket, cupcakes, and the worst playlist I made', joke: 'You pretended to love my playlist — bless you' },
    { id: 5, title: 'Surprise Picnic3', img: '/photos/photo3.svg', caption: 'Blanket, cupcakes, and the worst playlist I made', joke: 'You pretended to love my playlist — bless you' }
  ]

  export const questions = [
    { id: 'first-meet', question: 'Where did you see me for the first time?', options: ['My home', 'Your home', 'School Library', 'Playground'], correctIndex: 2 },
    { id: 'saw-her-first', question: 'Where I saw her first?', options: ['school', 'my home entrance', 'tution', 'your home'], correctIndex: 1 },
    { id: 'food', question: 'My favourite food?', options: ['biryani', 'dosa', 'shawarma', 'pizza'], correctIndex: 0 },
    { id: 'movie', question: 'What was the first movie we watched together?', options: ['Vaathi', 'Avatar 2', 'Ponniyin selvan', 'Vidamuyarchi'], correctIndex: 2 },
    { id: 'nickname', question: 'What nickname I call you?', options: ['kutty', 'papa', 'chellam', 'all'], correctIndex: 3 }
  ]

export const sections = [
  { type: 'intro' },

  { type: 'question', qIndex: 0 },
  { type: 'memory', mIndex: 0 },

  { type: 'question', qIndex: 1 },
  { type: 'memory', mIndex: 1 },

  { type: 'question', qIndex: 2 },
  { type: 'memory', mIndex: 2 },

  { type: 'question', qIndex: 3 },
  { type: 'memory', mIndex: 3 },

  { type: 'question', qIndex: 4 },
  { type: 'memory', mIndex: 4 },

  { type: 'result' },

  { type: 'paintings', images: ['/photos/photo3.jpeg','/photos/photo4.jpeg','/photos/photo5.jpeg'] },

  { type: 'suggestions' },
  { type: 'promise' },

  { type: 'memory', mIndex: 2 }, // callback memory

  { type: 'final' }
]
