import "./SalaJuego.css"
import Logo from "../../img/logo.png"
import TemporizadorJuego from "../../components/temporizadores/TemporizadorJuego"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../environment.js";

const SalaJuego = (props) => {
    let { codigo } = useParams();
    const [historia, setHistoria] = useState([]);
    const [startTime, setStartTime] = useState('');

    useEffect(() => {
        const fetchData = async () => {
        const response = await axios(BASE_URL + '/game/' + codigo + '/history');
        setHistoria(response.data.history);
        setStartTime(response.data.startTime);
        };
        fetchData();
    }, [codigo]);

    return(
        <div className="fondoJuego">
            <div className="cabeceraJuego">
                <img src={Logo} alt="Logo" className="logoJuego"/>
                <TemporizadorJuego/>
            </div>
            <div className="cuerpoJuego">
                <div className="historiaJuego">
                    <h1 className="historiah1">Historia: </h1>
                    <p className="historiap">{historia}</p>
                </div>
                <div className="lienzoJuego">
                </div>
            </div>
        </div>
    )
}

export default SalaJuego
