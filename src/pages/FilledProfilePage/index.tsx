import {useUserStore} from "../../stores/user.store.ts";
import {useSnackbar} from "notistack";
import {Navigate} from "react-router-dom";

function FilledProfilePage({children}) {
    const userStore = useUserStore();
    const {enqueueSnackbar} = useSnackbar();
    if (!userStore.user){
        enqueueSnackbar('Вы не авторизованы', {variant: 'error'});
        return <Navigate to="/" replace/>
    }
    if (!userStore.user?.is_filled_by_user){
        enqueueSnackbar('Вам необходимо заполнить профиль', {variant: 'error'});
        return <Navigate to="/dashboard/profile" replace/>
    }
    return (<>
        {children}
    </>);
}

export default FilledProfilePage;