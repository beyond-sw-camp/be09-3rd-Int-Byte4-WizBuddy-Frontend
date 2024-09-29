import ManualBoard from '@/views/board/ManualBoard.vue';
import ManualPostDetail from '@/components/board/ManualPostDetail.vue';
import PostCreate from '@/components/board/PostCreate.vue';

const ManualBoardRoutes = [
    {
      path: "/:boardType",
      component: ManualBoard,
      props: true // boardType을 제대로 전달하는지 확인
    },
    {
        path: '/manualboard/:id',  // Dynamic route parameter for the board ID
        component: ManualPostDetail,      // The component that displays the post details
        props: true               // Pass route params as props
    },
    {
        path: "/manualboard/register",
        component: PostCreate,
        props: true
    }
  ];

export default ManualBoardRoutes;