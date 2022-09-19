<template>

  <b-card>
    <b-button
        style="margin-bottom: 10px; margin-right: 10px;"
        variant="primary"
        @click="() => $router.push(`/apps/physical_book/create`)"
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
            <label>Search:</label>
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
              <b-col>
                <div class="bg-light-primary rounded-top text-center">
                  <b-img
                      :src="require('@/assets/images/illustration/email.svg')"
                      alt="Meeting Pic"
                      height="170"
                  />
                </div>
              </b-col>
            </b-row>


            <b-row class="mb-2">
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Student ID : </strong>{{ row.item.student_id }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Book ID : </strong>{{ row.item.book_id }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Published Date : </strong>{{ row.item.date_time }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Fine : </strong>{{ row.item.fine }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Return Date : </strong>{{ row.item.return_date }}
              </b-col>
              <b-col
                  class="mb-1"
                  md="4"
              >
                <strong>Status : </strong>{{ row.item.status }}
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
                  variant="outline-success"
                  @click="updateEResourceStatus(row.item.id,getStatus(row.item.status),1)"
              >
                {{ getStatus(row.item.status) }}
              </b-button>
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
    <!--    <b-toast id="example-toast">-->
    <!--      <span>Hello, world! This is a toast message. Hope you're doing well.. :)</span>-->
    <!--    </b-toast>-->
    <!--    <template #code>-->
    <!--      {{ codeAdvance }}-->
    <!--    </template>-->
  </b-card>
  <!--  <b-card-code>-->
  <!-- toast -->

  <!--  </b-card-code>-->

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
  BToast,
  VBToggle,
} from 'bootstrap-vue' // eslint-disable-line
import { VueGoodTable } from 'vue-good-table'
import store from '@/store/index'
import Ripple from 'vue-ripple-directive'
import SidebarContent from './SidebarContent.vue'
import vSelect from 'vue-select'
import Physical_book from '@/api/physical_book'
// import {useRouter} from "vue-router";
// import { codeAdvance } from './code'
/* eslint-disable */
export default {
  components: {
    BCard,
    BToast,
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
      totalRows: 1,
      currentPage: 1,
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
        'book_id',
        'student_id',
        'date_time',
        {
          key: 'fine',
          label: 'Fine'

        },
        'return_date',
        {
          key: 'status',
          label: 'Status'

        }
      ],

      /* eslint-disable global-require */
      items: [],
      /* eslint-disable global-require */

      fine: [
        {
          1: 'Active',
        },
        {
          1: 'light-success',

        }
        ],
      status: [
        {
          1: 'Pending',
        },

        {
          1: 'light-primary',
        }
      ],
    }
  },
  setup() {
    // const router = useRouter();
    return {}
  },
  /* eslint-disable */
  computed: {
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
    onRowClick(params) {
      console.log(params)
    },
    getStatus(val) {
      if (val === 'Return') {
        return 'Pending'
      } else {
        return 'Return'
      }
    },
    makeToast(msg, variant) {
      this.$bvToast.toast(`${msg}`, {
        title: `${variant || 'default'}`,
        variant,
        solid: false,
      })
    },
    async getAllEResources() {
      let response = (await Physical_book.getData())
      console.log(response)
      this.items = response.data.data.items
      this.totalRows = response.data.data.total
    },

    async deleteResource(data, updated_user) {
      await Physical_book.delete(data, updated_user)
          .then((res) => {
            console.log('deleted')
            this.makeToast('Removed successfully', 'success')
            // toast("Order removed successfully", "success");
            this.getAllEResources()
          })
          .catch(({ response }) => {
            this.error = response.data.error
            console.log(this.error)
            this.makeToast(this.error, 'danger')
          })
      // axios.delete("http://13.232.138.190:8081/resource/delete-eresource",
      //     { params: { data,updated_user }})
      //     .then(response => this.$router.go());
    },

    async updateEResourceStatus(data, status, updated_user) {
      let newStatus;
      if (status==='Return'){
         newStatus=3
      }
      await Physical_book.updateStatus(data, newStatus, updated_user)
          .then((res) => {
            console.log('update')
            this.makeToast('Status Update successfully', 'success')
            // toast("Order removed successfully", "success");
            this.getAllEResources()
          })
          .catch(({ response }) => {
            this.error = response.data.error
            console.log(this.error)
            this.makeToast(this.error, 'danger')
          })
      // axios.put("http://13.232.138.190:8081/resource/update-eresource-status", null,
      //     { params: { data, status, updated_user }})
      //     .then(response => this.$router.go());
    },
  },
}
</script>
