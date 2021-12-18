import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useQuery } from '@apollo/client';
import PrivateComponent from 'components/PrivateComponent';
import { Dialog } from '@mui/material';
import { GET_PROYLIDER } from 'graphql/usuarios/queries';
import { useParams } from 'react-router-dom';
import {
    AccordionStyled,
    AccordionSummaryStyled,
    AccordionDetailsStyled,
  } from 'components/Accordion';

const ProyectosLiderados = () => {

    const { _id } = useParams();

    const { data: queryData, loading, error } = useQuery(GET_PROYLIDER, {
        variables: { _id },});
    
    useEffect(() => {
        if (error) {
            toast.error('Error consultando los usuarios');
        }
        }, [error]);
        
    if (loading) return <div>Loading....</div>;

    const proyectosLideradosVar = queryData.consultarProyectosLiderados[0]

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
    return (
      <>
        <AccordionStyled>
          <AccordionSummaryStyled expandIcon={<i className='fas fa-chevron-down' />}>
            <div className='flex w-full justify-between'>
              <div className='uppercase font-bold text-gray-100 '>
                {proyectosLiderados.nombre} - {proyectosLiderados.estado}
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
                        <div className='text-lg font-bold'>{avance.descripcion}</div>
                        <div>{avance.fecha}</div>
                    </div>
                ))}
            </div>
          </AccordionDetailsStyled>
        </AccordionStyled>
      </>
    );
  };

export default ProyectosLiderados