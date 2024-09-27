import TaskCreatePage from "@/views/task/TaskCreatePage.vue";
import TaskDetailPage from "@/views/task/TaskDetailPage.vue";
import TaskEditPage from "@/views/task/TaskEditPage.vue";
import TaskListPage from "@/views/task/TaskListPage.vue";

const TaskRoutes = [
  {
    path: "/task",
    component: TaskListPage,
  },
  {
    path: "/task/create",
    component: TaskCreatePage,
  },
  {
    path: "/task/:id",
    component: TaskDetailPage,
  },
  {
    path: "/task/edit/:id",
    component: TaskEditPage,
  },
];

export default TaskRoutes;
