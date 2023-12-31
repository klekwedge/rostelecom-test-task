import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Layout, Space } from 'antd';
import MainPage from '../../pages/MainPage/MainPage';
import CoursesPage from '../../pages/CoursesPage/CoursesPage';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import './App.scss';

const { Header } = Layout;

function App() {
  return (
    <Router>
      <Header style={{ display: 'flex', alignItems: 'center', height: 50 }}>
        <Space size="middle">
          <Link to="/" style={{ color: 'white' }}>
            Главная
          </Link>
          <Link to="/courses"  style={{ color: 'white' }}>Курсы </Link>
        </Space>
      </Header>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
