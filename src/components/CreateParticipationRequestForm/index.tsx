import {Alert, Box, Button, Collapse, Divider, IconButton, TextField, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FormTextInput from "../FormTextInput";
import authService from "../../services/AuthService";
import {useGlobalStore} from "../../stores/global.store.ts";
import {CreateParticipationRequestDto} from "../../services/ParticipationRequestService/schemas.ts";
import {Controller, useForm} from "react-hook-form";
import {useUserStore} from "../../stores/user.store.ts";
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import {MuiFileInput} from "mui-file-input";
import {participationRequestService} from "../../services/ParticipationRequestService";
import {ServiceError} from "../../services/errors.ts";
import {useNavigate} from "react-router-dom";

type CreateParticipationRequestFormPropsType = {

};

export function CreateParticipationRequestForm(props: CreateParticipationRequestFormPropsType) {
    const globalStore = useGlobalStore();
    const userStore = useUserStore();
    const {control, handleSubmit, formState: {errors}, reset, setError} = useForm<CreateParticipationRequestDto>({
        defaultValues: {
            text: '',
            authors: `${userStore.user!.name!}\n`,
            title: '',
        }
    });
    const navigate = useNavigate();
    const onSubmit = async (data: CreateParticipationRequestDto) => {
        try{
            await participationRequestService.create(data);
            reset();
            globalStore.setCreateParticipationRequestModalOpened(false);
            navigate('/dashboard/requests')
        }catch (e){
            if (e instanceof ServiceError){
                e.handle_errors(setError);
            }
            console.error(e)
        }
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
                    Отправить заявку
                </Typography>
                <IconButton onClick={() => globalStore.setCreateParticipationRequestModalOpened(false)}>
                    <CloseIcon/>
                </IconButton>
            </Box>
            <Divider/>

            <FormTextInput name="title" control={control} label="Заголовок"/>
            <FormTextInput name="text" label="Аннотация" control={control} textFieldProps={{multiline: true}}/>
            <FormTextInput name="authors" label="ФИО всех авторов" control={control} textFieldProps={{multiline: true}}/>
            <Controller
                name="media"
                control={control}
                render={({field, fieldState}) => (
                    <MuiFileInput
                        label="Статья (нажмите чтобы прикрепить файл)"
                        placeholder="Нажмите чтобы прикрепить файл"
                        sx={{
                            cursor: "pointer"
                        }}
                        size="small"
                        variant="filled"
                        {...field}
                        helperText={fieldState.error ? fieldState.error.message : null}
                        error={fieldState.invalid}
                        InputProps={{
                            inputProps: {
                                accept: '.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                            }
                        }}
                    />
                )}
            />

            <Collapse orientation="vertical" in={!!errors.root?.detail}>
                <Alert variant="filled" severity="error">
                    {errors.root?.detail?.message}
                </Alert>
            </Collapse>

            <Button variant="contained" onClick={handleSubmit(onSubmit)}>Отправить</Button>
        </Box>
    </>)
}

export default CreateParticipationRequestForm;