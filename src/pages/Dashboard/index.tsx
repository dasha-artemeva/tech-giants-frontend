import {Container, Grid2 as Grid, List, ListItemButton, ListItemText, Paper} from "@mui/material";
import {useUserStore} from "../../stores/user.store.ts";
import {Outlet, useNavigate} from "react-router-dom";
import Profile from "../Profile";
import {usePermissions} from "../../utils/usePermissions.ts";
import React, { useEffect } from 'react';

export function Dashboard() {
    const {user} = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/'); // Редирект на главную страницу
        }
    }, [user, navigate]);
    const permissions = usePermissions();
    const buttons = [
        {
            name: 'Редактирование профиля',
            path: 'profile',
            show: true,

        },
        {
            name: 'Мои заявки',
            path: 'requests',
            show: true,
        },
        {
            name: 'Модерирование заявок',
            path: 'moderation',
            show: permissions.has('members.moderator_participationrequest'),
        }
    ]

    return (<>
        <Container>
            <Grid container spacing={2}>
                <Grid size={{xs: 12, md: 3}}>
                    <Paper sx={{bgcolor: 'background.paper'}}>
                        <List>
                            {buttons.filter(p => p.show).map(p => (
                                <ListItemButton key={p.path} onClick={() => navigate(`/dashboard/${p.path}`)} selected={location.pathname.includes(`/dashboard/${p.path}`)}>
                                    <ListItemText primary={p.name}/>
                                </ListItemButton>
                            ))}
                        </List>
                    </Paper>
                </Grid>
                <Grid size={{xs: 12, md: 9}} position="relative" minHeight="100%">
                    <Outlet/>
                </Grid>
            </Grid>
        </Container>
    </>);
}

export default Profile;