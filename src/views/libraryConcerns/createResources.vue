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
                  label-for="v-title">
                <validation-provider
                    #default="{ errors }"
                    name="Title"
                    rules="required">
                  <b-form-input
                      id="v-title"
                      v-model="title"
                      placeholder="Title"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>

              </b-form-group>
            </b-col>

            <!-- Department -->
            <b-col cols="12">
              <b-form-group
                  label="Department"
                  label-for="v-department"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Department"
                    rules="required">
                  <v-select
                      v-model="department"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="departmentOptions"
                      placeholder="Please select"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>

              </b-form-group>
            </b-col>

            <!-- Resource -->
            <b-col cols="12">
              <b-form-group
                  label="Resource"
                  label-for="v-resource"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Resource"
                    rules="required">
                  <v-select
                      v-model="resource"
                      :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                      :options="resourceOptions"
                      placeholder="Please select"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Author -->
            <b-col cols="12">
              <b-form-group
                  label="Author"
                  label-for="v-author"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Author"
                    rules="required">
                  <b-form-input
                      id="v-author"
                      v-model="author"
                      placeholder="Author"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>

              </b-form-group>
            </b-col>

            <!--          Documents-->
            <b-col cols="12">
              <b-form-group
                  label="Documents"
                  label-for="v-documents"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Documents"
                    rules="required">
                  <b-form-file
                      v-model="fileDocuments"
                      drop-placeholder="Drop file here..."
                      placeholder="Choose a file or drop it here..."
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                  <b-card-text class="my-1">
                    Selected file: <strong>{{ file ? file.name : '' }}</strong>
                  </b-card-text>
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12">
              <b-form-group
                  label="Cover Photo"
                  label-for="v-documents"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Cover Photo"
                    rules="required">
                  <b-form-file
                      v-model="filePhoto"
                      drop-placeholder="Drop file here..."
                      placeholder="Choose a file or drop it here..."
                  />
                  <small class="text-danger">{{ errors[0] }}</small>

                  <b-card-text class="my-1">
                    Selected file: <strong>{{ file ? file.name : '' }}</strong>
                  </b-card-text>
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
                    placeholder="Description"
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
      },
      file: null,
      title:'',
      resource: '',
      department: '',
      author: '',
      fileDocuments: '',
      filePhoto: '',
      departmentOptions: ['Nursing', 'BMS', 'Psychology', 'Management', 'Acupuncture', 'IT'],
      resourceOptions: ['Thesis', 'General'],
      option: [{ title: 'Square' }, { title: 'Rectangle' }, { title: 'Rombo' }, { title: 'Romboid' }],
    }
  },
  setup(){
    return{
      required,
    }
  },
  methods: {
    validationForm() {
      this.$refs.simpleRules.validate().then(success => {
        if (success) {
          // eslint-disable-next-line
          alert('form submitted!')
        }
      })
    },
  },
}

</script>

<style scoped>

</style>
