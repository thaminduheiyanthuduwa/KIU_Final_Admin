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
                <validation-provider
                    #default="{ errors }"
                    name="Title"
                    rules="required"
                >
                  <b-form-input
                      id="v-title"
                      v-model="post_values.title"
                      placeholder="Title"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Department -->
            <b-col cols="12">
              <b-form-group
                  label="URL"
                  label-for="v-url"
              >
                <validation-provider
                    #default="{ errors }"
                    name="URL"
                    rules="required"
                >
                  <b-form-input
                      id="v-url"
                      v-model="post_values.url"
                      placeholder="URL"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group
                  label="Cover Photo"
                  label-for="v-documents"
              >

                <b-form-file
                    @change="handleFileUploadCoverPhoto( $event )"
                    drop-placeholder="Drop file here..."
                />


              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group
                  label="Description"
                  label-for="v-description"
              >
                <b-form-textarea
                    id="v-description"
                    v-model="post_values.description"
                    placeholder="Description"
                />
              </b-form-group>
            </b-col>

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
import router from '@/router'
import databaseAPI from '@/api/database_ui'
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
      file: '',
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
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate()
          .then(success => {
            if (success) {

              this.submit()
            }
          })
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

    async submit() {
      this.flipIn()
      // let payload = {
      //   post_values: this.post_values
      // }
      await databaseAPI.create(this.post_values)
          .then((response) => {
            console.log('update')
            // toast("Order removed successfully", "success");
            this.submitFile(response)
          })
          .catch(({ response }) => {
            this.error = response.data.error
            console.log(this.error)
          })
    },
    getResourceName() {
      return this.edit_document
    },
    getCoverName() {
      return this.edit_cover
    },

    handleFileUploadCoverPhoto(event) {
      this.model.coverPhoto = event.target.files[0]
    },


    async submitFile(response) {
      var id = response.data.id
      let formData = new FormData()
      formData.append('files', this.model.file)
      formData.append('cover', this.model.coverPhoto)
      await databaseAPI.fileUpload(formData,id)
          .then(response => {
            this.$router.go(-1)
          })
          .catch(({ response }) => {
            this.error = response.data.error
            console.log(this.error)
            console.log('FAILURE!!')
          })
    },
  },
}

</script>

<style scoped>

</style>
