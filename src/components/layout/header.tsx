import logo from '../../assets/tft-odds-logo.svg';
import { currentSet, setStage } from '../../constants/set';

const Header = () => {
  return (
    <header className="flex mb-12 items-end">
      <h1 className="text-4xl font-extrabold"><img className="logo" src={logo} width="160" alt="TFT Odds" /></h1>
      <h2 className="bg-earlynight px-2 py-1 ml-3 -mb-px rounded text-xs">
        <span className="opacity-40">
          Set {currentSet}{setStage == 2 ? '.5': null}
        </span>
      </h2>
    </header>
  )
}

export default Header

