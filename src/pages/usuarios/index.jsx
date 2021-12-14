import 'bootstrap/dist/css/bootstrap.css';
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';

const IndexUsuarios = () => {

  const { data, error, loading } = useQuery(GET_USUARIOS);

  useEffect(() => {
    if (error) {
      toast.error('Error consultando los usuarios');
    }
  }, [error]);

  if (loading) return <div>Loading....</div>;

  return (
    <PrivateRoute roleList={['ADMINISTRADOR']}>
      <div class="content-wrapper">
        <section class="content">

          <div class="container-fluid">
            <h2>Datos de Usuario</h2>
            <br/>
            <div className="row d-flex align-items-center justify-content-center">
              <div className="col-sm-1 align-text-bottom"><h5>Buscar:</h5></div>
              <div className="col-sm-5">
                <input id="busqueda" type="text" className="form-control" placeholder="Usuario"/>
              </div>
              <Link className="col" to='/'>
                <button className="btn btn-success" type="button">Agregar Curso</button>
              </Link>
            </div>
          </div>
            
            <hr/>
            <table id="TablaUsuarios" class="table table-striped">
              <thead class="table-dark">
                <tr>
                  <th>Nombre</th>
                  <th>Apellidos</th>
                  <th>Correo</th>
                  <th>Identificación</th>
                  <th>Rol</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
              {data && data.Usuarios ? (
              <>
                {data.Usuarios.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>{user.nombre}</td>
                      <td>{user.apellido}</td>
                      <td>{user.correo}</td>
                      <td>{user.identificacion}</td>
                      <td>{Enum_Rol[user.rol]}</td>
                      <td>{Enum_EstadoUsuario[user.estado]}</td>
                      <td>
                        <Link to={`/usuarios/editar/${user._id}`}>
                          <i className='fas fa-edit' />
                        </Link>
                      </td>
                    </tr>
                  );
                  })}
              </>
              ): (
                <div>No autorizado</div>
              )}
              </tbody>
            </table>
          
        </section>
      </div>
    </PrivateRoute>
  );
};

export default IndexUsuarios;
