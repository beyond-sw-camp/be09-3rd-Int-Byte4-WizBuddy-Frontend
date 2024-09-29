import LoginPage from "@/views/user/LoginPage.vue";
import SignupPage from "@/views/user/SignupPage.vue";

const UserRoutes = [
    {
        path: "/login",
        component: LoginPage
        // meta: { requiresAuth: true }
    },
    {
        path: "/signup",
        component: SignupPage
    }
];

export default UserRoutes;
