import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { useMutation, useQuery } from '@apollo/client';
import { PROYECTOS } from 'graphql/proyectos/queries';
import useFormData from 'hooks/useFormData';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import DropDown from 'components/Dropdown';
import { Enum_EstadoUsuario } from 'utils/enums';

const IndexAvance = () => {

  const { form, formData, updateFormData } = useFormData(null);

  const { data: queryData, loading, error } = useQuery(PROYECTOS);

  useEffect(() => {
    console.log('datos proyecto', queryData);
  }, [queryData]);

  if (loading) return <div>Cargando...</div>;

  var nameProjects = []

  queryData.Proyectos.map((proyecto) => {
    nameProjects.push(proyecto.nombre)
  })

  console.log(nameProjects)

  return(
    <div class="content-wrapper">
      <section class="content">

        <div class="container-fluid">
          <h2>Datos de Usuarios</h2>
        </div>
        <hr/>

        <div className='showUserInfo'>
      <Box bgcolor='rgba(255, 255, 255, 0.9)' height={350} width={370} justifyContent="center" 
      alignItems="center" color='black' direction="row" display='flex' flexDirection='column'
      sx={{ p: 2, border: '1px solid grey' }}>

        <Typography
          variant = 'h6'
          color = 'textPrimary'
          component = 'h2'
          gutterBottom
        >
          Creacion de Avance
        </Typography>

        <form
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
        <div class="mb-1 form-outline">
          <input type="text" id="formControlSm"  class="form-control form-control-sm"/>
          <label class="form-label" for="formControlSm">Descripcion</label>
        </div>

        <div class="mb-1 form-outline">
          <input type="text" id="formControlSm"  class="form-control form-control-sm"/>
          <label class="form-label" for="formControlSm">Observacion</label>
        </div>

        <DropDown
          label='Seleccione el proyecto:'
          name='estado'
          required={true}
          options={nameProjects}
        />

        <button
          class="btn btn-success mr-3"
        >
          Crear
        </button>
        <Link to='/'>
          <button
            class="btn btn-danger"
          >
            Cancelar
          </button>
        </Link>

      </form>

      </Box>
    </div>
    </section>
  </div>
  )
}
  
export default IndexAvance;