import ScheduleMainPage from "@/components/schedule/Main.vue";
import FindAllSchedules from "@/components/schedule/FindAllSchedules.vue";
import ScheduleRegisterPage from "@/components/schedule/RegisterPage.vue";
import ScheduleDeletePage from "@/components/schedule/DeletePage.vue";
import ScheduleEditPage from '@/components/schedule/EditPage.vue';

const ScheduleRoutes = [
    {
        path: "/schedule",
        component: ScheduleMainPage
        // meta: { requiresAuth: true }
    },
    {
        path: "/schedule/regist",
        component: ScheduleRegisterPage
    },
    {
        path: "/schedule/delete",
        component: ScheduleDeletePage
    },
    {
        path: "/schedule/schedules",
        component: FindAllSchedules
    },
    { 
        path: "/schedule/edit", 
        name: "ScheduleEdit",
        component: ScheduleEditPage 
    }
];

export default ScheduleRoutes;
