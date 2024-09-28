import NoticeBoard from '@/views/board/NoticeBoard.vue';
import NoticePostDetail from '@/components/board/NoticePostDetail.vue';

const NoticeBoardRoutes = [
    {
        path: "/noticeboard",
        component: NoticeBoard
    },
    {
        path: '/noticeboard/:id',
        component: NoticePostDetail,
        props: true
    }
];

export default NoticeBoardRoutes;