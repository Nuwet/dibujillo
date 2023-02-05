import "./PaginaInicial.css"
import Logo from "../../img/logo.png"
import React, { useState } from 'react';
import PopUpInicioSesion from "../../components/popups/PopupInicioSesion";
import PopupInvitado from "../../components/popups/PopupInvitado";
import PopupRegistro from "../../components/popups/PopupRegistro";


const PaginaInicial = (props) => {
    const [showPopupSesion, setShowPopupSesion] = useState(false);
    const [showPopupInvitado, setShowPopupInvitado] = useState(false);
    const [showPopupRegistro, setShowPopupRegistro] = useState(false);
    return(
        <div className="fondo">
            <div className="menu">
                <img src={Logo} className="imagen" alt="logo"></img>
                <div className="botones">
                    <button className="boton-inicio" onClick={() => setShowPopupSesion(true)}>INICIA SESIÓN</button>
                    <PopUpInicioSesion isOpen={showPopupSesion} onClose={() => setShowPopupSesion(false)} />
                    <a className="registro" onClick={() => setShowPopupRegistro(true)}>Regístrate</a>
                    <PopupRegistro isOpen={showPopupRegistro} onClose={() => setShowPopupRegistro(false)} />
                    <button className="boton-inicio" onClick={() => setShowPopupInvitado(true)}>INVITADO</button>
                    <PopupInvitado isOpen={showPopupInvitado} onClose={() => setShowPopupInvitado(false)} />
                </div>
                
            </div>
        </div>
    )
}

export default PaginaInicial