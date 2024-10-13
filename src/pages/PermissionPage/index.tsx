import {usePermissions} from "../../utils/usePermissions.ts";
import {useSnackbar} from "notistack";
import {Navigate} from "react-router-dom";
import {ReactNode} from "react";

type PermissionPagePropsType = {
    permission: string;
    children?: ReactNode

};

export function PermissionPage(props: PermissionPagePropsType) {
    const permission = usePermissions();
    const {enqueueSnackbar} = useSnackbar();
    if (!permission.has(props.permission)){
        enqueueSnackbar('Доступ запрещен', {variant: 'error'});
        return <Navigate to="/dashboard" replace/>

    }
    return <>{props.children}</>;
}

export default PermissionPage;