import React, {useEffect} from 'react'
import './App.css'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import {Menu} from '@mui/icons-material';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {Login} from "../features/Login/Login";
import {Routes, Route, Navigate} from "react-router-dom";
import {NotFound} from "../features/NotFound/NotFound";
import CircularProgress from "@mui/material/CircularProgress";
import { logoutTC } from '../features/Login/authReducer/authReducer'

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(initializeAppTC())
    }, [])

    const onClickLogout = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    {/*<IconButton edge="start" color="inherit" aria-label="menu">*/}
                    {/*    <Menu/>*/}
                    {/*</IconButton>*/}
                    <Typography variant="h6">
                        Todo
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={onClickLogout} style={{marginLeft : "20px", backgroundColor: "white", color: "#1976D2", fontWeight:"bold"}}>Logout</Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress/>}
                {console.log(121212)}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path="/todolist" element={<TodolistsList demo={demo}/>}/>
                    <Route path="login" element={<Login/>}/>
                    <Route path="404" element={<NotFound />} />
                    <Route path="*" element={<Navigate to={"404"}/>}/>
                </Routes>
            </Container>
        </div>
    )
}

export default App
