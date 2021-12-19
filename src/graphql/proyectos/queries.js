import { gql } from '@apollo/client';

const PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      estado
      fase
      presupuesto
      objetivos {
        descripcion
        tipo
      }
      avances {
        _id
        descripcion
        fecha
      }
      lider {
        _id
        correo
      }
      inscripciones {
        estado
        estudiante {
          _id
        }
      }
    }
  }
`;

const GET_PROYECTO = gql`
query Proyecto($_id: String!) {
  Proyecto(_id: $_id) {
    nombre
    presupuesto
    objetivos {
      tipo
      descripcion
    }
  }
}
`;

export { PROYECTOS, GET_PROYECTO };
