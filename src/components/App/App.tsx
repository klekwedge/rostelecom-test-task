import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../../pages/MainPage/MainPage';
import CoursesPage from '../../pages/CoursesPage/CoursesPage';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
