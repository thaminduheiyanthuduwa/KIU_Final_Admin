export default [
  {
    path: '/apps/documents/library_documents',
    name: 'apps-documents-library_documents',
    component: () => import('@/views/documents/library_documents/vue-good-table/GoodTable.vue'),
    meta: {
      pageTitle: 'Library Documents',
      breadcrumb: [
        {
          text: 'Documents',
        },
        {
          text: 'Library Documents',
          active: true,
        },
      ],
    },
  },
  {
    path: '/apps/documents/creat_library_documents',
    name: 'creatLibraryDocuments',
    component: () => import('@/views/documents/library_documents/create'),
    meta: {
      pageTitle: 'Creat Library Documents',
    },
  },
  {
    path: '/apps/documents/edit_library_documents/:id',
    name: 'editLibraryDocuments',
    component: () => import('@/views/documents/library_documents/edit'),
    meta: {
      pageTitle: 'Edit Library Documents',
    },
  },
]
