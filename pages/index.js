// Updated index.js with score system (no mandatory answering)

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Balloons from '../components/Balloons'
import MemorySection from '../components/MemorySection'
import FinalWish from '../components/FinalWish'
import Confetti from '../components/Confetti'
import LoveMeter from '../components/LoveMeter'
import ProposalSection from '../components/Proposal'
import LandingIntro from '../components/LandingInto'

export default function Home() {
  const router = useRouter()
  const name = (router.query.name || 'Namitha')
  const [index, setIndex] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [answers, setAnswers] = useState({})
  const [paintingsColored, setPaintingsColored] = useState([])
  const [suggestions, setSuggestions] = useState(['', '', '', '', ''])
  const [suggestionsSaved, setSuggestionsSaved] = useState(false)
  const containerRef = useRef(null)

  const memories = [
    { id: 1, title: 'Our First Pic', img: '/photos/photo1.jpg', caption: "This is the first pic we took together — thanks for loving this coconut-head boy!", joke: "I wish I could relive this moment 🤭" },
    { id: 2, title: 'Hangouts during college days', img: '/photos/photo2.jpeg', caption: 'Very rarely we used to go out and then earth hit with covid quarantine', joke: 'Without you, I would have lived… but I wouldn’t have felt alive the way I do now.' },
    { id: 3, title: 'Surprise Picnic', img: '/photos/photo3.svg', caption: 'Blanket, cupcakes, and the worst playlist I made', joke: 'You pretended to love my playlist — bless you' },
    { id: 4, title: 'Surprise Picnic2', img: '/photos/photo3.svg', caption: 'Blanket, cupcakes, and the worst playlist I made', joke: 'You pretended to love my playlist — bless you' },
    { id: 5, title: 'Surprise Picnic3', img: '/photos/photo3.svg', caption: 'Blanket, cupcakes, and the worst playlist I made', joke: 'You pretended to love my playlist — bless you' }
  ]

  const questions = [
    { id: 'first-meet', question: 'Where did you see me for the first time?', options: ['my home', 'your home', 'library', 'playground'], correctIndex: 2 },
    { id: 'saw-her-first', question: 'Where I saw her first?', options: ['school', 'my home entrance', 'tution', 'your home'], correctIndex: 1 },
    { id: 'food', question: 'My favourite food?', options: ['biryani', 'dosa', 'shawarma', 'pizza'], correctIndex: 0 },
    { id: 'movie', question: 'First movie we watched together?', options: ['Leo', 'Master', 'Love Today', '96'], correctIndex: 2 },
    { id: 'nickname', question: 'What nickname I call you?', options: ['kutty', 'papa', 'chellam', 'all'], correctIndex: 3 }
  ]

  const sections = [
    { type: 'intro' },
    { type: 'question', qIndex: 0 },
    { type: 'memory', data: memories[0] },
    { type: 'question', qIndex: 1 },
    { type: 'memory', data: memories[1] },
    { type: 'question', qIndex: 2 },
    { type: 'memory', data: memories[2] },
    { type: 'question', qIndex: 3 },
    { type: 'memory', data: memories[3] },
    { type: 'question', qIndex: 4 },
    { type: 'memory', data: memories[4] },
    { type: 'result' },
    { type: 'paintings', data: { images: ['/photos/photo3.jpeg', '/photos/photo4.jpeg', '/photos/photo5.jpeg'] } },
    { type: 'suggestions' },
    { type: 'promise' },
    { type: 'memory', data: memories[2] },
    { type: 'final' }
  ]

  const totalQuestions = questions.length
  const correctCount = Object.values(answers).filter(Boolean).length
  const resultIndex = sections.findIndex(s => s.type === 'result')

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [index])

  function next() { setIndex(i => Math.min(i + 1, sections.length - 1)) }
  function prev() { setIndex(i => Math.max(i - 1, 0)) }

  function handlePaintClick(i) {
  setPaintingsColored(prev => {
    const updated = prev && prev.length ? [...prev] : []

    // initialize if empty (safety)
    if (updated.length === 0 && sections[index]?.type === 'paintings') {
      for (let k = 0; k < sections[index].data.images.length; k++) {
        updated[k] = false
      }
    }

    if (updated[i]) return updated

    updated[i] = true

    // when all painted → celebration only (no navigation)
    const allColored = updated.every(Boolean)
    if (allColored) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1500)
    }

    return updated
  })
}

function saveSuggestions() {
  try {
    localStorage.setItem('namitha_suggestions', JSON.stringify(suggestions))
    setSuggestionsSaved(true)
  } catch (err) {}
}

function editSuggestions() {
  setSuggestionsSaved(false)
}

function resetSuggestions() {
  const empty = ['', '', '', '', '']
  setSuggestions(empty)
  setSuggestionsSaved(false)
  try {
    localStorage.removeItem('namitha_suggestions')
  } catch (err) {}
}

  return (
    <>
      <Head>
        <title> For my birthday girl </title>
      </Head>

      <div className="page-root story-root">
        <Header name={name} />

        <div className="story-container" ref={containerRef}>
          <div className="story-card" key={index}>

            {sections[index].type === 'question' && (() => {
              const q = questions[sections[index].qIndex]
              return (
                <div className="question-card">
                  <h3 className="question">{q.question}</h3>
                  <div className="mcq">
                    {q.options.map((opt, i) => (
                      <button
                        key={i}
                        className="option"
                        onClick={() => {
                          setAnswers(prev => ({ ...prev, [q.id]: i === q.correctIndex }))
                          if (i === q.correctIndex) setShowConfetti(true)
                          setTimeout(() => setShowConfetti(false), 900)
                        }}
                      >
                        <span className="opt-num">{i + 1}.</span> {opt}
                      </button>
                    ))}
                  </div>
                </div>
              )
            })()}

            {sections[index].type === 'memory' && (
              index > resultIndex ? <LoveMeter /> : <MemorySection {...sections[index].data} />
            )}

            {sections[index].type === 'result' && (
              <div className="result-card">
                <h2>How well do you know us? 💭</h2>
                <h1>{correctCount} / {totalQuestions}</h1>
                <p>{correctCount === 5 ? 'Okay wow… you remember everything 🥹❤️' : correctCount >= 3 ? 'You know me pretty well 😌' : correctCount >= 1 ? 'We need more dates clearly 😏' : 'I refuse to believe this 😤'}</p>
              </div>
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
    <h3>Tell me what I should improve</h3>

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
          />
        </div>
      ))}
    </div>

    <div className="suggestions-actions">
      {!suggestionsSaved ? (
        <button className="reveal-btn" onClick={saveSuggestions}>Save</button>
      ) : (
        <>
          <button className="reveal-btn" onClick={editSuggestions}>Edit</button>
          <button className="reveal-btn" style={{ background:"#999" }} onClick={resetSuggestions}>Reset</button>
        </>
      )}
    </div>
  </div>
)}
{sections[index].type === 'promise' && (
  <div className="promise-card">
    <div className="promise-text">
      <p>I know I made things harder than needed… but I’m here to fix, not repeat.</p>
      <p>I don’t want to win arguments, I want to keep us.</p>
      <p>I’ll learn you, understand you, and grow with you.</p>
      <p>I choose you — even on difficult days.</p>
      <p>I’m not promising perfection, I’m promising effort.</p>
    </div>
  </div>
)}


            {sections[index].type === 'intro' && (
              <LandingIntro name={name} onStart={() => setIndex(1)} />
            )}

            {sections[index].type === 'final' && <FinalWish name={name} />}
          </div>

          {!['intro', 'final'].includes(sections[index].type) && (
            <div className="story-controls">
              <button className="nav prev" onClick={prev}>◀</button>
              <button className="nav next" onClick={next}>▶</button>
            </div>
          )}
        </div>

        <Confetti show={showConfetti} />
        <Balloons />
      </div>
    </>
  )
}