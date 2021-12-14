import 'styles/Topbar.css'
import 'bootstrap/dist/css/bootstrap.css';
import { useAuth } from 'context/authContext';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import { EDITAR_USUARIO_IND } from 'graphql/usuarios/mutations';
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

    const navigate = useNavigate()

    const { setToken } = useAuth();

    const classes = useStyles()

    const [correo, setCorreo] = useState("");
    const [rol, setRol] = useState("");

    const { _id } = useParams();
    
    const {data: querydata, error: queryerror, loading: queryloading,} = useQuery(GET_USUARIO, {
        variables: { _id },});
    var estadoInicial = 'AUTORIZADO' 
    const estado = 'PENDIENTE'

    const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
        useMutation(EDITAR_USUARIO_IND);

    useEffect(() => {
        if (mutationData) {
            toast.success('Usuario modificado correctamente');
        }
    }, [mutationData]);

    useEffect(() => {
        if (mutationError) {
            toast.error('Error modificando el usuario');
        }

        if (queryerror) {
            toast.error('Error consultando el usuario');
        }
    }, [queryerror, mutationError]);

    if (queryloading) return <div>Loading....</div>;

    var userModificado;

    const submitForm = (e) => {
        e.preventDefault()
        if (rol == querydata.Usuario.rol){
            userModificado = { _id, correo, estadoInicial, rol }
        } else{
            userModificado = { _id , correo, estado, rol }
        }
        editarUsuario({
            variables: { _id, ...userModificado },
        });
        console.log('eliminar token');
        setToken(null);
        navigate('/auth/login')
    }

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
                        <input type="text" id="formControlSm" value={querydata.Usuario.nombre} class="form-control form-control-sm" disabled/>
                        <label class="form-label" for="formControlSm">Nombre</label>
                    </div>

                    <div class="mb-1 form-outline">
                        <input type="text" id="formControlSm" value={querydata.Usuario.apellido} class="form-control form-control-sm" disabled/>
                        <label class="form-label" for="formControlSm">Apellido</label>
                    </div>

                    <div class="mb-1 form-outline">
                        <input type="text" id="formControlSm"  
                        class="form-control form-control-sm" defaultValue={querydata.Usuario.correo} onChange={e =>setCorreo(e.target.value)} />
                        <label class="form-label" for="formControlSm">Correo</label>
                    </div>

                    <div class="mb-1 form-outline">
                        <input type="text" id="formControlSm" value={querydata.Usuario.estado} class="form-control form-control-sm" disabled/>
                        <label class="form-label" for="formControlSm">Estado</label>
                    </div>

                    <div class="mb-1 form-outline">
                        <input type="text" id="formControlSm" value={querydata.Usuario.identificacion} class="form-control form-control-sm" disabled/>
                        <label class="form-label" for="formControlSm">Identificacion</label>
                    </div>

                    <div class="mb-1 form-outline">
                        <select type="text" id="formControlSm" 
                        class="form-control form-control-sm" defaultValue={querydata.Usuario.rol} onChange={e =>setRol(e.target.value)}>
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
                        onClick={submitForm}
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
