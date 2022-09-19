export default [
  {
    path: '/apps/library_concerns',
    name: 'apps-library_concerns',
    component: () => import('@/views/libraryConcerns/vue-good-table/GoodTable.vue'),
    meta: {
      pageTitle: 'Library Concerns',
      breadcrumb: [
        {
          text: 'Table',
        },
        {
          text: 'libraryConcerns Table',
          active: true,
        },
      ],
    },
  },
  {
    path: '/apps/libraryConcerns/creat',
    name: 'creatLibraryConcerns',
    component: () => import('@/views/libraryConcerns/createResources'),
    meta: {
      pageTitle: 'Creat Library Concerns',
    },
  },
  {
    path: '/apps/libraryConcerns/edit/:resources_id',
    name: 'editLibraryConcerns',
    component: () => import('@/views/libraryConcerns/editResources'),
    meta: {
      pageTitle: 'Edit Library Concerns',
    },
  },
]
