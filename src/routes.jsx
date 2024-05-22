import { AuthPage } from "./Pages/Auth/AuthPage.jsx";
import { NotFoundPage} from "./Pages/NotFoundPage/NotFoundPage.jsx"
import { Rooms } from "./Pages/Rooms/Rooms.jsx";
import { EventContent } from "./components/Event/EventContent.jsx";
import { HotelContent } from "./components/Hotel/HotelContent.jsx";
import { ProfileContent } from "./components/Profile/ProfileContent.jsx";


export const routes = [
    {path: '/', element: <AuthPage />},
    {path: '/rooms/*', element: <Rooms/>},
    {path: '/hotels/*', element: <HotelContent/>},
    {path: '/events/*', element: <EventContent/>},
    {path: '/profile/*', element: <ProfileContent/>},
    {path: '*', element: <NotFoundPage />}

]
