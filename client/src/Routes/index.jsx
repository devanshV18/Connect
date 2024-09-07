import {createBrowserRouter} from "react-router-dom"
import App from "../App"
import RegisterPage from "../Pages/RegisterPage"
import CheckEmailPage from "../Pages/CheckEmailPage"
import CheckPasswordPage from "../Pages/CheckPasswordPage"
import Home from "../Pages/Home"
import Message from "../components/Message"
import AuthLayouts from "../layout"
import ForgotPassword from "../Pages/ForgotPassword"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "register",
                element: <AuthLayouts><RegisterPage/></AuthLayouts>
            },
            {
                path: "check-email",
                element: <AuthLayouts><CheckEmailPage/></AuthLayouts>
            },
            {
                path: "check-password",
                element: <AuthLayouts><CheckPasswordPage/></AuthLayouts>
            },
            {
                path: 'forgot-password',
                element: <AuthLayouts><ForgotPassword/></AuthLayouts>
            },
            {
                path: "",
                element: <Home/>,
                children: [
                    {
                        path: ":userId",
                        element: <Message/>
                    }
                ]
            }
        ]
    }
])

export default router