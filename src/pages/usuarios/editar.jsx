import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import Input from 'components/Input';
import { useNavigate } from 'react-router';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';
import { Enum_EstadoUsuario, Enum_Rol } from 'utils/enums';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

const EditarUsuario = () => {

  const navigate = useNavigate()

  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    variables: { _id },
  });


  const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    editarUsuario({
      variables: { _id, ...formData },
    });
    navigate('/usuarios')
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Usuario modificado correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el usuario');
    }

    if (queryError) {
      toast.error('Error consultando el usuario');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Cargando....</div>;

  return (
    <div className='showUserInfo'>
      <Box bgcolor='rgba(255, 255, 255, 0.9)' height={590} width={370} justifyContent="center" 
      alignItems="center" color='black' direction="row" display='flex' flexDirection='column'
      sx={{ p: 2, border: '1px solid grey' }}>

        <Typography
          variant = 'h6'
          color = 'textPrimary'
          component = 'h2'
          gutterBottom
        >
          Actualizacion de Datos
        </Typography>

        <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
        <Input
          label='Nombre de la persona:'
          type='text'
          name='nombre'
          defaultValue={queryData.Usuario.nombre}
          required={true}
        />
        <Input
          label='Apellido de la persona:'
          type='text'
          name='apellido'
          defaultValue={queryData.Usuario.apellido}
          required={true}
        />
        <Input
          label='Correo de la persona:'
          type='email'
          name='correo'
          defaultValue={queryData.Usuario.correo}
          required={true}
        />
        <Input
          label='Identificación de la persona:'
          type='text'
          name='identificacion'
          defaultValue={queryData.Usuario.identificacion}
          required={true}
        />
        <DropDown
          label='Estado de la persona:'
          name='estado'
          defaultValue={queryData.Usuario.estado}
          required={true}
          options={Enum_EstadoUsuario}
        />
        <DropDown
          label='Rol de la persona(user):'
          name='rol'
          defaultValue={queryData.Usuario.rol}
          required={true}
          options={Enum_Rol}
        />

        <button
          class="btn btn-success mr-3"
          onClick={submitForm}
        >
          Actualizar
        </button>
        <Link to='/usuarios'>
          <button
            class="btn btn-danger"
          >
            Cancelar
          </button>
        </Link>

      </form>

      </Box>
    </div>
  );
};

export default EditarUsuario;
