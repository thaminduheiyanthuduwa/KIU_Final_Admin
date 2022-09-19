<template>
  <div>
    <div class="text-center">
      <!-- Name -->
      <b-card-text class="mt-2 h4 color-inherit text-reset">
        {{ title }}
      </b-card-text>
    </div>
    <b-card>
      <b-form @submit.prevent>
        <b-row>

          <!-- Title -->
          <b-col cols="12">
            <b-form-group
                label="Title"
                label-for="v-title"
            >
              <b-form-input
                  id="v-title"
                  placeholder="Title"
              />
            </b-form-group>
          </b-col>

          <!-- Department -->
          <b-col cols="12">
            <b-form-group
                label="Department"
                label-for="v-department"
            >
              <v-select
                  v-model="department"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="departmentOptions"
                  placeholder="Please select"
              />
            </b-form-group>
          </b-col>

          <!-- Resource -->
          <b-col cols="12">
            <b-form-group
                label="Resource"
                label-for="v-resource"
            >
              <v-select
                  v-model="resource"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="resourceOptions"
                  placeholder="Please select"
              />
            </b-form-group>
          </b-col>

          <!-- Author -->
          <b-col cols="12">
            <b-form-group
                label="Author"
                label-for="v-author">
              <b-form-input
                  id="v-author"
                  placeholder="Author"
              />
            </b-form-group>
          </b-col>

<!--          Documents-->
          <b-col cols="12">
            <b-form-group
                label="Documents"
                label-for="v-documents">
              <b-form-file
                  v-model="file"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
              />

              <b-card-text class="my-1">
                Selected file: <strong>{{ file ? file.name : '' }}</strong>
              </b-card-text>
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
    </b-card>

  </div>
</template>

<script>
/* eslint-disable */
import BCardCode from '@core/components/b-card-code'
import vSelect from 'vue-select'
import {
  BAvatar,
  BButton,
  BCard,
  BCardText,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BListGroup,BFormFile,
  BListGroupItem,
} from 'bootstrap-vue'
/* eslint-disable */
export default {
  props: ['title'],
  components: {
    BAvatar,
    BButton,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,BFormFile,
    BListGroup,
    BCardCode,
    BListGroupItem,
    BCardText,
    BCard,
    vSelect,
  },
  /* eslint-disable */
  data() {
    return {
      file: null,
      resource: '',
      department:'',
      departmentOptions: ['Nursing', 'BMS', 'Psychology', 'Management', 'Acupuncture', 'IT'],
      resourceOptions: ['Thesis', 'General'],
      option: [{ title: 'Square' }, { title: 'Rectangle' }, { title: 'Rombo' }, { title: 'Romboid' }],
    }
  },
}
</script>
