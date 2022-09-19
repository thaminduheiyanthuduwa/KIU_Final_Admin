<template>
  <div>
    <b-card>
      <validation-observer ref="simpleRules">
        <b-form>
          <b-row>
            <!-- Title -->
            <b-col cols="12">
              <b-form-group
                  label="Group Name"
                  label-for="v-gName"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Name"
                    rules="required"
                >
                  <b-form-input
                      id="v-gName"
                      v-model="post_values.title"
                      placeholder="Group Name"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Department -->
            <b-col cols="12">
              <b-form-group
                  label="Participates"
                  label-for="v-participates"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Participates"
                    rules="required"
                >
                  <v-select
                      v-model="post_values.department"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="model.departmentOptions"
                      multiple
                      placeholder="Please select"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
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
      file: '',
      id_back: '',
      doc: {
        resource_name: '',
        cover_name: ''
      },
      post_values: {
        author: '',
        department: '',
        title: '',
        resource: '',
        type: '',
        description: ''
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
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate()
          .then(success => {
            if (success) {

              this.submit()
            }
          })
    },
    async submit() {
      this.flipIn()
      await eResourcesAPI.create(this.post_values)
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
    handleFileUpload(event) {
      this.model.file = event.target.files[0]
    },
    handleFileUploadCoverPhoto(event) {
      this.model.coverPhoto = event.target.files[0]
    },

    async submitFile(response) {
      var id = response.data.id
      let formData = new FormData()
      formData.append('files', this.model.file)
      formData.append('cover', this.model.coverPhoto)
      await eResourcesAPI.fileUpload(formData, id)
          .then(response => {
            this.$router.go(-1)
          })
          .catch(({ response }) => {
            this.error = response.data.error
            console.log(this.error)
            console.log('FAILURE!!')
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
  },
}

</script>

<style scoped>

</style>
