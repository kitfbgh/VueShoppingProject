<template>
  <div class="my-5 row justify-content-center">
    <form class="contact-form col-md-6" @submit.prevent="sendEmail(form)">
      <div class="form-group">
        <label for="user_name">
          Name
          <span class="text-danger">*必填</span>
        </label>
        <input
          type="text"
          class="form-control"
          name="name"
          id="user_name"
          :class="{'is-invalid':errors.has('name')}"
          v-validate="'required'"
          v-model="form.name"
          placeholder="輸入姓名"
        />
        <span class="text-danger" v-if="errors.has('name')">必須輸入姓名</span>
      </div>
      <div class="form-group">
        <label for="userEmail">
          Email
          <span class="text-danger">*必填</span>
        </label>
        <input
          :class="{'is-invalid':errors.has('email')}"
          type="email"
          v-model="form.email"
          class="form-control"
          name="email"
          id="userEmail"
          v-validate="'required|email'"
          placeholder="請輸入 Email"
        />
        <span class="text-danger" v-if="errors.has('email')">必須輸入Email</span>
      </div>
      <div class="form-group">
        <label for="message">留言</label>
        <textarea
          name
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="form.message"
        ></textarea>
      </div>
      <div class="text-right">
        <input type="submit" value="送出留言" class="btn btn-danger" />
      </div>
    </form>
  </div>
</template>

<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/emailjs-com@2.3.2/dist/email.min.js"></script>
<script>
import emailjs from 'emailjs-com';

export default {
  data() {
    return{
      form: {
        name: '',
        email: '',
        from_name: 'Jack',
        message: ''
      },
    }
  },
  methods: {
    sendEmail: (e) => {
      const v = this;
      let formData = JSON.stringify(e);
      console.log(formData, e.target);
      emailjs.send('default_service', 'template_P3f6Lycc', e, 'user_lL9i4GjknLn6ViKivfRKZ')
        .then((result) => {
            console.log('SUCCESS!', result.status, result.text);
        }, (error) => {
            console.log('FAILED...', error);
        });
    }
  },
  // created() {
  //   (function(){
  //     emailjs.init('user_lL9i4GjknLn6ViKivfRKZ');
  //   })();
  // },
}
</script>