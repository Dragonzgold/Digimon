import '../Assent/home.scss';
import React from 'react';
import ReactAudioPlayer from 'react-audio-player';

function Home() {
  const audio = require("./evolution.ogg")

  return (
    <div className='bienvenida'>
      <h1 className='palabras'>
        Bienvenido a la wiki de digimon
      </h1>

      <p className='introduccion'>En esta pagina conoceras ciertas cosas relacionadas al mundo digital de la franquicia de digimon<br></br>
      como algunas de sus criaturas, el mapa del mundo digital con sus correspondientes regiones <br></br>
      su anime, manga y juego de cartas. Sin mas que decir disfruta tu estancia en la pagina
      </p>


      <ReactAudioPlayer
      src={audio}
      autoPlay
      controls>
      </ReactAudioPlayer>
      
      
      
    </div>
  )
}

export default Home