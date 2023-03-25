import { Outlet } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import Header from './components/layout/header';
import Footer from './components/layout/footer';

const App: React.FC = () => {
  return (
      <div className="App w-full xl:container px-5 pt-10 pb-8 flex flex-col min-h-screen">
        <Header />
        <HelmetProvider>
          <Outlet />
        </HelmetProvider>
        <Footer />
      </div>
  )
}

export default App
