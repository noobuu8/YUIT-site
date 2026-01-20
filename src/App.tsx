import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeType } from './types';
import { Layout } from './components/layout/Layout';
import { President } from './pages/President';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Home } from './pages/Home';

const App = () => {
  const theme = ThemeType.POP;

  return (
    <HashRouter>
      <Layout theme={theme}>
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/president" element={<President theme={theme} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy theme={theme} />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
