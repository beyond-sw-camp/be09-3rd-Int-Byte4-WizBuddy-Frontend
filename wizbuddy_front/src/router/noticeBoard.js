import NoticeBoard from '@/views/board/NoticeBoard.vue';
// import NoticeDetail from '@/components/board/NoticePostDetail.vue';

const NoticeBoardRoutes = [
    {
      path: "/:boardType",
      component: NoticeBoard,
      props: true // boardType을 제대로 전달하는지 확인
    },
    // {
    //   path: "/noticeboard/:id",
    //   component: NoticeDetail,
    //   props: route => ({ boardType: route.params.boardType, id: route.params.id }) // props로 boardType과 id를 전달
    // }
    
  ];

export default NoticeBoardRoutes;