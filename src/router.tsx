import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AppLayout from "./AppLayout.tsx";
import Index from "./pages/Index";
import {Dashboard} from "./pages/Dashboard";
import Profile from "./pages/Profile";
import RequestsUserPage from "./pages/RequestsUserPage";
import FilledProfilePage from "./pages/FilledProfilePage";
import PermissionPage from "./pages/PermissionPage";
import ModerationPage from "./pages/ModerationPage";

export function AppRouter() {
    return (<>
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout/>} path="/">
                    <Route index element={
                        <Index/>
                    } />
                    <Route path="dashboard" element={<Dashboard/>}>
                        <Route path="profile" element={
                            <Profile/>
                        }/>
                        <Route path="requests" element={
                            <FilledProfilePage>
                                <RequestsUserPage/>
                            </FilledProfilePage>
                        } />
                        <Route path="moderation" element={
                            <PermissionPage permission="members.moderator_participationrequest">
                                <ModerationPage/>
                            </PermissionPage>
                        }/>
                        <Route index path="*" element={
                            <Navigate to="/dashboard/profile" replace />
                        }/>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </>);
}

export default AppRouter;