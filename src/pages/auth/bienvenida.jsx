import Topbar from 'components/Topbar'
import { Link } from 'react-router-dom'

function Mensaje() {
    return (
        <div className='showinfo'>
            <div className='container showinfo-inner'>
                <h1>Bienvenido</h1>
                <p>SoulWeb es una aplicación de gestión de proyectos diseñada para planificar,
                    supervisar y crear un flujo de trabajo que permita integrar a todos los miembros
                    de un equipo</p>
                <Link className='button-init' to='/login'>Iniciar</Link>
            </div>
        </div>
    )
}

const myComponent = <Mensaje />

function Bienvenida(){
    return(
        <>
            <Topbar childComponent={myComponent} />
        </>
    )
}

export default Bienvenida