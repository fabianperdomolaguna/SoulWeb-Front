import 'styles/Sidebar.css'
import logo from 'images/logo.svg'
import { NavLink } from 'react-router-dom';
import { useAuth } from 'context/authContext';
import PrivateComponent from './PrivateComponent';

const SidebarLinks = () => {
  return (
    <div className='sidebar'>
      <Logo />
    <ul className='sidebarList'>
      <SidebarRoute to='/' title='Inicio' icon='fas fa-home' />
      <PrivateComponent roleList={['ADMINISTRADOR']}>
        <SidebarRoute to='/usuarios' title='Usuarios' icon='fas fa-user-tag' />
      </PrivateComponent>
      <SidebarRoute to='/proyectos' title='Proyectos' icon='fas fa-project-diagram' />
      <PrivateComponent roleList={['ADMINISTRADOR', 'LIDER']}>
        <SidebarRoute to='/inscripciones' title='Inscripciones' icon='fas fa-marker' />
      </PrivateComponent>
      <SidebarRoute to='/page2' title='Avances' icon='fas fa-tasks' />
      <Logout />
    </ul>    
    </div>

  );
};

const Logout = () => {
  const { setToken } = useAuth();
  const deleteToken = () => {
    console.log('eliminar token');
    setToken(null);
  };
  return (
    <li className='sidebarListRoute' onClick={() => deleteToken()}>
      <NavLink to='/auth/login' className='sidebarTitle'>
        <div>
          <i className='fas fa-sign-out-alt' id='one'/>
          <span id='two'>Cerrar Sesión</span>
        </div>
      </NavLink>
    </li>
  );
};

const Logo = () => {
  return (
    <div>
      <img src={logo} alt='Logo'/>
      <h3 className='title'>SoulWeb</h3>
    </div>
  );
};

const Sidebar = (props) => {
  
  return (
    <div className='App with-sidebar'>
      {/* Sidebar starts */}

        <div>
          <SidebarLinks />
        </div>

        <div>
          {props.childComponent}
        </div>

    </div>
  );
};

const SidebarRoute = ({ to, title, icon }) => {
  return (
    <li className='sidebarListRoute'>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? 'sidebarSelected'
            : 'sidebarTitle'
        }
      >
        <div>
          <i className={icon} id='one'/>
          <span id='two'>{title}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default Sidebar;
