import 'styles/Topbar.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client'
import { GET_USUARIO } from 'graphql/usuarios/queries';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
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

const IndexInfoUsuario = () => {

    const classes = useStyles()

    const [correo, setCorreo] = useState("");
    const [rol, setRol] = useState("");
    const estado = 'PENDIENTE'

    const { _id } = useParams();
    
    const {data, error, loading,} = useQuery(GET_USUARIO, {
        variables: { _id },});

    useEffect(() => {
        if (error) {
            toast.error('Error consultando el usuario');
        }
    }, [error]);

    if (loading) return <div>Loading....</div>;

    const userModificado = { correo, estado, rol }

    return(
        <div className="showUserInfo">
            <Box bgcolor='rgba(255, 255, 255, 0.9)' height={530} width={370} justifyContent="center" 
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

            <div className="box-form mx-auto">

                <form>
                    <div class="mb-1 form-outline">
                        <input type="text" id="formControlSm" value={data.Usuario.nombre} class="form-control form-control-sm" disabled/>
                        <label class="form-label" for="formControlSm">Nombre</label>
                    </div>

                    <div class="mb-1 form-outline">
                        <input type="text" id="formControlSm" value={data.Usuario.apellido} class="form-control form-control-sm" disabled/>
                        <label class="form-label" for="formControlSm">Apellido</label>
                    </div>

                    <div class="mb-1 form-outline">
                        <input type="text" id="formControlSm" defaultValue={data.Usuario.correo} 
                        class="form-control form-control-sm" onChange={e =>setCorreo(e.target.value)} />
                        <label class="form-label" for="formControlSm">Correo</label>
                    </div>

                    <div class="mb-1 form-outline">
                        <input type="text" id="formControlSm" value={data.Usuario.estado} class="form-control form-control-sm" disabled/>
                        <label class="form-label" for="formControlSm">Estado</label>
                    </div>

                    <div class="mb-1 form-outline">
                        <input type="text" id="formControlSm" value={data.Usuario.identificacion} class="form-control form-control-sm" disabled/>
                        <label class="form-label" for="formControlSm">Identificacion</label>
                    </div>

                    <div class="mb-1 form-outline">
                        <select type="text" id="formControlSm" defaultValue={data.Usuario.rol}  
                        class="form-control form-control-sm" onChange={e =>setRol(e.target.value)}>
                            <option>ESTUDIANTE</option>
                            <option>LIDER</option>
                            <option>ADMINISTRADOR</option>
                        </select>
                        <label class="form-label" for="formControlSm">Rol</label>
                    </div>
                </form>
                
                <div>
                    <ThemeProvider theme={theme}>
                    <Button
                        className={classes.Botones}
                        variant ='contained'
                        color = 'primary'
                    >
                        Modificar
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
                    
            </div>
            </Box>
        </div>
    ) 
}

export default IndexInfoUsuario;
