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
import documentsAPI from '@/api/documents'
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
      items: [

      ],
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
  setup(){
    return{
      required,
    }
  },
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
    validationForm() {
      this.$refs.simpleRules.validate()
          .then(success => {
            if (success) {
              this.submit()
            }
          })
    },
    async getAllData() {
      var id_val = this.$route.params.id
      let response = (await documentsAPI.getResourceData(id_val))
      console.log(response)
      const data = response.data.data;
      this.post_values.title = data.items[0].title;
      this.post_values.description = data.items[0].description;
      this.totalRows = data.total
    },
    async submit() {
      var new_id = this.$route.params.id
      await documentsAPI.update(this.post_values, new_id)
          .then((response) => {
            console.log('update')
            this.makeToast(' Update successfully','success');
            // toast("Order removed successfully", "success");
            this.$router.go(-1)
          })
          .catch(({ response }) => {
            this.error = response.data.error
            console.log(this.error)
          })

    }
  },
}

</script>

<style scoped>

</style>
