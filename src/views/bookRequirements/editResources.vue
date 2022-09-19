<template>
  <div>
    <b-card>
      <validation-observer ref="simpleRules">
        <b-form>
          <b-row>
            <!-- Title -->
            <b-col cols="12">
              <b-form-group
                  label="Title"
                  label-for="v-title"
              >
                <b-form-input
                    id="v-title"
                    v-model="post_values.title"
                    placeholder="Title"
                />
              </b-form-group>
            </b-col>

            <div v-if="edit_cover === ''">
              <b-col cols="12">
                <b-form-group
                    label="Purchasing Order"
                    label-for="v-documents"
                >
                  <b-form-file
                      :placeholder="this.getCoverName()"
                      drop-placeholder="Drop file here..."
                      @change="handleFileUploadCoverPhoto( $event )"
                  />
                </b-form-group>
              </b-col>
            </div>

            <div v-if="edit_cover !== ''">
              <b-col cols="12">
                <b-form-group
                    label="Rejected Reason"
                    label-for="v-description"
                >
                  <b-form-textarea
                      id="v-description"
                      v-model="post_values.rej_reason"
                      placeholder="Rejected Reason"
                  />
                </b-form-group>
              </b-col>
            </div>

            <!-- submit and reset -->
            <b-col cols="12">
              <b-button
                  class="mr-1"
                  size="sm"
                  type="submit"
                  variant="primary"
                  @click.prevent="validationForm"
              >
                Submit
              </b-button>
              <b-button
                  size="sm"
                  type="reset"
                  variant="outline-secondary"
              >
                Reset
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>

    </b-card>

  </div>
</template>

<script>
import vSelect from 'vue-select'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { required } from '@validations'
import {
  BAvatar,
  BButton,
  BCard,
  BCardText,
  BForm,
  BFormCheckbox,
  BFormFile,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BListGroup,
  BListGroupItem,
} from 'bootstrap-vue'
import book_requirement from '@/api/book_requirement'
/* eslint-disable */
export default {
  name: 'createResources',
  components: {
    BAvatar,
    ValidationProvider,
    ValidationObserver,
    BFormTextarea,
    BButton,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BFormFile,
    BListGroup,
    BListGroupItem,
    BCardText,
    BCard,
    vSelect,
  },
  /* eslint-disable */
  data() {
    return {
      id_back: '',
      doc: {
        resource_name: '',
        cover_name: ''
      },
      edit_cover: '',
      post_values: {
        author: '',
        department: '',
        title: '',
        resource: '',
        type: '',
        description: '',
        rej_reason: ''
      },
      model: {
        file: '',
        coverPhoto: '',
        resource: '',
        department: '',
        departmentOptions: ['Nursing', 'BMS', 'Psychology', 'Marketing', 'Acupuncture', 'IT', 'HR', 'Accounting'],
        type: ['Book', 'Journal', 'Magazine', 'PDF', 'Article'],
        resourceOptions: ['Thesis', 'General'],
        option: [{ title: 'Square' }, { title: 'Rectangle' }, { title: 'Rombo' }, { title: 'Romboid' }],
      }
    }
  },
  setup() {
    return {
      required,
    }
  },
  async mounted() {
    await this.getAllData()
  },
  // created() {
  //   var id = this.$route.params.id
  //   fetch('http://13.232.138.190:8081/book/get-by-id?id=' + id)
  //       .then(async response => {
  //         const data = await response.json()
  //         this.post_values.title = data.data.items[0].title
  //         this.edit_cover = data.data.items[0].document_image
  //         this.totalRows = data.data.total
  //       })
  //       .catch(error => {
  //         this.errorMessage = error
  //         console.error('There was an error!', error)
  //       })
  // },
  methods: {
    async getAllData() {
      var id_val = this.$route.params.id
      let response = (await book_requirement.getResourceData(id_val))
      console.log(response)
      const data = response.data.data
      this.post_values.title = data.items[0].title
      this.edit_cover = data.items[0].document_image
      this.totalRows = data.total

    },
    validationForm() {
      this.$refs.simpleRules.validate()
          .then(success => {
            if (success) {
              this.submit()
            }
          })
    },
    async submit() {
      if (this.edit_cover !== '') {
        var new_id = this.$route.params.id
        var type = '2'
        var resource = this.post_values.rej_reason
        var user = 3
        await book_requirement.update(this.post_values, new_id, type, resource, user)
            .then((response) => {
              console.log('update')
              this.makeToast(' Update successfully', 'success')
              // toast("Order removed successfully", "success");
              this.$router.go(-1)
            })
            .catch(({ response }) => {
              this.error = response.data.error
              console.log(this.error)
            })
      } else {
        this.flipIn()
        var id = this.$route.params.id
        var type = '2'
        let formData = new FormData()
        formData.append('files', this.model.coverPhoto)
        formData.append('files', this.model.file)
        await book_requirement.fileUpload(formData, id, type)
            .then(response => {
              this.$router.go(-1)
            })
            .catch(({ response }) => {
              this.error = response.data.error
              console.log(this.error)
              console.log('FAILURE!!')
            })
      }
    },
    flipIn() {
      this.$swal({
        title: 'Please wait uploading the document',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        showClass: {
          popup: 'animate__animated animate__flipInX',
        },
        buttonsStyling: false,
      })
    },

    getCoverName() {
      return this.edit_cover
    },
    handleFileUploadCoverPhoto(event) {
      this.model.coverPhoto = event.target.files[0]
    }
  },
}

</script>

<style scoped>

</style>
