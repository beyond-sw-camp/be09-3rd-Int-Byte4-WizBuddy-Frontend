import ScheduleMainPage from "@/views/schedule/Main.vue";
import WeeklySchedule from "@/views/schedule/WeeklySchedule.vue";
import ScheduleRegisterPage from "@/views/schedule/RegisterPage.vue";
import ScheduleDeletePage from "@/views/schedule/DeletePage.vue";
import ScheduleEditPage from '@/views/schedule/EditPage.vue';

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
        component: WeeklySchedule
    },
    { 
        path: "/schedule/edit", 
        name: 'ScheduleEdit',
        component: ScheduleEditPage,
        props: (route) => ({
            date: route.query.date,
            title: route.query.title,
            time: route.query.time
        })
    }
];

export default ScheduleRoutes;
