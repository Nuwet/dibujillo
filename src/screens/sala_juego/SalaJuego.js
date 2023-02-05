import "./SalaJuego.css"
import Logo from "../../img/logo.png"
import TemporizadorJuego from "../../components/temporizadores/TemporizadorJuego"
import Canvas from "react-canvas-draw";


const SalaJuego = (props) => {

    return(
        <div className="fondoJuego">
            <div className="cabeceraJuego">
                <img src={Logo} alt="Logo" className="logoJuego"/>
                <TemporizadorJuego/>
            </div>
            <div className="cuerpoJuego">
                <div className="historiaJuego">
                    <h1 className="historiah1">Historia:</h1>
                    <p className="historiap">Perro sobre un caballo</p>
                </div>
                <div className="lienzoJuego">
                    <Canvas hideGrid={true} brushColor="black" brushRadius={1} canvasWidth="1200px" hideInterface={true} />

                </div>
            </div>
        </div>
    )
}

export default SalaJuego