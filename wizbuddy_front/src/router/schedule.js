import ScheduleMainPage from "@/components/schedule/Main.vue";
import RegisterWeeklySchedule from "@/components/schedule/RegisterWeeklySchedule.vue";
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
    }
];

export default ScheduleRoutes;