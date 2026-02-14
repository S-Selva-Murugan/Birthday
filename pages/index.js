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
import LandingIntro from '../components/LandingInto'
import { questions, memories, sections } from '../data/storyData'

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
  const [paintingsReady, setPaintingsReady] = useState(false)
  const [loadedCount, setLoadedCount] = useState(0)

  const totalQuestions = questions.length
  const correctCount = Object.values(answers).filter(a => a?.correct).length
  const resultIndex = sections.findIndex(s => s.type === 'result')

useEffect(() => {
  if (sections[index]?.type === "paintings") {
    setLoadedCount(0)
    setPaintingsReady(false)
  }
}, [index])

useEffect(() => {
  if (sections[index]?.type === "paintings") {
    const total = sections[index].images.length
    if (loadedCount === total && total > 0) {
      setPaintingsReady(true)
    }
  }
}, [loadedCount, index])

  function next() { setIndex(i => Math.min(i + 1, sections.length - 1)) }
  function prev() { setIndex(i => Math.max(i - 1, 0)) }

  function handlePaintClick(i) {
  setPaintingsColored(prev => {
    const updated = prev && prev.length ? [...prev] : []

    // initialize if empty (safety)
if (updated.length === 0 && sections[index]?.type === 'paintings') {
  for (let k = 0; k < sections[index].images.length; k++) {
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

function getSelected(qId) {
  return answers[qId]?.selected
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
  const selected = getSelected(q.id)

  return (
    <div className="question-card">
      <h3 className="question">{q.question}</h3>

      <div className="mcq">
        {q.options.map((opt, i) => {
          const isSelected = selected === i

          return (
            <button
              key={i}
              className={`option ${isSelected ? 'selected' : ''}`}
              onClick={() => {
                setAnswers(prev => ({
                  ...prev,
                  [q.id]: {
                    selected: i,
                    correct: i === q.correctIndex
                  }
                }))
              }}
            >
              <span className="opt-num">{i + 1}.</span> {opt}
            </button>
          )
        })}
      </div>

      {selected !== undefined && (
        <p className="mcq-feedback">You can move to the next →</p>
      )}
    </div>
  )
})()}


            {sections[index].type === 'memory' && (
              index > resultIndex
                ? <LoveMeter />
                : <MemorySection {...memories[sections[index].mIndex]} />
            )}

            {sections[index].type === 'result' && (
              <div className="result-card">
                <h2>How well do you know us? 💭</h2>
                <h1>{correctCount} / {totalQuestions}</h1>
                <p>{correctCount === 5 ? 'Okay wow… you remember everything 🥹❤️' : correctCount >= 3 ? 'You know me pretty well 😌' : correctCount >= 1 ? 'We need more dates clearly 😏' : 'I refuse to believe this 😤'}</p>
              </div>
            )}
{sections[index].type === 'paintings' && (
  <div className="paintings-card" style={{ position: "relative" }}>
    <h3>Bring these pictures to life by clicking on them.</h3>
    <p className="hint">This is how you add color to my life.</p>

    {/* ONE loader */}
    {!paintingsReady && (
      <div className="media-loader">
        <div className="spinner" />
      </div>
    )}

    <div
      className="paintings-grid"
      style={{
        opacity: paintingsReady ? 1 : 0,
        transition: "opacity .5s ease"
      }}
    >
      {sections[index].images.map((src, i) => (
        <div
          key={i}
          className={`painting ${paintingsColored[i] ? 'colored' : ''}`}
          onClick={() => handlePaintClick(i)}
        >
          <img
            src={src}
            alt={`painting ${i + 1}`}
            onLoad={() => setLoadedCount(c => c + 1)}
          />
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