import "./UnirseSalas.css";
import logo from '../../img/logo.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../environment";
import { useState } from "react";
import PopUpUnirse from "../../components/PopUpUnirse";
import { useOutletContext } from "react-router-dom";

const UnirseSalas = (props) => {
    const navigate = useNavigate();

    const [datosSala, setDatosSala] = useOutletContext();

    const [showPopUpUnirse, setShowPopUpUnirse] = useState(false);

    const feed = () => {
        navigate('/feed');
    }

    const cerrar = () => {
        localStorage.removeItem('token');
        navigate('/inicio');
    }

    const crear = () => {
        axios.post(BASE_URL + "/game", 
            { headers: {'SessionToken': localStorage.getItem('token') }})
        .then(response => {
            setDatosSala(response.data);
            navigate("/salaDeEspera");
        }).catch(err => {
            if (err.response.status == 401) {
                alert("Se ha producido un error")
                localStorage.removeItem('token');
                navigate("/inicio")
            }
        })
    }

    return(
        <div className="inicial">
            <div className="caja">
                <div className="cabecera">
                    <button className="feed" onClick={feed}>Dibujillo Social</button>
                    <img className="logo" src={logo}></img>
                    <button className="cerrar" onClick={cerrar}>Cerrar sesión</button>
                </div>

                <button className="crear" onClick={crear}>Crear sala</button>

                <button className="boton" onClick={() => setShowPopUpUnirse(true)} >Unirse a una sala</button>
                <PopUpUnirse isOpen={showPopUpUnirse} onClose={() => setShowPopUpUnirse(false)}></PopUpUnirse>
            </div>
        </div>
    )
}

export default UnirseSalas
