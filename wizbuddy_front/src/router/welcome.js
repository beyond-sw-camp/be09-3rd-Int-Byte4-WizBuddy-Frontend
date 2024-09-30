import LoginPage from "@/views/user/LoginPage.vue";
import SignupPage from "@/views/user/SignupPage.vue";

const WelcomeRoutes = [
    {
        path: "/login",
        component: LoginPage,
    },
    {
        path: "/signup",
        component: SignupPage,
    },
];

export default WelcomeRoutes;