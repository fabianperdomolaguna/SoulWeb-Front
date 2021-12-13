import Topbar from 'components/Topbar'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from 'context/authContext'
import { useMutation } from '@apollo/client'
import { LOGIN } from 'graphql/auth/mutations'
import { makeStyles } from '@material-ui/core/styles'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles({
  Fields: {
      marginTop: 10,
      marginBottom: 10,
      display: 'block',
      textAlign: 'left'
  },
  Botones: {
      marginInline: 20,
      marginBottom: 5,
      marginTop: 15
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

  const navigate = useNavigate()

  const { setToken } = useAuth()

  const classes = useStyles()

  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')

  const userAuth = {correo, password}

  const [login, { data: dataMutation, loading: mutationLoading, error: mutationError }] =
    useMutation(LOGIN);

  const submitAuth = (e) => {
    e.preventDefault();

    login({
      variables: userAuth,
    })
  }

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.login.token) {
        setToken(dataMutation.login.token);
        navigate('/');
      } 
    }
  }, [dataMutation, setToken, navigate]);

  return(
    <div className='showinfo'>
        <div className='container showinfo-inner'>

            <Box bgcolor='rgba(255, 255, 255, 0.9)' height={260} width={370} justifyContent="center" 
            alignItems="center" color='black' direction="row" display='flex' flexDirection='column'>

                <Typography
                    variant = 'h6'
                    color = 'textPrimary'
                    component = 'h2'
                    gutterBottom
                >
                    Ingresa en tu cuenta
                </Typography>

                <FormControl autoComplete='off'>
                    <TextField
                        onChange={(e) => setCorreo(e.target.value)}
                        className = {classes.Fields}
                        variant = 'standard'
                        label = 'E-mail'
                        required
                    />

                    <TextField
                        onChange={(e) => setPassword(e.target.value)}
                        className = {classes.Fields}
                        variant = 'standard'
                        label = 'Password'
                        type="password"
                        required
                    />
                </FormControl>

                <div>
                    <ThemeProvider theme={theme}>
                    <Button
                        onClick={submitAuth}
                        className={classes.Botones}
                        variant ='contained'
                        color = 'primary'
                    >
                        Login
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
                <span>¿No tienes una cuenta? </span>
                <Link to='../register'>
                    <span>Registrate</span>
                </Link>
                </div>

            </Box>
    
        </div>
    </div>
)
}

const myComponent = <Formulario />

function Login(){
return(
    <>
        <Topbar childComponent={myComponent} />
    </>
)
}

export default Login