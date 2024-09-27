import ScheduleMainPage from "@/components/schedule/Main.vue";
import FindAllSchedules from "@/components/schedule/FindAllSchedules.vue";
import ScheduleRegisterPage from "@/components/schedule/ScheduleRegisterPage.vue";

const ScheduleRoutes = [
    { 
        path: '/schedule', 
        component: ScheduleMainPage,
        // meta: { requiresAuth: true }
    }
        // children: [
        //     {
        //         path: 'regist',
        //         component: RegisterWeeklySchedule
        //     },
        // ]
    },
    {
        path: '/schedule/regist',
        component: ScheduleRegisterPage
    },
    {
        path: '/schedule/schedules',
        component: FindAllSchedules
    },
    // { path: "/schedule/edit", component: EditPage },
    // { path: "/schedule/delete", component: DeletePage },
];

export default ScheduleRoutes;