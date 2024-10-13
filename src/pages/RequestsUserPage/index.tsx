import {useUserStore} from "../../stores/user.store.ts";
import {useSnackbar} from "notistack";
import {Navigate} from "react-router-dom";
import {Box, Button, CircularProgress, Divider, LinearProgress, Link, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {participationRequestService} from "../../services/ParticipationRequestService";
import ParticipationRequestViewBlock from "../../components/ParticipationRequestViewBlock";
import CenterModal from "../../components/CenterModal";
import {useGlobalStore} from "../../stores/global.store.ts";
import CreateParticipationRequestForm from "../../components/CreateParticipationRequestForm";

export function RequestsUserPage() {
    const [loading, setLoading] = useState(true);
    const [requests, setRequests] = useState(null);
    const userStore = useUserStore();

    useEffect(() => {
        setLoading(true);
        participationRequestService.getAll({user: userStore.user.id}).then((d) => {
            setRequests(d);
            setLoading(false);
        });
    }, [])
    const globalStore = useGlobalStore();
    return (<>
        <Box sx={{display: "flex"}} flexGrow={1} justifyContent="space-between" flexDirection="row">
            <h3>Мои заявки</h3>
            <Box display="flex" alignItems="center">
                <Box>
                    <Button variant="contained" onClick={() => globalStore.setCreateParticipationRequestModalOpened(true)}>
                        Создать
                    </Button>
                </Box>
            </Box>
        </Box>
        <Divider/>
        <Box sx={{py: 2}}>
            {loading && !requests && (<>
                <LinearProgress/>
            </>)}
            {requests && requests.length === 0 && (
                <Typography variant="body2" color="text.primary">
                    У вас еще нет заявок <Link sx={{cursor: "pointer"}} onClick={() => globalStore.setCreateParticipationRequestModalOpened(true)}>создать</Link>
                </Typography>
            )}
            {requests && (<>
                {requests.map((d) => (
                    <ParticipationRequestViewBlock key={d.id} participation_request={d}/>
                ))}
            </>)}
        </Box>
        <CenterModal open={globalStore.createParticipationRequestModalOpened}>
            <CreateParticipationRequestForm/>
        </CenterModal>
    </>);
}

export default RequestsUserPage;