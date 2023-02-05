import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Logo from '../../img/logo.png';
import Temporizador from '../../components/temporizadores/TemporizadorEspera.jsx';
import axios from 'axios';
import BASE_URL from '../../environment.js';
import './SalaEspera.css';

const SalaEspera = () => {
  let { codigo } = useParams();
  const [jugadores, setJugadores] = useState([]);
  const [createdAt, setCreatedAt] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios(BASE_URL + '/game/' + codigo);
      setJugadores(response.data.players);
      setCreatedAt(response.data.createdAt);
    };
    fetchData();
  }, [codigo]);


  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await axios(BASE_URL+'/game/'+codigo);
      setJugadores(response.data.players);
      setCreatedAt(response.data.createdAt);
    }, 5000);
    return () => clearInterval(interval);
  }, [codigo]);

  return (
    <div className="fondoEspera">
      <div className="cabeceraEspera">
        <img src={Logo} className="logoEspera" />
        <h1 className="codigo">Código: {codigo}</h1>
      </div>
      <div className="cuerpoEspera">
        <div className="participantes">
          <h2 className='participantes-titulo'>Participantes:</h2>
          <ul>
            {jugadores.map((jugador, i) => (
              <li className='listaParticipantes' key={i}>{jugador}</li>
            ))}
          </ul>
          <p className='esperaParticipantes'>Esperando más participantes...</p>
        </div>
        <div className="reloj">
          <h3>La partida empieza en...</h3>
          <Temporizador codigo={codigo}/>
        </div>
      </div>
    </div>
  );
};

export default SalaEspera;

