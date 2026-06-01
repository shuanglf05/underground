
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Pricing from './pages/Pricing';
import PartnerForm from './pages/PartnerForm';
import GettingStarted from './pages/help/GettingStarted';
import Manual from './pages/help/Manual';
import ApiDoc from './pages/help/ApiDoc';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/partner" element={<PartnerForm />} />
        <Route path="/help/getting-started" element={<GettingStarted />} />
        <Route path="/help/manual" element={<Manual />} />
        <Route path="/help/api" element={<ApiDoc />} />
      </Routes>
    </Router>
  );
}

export default App;