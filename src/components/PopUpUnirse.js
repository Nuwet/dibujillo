import cerrar from '../img/cerrar.png';
import { useState } from 'react';
import axios from 'axios';
import BASE_URL from '../environment';
import { useOutletContext } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const PopUpUnirse = ({isOpen, onClose}) => {
    const navigate = useNavigate();

    const [datosSala, setDatosSala] = useOutletContext();

    const [cod, setCod]= useState ('');
    const [error, setError]= useState ('');


    const handleClose = () => {
        onClose();
    }

    const onChangeCod = (e) => {
        setCod(e.target.value);
    }

    const onClickEntrar = (e) => {
        e.preventDefault();

        if (cod.length == 0) {
            setError("Por favor, introduzca un codigo");
            return;
        }

        axios.post(BASE_URL + "/game/1", /*el 1 es por el postman pero deberia ser el codigo que se introduce*/
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
            if (err.response.status == 404) {
                setError("El codigo introducido no existe, vuelva a intentarlo");
            }
        })
    }
    
    return(
        <div>
            {isOpen && 
            
            <div className="popup">
                <img className='cerrar-popup' src={cerrar} onClick={handleClose}></img>
                <h2 className='unirse'>Unirse a sala</h2>

                <div className='formulario'>
                    <p>Codigo de la sala:</p>
                    <input className='input-codigo' type="text" onChange={onChangeCod} maxLength="3"></input>
                </div>
                <button className='enviar-codigo' onClick={onClickEntrar}>Entrar</button>

                {error && <p className="error-unirse">{error}</p>}
            </div>
            
            }
        </div>
    )
}

export default PopUpUnirse