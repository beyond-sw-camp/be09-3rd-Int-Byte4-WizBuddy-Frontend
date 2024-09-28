import NoticeBoard from '@/views/board/NoticeBoard.vue';
import NoticePostDetail from '@/components/board/NoticePostDetail.vue';
import PostCreate from '@/components/board/PostCreate.vue';

const NoticeBoardRoutes = [
    {
        path: "/noticeboard",
        component: NoticeBoard
    },
    {
        path: '/noticeboard/:id',
        component: NoticePostDetail,
        props: true
    },
    {
        path: "/noticeboard/register",
        component: PostCreate,
        props: true
    }
];

export default NoticeBoardRoutes;