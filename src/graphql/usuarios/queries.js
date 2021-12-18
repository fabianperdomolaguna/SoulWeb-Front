import { gql } from '@apollo/client';

const GET_USUARIOS = gql`
  query Query($filtro: FiltroUsuarios) {
    Usuarios(filtro: $filtro) {
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

const GET_USUARIO = gql`
  query Usuario($_id: String!) {
    Usuario(_id: $_id) {
      nombre
      apellido
      correo
      estado
      identificacion
      rol
    }
  }
`;

const GET_ESTUDIANTES = gql`
query ConsultarEstudiantes {
  consultarEstudiantes {
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

const GET_PROYLIDER = gql`
query ConsultarProyectosLiderados($_id: String!) {
  consultarProyectosLiderados(_id: $_id) {
    proyectosLiderados {
      _id
      nombre
      estado
      presupuesto
      fase
      objetivos {
        tipo
        descripcion
      }
      avances {
        descripcion
        fecha
      }
    }
  }
}
`;

export { GET_USUARIOS, GET_USUARIO, GET_ESTUDIANTES, GET_PROYLIDER };
