import 'bootstrap/dist/css/bootstrap.css';
import 'styles/globals.css'
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { CAMBIO_ESTADO_USUARIO } from 'graphql/usuarios/mutations';
import { GET_ESTUDIANTES } from 'graphql/usuarios/queries';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';

const IndexEstudiantes = () => {

  const navigate = useNavigate()

  const { data: querydata, error: queryerror, loading: queryloading } = useQuery(GET_ESTUDIANTES);

  const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(CAMBIO_ESTADO_USUARIO);

  const submitChange = _id => {
    return event => {
      event.preventDefault()

      if (window.confirm("¿Quieres cambiar el estado?")){
        editarUsuario({
          variables: { _id },
        });
        window.location.reload(true);
      }
    } 
  };

  console.log(mutationData)

  useEffect(() => {
    if (queryerror) {
      toast.error('Error consultando los usuarios');
    }
  }, [queryerror]);

  if (queryloading) return <div>queryLoading....</div>;

  return (
    <PrivateRoute roleList={['LIDER']}>
      <div class="content-wrapper">
        <section class="content">

          <div class="container-fluid">
            <h2>Datos de Estudiantes</h2>
          </div>

          <hr/>
          <table id="TablaEstudiantes" class="table table-striped">
          <thead class="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Identificación</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Cambiar Estado</th>
            </tr>
          </thead>
          <tbody>
           {querydata && querydata.consultarEstudiantes ? (
             <>
              {querydata.consultarEstudiantes.map((user) => {
                if (Enum_EstadoUsuario[user.estado] == 'Pendiente'){
                return(
                  <tr key={user._id}>
                    <td>{user.nombre}</td>
                    <td>{user.apellido}</td>
                        <td>{user.correo}</td>
                        <td>{user.identificacion}</td>
                        <td>{Enum_Rol[user.rol]}</td>
                        <td className='text-red'>{Enum_EstadoUsuario[user.estado]}</td>
                        <td>
                          <button onClick={submitChange(user._id)}>
                            <i className='fas fa-edit' />
                          </button>
                        </td>
                  </tr>)} else{
                    return(
                      <tr key={user._id}>
                        <td>{user.nombre}</td>
                        <td>{user.apellido}</td>
                        <td>{user.correo}</td>
                        <td>{user.identificacion}</td>
                        <td>{Enum_Rol[user.rol]}</td>
                        <td>{Enum_EstadoUsuario[user.estado]}</td>
                        <td></td>
                      </tr>
                    )
                  }})}
             </>
           ):(
            <div>No autorizado</div>
           )}

          </tbody>


          </table>

        </section>
      </div>
    </PrivateRoute>
  );
};

export default IndexEstudiantes;