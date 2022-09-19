export default[
  {
    path: '/apps/eResources',
    name: 'apps-eResources',
    component: () => import('@/views/eResources/vue-good-table/GoodTable.vue'),
    meta: {
      pageTitle: 'E Resources',
    },
  },
  {
    path: '/apps/eResources/creatResources',
    name: 'creatResources',
    component: () => import('@/views/eResources/createResources'),
    meta: {
      pageTitle: 'Creat E Resources',
    },
  },
  {
    path: '/apps/eResources/editResources/:resources_id',
    name: 'editResources',
    component: () => import('@/views/eResources/editResources'),
    meta: {
      pageTitle: 'Edit E Resources',
    },
  },
]
