<template>
  <b-card>
    <b-button
        style="margin-bottom: 10px"
        variant="primary"
        @click="() => $router.push(`/apps/bookRequirements/creat_book_requirements`)"
    >
      Add
    </b-button>
    <b-sidebar
        id="sidebar-creat"
        backdrop
        bg-variant="white"
        right
        shadow
    >
      <sidebar-content title="Create"/>
    </b-sidebar>
    <b-sidebar
        id="sidebar-edit"
        backdrop
        bg-variant="white"
        right
        shadow
    >
      <sidebar-content title="Edit"/>
    </b-sidebar>
    <div class="custom-search">

      <!-- advance search input -->
      <b-row>
        <b-col md="4">
          <b-form-group>
            <label>Title:</label>
            <b-form-input
                class="d-inline-block"
                placeholder="Search"
                type="text"
                @input="advanceSearch"
            />
          </b-form-group>
        </b-col>

        <b-col md="4">
          <b-form-group>
            <label>Status:</label>
            <b-form-input
                class="d-inline-block"
                placeholder="Search"
                type="text"
                @input="advanceSearch"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </div>

    <!-- table -->
    <div>
      <b-table
          :current-page="currentPage"
          :fields="fields"
          :filter="filter"
          :items="items"
          :per-page="perPage"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          class="position-relative"
          hover
          responsive
          striped
      >
        <template #cell(show_details)="row">

          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          <b-form-checkbox
              v-model="row.detailsShowing"
              @change="row.toggleDetails"
          >
            {{ row.detailsShowing ? 'Hide' : 'Show' }}
          </b-form-checkbox>
        </template>

        <!-- full detail on click -->
        <template #row-details="row">
          <b-card>

            <b-row class="mb-2">
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Published Date : </strong>{{ row.item.added_date }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Title : </strong>{{ row.item.title }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Finalized Document : </strong>{{ row.item.document_image }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Department : </strong>{{ row.item.department }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Rejected Reason : </strong>{{ items[row.index].reason_if_rejected }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Status : </strong>{{ row.item.status }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Resource Title : </strong>{{ row.item.resource_title }}
              </b-col>
            </b-row>
            <div class="demo-inline-spacing">
              <b-button
                  size="sm"
                  variant="outline-secondary"
                  @click="row.toggleDetails"
              >
                Hide Details
              </b-button>
              <b-button
                  size="sm"
                  style="margin-left: 10px"
                  variant="outline-primary"
                  @click="() => $router.push(`/apps/bookRequirements/edit_book_requirements/${items[row.index].id}`)"
              >
                edit
              </b-button>
              <b-button
                  size="sm"
                  @click="deleteResource(row.item.id,5)"
                  style="margin-left: 10px"
                  variant="outline-danger"
              >
                Delete
              </b-button>
              <b-button
                  size="sm"
                  style="margin-left: 10px"
                  variant="outline-success"
                  @click="updateEResourceStatus(row.item.id,getStatus(row.item.status),5, getStatus(row.item.status))"
              >
                {{ getStatus(row.item.status) }}
              </b-button>
              <div v-if="row.item.head_approval == 0 && row.item.document_image != '' && row.item.status != 'draft'">
                <b-button
                    size="sm"
                    style="margin-left: 10px"
                    variant="outline-success"
                    @click="updateEResourceStatus(row.item.id,'Approve',5, 2)"
                >
                  Approve
                </b-button>
              </div>
              <div v-if="row.item.final_approval == 0 && row.item.head_approval == 1">
                <b-button
                    size="sm"
                    style="margin-left: 10px"
                    variant="outline-success"
                    @click="updateEResourceStatus(row.item.id,'Approve',5, 4)"
                >
                  Final Approval
                </b-button>
              </div>
            </div>
          </b-card>
        </template>

        <template #cell(avatar)="data">
          <b-avatar :src="data.value"/>
        </template>

        <template #cell(status)="data">
          <b-badge :variant="status[1][data.value]">
            {{ status[0][data.value] }}
          </b-badge>
        </template>
        <template #cell(head_approval)="data">
          <b-badge :variant="head_approval[1][data.value]">
            {{ head_approval[0][data.value] }}
          </b-badge>
        </template>

        <template #cell(final_approval)="data">
          <b-badge :variant="final_approval[1][data.value]">
            {{ final_approval[0][data.value] }}
          </b-badge>
        </template>
      </b-table>
    </div>
    <b-card-body class="d-flex justify-content-between flex-wrap pt-0">

      <!-- page length -->
      <b-form-group
          class="text-nowrap mb-md-0 mr-1"
          label="Per Page"
          label-align="left"
          label-cols="6"
          label-for="sortBySelect"
          label-size="sm"
      >
        <b-form-select
            id="perPageSelect"
            v-model="perPage"
            :options="pageOptions"
            inline
            size="sm"
        />
      </b-form-group>

      <!-- pagination -->
      <div>
        <b-pagination
            v-model="currentPage"
            :per-page="perPage"
            :total-rows="totalRows"
            class="mb-0"
            first-number
            last-number
            next-class="next-item"
            prev-class="prev-item"
        >
          <template #prev-text>
            <feather-icon
                icon="ChevronLeftIcon"
                size="18"
            />
          </template>
          <template #next-text>
            <feather-icon
                icon="ChevronRightIcon"
                size="18"
            />
          </template>
        </b-pagination>
      </div>
    </b-card-body>

    <!--    <template #code>-->
    <!--      {{ codeAdvance }}-->
    <!--    </template>-->
  </b-card>
</template>

<script>
// import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BAvatar,
  BBadge,
  BButton,
  BCard,
  BCardBody,
  BCol,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BImg,
  BPagination,
  BRow,
  BSidebar,
  BTable,
  VBToggle,
} from 'bootstrap-vue' // eslint-disable-line
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
import SidebarContent from './SidebarContent.vue'
import vSelect from 'vue-select'
import axios from 'axios'
import book_requirement from '@/api/book_requirement'
// import {useRouter} from "vue-router";
// import { codeAdvance } from './code'
/* eslint-disable */
export default {
  components: {
    BCard,
    BImg,
    BCardBody,
    vSelect,
    BBadge,
    BSidebar,
    SidebarContent,
    BFormCheckbox,
    BTable,
    BButton,
    VueGoodTable,
    BAvatar,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BRow,
    BCol,
    // eslint-disable-next-line vue/no-unused-components
    // ToastificationContent,
  },
  /* eslint-disable */
  directives: {
    'b-toggle': VBToggle,
    Ripple,
  },
  /* eslint-disable */
  data() {
    return {
      pageLength: 5,
      pageOptions: [3, 5, 10],
      perPage: 5,
      totalRows: 10,
      currentPage: 1,
      edit_id: '',
      edit_title: '',
      edit_department: '',
      edit_resource: '',
      edit_author: '',
      edit_document: '',
      edit_cover: '',
      edit_description: '',
      edit_type: '',
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      dir: false,
      // filter: {
      //   resource:null,
      //   department:null,
      // },
      filter: null,
      resource: '',
      resourceOptions: ['Thesis', 'General'],
      department: '',
      departmentOptions: ['Nursing', 'BMS', 'Psychology', 'Management', 'Acupuncture', 'IT'],
      rows: [],
      searchTerm: '',
      fields: [
        'show_details',
        'id',
        'title',
        'added_date',
        {
          key: 'status',
          label: 'Status'

        },
        {
          key: 'status',
          label: 'Statuss'

        },
        'department',
        'resource_title',
        {
          key: 'document_image',
          label: 'Finalized Document'

        },
        {
          key: 'head_approval',
          label: 'head_approval'

        },
        {
          key: 'final_approval',
          label: 'final_approval'

        }],
      /* eslint-disable global-require */
      items: [],
      /* eslint-disable global-require */
      status: [{
        published: 'Published',
        2: 'Professional',
        draft: 'Draft',
        4: 'Resigned',
        5: 'Applied',
      },
        {
          published: 'light-primary',
          2: 'light-success',
          draft: 'light-danger',
          4: 'light-warning',
          5: 'light-info',
        }],
      head_approval: [{
        0: 'Not Approved',
        1: 'Approved',
        2: 'Professional',
        draft: 'Draft',
        4: 'Resigned',
        5: 'Applied',
      },
        {
          1: 'light-primary',
          2: 'light-success',
          0: 'light-danger',
          4: 'light-warning',
          5: 'light-info',
        }],
      final_approval: [{
        0: 'Not Approved',
        1: 'Approved',
        2: 'Professional',
        draft: 'Draft',
        4: 'Resigned',
        5: 'Applied',
      },
        {
          1: 'light-primary',
          2: 'light-success',
          0: 'light-danger',
          4: 'light-warning',
          5: 'light-info',
        }]
    }
  },
  setup() {
    // const router = useRouter();
    return {}
  },

  /* eslint-disable */
  computed: {
    onRowClick(params) {
      console.log(params)
    },
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  async mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
    await this.getAllEResources()
  },
  /* eslint-disable */
  methods: {
    advanceSearch(val) {
      this.filter = val
    },

    getStatus(val) {
      if (val === 'draft') {
        return 'published'
      } else {
        return 'draft'
      }
    },
    getHeadStatus(val) {
      if (val === '0') {
        return 'approved'
      }
    },
    makeToast(msg,variant) {
      this.$bvToast.toast(`${msg}`, {
        title: `${variant || 'default'}`,
        variant,
        solid: false,
      })
    },
    async getAllEResources() {
      let response = (await book_requirement.getData())
      console.log(response)
      this.items = response.data.data.items
      this.totalRows = response.data.data.total

    },
    async deleteResource(data, updated_user) {
      await book_requirement.delete(data, updated_user)
          .then((res) => {
            console.log('deleted')
            this.makeToast('Removed successfully','success');
            // toast("Order removed successfully", "success");
            this.getAllEResources()
          })
          .catch(({ response }) => {
            this.error = response.data.error
            console.log(this.error)
            this.makeToast(this.error,'danger');
          })
      // axios.delete("http://13.232.138.190:8081/resource/delete-eresource",
      //     { params: { data,updated_user }})
      //     .then(response => this.$router.go());
    },
    async updateEResourceStatus(data, status, updated_user,type) {
      await book_requirement.updateStatus(data, status, updated_user,type)
          .then((res) => {
            console.log('update')
            this.makeToast('Status Update successfully','success');
            // toast("Order removed successfully", "success");
            this.getAllEResources()
          })
          .catch(({ response }) => {
            this.error = response.data.error
            console.log(this.error)
            this.makeToast(this.error,'danger');
          })
      // axios.put("http://13.232.138.190:8081/resource/update-eresource-status", null,
      //     { params: { data, status, updated_user }})
      //     .then(response => this.$router.go());
    },

  },
}
</script>
