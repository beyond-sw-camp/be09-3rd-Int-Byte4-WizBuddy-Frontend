import ManualBoard from '@/views/board/ManualBoard.vue';
import PostDetail from '@/components/board/ManualPostDetail.vue';

const ManualBoardRoutes = [
    {
      path: "/:boardType",
      component: ManualBoard,
      props: true // boardType을 제대로 전달하는지 확인
    },
    {
      path: "/manualboard/:id",
      component: PostDetail,
      props: route => ({ boardType: route.params.boardType, id: route.params.id }) // props로 boardType과 id를 전달
    }
  ];

export default ManualBoardRoutes;