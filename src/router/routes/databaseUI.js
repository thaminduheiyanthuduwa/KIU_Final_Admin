export default [
  {
    path: '/apps/databaseUI',
    name: 'apps-databaseUI',
    component: () => import('@/views/databaseUI/vue-good-table/GoodTable.vue'),
    meta: {
      pageTitle: 'Database UI',
      breadcrumb: [
        {
          text: 'Database UI',
        },
        {
          text: 'Database UI Table',
          active: true,
        },
      ],
    },
  },
  {
    path: '/apps/databaseUI/creatDatabaseUI',
    name: 'creatDatabaseUI',
    component: () => import('@/views/databaseUI/createResources'),
    meta: {
      pageTitle: 'Creat Database UI',
    },
  },
  {
    path: '/apps/databaseUI/editDatabaseUI/:databaseUI_id',
    name: 'editResources',
    component: () => import('@/views/databaseUI/editResources'),
    meta: {
      pageTitle: 'Edit Database UI',
    },
  },
]
