import TaskListPage from "@/views/task/TaskListPage.vue";

const TaskRoutes = [
    {
        path: "/task",
        component: TaskListPage,
        // meta: { requiresAuth: true }
    }
];

export default TaskRoutes;