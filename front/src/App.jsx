import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import SurveyForm from './pages/SurveyForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/demo" element={<Home />} />
        <Route path="/form" element={<SurveyForm />} />
      </Routes>
    </Router>
  );
}

export default App;
