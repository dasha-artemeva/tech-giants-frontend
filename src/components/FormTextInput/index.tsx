import {TextField, TextFieldProps} from "@mui/material";
import {Control, Controller} from "react-hook-form";



export type FormTextInputProps = {
    name: string;
    label: string;
    control: Control;
    textFieldProps?: TextFieldProps;

}


export function FormTextInput({name, control, label, textFieldProps}: FormTextInputProps) {
    return (<>
        <Controller
            name={name}
            control={control}
            render={({field, fieldState}) => (
                <TextField
                    {...textFieldProps}
                    variant="standard"
                    label={label}
                    value={field.value}
                    onChange={(e) => {
                        field.onChange(e);
                    }}
                    error={!!fieldState.error}
                    helperText={fieldState.error ? fieldState.error.message : null}
                />
            )}
        />
    </>);
}

export default FormTextInput;