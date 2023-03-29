import { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';

const LoadedDice: React.FC = () => {

  return (
    <>
      <Helmet>
        <title>Loaded dice probabilities – TFT odds</title>
        <meta name="description" content="Discover how you can have the best chance to hit the champion augment your team needs! Find out the probability to hit every hero augments. Optimize your gameplay and climb the ranks with ease." />
        <meta property="og:title" content="Loaded dice probabilities – TFT odds" />
		    <meta property="og:description" content="Discover how you can have the best chance to hit the champion augment your team needs! Find out the probability to hit every hero augments. Optimize your gameplay and climb the ranks with ease." />
      </Helmet>
      <h2 className="hidden">Loaded dice statistics and probabilites – Use it correctly will lead you to victory!</h2>
      <section className="flex items-start flex-col flex-1">
      </section>
    </>
  )
}

export default LoadedDice;