import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery, useMutation, selectHttpOptionsAndBodyInternal } from '@apollo/client';
import PrivateComponent from 'components/PrivateComponent';
import { Link } from 'react-router-dom';
import { GET_PROYLIDER } from 'graphql/usuarios/queries';
import { useParams } from 'react-router-dom';
import { ANADIR_OBSERVACION } from 'graphql/avances/mutations';
import {
    AccordionStyled,
    AccordionSummaryStyled,
    AccordionDetailsStyled,
  } from 'components/Accordion';

const ProyectosLiderados = () => {

    const { _id } = useParams();

    const { data: queryData, loading: queryloading, error: queryerror } = useQuery(GET_PROYLIDER, {
        variables: { _id },});
    
    useEffect(() => {
        if (queryerror) {
            toast.error('Error consultando los usuarios');
        }
        }, [queryerror]);
        
    if (queryloading) return <div>Loading....</div>;

    const proyectosLideradosVar = queryData.consultarProyectosLiderados[0];

    return(
        <div className='p-10 flex flex-col'>
            <div className='flex w-full items-center justify-center'>
                <h1 className='text-2xl font-bold text-gray-900'>Lista de Proyectos Liderados</h1>
            </div>

            <PrivateComponent roleList={'LIDER'}>
                {proyectosLideradosVar.proyectosLiderados.map((proyecto) => {
                    return <AccordionProyecto proyectosLiderados={proyecto} />;
                })}
            </PrivateComponent>
        </div>
    )

}

const AccordionProyecto = ({ proyectosLiderados }) => {

  const [editarAvance, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(ANADIR_OBSERVACION);

  function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

  const envio = _id => {
    return event => {
      event.preventDefault()

      let message = window.prompt("Introduzca la observacion")
      console.log(_id)

      editarAvance({
        variables: { _id, descripcion: message}
      })

      sleep(500)
      
      window.location.reload(true);
    } 
  };

  return (
      <>
        <AccordionStyled>
          <AccordionSummaryStyled expandIcon={<i className='fas fa-chevron-down' />}>
            <div className='flex w-full justify-between'>
              <div className='uppercase font-bold text-gray-100 '>
                {proyectosLiderados.nombre} - {proyectosLiderados.estado} 
                <Link to={`/editprojlider/${proyectosLiderados._id}`}>
                <button class="btn btn-success mb-3">
                  Editar </button>
                </Link>
              </div>
            </div>
          </AccordionSummaryStyled>
          <AccordionDetailsStyled>
            <div className='flex'>
                <div>Prusupuesto = ${proyectosLiderados.presupuesto}</div>
                <div>Fase = {proyectosLiderados.fase}</div>
                <br/>
                <h5>Objetivos</h5>
                {proyectosLiderados.objetivos.map((objetivo) => (
                    <div className='mx-5 my-4 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl'>
                        <div className='text-lg font-bold'>{objetivo.tipo}</div>
                        <div>{objetivo.descripcion}</div>
                    </div>
                ))}
                <h5>Avances</h5>
                {proyectosLiderados.avances.map((avance) => (
                    <div className='mx-5 my-4 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl'>
                        <div className='text-lg font-bold'>Descripcion: {avance.descripcion}</div>
                        <div>Fecha Realizacion: {avance.fecha}</div>
                        <div>Observaciones:</div>
                        {avance.observaciones.map((observacion) => (
                          <div>{observacion.texto}</div>
                        ))}
                        <div>Añadir Observacion: 
                          <button onClick={envio(avance._id)}>
                            <i className='fas fa-edit' />
                          </button>
                        </div>
                    </div>
                ))}
            </div>
          </AccordionDetailsStyled>
        </AccordionStyled>
      </>
    );
  };

export default ProyectosLiderados