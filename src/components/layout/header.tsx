import { NavLink } from "react-router-dom";
import logo from '../../assets/tft-odds-logo.svg';
import { currentSet, setStage } from '../../constants/set';

const Header = () => {
  return (
    <header className="flex mb-12 items-end">
      <NavLink to={`/`}>
        <img className="logo" src={logo} width="160" alt="TFT Odds" />
      </NavLink>
      <h2 className="bg-earlynight px-2 py-1 ml-3 -mb-px rounded text-xs">
        <span className="opacity-40">
          Set {currentSet}{setStage == 2 ? '.5': null}
        </span>
      </h2>
      <div className="flex-1 hidden sm:block">
        <ul className="flex justify-end gap-4 md:gap-6">
          <li>
            <NavLink 
              to={`/`} 
              className={({ isActive }) =>
                isActive
                  ? "text-morning transition-all duration-300 ease-in-out font-bold border-b-2 border-morning cursor-pointer"
                  : "text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight hover:border-crema"
              }
            >Champions</NavLink>
          </li>
          <li>
            <NavLink 
              to={`/hero-augments`}
              className={({ isActive }) =>
                isActive
                  ? "text-morning transition-all duration-300 ease-in-out font-bold border-b-2 border-morning cursor-pointer"
                  : "text-crema transition-all duration-300 ease-in-out cursor-pointer font-bold border-b-2 border-midnight hover:border-crema"
              }
            >Hero Augments</NavLink>
          </li>
          <li className="relative cursor-default">
            <span className="opacity-40">Loaded dice</span>
            <span className="bg-earlynight px-2 py-1 whitespace-nowrap absolute -top-[26px] left-1/2 -translate-x-1/2 rounded text-[10px]">
              <span className="opacity-40">Very Soon</span>
            </span>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header

