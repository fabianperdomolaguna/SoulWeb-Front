import { gql } from '@apollo/client';

const CREAR_AVANCE = gql`
  mutation Mutation(
    $fecha: Date!
    $descripcion: String!
    $proyecto: String!
    $creadoPor: String!
  ) {
    crearAvance(
      fecha: $fecha
      descripcion: $descripcion
      proyecto: $proyecto
      creadoPor: $creadoPor
    ) {
      _id
    }
  }
`;

const ANADIR_OBSERVACION = gql`
mutation AnadirObservacion($_id: String!, $descripcion: String!) {
    anadirObservacion(_id: $_id, descripcion: $descripcion) {
      descripcion
    }
  }
`;

const CAMBIO_DESCRIPCION = gql`
mutation ModificarDescripcion($_id: String!, $descripcion: String!) {
    modificarDescripcion(_id: $_id, descripcion: $descripcion) {
      descripcion
    }
  }
`;

export { CREAR_AVANCE, ANADIR_OBSERVACION, CAMBIO_DESCRIPCION };