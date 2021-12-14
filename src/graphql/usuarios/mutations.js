import { gql } from '@apollo/client';

const EDITAR_USUARIO = gql`
  mutation EditarUsuario(
    $_id: String!
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $estado: Enum_EstadoUsuario!
    $rol: Enum_Rol!
  ) {
    editarUsuario(
      _id: $_id
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      estado: $estado
      rol: $rol
    ) {
      _id
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

const EDITAR_USUARIO_IND = gql`
mutation EditarUsuarioInd(
  $_id: String!, 
  $correo: String!, 
  $estado: Enum_EstadoUsuario!, 
  $rol: Enum_Rol!
) {
  editarUsuarioInd(
    _id: $_id, 
    correo: $correo, 
    estado: $estado, 
    rol: $rol) 
  {
    estado
  }
}
`;

const CAMBIO_ESTADO_USUARIO = gql`
mutation CambioEstadoUsuario($_id: String!) {
  cambioEstadoUsuario(_id: $_id) {
    estado
  }
}
`;

export { EDITAR_USUARIO, EDITAR_USUARIO_IND, CAMBIO_ESTADO_USUARIO };
