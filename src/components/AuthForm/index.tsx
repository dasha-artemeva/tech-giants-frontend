import {Alert, Box, Button, Collapse, Divider, IconButton, TextField, Typography} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useState} from "react";
import authService from "../../services/AuthService";
import {ServiceError} from "../../services/errors.ts";
import {LoginOrRegisterDto} from "../../services/AuthService/schemas.ts";
import {Navigate, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import FormTextInput from "../FormTextInput";
import {useGlobalStore} from "../../stores/global.store.ts";
import {useUserStore} from "../../stores/user.store.ts";


export interface AuthFormProps {
    onClose?: () => void;
}

export function AuthForm({onClose}: AuthFormProps) {
    const [loading, setLoading] = useState(false);
    const globalStore = useGlobalStore();
    const userStore = useUserStore();
    const {control, handleSubmit, setError, formState: {errors}} = useForm<LoginOrRegisterDto>({
        defaultValues: {
            username: '',
            email: '',
            password: '',
        },
        reValidateMode: 'onSubmit',
    });
    const onSubmit = (action) => async (data: LoginOrRegisterDto) => {
        setLoading(true);
        try{
            await action(data);
            globalStore.setAuthModalOpened(false);
            await userStore.refresh()
        }catch (e){
            if (e instanceof ServiceError){
                e.handle_errors(setError);
            }
        }
        setLoading(false);
    }
    return (<>
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}
        >
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Typography color="white" variant="h6">
                    Авторизация
                </Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon/>
                </IconButton>
            </Box>
            <Divider/>

            <FormTextInput name="username" control={control} label="Логин"/>
            <FormTextInput name="email" control={control} label="Почта"/>
            <FormTextInput name="password" control={control} label="Пароль" textFieldProps={{type: "password"}}/>

            <Collapse orientation="vertical" in={!!errors.root?.detail}>
                <Alert variant="filled" severity="error">
                    {errors.root?.detail?.message}
                </Alert>
            </Collapse>

            <Button variant="contained" disabled={loading} onClick={handleSubmit(onSubmit(authService.login.bind(authService)))}>Войти</Button>
            <Button variant="contained" disabled={loading} onClick={handleSubmit(onSubmit(authService.register.bind(authService)))}>Зарегистрироваться</Button>
        </Box>
    </>);
}

export default AuthForm;