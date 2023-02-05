import '../../screens/pagina_inicial/PaginaInicial.css'
import Cerrar from '../../img/cerrar.png'
import {useEffect, useState} from 'react'
import axios from 'axios'
import BASE_URL from '../../environment'

    const PopupRegistro = ({isOpen, onClose}) => {
        const [username, setUsername] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [error, setError] = useState('');
        const [token, setToken] = useState('');

        const handleSubmit = async (event) => {
            event.preventDefault();
            if (username === '') {
                setError('El nombre de usuario no puede estar vacío');
                return;
            }
            if (email === '') {
                setError('El correo electrónico no puede estar vacío');
                return;
            }
            if (password === '') {
                setError('La contraseña no puede estar vacía');
                return;
            }
            if (password !== confirmPassword) {
                setError('Las contraseñas no coinciden');
                return;
            }
            try {
                const response = await axios.post(BASE_URL+'/users', {
                    username: username,
                    email: email,
                    password: password
                });
                if(response.status === 201) {
                    onClose();
                    const {token} = response.data;
                    setToken(token);
                    localStorage.setItem('token', token);
                }
            } catch (error) {
                if(error.response.status === 400) {
                    setError(error.response.data.message)
                }else if(error.response.status === 401) {
                    setError("Ya existe un usuario con ese nombre o correo electrónico")
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
                    <h2 className='h2-inicio'>Regístrate</h2>
                    <form className='formularioSesion' onSubmit={handleSubmit}>
                        <label>Nombre de usuario</label>
                        <input type="text" onChange={(e) => setUsername(e.target.value)}/>
                        <label>Correo electrónico</label>
                        <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                        <label>Contraseña</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                        <label>Confirma tu contraseña</label>
                        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <button className="boton">Enviar</button>
                        {error && <p className="error">{error}</p>}
                    </form>
                </div>
            }
        </div>
    )
}


export default PopupRegistro