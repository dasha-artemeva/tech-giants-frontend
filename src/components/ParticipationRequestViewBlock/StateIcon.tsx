import {ParticipationRequestState} from "../../services/ParticipationRequestService/schemas.ts";
import PendingIcon from '@mui/icons-material/Pending';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';
import {createElement, useId} from "react";
import {Typography} from "@mui/material";

type StateIconPropsType = {
    state: ParticipationRequestState;
};

export function StateIcon(props: StateIconPropsType) {
    const components = {
        'pending': [
            PendingIcon,
            'Ожидает проверки модератором',
            'warning'
        ],
        'accepted': [
            CheckCircleOutlineIcon,
            'Одобрено',
            'success'
        ],
        'rejected': [
            ErrorIcon,
            'Отклонено',
            'error'
        ],
    }
    const [component, text, color] = components[props.state]
    const id = useId();
    return createElement(
        component,
        {
            color: color,
            alt: text,
            sx: {title: text},
            id: id,
        }
    );

}

export default StateIcon;