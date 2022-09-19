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
                    readonly="true"
                />
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group
                  label="Upload Final Document Here"
                  label-for="v-documents"
              >
                <b-form-file
                    @change="handleFileUploadCoverPhoto( $event )"
                    :placeholder="this.getCoverName()"
                    drop-placeholder="Drop file here..."
                />
              </b-form-group>
            </b-col>

            <!-- checkbox -->
            <!--          <b-col cols="12">-->
            <!--            <b-form-group>-->
            <!--              <b-form-checkbox-->
            <!--                  id="checkbox-3"-->
            <!--                  name="checkbox-3"-->
            <!--                  value="Remember_me"-->
            <!--              >-->
            <!--                Remember me-->
            <!--              </b-form-checkbox>-->
            <!--            </b-form-group>-->
            <!--          </b-col>-->

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
import { ValidationProvider, ValidationObserver } from 'vee-validate'
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
import axios from 'axios'
import libraryConcerns from '@/api/library_concerns'
import eResourcesAPI from '@/api/e_resources'
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
      post_values: {
        title: '',
        url: '',
        description: ''
      },
      model: {
        file: '',
        coverPhoto: '',
        resource: '',
        department: ''
      }
    }
  },
  setup() {
    return {
      required,
    }
  },
  // created() {
  //   var id_val = this.$route.params.resources_id
  //   fetch('http://13.232.138.190:8081/concern/get-all-info-by-id?id=' + id_val)
  //       .then(async response => {
  //         const data = await response.json()
  //         this.post_values.title = data.data.items[0].concern_id
  //       })
  //       .catch(error => {
  //         this.errorMessage = error
  //         console.error('There was an error!', error)
  //       })
  // },
  async mounted() {
    await this.getAllData()
  },
  methods: {
    makeToast(msg,variant) {
      this.$bvToast.toast(`${msg}`, {
        title: `${variant || 'default'}`,
        variant,
        solid: false,
      })
    },
    async getAllData() {
      var id_val = this.$route.params.resources_id
      let response = (await libraryConcerns.getResourceData(id_val))
      console.log(response)
      const data = response.data.data;
      this.post_values.title = data.items[0].concern_id

    },
    validationForm() {
      this.$refs.simpleRules.validate()
          .then(success => {
            if (success) {
              this.submit()
            }
          })
    },

    submit() {
      this.flipIn()
      this.submitFile();

      // var id = this.id
      // let formData = new FormData()
      // formData.append('cover', this.model.coverPhoto)
      // var id = this.$route.params.resources_id
      // axios.create({
      //   baseURL: 'http://13.232.138.190:8081/concern'
      // })
      //     .post('/uploadMultipleFiles',
      //         formData, { params: { id } },
      //         {
      //           headers: {
      //             'Content-Type': 'multipart/form-data'
      //           }
      //         }
      //     )
      //     .then(response => {
      //
      //       this.$router.go(-1)
      //
      //     })
      //     .catch(function () {
      //       console.log('FAILURE!!')
      //     })

    },
    async submitFile() {
      var id = this.$route.params.resources_id
      let formData = new FormData()
      formData.append('cover', this.model.coverPhoto)
      await libraryConcerns.fileUpload(formData,id)
          .then(response => {
            this.$router.go(-1)
          })
          .catch(({ response }) => {
            this.error = response.data.error
            console.log(this.error)
            console.log('FAILURE!!')
          })
    },
    getCoverName() {
      return this.edit_cover
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

    handleFileUploadCoverPhoto(event) {
      this.model.coverPhoto = event.target.files[0]
    }
  },
}

</script>

<style scoped>

</style>
