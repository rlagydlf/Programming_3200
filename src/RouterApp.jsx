import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import CounterApp from './CounterApp.jsx'
import TodoListApp from './TodoListApp.jsx'

function LinkButtonPageApp() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>App 목록</h1>
            <ul>
                <li><Link to="/counterapp">🔢 CounterApp</Link></li>
                <li><Link to="/todolistapp">✅ TodoListApp</Link></li>
                <li><button
                    style={{width: '100px', height: '100px', fontSize: '1.1rem'}}
                    onClick={() => navigate('/counterapp')}
                >🔢 CounterApp</button></li>
                <li><button
                    style={{width: '200px', height: '200px', fontSize: '2rem'}}
                    onClick={() => navigate('/todolistapp')}
                >✅ TodoListApp</button></li>
            </ul>
        </div>
    )
}

export default function RouterApp() {
    const audioRef = useRef(null)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        if (!audioRef.current) return

        if (isPlaying) {
            const promise = audioRef.current.play()
            if (promise instanceof Promise) {
                promise.catch(() => setIsPlaying(false))
            }
        } else {
            audioRef.current.pause()
        }
    }, [isPlaying])

    return (
        <BrowserRouter>
            <div className="music-player">
                <button
                    type="button"
                    className="music-toggle"
                    onClick={() => setIsPlaying((current) => !current)}
                >
                    {isPlaying ? '음악 중지' : '배경음악 재생'}
                </button>
                <span className="music-status">{isPlaying ? '재생 중' : '정지 중'}</span>
            </div>
            <audio
                ref={audioRef}
                src="public/music/pokemon_song.mp3"
                loop
                preload="auto"
            />
            <Routes>
                <Route path="/" element={<LinkButtonPageApp />} />
                <Route path="/counterapp" element={<CounterApp />} />
                <Route path="/todolistapp" element={<TodoListApp />} />
            </Routes>
        </BrowserRouter>
    )
}