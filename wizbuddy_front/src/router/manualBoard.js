import ManualBoard from '@/views/board/ManualBoard.vue';
import ManualPostDetail from '@/components/board/ManualPostDetail.vue';

const ManualBoardRoutes = [
    {
        path: "/manualboard",
        component: ManualBoard,
        // meta: { requiresAuth: true }
    },
    {
        path: '/manualboard/:id',  // Dynamic route parameter for the board ID
        component: ManualPostDetail,      // The component that displays the post details
        props: true               // Pass route params as props
    }
];

export default ManualBoardRoutes;