import SubsBoard from '@/views/board/SubsBoard.vue';
import SubBoardPost from '@/views/board/SubsPost.vue';
import SubsRegistration from '@/views/board/SubsRegist.vue';

const SubsBoardRoutes = [
  {
    path: "/subsboard",
    component: SubsBoard
  },
  {
    path: "/subsboard/:id",
    component: SubBoardPost,
    props: true
  },
  {
    path: '/subsboard/register', // 글쓰기 경로
    component: SubsRegistration,
    props: true
  },
];

export default SubsBoardRoutes;
