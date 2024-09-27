import ManualBoard from '@/views/board/ManualBoard.vue';
import PostDetail from '@/components/board/ManualPostDetail.vue';

const ManualBoardRoutes = [
    {
        path: "/manualboard",
        component: ManualBoard
    },
    {
        path: '/manualboard/:id',  // Dynamic route parameter for the board ID
        component: PostDetail,      // The component that displays the post details
        props: true,                // Pass route params as props
    }
];

export default ManualBoardRoutes;