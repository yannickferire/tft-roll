import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Champion from './pages/champion';
import HeroAugments from './pages/heroAugments';
import LoadedDice from "./pages/loadedDice";
import Error from './pages/error';

const App: React.FC = () => {
  return (
      <div className="App w-full xl:container px-5 pt-6 sm:pt-10 pb-6 sm:pb-8 flex flex-col min-h-screen">
        <Header />
        <HelmetProvider>
          <Routes>
            <Route path="/" element={<Champion />} />
            <Route path="/hero-augments" element={<HeroAugments />} />
            <Route path="/loaded-dice" element={<LoadedDice />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </HelmetProvider>
        <Footer />
      </div>
  )
}

export default App
