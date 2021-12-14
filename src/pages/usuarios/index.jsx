import 'bootstrap/dist/css/bootstrap.css';
import 'styles/globals.css'
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
            <h2>Datos de Usuarios</h2>
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
                  if (Enum_EstadoUsuario[user.estado] == 'Pendiente'){
                  return (
                    <tr key={user._id}>
                      <td>{user.nombre}</td>
                      <td>{user.apellido}</td>
                      <td>{user.correo}</td>
                      <td>{user.identificacion}</td>
                      <td>{Enum_Rol[user.rol]}</td>
                      <td className='text-red'>{Enum_EstadoUsuario[user.estado]}</td>
                      <td>
                        <Link to={`/usuarios/editar/${user._id}`}>
                          <i className='fas fa-edit' />
                        </Link>
                      </td>
                    </tr>
                  )} else{
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
                    )
                  }})}
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
