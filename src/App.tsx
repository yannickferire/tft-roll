import { Outlet } from "react-router-dom";
import './index.css';
import Header from './components/layout/header';
import Footer from './components/layout/footer';

const App: React.FC = () => {
  return (
      <div className="App w-full xl:container px-5 pt-10 pb-8 flex flex-col min-h-screen">
        <Header />

          <Outlet />

        <Footer />
      </div>
  )
}

export default App
