import NoticeBoard from '@/views/board/NoticeBoard.vue';
import NoticePostDetail from '@/components/board/NoticePostDetail.vue';
import PostCreate from '@/components/board/PostCreate.vue';
import PostEdit from '@/components/board/PostEdit.vue';

const NoticeBoardRoutes = [
    {
        path: "/noticeboard",
        component: NoticeBoard,
        props: true
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
    },
    {
        path: '/noticeboard/:id/edit',
        component: PostEdit,
        props: true
    }
];

export default NoticeBoardRoutes;