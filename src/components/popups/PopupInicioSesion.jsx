import '../../screens/pagina_inicial/PaginaInicial.css'
import Cerrar from '../../img/cerrar.png'
import {useEffect, useState} from 'react'
import axios from 'axios'
import BASE_URL from '../../environment'
import { useNavigate } from 'react-router-dom'

const PopUpInicioSesion = ({isOpen, onClose}) => {
    const navigate = useNavigate();
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError]= useState ('');
    const [token, setToken] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (usernameOrEmail === '') {
            setError('El nombre de usuario no puede estar vacío');
            return;
        }
        if (password === '') {
            setError('La contraseña no puede estar vacía');
            return;
        }
        try {
            const response = await axios.post(BASE_URL+'/sessions', {
                usernameOrEmail: usernameOrEmail,
                password: password
            });
           if(response.status === 201) {
                const {token} = response.data;
                setToken(token);
                localStorage.setItem('token', token);
                navigate ('/unirse')
            }
            } catch (error) {
            if(error.response.status === 400) {
            setError(error.response.data.message)
            }else if(error.response.status === 401) { 
            setError("Usuario o contraseña incorrectos")
            }else {
            setError("Error al iniciar sesión, por favor inténtalo de nuevo.")
            }
            }
    }
    const handleClose = () => {
        onClose();
    }


    return(
        <div>
            {isOpen && 
                <div className="popup-inicio">
                    <img className="cerrar-inicio" alt="cerrar" src={Cerrar} onClick={handleClose}></img>
                    <h2 className='h2-inicio'>Inicia sesión</h2>
                    <form className='formularioSesion' onSubmit={handleSubmit}>                            
                        <label>Correo electrónico o nombre de usuario</label>
                        <input type="text" onChange={(e) => setUsernameOrEmail(e.target.value)}/>
                        <label>Contraseña</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                        <button className="boton">Enviar</button>
                        {error && <p className="error">{error}</p>}
                    </form>
                </div>
            }
        </div>
    )
}

export default PopUpInicioSesion
