  export const memories = [
  {
    id: 1,
    title: 'Our First Pic',
    img: '/photos/photo1.jpg',
    caption: [
      "This is the first pic we took together — thanks for loving this thenga manda!",
      "You were my first crush, my first love… honestly, my everything back then.",
      "My feelings were pure and a little crazy, but they were real. My school days felt colourful just because you were in them.",
      "I even used to sit in the adjacent desk just so I could see your pretty eyes and your smile a little longer.",
      "Then the day came when I had to leave that place… but it felt like I was leaving you forever, and it broke me.",
      "Still, somewhere inside, my hopes never died. And somehow… they led me back to you.",
      "And now, here we are — together."],
    joke: "I wish I could relive this moment."
  },
    { id: 2, title: 'Hangouts during college days', img: '/photos/photo2.jpeg', 
      caption: [
        "After three years, seeing you again felt unreal.",
        "I was nervous — not because you changed, but because you still mattered the same.",
        "At that moment I decided… I won’t miss you this time.",
        "You were so cute I forgot how to act normal around you.",
        "I wanted to meet you every day, yet life kept giving us only a few chances.",
        "Then covid came, and I feared distance would take you away again.",
        "But even distance couldn’t — because we kept choosing each other in every conversation."
      ],
      joke: 'Without you, I would have lived… but I wouldn’t have felt alive the way I do now.' },
    { id: 3, title: 'The first time I held your hand', img: '/photos/holding-hands.mp4',
      caption: [
        "The first time I held your hand at Pizza Hut…",
        "I don’t think you realized how big that moment was for me.",
        "I was trying to act normal, but inside my heart was racing.",
        "For a few seconds I forgot the food, the noise, and everyone around us.",
        "The whole place just faded away — it was only you and me.",
        "Your hand felt so warm and calm that I didn’t want to let go.",
      ], 
      joke:  "That tiny moment quietly told me… I was exactly where I wanted to be." },
    { id: 4, title: 'Surprise Picnic2', img: '/photos/photo3.svg', 
      caption: 'Blanket, cupcakes, and the worst playlist I made', 
      joke: 'You pretended to love my playlist — bless you' },
    { id: 5, title: 'Surprise Picnic3', img: '/photos/photo3.svg', 
      caption: 'Blanket, cupcakes, and the worst playlist I made', 
      joke: 'You pretended to love my playlist — bless you' }
  ]

  export const questions = [
    { id: 'first-meet', question: 'Where did you see me for the first time?', options: ['My home', 'Your home', 'School Library', 'Playground'], correctIndex: 2 },
    { id: 'saw-her-first', question: 'Which month was it when i proposed you for the very first time?', options: ['Jan', 'March', 'Feb', 'October'], correctIndex: 2 },
    { id: 'food', question: 'Which scooty did we take to nandi hills?', options: ['Activa', 'Ntorq', 'Dio', 'Jupiter'], correctIndex: 3 },
    { id: 'movie', question: 'What was the first movie we watched together?', options: ['Vaathi', 'Avatar 2', 'Ponniyin selvan', 'Vidamuyarchi'], correctIndex: 2 },
    { id: 'nickname', question: 'When was the very last time you saw me when I was leaving after 10th?', options: ['In my home', '7th camp footpath', 'Your balcony', 'In tuition'], correctIndex: 1 }
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
