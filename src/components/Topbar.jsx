import 'styles/Topbar.css'
import { Link } from 'react-router-dom'

function Topbar (props) {
    return (
        <>
            <nav className='navbar'>
                <div className='navbar-links'>
                    <ul>
                        <aside>
                            <p className='App-title'>SoulWeb</p>
                        </aside>
                        <li>
                            <Link className='navbar-links' to="/">Home</Link>
                        </li>
                    </ul>
                </div>

                <div className='navbar-links'>
                    <ul>
                        <li>
                            <Link className="navbar-links" to="/auth/register">
                                <i className="fas fa-user-plus"></i>Sign Up
                            </Link>
                        </li>
                        <li>
                            <Link className="navbar-links" to="/auth/login">
                                <i className="fas fa-users"></i>Login
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {props.childComponent}

        </>
    )
}

export default Topbar