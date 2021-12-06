import React, { Suspense } from 'react'
import { hot } from 'react-hot-loader/root'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Fallback } from './Fallback'

const Home = React.lazy(() => import('./Home'))

function App() {
    return (
        <Router>
            <Suspense fallback={<Fallback />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Suspense>
        </Router>
    )
}

export default hot(App)
