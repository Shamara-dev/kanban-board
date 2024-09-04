import { Route, Routes } from 'react-router-dom';
import Layout from './pages/Layout';
import MainPage from './pages/MainPage';
import BoardPage from './pages/BoardPage';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<MainPage />} />
                <Route path="/board/:id" element={<BoardPage />} />
            </Route>
        </Routes>
    );
};

export default App;
