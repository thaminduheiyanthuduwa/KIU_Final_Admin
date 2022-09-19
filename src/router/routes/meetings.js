export default[
  {
    path: '/apps/meetings',
    name: 'apps-meetings',
    component: () => import('@/views/meetings/vue-good-table/GoodTable.vue'),
    meta: {
      pageTitle: 'Meetings',
    },
  },
  {
    path: '/apps/meetings/createGroup',
    name: 'createGroup',
    component: () => import('@/views/meetings/createGroup'),
    meta: {
      pageTitle: 'Create Group',
    },
  },
  {
    path: '/apps/meetings/createMeeting',
    name: 'creatMeeting',
    component: () => import('@/views/meetings/createMeeting'),
    meta: {
      pageTitle: 'Create Meeting',
    },
  },
  {
    path: '/apps/meetings/editMeetings/:resources_id',
    name: 'editMeetings',
    component: () => import('@/views/meetings/editResources'),
    meta: {
      pageTitle: 'Edit Meetings',
    },
  },
]
