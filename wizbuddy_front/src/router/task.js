import TaskCreatePage from "@/views/task/TaskCreatePage.vue";
import TaskListPage from "@/views/task/TaskListPage.vue";

const TaskRoutes = [
    {
        path: "/task",
        component: TaskListPage
    },
    {
        path: "/task/create",
        component: TaskCreatePage,
    }
];

export default TaskRoutes;