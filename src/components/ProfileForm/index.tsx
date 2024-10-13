import {useForm} from "react-hook-form";
import {Alert, Box, Button, Collapse, Snackbar, TextField} from "@mui/material";
import FormTextInput from "../FormTextInput";
import {RetrieveUserDto, UpdateUserDto} from "../../services/AuthService/schemas.ts";
import {useUserStore} from "../../stores/user.store.ts";
import {useEffect} from "react";
import authService from "../../services/AuthService";
import {ServiceError} from "../../services/errors.ts";
import {useSnackbar} from "notistack";

export function ProfileForm() {
    const userStore = useUserStore();
    const {enqueueSnackbar} = useSnackbar();
    useEffect(() => {
        userStore.refresh();
    }, []);
    const {control, setError, formState: {errors}, handleSubmit, clearErrors} = useForm<UpdateUserDto>({
        defaultValues: {
            first_name: userStore.user?.first_name ?? '',
            last_name: userStore.user?.last_name ?? '',
            middle_name: userStore.user?.middle_name ?? '',
            phone_number: userStore.user?.phone_number ?? '',
            birth_date: (userStore.user?.birth_date ?? new Date()).toISOString().split('T')[0],
        }
    })
    const updateUser = async (data: UpdateUserDto) => {
        clearErrors();
        try{
            await authService.patch(data);
            await userStore.refresh();
            enqueueSnackbar('Профиль обновлен', {variant: 'success'});
        } catch (e){
            if (e instanceof ServiceError){
                e.handle_errors(setError);
            }
        }
    }
    return (<>
        <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                px: 3
            }}
        >
            <TextField variant="standard" label="email" value={userStore.user?.email} disabled/>
            <TextField variant="standard" label="username" value={userStore.user?.username} disabled/>
            <FormTextInput label="Имя" name="first_name" control={control}/>
            <FormTextInput label="Фамилия" name="last_name" control={control}/>
            <FormTextInput label="Отчество" name="middle_name" control={control}/>
            <FormTextInput label="Номер телефона" name="phone_number" control={control}/>
            <FormTextInput label="Дата рождения" name="birth_date" control={control} textFieldProps={{type: "date"}}/>
            <Collapse orientation="vertical" in={!!errors.root?.detail}>
                <Alert variant="filled" severity="error">
                    {errors.root?.detail?.message}
                </Alert>
            </Collapse>
            <Button onClick={handleSubmit(updateUser)} variant="contained">
                Обновить
            </Button>
        </Box>
    </>);
}

export default ProfileForm;