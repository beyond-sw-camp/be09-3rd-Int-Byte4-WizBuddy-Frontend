import ChecklistListPage from "@/views/checklist/ChecklistListPage.vue";
import ChecklistPastPage from "@/views/checklist/ChecklistPastPage.vue";

const ChecklistRoutes = [
  {
    path: "/checklist",
    component: ChecklistListPage,
  },
  {
    path: "/checklist/past",
    component: ChecklistPastPage,
  }
];

export default ChecklistRoutes;
