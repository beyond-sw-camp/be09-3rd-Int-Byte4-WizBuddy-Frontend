import ChecklistCreatePage from "@/views/checklist/ChecklistCreatePage.vue";
import ChecklistDetailPage from "@/views/checklist/ChecklistDetailPage.vue";
import ChecklistListPage from "@/views/checklist/ChecklistListPage.vue";

const ChecklistRoutes = [
  {
    path: "/checklist",
    component: ChecklistListPage,
  },
  {
    path: "/checklist/:id",
    component: ChecklistDetailPage,
  },
  {
    path: "/checklist/create",
    component: ChecklistCreatePage,
  },
];

export default ChecklistRoutes;
