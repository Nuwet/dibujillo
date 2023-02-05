import { Outlet } from "react-router-dom"
import { useState } from "react";

const Container = (props) => {
    const [datosSala, setDatosSala] = useState();

    return <div>
        <Outlet context={[datosSala, setDatosSala]}/>
    </div>
}

export default Container;
