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
    component: ChecklistListPage,
  },
  {
    path: "/checklist/create",
    component: ChecklistCreatePage,
  },
  {
    path: "/sssssssssssssss",
    component: ChecklistDetailPage, // 이게 필요하려나,,?
  },
];

export default ChecklistRoutes;
