import { NOT_FOUND } from 'http-status';
import { NavLink } from "react-router-dom";
import '../index.css'

const Error: React.FC = () => {
  const statusCode = NOT_FOUND;
  return (
      <div className="flex items-start flex-col flex-1">
        <p className="text-3xl font-bold w-full text-center pt-20 pb-4 px-6 leading-normal">
          <span className="block text-7xl font-bold mb-4 text-morning">{statusCode}</span>
          We're sorry but this page does not exist.<br/> Check our odds calculators just below!
        </p>
        <div className="justify-between mx-auto gap-4 flex pt-4 mb-20">
          <NavLink to={`/`}>
            <button className="h-10 text-midday hover-effect transition-all duration-300 ease-in-out">
              <span className="w-full px-4 h-10 block leading-10 rounded bg-earlynight text-crema relative z-10">Champions</span>
            </button>
          </NavLink>
          <NavLink to={`/hero-augments`}>
            <button className="h-10 text-midday hover-effect transition-all duration-300 ease-in-out">
              <span className="w-full px-4 h-10 block leading-10 rounded bg-earlynight text-crema relative z-10">Hero Augments</span>
            </button>
          </NavLink>
        </div>
      </div>
  )
}

export default Error;