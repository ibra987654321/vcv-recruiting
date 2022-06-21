<template>
  <div class="container">
    <div class="row person_container mx-auto">
      <card class="card_profile" header-classes="text-center">
        <form>
          <template>
            <div class="row">
              <div class="col-lg-12 text-center">
                <h3 class="card-title title-up">Анкета</h3>
              </div>
              <div class="col-sm-12 col-lg-6">
                <fg-input
                    v-model.trim="form.name"
                    placeholder="ФИО"
                    :class="{'has-danger': ($v.form.name.$dirty && !$v.form.name.required) || ($v.form.name.$dirty && !$v.form.name.minLength)} "
                    :error="
                    ($v.form.name.$dirty && !$v.form.name.required) ? 'Заполните поле' :
                    ($v.form.name.$dirty && !$v.form.name.minLength) ? `Поле не должно быть меньше 3 букв. Сейчас он ${form.name.length}` : null"
                >
                </fg-input>
              </div>
              <div class="col-sm-12 col-lg-6">
                <fg-input
                    v-model="form.email"
                    placeholder="Почта"
                    :class="{'has-danger': ($v.form.email.$dirty && !$v.form.email.required) || ($v.form.email.$dirty && !$v.form.email.email)} "
                    :error="
                    ($v.form.email.$dirty && !$v.form.email.required) ? 'Заполните поле' :
                    ($v.form.email.$dirty && !$v.form.email.email) ? `Напишите правильную почту. Например @.mail.ru` : null"
                >
                </fg-input>
              </div>
              <div class="col-sm-12 col-lg-6">
                <fg-input
                    :class="{'has-danger': ($v.form.birthday.$dirty && !$v.form.birthday.required)} "
                    :error="
                    ($v.form.birthday.$dirty && !$v.form.birthday.required) ? 'Выберите дату' : null"
                >
                  <el-date-picker
                      placeholder="Дата рождения"
                      v-model="form.birthday"
                  >
                  </el-date-picker>
                </fg-input>
              </div>
              <div class="col-sm-12 col-lg-6">
                <div class="form-group">
                  <select v-model="form.citizenship" class="form-control">
                    <option disabled style="color: #9A9A9A" selected>Гражданство</option>
                    <option>Кыргызстан</option>
                    <option>Россия</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-12 col-lg-6">
                <div class="form-group">
                  <select v-model="form.maritalStatus" class="form-control">
                    <option disabled style="color: #9A9A9A" selected>Семейное положение</option>
                    <option>Женат</option>
                    <option>Замужем</option>
                    <option>Холост/ Не замужем</option>
                  </select>
                </div>
              </div>
              <div class="col-sm-12 col-lg-6">
                <fg-input
                    v-model="form.address"
                    placeholder="Адрес проживания"
                    :class="{'has-danger': ($v.form.address.$dirty && !$v.form.address.required)} "
                    :error="
                    ($v.form.address.$dirty && !$v.form.address.required) ? 'Напишите адрес' : null"
                >
                </fg-input>
              </div>
              <div class="col-sm-12 col-lg-6">
                <div class="input-group mb-2" :class="{'has-danger': ($v.form.phoneNumber.$dirty && !$v.form.phoneNumber.required)} ">
                  <div class="input-group-prepend">
                    <div class="input-group-text">+996</div>
                  </div>
                  <input v-model="form.phoneNumber" type="number" class="form-control" id="inlineFormInputGroup" placeholder="Телефон">
                  <div
                      class="text-danger invalid-feedback"
                      style="display: block;"
                      v-if="$v.form.phoneNumber.$dirty && !$v.form.phoneNumber.required"
                  >
                     Напишите номер
                  </div>
                  <div
                      class="text-danger invalid-feedback"
                      style="display: block;"
                      v-if="$v.form.phoneNumber.$dirty && !$v.form.phoneNumber.minLength"
                  >
                    Должна быть в формате 777005500
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12 text-center">
                <h3 class="card-title title-up">Опыт</h3>
              </div>
              <div class="col-lg-12">
                  <div class="form-group w-25">
                    <select v-model="form.experience.name" class="form-control">
                      <option disabled selected>Опыт работы</option>
                      <option v-for="item in experienceLevel" :key="item" selected>{{ item }}</option>
                    </select>
                  </div>
              </div>
              <div class="col-lg-12">
                <div class="row w-100" v-if="form.experience.name !== 'Нет опыта'">
                  <div class="col-lg-12">
                    <fg-input
                        v-model="form.experience.position"
                        placeholder="Позиция"
                    >
                    </fg-input>
                  </div>
                  <div class="col-lg-6">
                    <fg-input
                        v-model="form.experience.name"
                        placeholder="Название компании"
                    >
                    </fg-input>
                  </div>
                  <div class="col-lg-3">
                    <fg-input>
                      <el-date-picker
                          placeholder="Дата начало"
                          v-model="form.experience.startDate"
                      >
                      </el-date-picker>
                    </fg-input>
                  </div>
                  <div class="col-lg-3">
                    <fg-input>
                      <el-date-picker
                          placeholder="Дата окончания"
                          v-model="form.experience.endDate"
                      >
                      </el-date-picker>
                    </fg-input>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12 text-center">
                <h3 class="card-title title-up">Образования</h3>
              </div>
              <div class="col-lg-12">
                <div class="form-group w-25">
                  <select v-model="form.education" class="form-control">
                    <option disabled selected>Опыт работы</option>
                    <option v-for="item in educationLevels" :key="item" selected>{{ item }}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="row" v-for="(i) in knowledgeType" :key="i.id" >
              <div class="col-lg-12 text-center">
                <h3 class="card-title title-up" >{{i.name}}</h3>
              </div>
              <div class="col-lg-12">
                <div class="d-flex" v-for="(item) in i.knowledgeList" :key="item.id">
                  <input type="checkbox" class="mt-1 checkbox" :id="item.id" v-model="picked[item.id]">
                  <label :for="item.id">{{item.knowledgeName}}</label>
                  <div v-if="picked[item.id] == true" class="d-flex">
                    <div
                        class="d-flex ml-3"
                        v-for="(level) in item.levels" :key="level.id"
                    >
                      <input type="radio"
                             class="mt-1 mr-1"
                             :id="level.id"
                             :value="{knowledge: item.knowledgeName, level: level.name, id: i.id}"
                             v-model="answers[item.id]"
                      />
                      <label :for="level.id">{{ level.name }}</label>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12 text-center">
                <h3 class="card-title title-up">График работы</h3>
              </div>
              <div class="row w-100 d-flex align-items-center">
                <div class="col-lg-6 ">
                  <div class="form-group w-100">
                    <select v-model="form.schedule" class="form-control">
                      <option disabled selected>График</option>
                      <option v-for="(item) in schedule" :key="item" selected>{{ item }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="typography-line">
                    <p>
                      Наш график: <br>
                      5 дней рабочих, 2 дня плавающих выходных. <br>
                      Есть возможность выбирать смены и выходные
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </template>
          <div class="card-footer text-center">
            <n-button  type="warning"  round  @click="submitHandler" size="lg">Отпавить</n-button>
          </div>
        </form>

      </card>
    </div>
  </div>
</template>
<script>
import {Card, FormGroupInput, Button, Checkbox, Radio} from "@/components";
import {DatePicker} from "element-ui";
import {email, required, minLength} from 'vuelidate/lib/validators'
import {getCandidateType} from "@/helpers/helpers";

export default {
  components: {
    Card,
    [Button.name]: Button,
    [DatePicker.name]: DatePicker,
    [FormGroupInput.name]: FormGroupInput,
    [Checkbox.name]: Checkbox,
    [Radio.name]: Radio,
  },
  validations: {
    form: {
      name: {required, minLength: minLength(3)},
      email: {email, required},
      birthday: {required},
      address: {required} ,
      phoneNumber: {required, minLength: minLength(9)},
      schedule: {required}
    }

  },
  data:() => ({
    knowledgeType: [],
    names: [],
    answers: [],
    picked: [],
    experienceLevel: ['Есть опыт', 'Нет опыта'],
    educationLevels: ['Среднее', 'Срд/специальное', 'Высшее неоконченное', 'Высшее', 'Нет образования'],
    schedule: ['Утренние', 'Дневные', 'Вечерние', 'Ночные'],
    form: {
      name: 'Ибрагим',
      email: 'ibragimmadiyarov@gmail.com',
      birthday: '',
      citizenship: 'Гражданство',
      maritalStatus: 'Семейное положение',
      address: 'Бишкек',
      phoneNumber: '703215487',
      experience:{
        name: '',
        startDate: '',
        endDate: '',
        position: ''
      },
      education: "string",
      schedule: 'График',
      candidateType_id: Number(getCandidateType()),
    },

  }),
  created() {
    this.$store.dispatch('knowledgeType').then(r => {
      this.knowledgeType = r
      r.map((i, idx) => {
        const name = i.name
        const id = i.id
        this.names.push({name})
        this.names[idx].id = id
      })
    })

  },
  computed: {
    validForm() {
      if (this.form.education.type !== 'Нет образования') {
        return true
      } else {
        return false
      }
    },
  },
  methods: {
    submitHandler() {

      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
        this.save()
    },
    save() {
      this.answers = this.answers.filter(i => typeof (i) !== 'null')
      const result = this.names.map(item2 => {
        // отфильтровали массив 1 на наличие элементов с соответствующим id
        const withCurrentId = this.answers.filter(item1 => item1['id'] === item2['id']);
        item2.questionnaireAnswers = []
        item2.questionnaireAnswers.push(...withCurrentId)

        return { ...item2 };
      });

      const newResult = result.map(i => {
        return {
          name: i.name,
          questionnaireAnswers: i.questionnaireAnswers.map(r => {
            return {
              knowledge: r.knowledge,
              level: r.level
            }
          })
        }
      })
      this.form.questionnaireList = newResult
      this.$store.dispatch('submitForm', this.form)
    }
  },
  watch: {
    'form.birthday'() {
      this.form.birthday = new Date(this.form.birthday).toISOString().slice(0, 10)
    },
    'form.education.startDate'() {
      this.form.education.startDate = new Date(this.form.education.startDate).toISOString().slice(0, 10)
    },
    'form.education.endDate'() {
      this.form.education.endDate = new Date(this.form.education.endDate).toISOString().slice(0, 10)
    },
  }
};
</script>
<style scoped>
.person_container {
  width: 100%;
}
.card_profile {
  padding: 20px;
  border-radius: 20px;
}
.text-center h3 {
  margin-top: 40px;
}
</style>
