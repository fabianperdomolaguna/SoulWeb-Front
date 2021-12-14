import { gql } from '@apollo/client';

const EDITAR_USUARIO = gql`
  mutation EditarUsuario(
    $_id: String!
    $nombre: String!
    $apellido: String!
    $identificacion: String!
    $correo: String!
    $estado: Enum_EstadoUsuario!
  ) {
    editarUsuario(
      _id: $_id
      nombre: $nombre
      apellido: $apellido
      identificacion: $identificacion
      correo: $correo
      estado: $estado
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

export { EDITAR_USUARIO, EDITAR_USUARIO_IND };
