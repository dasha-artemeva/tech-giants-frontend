import {ParticipationRequestDto} from "../../services/ParticipationRequestService/schemas.ts";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Divider,
    Grid2 as Grid, Link,
    Stack, TextField,
    Typography
} from "@mui/material";
import StateIcon from "./StateIcon.tsx";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {ReactNode} from "react";


type ParticipationRequestViewBlockPropsType = {
    participation_request: ParticipationRequestDto;
    footer?: ReactNode;
};


export function ParticipationRequestViewBlock(props: ParticipationRequestViewBlockPropsType) {
    const r = props.participation_request;
    return (<>
        <Box my={1}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Grid container display="flex" flexGrow={1}>
                        <Grid size={1} display="flex" alignItems="center">
                            <Typography color="text.secondary">
                                #{r.id}
                            </Typography>
                        </Grid>
                        <Grid size={10} display="flex" alignItems="center">
                            <Typography>
                                {r.title}
                            </Typography>
                        </Grid>
                        <Grid size={1} display="flex" alignItems="center">
                            <StateIcon state={r.state}/>
                        </Grid>
                    </Grid>
                </AccordionSummary>
                <Divider/>
                <AccordionDetails>
                    <Box width="100%">
                        <Stack direction="column" gap={1} overflow="hidden">
                            <Box>
                                <Typography color="text.hint" variant="body1">
                                    Описание
                                </Typography>
                                <Typography variant="body2">
                                    {r.text}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography color="text.hint" variant="body1">
                                    Авторы
                                </Typography>
                                <Typography variant="body2" whiteSpace="pre-wrap">
                                    {r.authors}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography color="text.hint" variant="body1">
                                    Вложение
                                </Typography>
                                <Link
                                    color="text.hint"
                                    sx={{cursor: "pointer"}}
                                    download
                                    href={r.media}
                                >
                                    Скачать
                                </Link>
                            </Box>
                            {props.footer ?? null}
                        </Stack>
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    </>);
}

export default ParticipationRequestViewBlock;