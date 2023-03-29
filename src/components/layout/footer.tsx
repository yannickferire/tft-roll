import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-earlynight py-4 rounded">
      <div className="flex flex-col sm:flex-row px-4 justify-between gap-4 sm:gap-16 md:gap-32">
        <p className="order-2 sm:order-1 flex-1 text-xs text-crema leading-5 opacity-40 mt-4 sm:mt-0">TFT Odds isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.</p>
        <div className="order-1 sm:order-2 flex-1 flex">
          <ul className="flex-1 text-left text-xs text-crema leading-5">
            <li>
              <NavLink 
                to={`/`} 
                className="leading-[30px] sm:leading-normal inline-block opacity-40 hover:opacity-100 tracking-wider font-bold"
              >Champions</NavLink>
            </li>
            <li>
              <NavLink 
                to={`/hero-augments`}
                className="leading-[30px] sm:leading-normal inline-block opacity-40 hover:opacity-100 tracking-wider font-bold"
              >Hero Augments</NavLink>
            </li>
            {/* <li className="relative cursor-default">
              <span className="opacity-20">Loaded dice</span>
            </li> */}
          </ul>
          <p className="flex-1 text-center sm:text-right text-xs text-crema leading-5">
            <a href="mailto:hello@tftodds.com" className="leading-[30px] sm:leading-normal inline-block opacity-40 hover:opacity-100 tracking-wider font-bold">hello@tftodds.com</a><br/>
            <a className="leading-[30px] sm:leading-normal inline-block opacity-40 hover:opacity-100 tracking-wider font-bold" href="javascript:openAxeptioCookies()">Cookies</a><br/>
            <span className="opacity-40">Made by</span> <a className="leading-[30px] sm:leading-normal font-bold opacity-40 hover:opacity-100" href="https://lolchess.gg/profile/euw/krksyx" target="_blank" rel="noreferrer"><img className="inline-block w-5 -mt-px" src="/images/ranks/diamond.png" alt="Rank: Diamond I" /> krksyx</a><span className="inline opacity-40"> – © 2023 TFT Odds</span></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

