import 'styles/globals.css'
import peopleImage from 'images/BusinessPeople.jpg'
import React from 'react';

const Inicio = () => {
  return (
    <>
      <div className='app-inner'>
          <h1>Bienvenidos a SoulWeb</h1>
          <h2>Integra a los miembros de tu equipo y disfruta de nuestra aplicación</h2>
          <img src={peopleImage} alt='Logo' width="500"/>
          <span>Cortesia:</span>   
          <a href="https://es.vecteezy.com/">Vecteezy</a>
      </div>
    </>
  );
};

export default Inicio
