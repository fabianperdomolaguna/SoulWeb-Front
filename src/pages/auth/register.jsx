import Topbar from 'components/Topbar'
import React, { useEffect, useState } from 'react';
import useFormData from 'hooks/useFormData';
import { Link } from 'react-router-dom';
import { REGISTRO } from 'graphql/auth/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';
import { useAuth } from 'context/authContext';

import { makeStyles } from '@material-ui/core/styles'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import { Grid, TextField } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Swal from 'sweetalert2'

const useStyles = makeStyles({
  Fields: {
      marginTop: 10,
      marginBottom: 10,
      display: 'block',
      textAlign: 'left'
  },
  Botones: {
      marginInline: 20,
      marginBottom: 5
  }
})

const theme = createTheme({
  palette: {
      primary: {
          main: '#66bb6a',
          darker: '#053e85',
      },
      secondary: {
          main: '#ee4336',
          contrastText: '#fff',
      },
  }
})

const Formulario = () => {

  const { setToken } = useAuth()

  const navigate = useNavigate()

  const classes = useStyles()

  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [identificacion, setIdentificacion] = useState('')
  const [rol, setRol] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')

  const user = {nombre, apellido, identificacion, rol, correo, password}
  const [registro, { data: dataMutation, loading: loadingMutation, error: errorMutation }] =
    useMutation(REGISTRO);

  const submitForm = (e) => {
    e.preventDefault()
    if (/^[a-zA-Z\s]*$/.test(user.nombre) &&
        /^[a-zA-Z\s]*$/.test(user.apellido) &&
        /^[0-9]+$/.test(user.identificacion) &&
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.correo) &&
        user.rol != '' &&
        user.password != ''){
          registro({
            variables: user
        })
        Swal.fire('usuario creado con exito', 'Inicia sesion', 'success')
        navigate('/')
        } else {
            Swal.fire('Errores en los datos ingresados', 'Intenta de nuevo', 'error')
            navigate('/')
      }
    }

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.registro.token) {
        setToken(dataMutation.registro.token);
        navigate('/');
      }
    }
  }, [dataMutation, setToken, navigate]);

  return (
    <div className='showinfo'>
        <div className='container showinfo-inner'>
            <Box bgcolor='rgba(255, 255, 255, 0.9)' height={540} width={370} justifyContent="center" 
            alignItems="center" color='black' direction="row" display='flex' flexDirection='column'>

                <Typography
                    variant = 'h6'
                    color = 'textPrimary'
                    component = 'h2'
                    gutterBottom
                >
                    Crear una nueva cuenta
                </Typography>

                <Typography
                    variant = 'h6'
                    color = 'textSecondary'
                    component = 'h3'
                    gutterBottom
                >
                    Inicia el registro
                </Typography>

                <FormControl autoComplete='off'>
                    <Grid container>
                        <Grid item xs={14}>

                            <TextField
                                onChange={(e) => setNombre(e.target.value)}
                                variant = 'outlined'
                                label = 'Nombres'
                                required
                            />

                            <TextField
                                onChange={(e) => setApellido(e.target.value)}
                                className = {classes.Fields}
                                variant = 'outlined'
                                label="Apellidos"
                                required
                            />

                            <TextField
                                onChange={(e) => setIdentificacion(e.target.value)}
                                className = {classes.Fields}
                                variant = 'outlined'
                                label="Documento (ID)"
                                required
                            />

                            <TextField
                                onChange={(e) => setRol(e.target.value)}
                                className = {classes.Fields}
                                select
                                fullWidth
                                variant = 'outlined'
                                label="Seleccionar rol deseado"
                                required
                            >
                                <option value={'ESTUDIANTE'}>Estudiante</option>
                                <option value={'LIDER'}>Lider</option>
                                <option value={'ADMINISTRADOR'}>Administrador</option>
                            </TextField>

                            <TextField
                                onChange={(e) => setCorreo(e.target.value)}
                                className = {classes.Fields}
                                variant = 'outlined'
                                label="E-mail"
                                required
                            />

                            <TextField
                                onChange={(e) => setPassword(e.target.value)}
                                className = {classes.Fields}
                                variant = 'outlined'
                                label="Contraseña"
                                type="password"
                                required
                            />

                        </Grid>
                    </Grid>
                </FormControl>

                <div>
                    <ThemeProvider theme={theme}>
                    <Button
                        onClick={submitForm}
                        className={classes.Botones}
                        variant ='contained'
                        color = 'primary'
                    >
                        Submit
                    </Button>
                    
                    <Link to='/'>
                    <Button
                        className={classes.Botones}
                        variant ='contained'
                        color = "secondary"
                    >
                        Cancel
                    </Button>
                    </Link>
                    </ThemeProvider>
                </div>

                <div>
                <span>¿Ya tienes una cuenta? </span>
                <Link to='/login'>
                    <span>Inicia sesión</span>
                </Link>
                </div>
            </Box>
        </div>
    </div>
)
}

const myComponent = <Formulario />

function Register(){
return(
    <>
        <Topbar childComponent={myComponent} />
    </>
)
}

export default Register
