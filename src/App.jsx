import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from 'context/userContext';
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { AuthContext } from 'context/authContext';
import jwt_decode from 'jwt-decode';
import AuthLayout from 'layouts/AuthLayout';
import PrivateLayout from 'layouts/PrivateLayout';
import Bienvenida from 'pages/auth/bienvenida';
import Register from 'pages/auth/register';
import Login from 'pages/auth/login';
import Inicio from 'pages/inicio';
import IndexUsuarios from 'pages/usuarios';
import EditarUsuario from 'pages/usuarios/editar';
import Page2 from 'pages/Page2';
import IndexProyectos from 'pages/proyectos/Index';
import NuevoProyecto from 'pages/proyectos/NuevoProyecto';
import IndexInscripciones from 'pages/inscripciones';
import IndexInfoUsuario from 'pages/infoUsuarios';
import IndexEstudiantes from 'pages/estudiantes/indexstudents';

const httpLink = createHttpLink({
  uri: 'https://servidor-gql-soulweb.herokuapp.com/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem('token'));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState('');

  const setToken = (token) => {
    console.log('set token', token);
    setAuthToken(token);
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    } else {
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        rol: decoded.rol,
      });
    }
  }, [authToken]);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<PrivateLayout _id={userData._id}/>}>
                <Route path='' element={<Inicio />} />
                <Route path='/usuarios' element={<IndexUsuarios />} />
                <Route path='/usuarios/editar/:_id' element={<EditarUsuario />} />
                <Route path='/estudiantes' element={<IndexEstudiantes />} />
                <Route path='/proyectos' element={<IndexProyectos />} />
                <Route path='/proyectos/nuevo' element={<NuevoProyecto />} />
                <Route path='/inscripciones' element={<IndexInscripciones />} />
                <Route path='page2' element={<Page2 />} />
                <Route path='/infoUser/:_id' element={<IndexInfoUsuario />} />
              </Route>
              <Route path='/auth' element={<AuthLayout />}>
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
                <Route path='bienvenida' element={<Bienvenida />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
