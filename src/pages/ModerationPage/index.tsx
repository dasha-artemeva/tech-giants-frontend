import {Box, Button, FormControl, InputLabel, LinearProgress, Link, MenuItem, Select, Typography} from "@mui/material";
import ParticipationRequestViewBlock from "../../components/ParticipationRequestViewBlock";
import {useEffect, useId, useState} from "react";
import {participationRequestService} from "../../services/ParticipationRequestService";
import {
    ParticipationRequestState,
} from "../../services/ParticipationRequestService/schemas.ts";

export function ModerationPage() {
    const [requests, setRequests] = useState(null);
    const [loading, setLoading] = useState(false);
    const [stateFilter, setStateFilter] = useState<ParticipationRequestState>('pending');

    useEffect(() => {
        setRequests(null);
        setLoading(true);
        participationRequestService.getAll({state: stateFilter}).then((d) => {
            setRequests(d);
            setLoading(false);
        });

    }, [stateFilter]);
    const acceptRequest = async (id: number) => {
        await participationRequestService.patch(id, {state: 'accepted'})
        setStateFilter('accepted')
    }
    const rejectRequest = async (id: number) => {
        await participationRequestService.patch(id, {state: 'rejected'})
        setStateFilter('rejected')
    }
    const selectStateId = useId();
    return (<>
        <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5">

            </Typography>
            <Box minWidth={200}>
                <FormControl fullWidth>
                    <Select
                        labelId={selectStateId}
                        size="small"
                        defaultValue="pending"
                        onChange={(e) => setStateFilter(e.target.value)}
                    >
                        <MenuItem value="pending">
                            Ожидают модерации
                        </MenuItem>
                        <MenuItem value="accepted">
                            Одобрено
                        </MenuItem>
                        <MenuItem value="rejected">
                            Отклонено
                        </MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
        <Box sx={{py: 2}}>
            {loading && !requests && (<>
                <LinearProgress/>
            </>)}
            {requests && requests.length === 0 && (
                <Typography variant="body2" color="text.primary">
                    Не найдено заявок
                </Typography>
            )}
            {requests && (<>
                {requests.map((d) => (
                    <ParticipationRequestViewBlock
                        key={d.id}
                        participation_request={d}
                        footer={d.state === 'pending' && (<>
                            <Box display="flex" justifyContent="space-between">
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => acceptRequest(d.id)}
                                >
                                    Одобрить
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => rejectRequest(d.id)}
                                >
                                    Отклонить
                                </Button>
                            </Box>
                        </>)}
                    />
                ))}
            </>)}
        </Box>
    </>);
}

export default ModerationPage;