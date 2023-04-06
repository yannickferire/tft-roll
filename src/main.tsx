import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App'
import Error from './pages/error'
import Champion from './pages/champion'
import HeroAugments from './pages/heroAugments'

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <Error />,
//     children: [
//       {
//         path: "",
//         element: <Champion />,
//       },
//       {
//         path: "hero-augments",
//         element: <HeroAugments />,
//       },
//     ]
//   }
// ]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
