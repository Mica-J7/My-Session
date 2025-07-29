import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout/Layout.jsx';
import Home from '@/pages/Home/Home.jsx';
import About from '@/pages/About/About.jsx';
import Error from '@/pages/Error/Error.jsx';
import ScrollToTop from '@/components/ui/ScrollToTop/ScrollToTop.jsx';

function App() {
  return (
    <Router>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
