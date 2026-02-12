import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Balloons from '../components/Balloons'
import MemorySection from '../components/MemorySection'
import FinalWish from '../components/FinalWish'
// Hearts3D removed per request
import Confetti from '../components/Confetti'
import LoveMeter from '../components/LoveMeter'
import ProposalSection from '../components/Proposal'
import LandingIntro from '../components/LandingInto'

export default function Home() {
  const router = useRouter()
  const name = (router.query.name || 'Namitha')
  const [index, setIndex] = useState(0)
  const [answer, setAnswer] = useState(null)
  const [answeredCorrect, setAnsweredCorrect] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [answer2, setAnswer2] = useState(null)
  const [answeredCorrect2, setAnsweredCorrect2] = useState(false)
  const [feedback2, setFeedback2] = useState('')
  const [paintingsColored, setPaintingsColored] = useState([])
  const [suggestions, setSuggestions] = useState(['', '', '', '', ''])
  const [suggestionsSaved, setSuggestionsSaved] = useState(false)
  const containerRef = useRef(null)

  const memories = [
    {
      id: 1,
      title: 'Our First Pic',
      img: '/photos/photo1.jpg',
      caption: "This is the first pic we took together — thanks for loving this coconut-head boy!",
      joke: "I wish I could relive this moment 🤭",
    },
    {
      id: 2,
      title: 'Hangouts during college days',
      img: '/photos/photo2.jpeg',
      caption: 'Very rarely we used to go out and then earth hit with covid quarantine',
      joke: 'Without you, I would have lived… but I wouldn’t have felt alive the way I do now.',
    },
    {
      id: 3,
      title: 'Surprise Picnic',
      img: '/photos/photo3.svg',
      caption: 'Blanket, cupcakes, and the worst playlist I made',
      joke: 'You pretended to love my playlist — bless you',
    },
  ]

  // sections: hero, memory1, question1, memory2, memory3, final
  const sections = [
    { type: 'intro' },
    { type: 'hero' },
    { type: 'memory', data: memories[0] },
    {
      type: 'question',
      data: {
        id: 'q1',
        question: 'Where I saw her first?',
        options: ['school', 'my home entrance', 'tution', 'your home'],
        correctIndex: 1, // option 2
      },
    },
    { type: 'memory', data: memories[1] },
    { type: 'paintings', data: { images: ['/photos/photo3.jpeg', '/photos/photo4.jpeg', '/photos/photo5.jpeg'] } },
    { type: 'suggestions' },
    { type: 'promise' },
    { type: 'memory', data: memories[2] },
    { type: 'ask' },
    { type: 'hesitant' },
    { type: 'nervous' },
    { type: 'proposal' }, 
    { type: 'final' },
  ]

const heroIndex = sections.findIndex(s => s.type === 'hero')
const questionIndex = sections.findIndex(s => s.type === 'question')


  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index])

  // swipe navigation disabled — we do not auto-advance pages by timeout anymore

function next() {
  setFeedback('')

  setIndex(i => {
    // block leaving hero until first MCQ answered
    if (i === heroIndex && !answeredCorrect) {
      setFeedback('Please answer the question correctly to continue.')
      return i
    }

    // block leaving second question page
    if (i === questionIndex && !answeredCorrect2) {
      setFeedback2('Please answer this question to continue.')
      return i
    }

    return Math.min(i + 1, sections.length - 1)
  })
}

function resetSuggestions() {
  const empty = ['', '', '', '', '']
  setSuggestions(empty)
  setSuggestionsSaved(false)
  try {
    window.localStorage.removeItem('namitha_suggestions')
  } catch (err) {}
}

  // Load saved suggestions from localStorage when entering the suggestions section
  useEffect(() => {
    if (sections[index] && sections[index].type === 'suggestions') {
      try {
        const raw = window.localStorage.getItem('namitha_suggestions')
        if (raw) {
          const parsed = JSON.parse(raw)
          if (Array.isArray(parsed) && parsed.length === 5) {
            setSuggestions(parsed)
            setSuggestionsSaved(true)
          } else {
            setSuggestions(['', '', '', '', ''])
            setSuggestionsSaved(false)
          }
        } else {
          setSuggestions(['', '', '', '', ''])
          setSuggestionsSaved(false)
        }
      } catch (err) {
        setSuggestions(['', '', '', '', ''])
        setSuggestionsSaved(false)
      }
    }
  }, [index])

  function saveSuggestions() {
    try {
      window.localStorage.setItem('namitha_suggestions', JSON.stringify(suggestions))
      setSuggestionsSaved(true)
    } catch (err) {
      // ignore storage errors
    }
  }

  function editSuggestions() {
    setSuggestionsSaved(false)
  }
  function prev() {
    setIndex(i => Math.max(i - 1, 0))
  }

function goTo(i) {
  if (index === heroIndex && i > heroIndex && !answeredCorrect) {
    setFeedback('Please answer the question correctly to continue.')
    return
  }

  if (index === questionIndex && i > questionIndex && !answeredCorrect2) {
    setFeedback2('Please answer this question to continue.')
    return
  }

  setIndex(i)
}

  // swipe navigation disabled — use the on-screen buttons (prev/next) or dots

  useEffect(() => {
    // initialize painting states when entering the paintings section
    if (sections[index] && sections[index].type === 'paintings') {
      const imgs = sections[index].data?.images || []
      setPaintingsColored(new Array(imgs.length).fill(false))
    }
  }, [index])

function handlePaintClick(i) {
  setPaintingsColored(prev => {
    const updated = prev && prev.length ? prev.slice() : []

    if (updated.length === 0 && sections[index]?.type === 'paintings') {
      for (let k = 0; k < sections[index].data.images.length; k++) updated[k] = false
    }

    if (updated[i]) return updated
    updated[i] = true

    const allColored = updated.every(Boolean)

    if (allColored) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1600)
      // ❌ removed next()
    }

    return updated
  })
}


  return (
    <>
      <Head>
        <title> For my birthday girl </title>
        <meta name="description" content={`A gentle time-travel of memories for ${name}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="page-root story-root">
  <Header name={name} />

        <div
          className="story-container"
          ref={containerRef}
        >
          <div className="story-card" key={index}>
            {sections[index].type === 'hero' && (
              <div className="hero-inner">
                {/* <h2>Hey {name}, this is not just a website…</h2> */}
                {/* <p className="lead">lets play the game and travel through our memories.</p> */}
                <p className="hint">Lets start with a quiz.</p>

                <div className="mcq">
                  <p className="question">Where did you see me for the first time?</p>
                  {['my home', 'your home', 'library', 'playground'].map((opt, i) => {
                    const isSelected = answer === i
                    const correctIndex = 2 // 'library' is the correct answer (3rd option)
                    const isCorrect = answeredCorrect && answer === correctIndex
                    const btnClass = `option ${isSelected ? 'selected' : ''} ${isCorrect && isSelected ? 'correct' : ''}`
                    return (
                      <button
                        key={i}
                        className={btnClass}
                        onClick={() => {
                          setAnswer(i)
                          if (i === correctIndex) {
                            setAnsweredCorrect(true)
                            setFeedback('Correct! Taking you to the next memory...')
                            // show confetti and hearts pulse briefly
                            setShowConfetti(true)
                            setTimeout(() => setShowConfetti(false), 2200)
                            // do not auto-advance; require user to use pagination
                          } else {
                            setAnsweredCorrect(false)
                            setFeedback('Not quite — try again!')
                          }
                        }}
                      >
                        <span className="opt-num">{i + 1}.</span> {opt}
                      </button>
                    )
                  })}

                  {feedback && <p className="mcq-feedback">{feedback}</p>}
                </div>
              </div>
            )}

            {sections[index].type === 'memory' && (
              <>
                {sections[index].data.id === 3 ? (
                  <LoveMeter />
                ) : (
                  <MemorySection
                    title={sections[index].data.title}
                    img={sections[index].data.img}
                    caption={sections[index].data.caption}
                    joke={sections[index].data.joke}
                  />
                )}
              </>
            )}

            {sections[index].type === 'intro' && (
              <LandingIntro
                name={name}
                onStart={() => setIndex(heroIndex)}
              />
            )}

            {sections[index].type === 'paintings' && (
              <div className="paintings-card">
                <h3>Bring these paintings to life by clicking on them.</h3>
                <p className="hint">This is how you add color to my life.</p>
                <div className="paintings-grid">
                  {sections[index].data.images.map((src, i) => (
                    <div
                      key={i}
                      className={`painting ${paintingsColored[i] ? 'colored' : ''}`}
                      onClick={() => handlePaintClick(i)}
                    >
                      <img src={src} alt={`painting ${i + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sections[index].type === 'suggestions' && (
              <div className="suggestions-card">
                <h3>One quick thing — tell me what I should improve</h3>
                <p className="hint">Give me 5 short suggestions to make you happier. You can save and come back to edit.</p>
                <div className="suggestions-list">
                  {suggestions.map((val, i) => (
                    <div key={i} className="suggestion-row">
                      <label>Suggestion {i + 1}</label>
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => {
                          const copy = suggestions.slice()
                          copy[i] = e.target.value
                          setSuggestions(copy)
                        }}
                        disabled={suggestionsSaved}
                        placeholder="e.g. plan a surprise weekend"
                      />
                    </div>
                  ))}
                </div>

                <div className="suggestions-actions">
                  {!suggestionsSaved ? (
                    <button className="reveal-btn" onClick={saveSuggestions}>
                      Save
                    </button>
                  ) : (
                    <>
                      <button className="reveal-btn" onClick={editSuggestions}>
                        Edit
                      </button>

                      <button
                        className="reveal-btn"
                        style={{ background: "#999" }}
                        onClick={resetSuggestions}
                      >
                        Reset
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {sections[index].type === 'proposal' && (
              <ProposalSection
                img="/photos/photo6.png"
                successGif="/photos/photo6.gif"
                onYes={() => next()}
              />
            )}

            {sections[index].type === 'final' && <FinalWish name={name} />}
            {sections[index].type === 'promise' && (
              <div className="promise-card">
                <div className="promise-text">
                  <p>I know I made our relationship harder than it needed to be… but I’m here to fix, not repeat.</p>
                  <p>I’ll do whatever it takes to see you smile — not perfectly, but sincerely, every day.</p>
                  <p>You’ve always been my queen, even on the days I didn’t act like it enough.</p>
                  <p>For the times I was stubborn, confusing, or just a headache… I’m really sorry.</p>
                  <p>I’m still learning, and I promise I’ll keep learning you — what hurts you, what comforts you, what matters to you.</p>
                  <p>I may not always understand immediately, but I will never stop trying to understand.</p>
                  <p>I don’t want to win arguments, I want to keep us.</p>
                  <p>I’ll grow, adjust, and become better — not because you asked, but because you deserve that effort.</p>
                  <p>Even on difficult days, I choose you… calmly, loudly, and always.</p>
                  <p>I’m not promising perfection, I’m promising intention.</p>
                  <p>I won’t take your patience or your love for granted again.</p>
                  <p>You are not just part of my life — you are the way I want to live it.</p>
                  <p>So if I ever fall short again, remind me… I’ll come back to you every time.</p>
                </div>
              </div>
            )}
            {sections[index].type === 'question' && (
              <div className="question-card">
                <h3 className="question">{sections[index].data.question}</h3>
                <div className="mcq">
                  {sections[index].data.options.map((opt, i) => {
                    const isSelected = answer2 === i
                    const correctIndex2 = sections[index].data.correctIndex
                    const isCorrect = answeredCorrect2 && answer2 === correctIndex2
                    const btnClass = `option ${isSelected ? 'selected' : ''} ${isCorrect && isSelected ? 'correct' : ''}`
                    return (
                      <button
                        key={i}
                        className={btnClass}
                        onClick={() => {
                          setAnswer2(i)
                          if (i === correctIndex2) {
                            setAnsweredCorrect2(true)
                            setFeedback2('Nice! Advancing to the next memory...')
                            setShowConfetti(true)
                              setTimeout(() => setShowConfetti(false), 2000)
                              // do not auto-advance; require user to use pagination
                          } else {
                            setAnsweredCorrect2(false)
                            setFeedback2('Nope — try again!')
                          }
                        }}
                      >
                        <span className="opt-num">{i + 1}.</span> {opt}
                      </button>
                    )
                  })}
                </div>

                {feedback2 && <p className="mcq-feedback">{feedback2}</p>}
              </div>
            )}
              {sections[index].type === 'ask' && (
                <div className="ask-card">
                  <div className="ask-text">
                    <p>Everything you saw here is from the past.</p>
                    <p>I want to ask you something I mean with all my heart.</p>
                  </div>
                </div>
              )}
              {sections[index].type === 'hesitant' && (
                <div className="hesitant-card">
                  <div className="hesitant-text">
                    <p>Okay… wait… give me a second.</p>
                    <p>I actually practiced this in my head many times.</p>
                    <p>It sounded smooth there.</p>
                    <p>Right now… not so much.</p>
                  </div>
                </div>
              )}

              {sections[index].type === 'nervous' && (
                <div className="nervous-card">
                  <div className="nervous-emoji">😬</div>
                </div>
              )}
          </div>

        {sections[index].type !== 'intro' && (
          <div className="story-controls">
            <button className="nav prev" onClick={prev} aria-label="Previous">◀</button>
            <button className="nav next" onClick={next} aria-label="Next">▶</button>
          </div>
        )}
        </div>

  <Confetti show={showConfetti} />
        <Balloons />
      </div>
    </>
  )
}
