<template>
  <div>
    <b-card>
      <validation-observer ref="simpleRules">
        <b-form>
          <b-row>
            <!-- student  -->
            <b-col cols="12">
              <b-form-group
                  label="Student "
                  label-for="v-student "
              >
                <validation-provider
                    #default="{ errors }"
                    name="Student "
                    rules="required">
                  <v-select
                      v-model="getStudent"
                      :options="getStudentsList"
                      label="text"
                      placeholder="Please select">
                    <template slot="option" slot-scope="option">
                      <span>{{ option.text }}</span>
                    </template>
                  </v-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>

            <!-- Books -->
            <b-col cols="12">
              <b-form-group
                  label="Book"
                  label-for="v-book"
              >
                <validation-provider
                    #default="{ errors }"
                    name="Book"
                    rules="required"
                >
                  <v-select
                      v-model="getBook"
                      :options="getBooksList"
                      label="text"
                      placeholder="Please select">
                    <template slot="option" slot-scope="option">
                      <span>{{ option.text }}</span>
                    </template>
                  </v-select>
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
import Physical_book from '@/api/physical_book'
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
      getBooksList:{},
      getStudentsList:{},
      bookList: [],
      studentsList:[],
      getBookDetails: '',
      getBook:'',
      getStudent:'',
      file: '',
      id_back: '',
      doc: {
        resource_name: '',
        cover_name: ''
      },
      post_values: {
        book: '',
        student: '',
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
      },

    }
  },
  setup() {
    return {
      required,
    }
  },
  async mounted() {
    await this.getAllBooks()
    await this.getAllStudents()
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

    async getAllBooks() {
      console.log(this.model.departmentOptions)
      let response = (await Physical_book.getBooks())
      console.log(response)
      this.getBooksList = await response.data.data.map((x) => ({
        text: `${x.name}`,
        value: x.id,
      }))
      console.log(this.getBooksList)
      for (let i = 0; i < this.getBooksList.length; i++) {
        this.bookList.push(this.getBooksList[i].text);
      }

      // var q=JSON.parse(this.bookList)
      // console.log(q)
      // const w=JSON.parse(JSON.stringify(books));
      // console.log(w)
      // this.bookList=w;
      console.log(this.bookList)
      // return books;
    },
    async getAllStudents() {
      let response = (await Physical_book.getStudents());
      console.log(response)
      this.getStudentsList = await response.data.data.map((x) => ({
        text: `${x.name}`,
        value: x.id,
      }))
      console.log("studentList:",this.getStudentsList);
      for (let i = 0; i < this.getStudentsList.length; i++) {
        this.studentsList.push(this.getStudentsList[i].text);
      }
    },
    async submit() {
      // this.flipIn()
      var date = new Date();
      var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
      console.log(current_date)

     const payload={
       student_id:this.getStudent.value,
       book_id:this.getBook.value,
       return_date:current_date
      }
      await Physical_book.create(payload)
          .then((response) => {
            console.log('update')
            this.$router.go(-1)
            // toast("Order removed successfully", "success");
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
      await Physical_book.fileUpload(formData, id)
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
