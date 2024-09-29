import SubsBoard from '@/views/board/SubsBoard.vue';
import SubBoardPost from '@/views/board/SubsPost.vue';
import SubsRegistration from '@/views/board/SubsRegist.vue';

const SubsBoardRoutes = [
  {
    path: "/:boardType",
    component: SubsBoard,
    props: true // boardType을 제대로 전달하는지 확인
  },
  {
    path: "/subsboard/:id",
    component: SubBoardPost,
    props: route => ({ boardType: route.params.boardType, id: route.params.id }) // props로 boardType과 id를 전달
  },
  {
    path: '/registration', // 글쓰기 경로
    name: 'goToRegister',
    component: SubsRegistration,
  },
];

export default SubsBoardRoutes;
