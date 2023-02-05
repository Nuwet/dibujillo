import '../../screens/pagina_inicial/PaginaInicial.css'
import Icono from '../../img/icono.png'
import Cerrar from '../../img/cerrar.png'
import {useEffect, useState} from 'react'
import axios from 'axios'
import BASE_URL from '../../environment'
import { useNavigate } from 'react-router-dom'


    const PopupInvitado = ({isOpen, onClose}) => {

        const navigate = useNavigate();

        const [username, setUsername] = useState('');
        const [error, setError]= useState ('');
        const [token, setToken] = useState('');


        const handleSubmit = async (event) => {
            event.preventDefault();
            if (username === '') {
                setError('El nombre de usuario no puede estar vacío');
                return;
            }
            try {
                const response = await axios.post(BASE_URL+'/guest', {
                    username: username
                });
                if(response.status === 201) {
                const {token} = response.data;
                setToken(token);
                localStorage.setItem('token', token);
                onClose();
                navigate('/unirse');
                }
                } catch (error) {
                if(error.response.status === 400) {
                setError("El nombre de usuario es incorrecto")
                }else {
                setError("Error al iniciar sesión, por favor inténtalo de nuevo.")
                }
                }
        }

    return(
        <div>
            {isOpen && 
                    <div className="popup-inicio">
                        <img className="cerrar-inicio" alt="cerrar" src={Cerrar} onClick={onClose}></img>
                        <h2 className='h2-inicio'>Entra como invitado</h2>
                        <form className='formularioInvitado' onSubmit={handleSubmit}>
                            <img src={Icono} alt="Icono" className='imagenIcono'></img>
                            <label>Nombre de usuario</label>
                            <input type="text" onChange={(e) => setUsername(e.target.value)}/>
                            <button className="boton">Enviar</button>
                            {error && <p className="error">{error}</p>}
                        </form>
                    </div>
                    }
        </div>
    )
}


export default PopupInvitado