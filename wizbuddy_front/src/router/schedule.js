import ScheduleMainPage from "@/components/schedule/Main.vue";
import FindAllSchedules from "@/components/schedule/FindAllSchedules.vue";

const ScheduleRoutes = [
    { 
        path: '/schedule', 
        component: ScheduleMainPage,
        // children: [
        //     {
        //         path: 'regist',
        //         component: RegisterWeeklySchedule
        //     },
        // ]
    },
    {
        path: '/schedule/schedules',
        component: FindAllSchedules
    },
    // { path: "/schedule/edit", component: EditPage },
    // { path: "/schedule/delete", component: DeletePage },
];

export default ScheduleRoutes;