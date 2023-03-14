const Footer = () => {
  return (
    <footer className="bg-earlynight py-5 rounded">
      <div className="flex flex-col sm:flex-row px-5">
        <p className="flex-1 text-xs text-crema leading-5 opacity-40 mb-5 sm:mb-0">TFT Odds isn’t endorsed by Riot Games and doesn’t reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.</p>
        <p className="flex-1 text-center sm:text-right text-xs text-crema leading-5">
          <a href="mailto:hello@tftodds.com" className="block opacity-40 hover:opacity-100 tracking-wider font-bold">hello@tftodds.com</a>
          <span className="opacity-40">Made by</span> <a className="font-bold opacity-40 hover:opacity-100" href="https://lolchess.gg/profile/euw/krksyx" target="_blank" rel="noreferrer">krksyx</a><span className="inline opacity-40"> – © 2023 TFT Odds</span></p>
      </div>
    </footer>
  )
}

export default Footer

