import {Box, Button, Container, Stack, Typography, useTheme} from "@mui/material";
import {useConferenceStore} from "../../stores/conference.store.ts";
import {useEffect} from "react";
import {useGlobalStore} from "../../stores/global.store.ts";
import {DateTime} from "luxon";

export function Index() {
    const conferenceStore = useConferenceStore();
    useEffect(() => {
        conferenceStore.refresh();
    }, [conferenceStore])
    const globalStore = useGlobalStore();
    const confStart = new DateTime(conferenceStore.conference!.start_date).setLocale('ru').toFormat('d MMMM');
    const theme = useTheme();
    console.log(theme.palette.primary.main)
    return (<>
        <Container>
            <Stack direction="column" gap={2}>
                <Typography variant="h6" color="primary">
                    {conferenceStore.conference?.grade}
                </Typography>
                <Typography variant="h3">
                    {conferenceStore.conference?.short_name}
                </Typography>
                <Typography variant="body1" color="text.hint">
                    {conferenceStore.conference?.name}
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: 3,
                        maxWidth: {
                            sm: '30%'
                        }
                    }}
                    onClick={() => globalStore.setAuthModalOpened(true)}
                >
                    Подать заявку
                </Button>
                <Box width="60%">
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        flexDirection={() => ({xs: 'column', sm: 'row'})}
                        gap={2}
                    >
                        <Box sx={{
                            borderLeft: 2,
                            borderColor: 'secondary.main',
                            pl: 1
                        }}>
                            <Typography variant="body1" color="text.hint">
                                Начало
                            </Typography>
                            <Typography variant="body2">
                                {confStart}
                            </Typography>
                        </Box>
                        <Box sx={{
                            borderLeft: 2,
                            borderColor: 'secondary.main',
                            pl: 1
                        }}>
                            <Typography variant="body1" color="text.hint">
                                Продолжительность
                            </Typography>
                            <Typography variant="body2">
                                {conferenceStore.conference!.duration}
                            </Typography>
                        </Box>
                        <Box sx={{
                            borderLeft: 2,
                            borderColor: 'secondary.main',
                            pl: 1
                        }}>
                            <Typography variant="body1" color="text.hint">
                                Формат конференции
                            </Typography>
                            <Typography variant="body2">
                                {conferenceStore.conference!.format}
                            </Typography>
                        </Box>

                    </Box>
                </Box>
            </Stack>
        </Container>
    </>);
}

export default Index;