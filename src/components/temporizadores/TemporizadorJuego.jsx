import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../screens/sala_juego/SalaJuego.css";

export default function TemporizadorJuego(props) {
  const { minutosInicio = 10, segundosInicio = 0} = props;
  const [minutos, setMinutos] = useState(minutosInicio);
  const [segundos, setSegundos] = useState(segundosInicio);
  const navigate = useNavigate();

  useEffect(() => {
    let intervalo = setInterval(() => {
      if (segundos > 0) {
        setSegundos(segundos - 1);
      }
      if (segundos === 0) {
        if (minutos === 0) {
          clearInterval(intervalo);
        } else {
          setMinutos(minutos - 1);
          setSegundos(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(intervalo);
    };
  }, [minutos, segundos]);

  if (minutos === 0 && segundos === 0) {
    navigate('*');
  }

  return (
    <div>
      <p className="temporizadorJuego">
        {minutos}:{segundos < 10 ? `0${segundos}` : segundos}
      </p>
    </div>
  );
}