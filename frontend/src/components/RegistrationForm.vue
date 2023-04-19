<template>
  <main>
    <form class="registration-form" @submit.prevent="submitForm">
      <h2>Zarejestruj się</h2>
      <div class="form-group">
        <label for="login"
          >Nazwa użytkownika <span class="star"> *</span></label
        >
        <input
          v-model="login"
          type="text"
          id="login"
          placeholder="Podaj nazwę użytkownika"
          required
        />
        <span v-if="login && login.length > 0 && !isLoginValid" class="warning"
          >Nazwa musi być dłuższa od 3 znaków!</span
        >
      </div>
      <div class="form-group">
        <label for="email">Email<span class="star"> *</span></label>
        <input
          type="text"
          id="email"
          placeholder="Podaj email"
          v-model="email"
          required
        />
        <span v-if="email && email.length > 0 && !isEmailValid" class="warning"
          >E-mail musi zawierać znak '@' i być dłuższy od 6 znaków!</span
        >
      </div>
      <div class="form-group">
        <label for="password">Hasło<span class="star"> *</span></label>
        <input
          type="password"
          id="password"
          placeholder="Hasło"
          v-model="password"
          required
        />
        <span
          v-if="password && password.length > 0 && !isPasswordValid"
          class="warning"
          >Hasło musi być dłuższe od 5 znaków!</span
        >
      </div>
      <div class="form-group">
        <label for="passwordRepeat"
          >Powtórz hasło<span class="star"> *</span></label
        >
        <input
          type="password"
          id="passwordRepeat"
          placeholder="Powtórz hasło"
          v-model="passwordRepeat"
          required
        />
        <span
          v-if="
            passwordRepeat &&
            passwordRepeat.length > 0 &&
            !isPasswordRepeatValid
          "
          class="warning"
          >Hasła muszą być takie same!</span
        >
      </div>
      <button type="submit" class="submit-btn" :disabled="!isFormValid">
        Zarejestruj się
      </button>
    </form>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { postData } from '../shared/functions/postData';

const login = ref("");
const email = ref("");
const password = ref("");
const passwordRepeat = ref("");

const isEmailValid = computed(() => {
  return email.value.includes("@") && email.value.trim().length > 6;
});

const isPasswordValid = computed(() => {
  return password.value.trim().length > 5;
});

const isPasswordRepeatValid = computed(() => {
  return passwordRepeat.value === password.value;
});

const isLoginValid = computed(() => {
  return login.value.trim().length > 3;
});

const isFormValid = computed(() => {
  return (
    isEmailValid.value &&
    isPasswordValid.value &&
    isLoginValid.value &&
    isPasswordRepeatValid.value
  );
});

function submitForm() {
  if (isFormValid.value) {
    postData({ login: login.value, email: email.value, password: password.value }, "signUp")
  }
}
</script>

<style scoped>
.registration-form {
  display: flex;
  flex-direction: column;
  width: 30rem;
  margin: 0 auto;
  padding: 20px;
  background-color: #f2f2f2;
  border: 3px solid rgb(252, 72, 1);
  border-radius: 13px;
}

h2 {
  color: black;
}

label {
  color: black;
}

.star {
  color: #f2580a;
  margin-left: 3px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  margin-left: 0.2rem;
  margin-top: 0.7rem;
  display: flex;
  margin-bottom: 5px;
}

input {
  margin-top: 0.5rem;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
  color: black;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px #f2f2f2 inset !important;
}

input:-webkit-autofill {
  -webkit-text-fill-color: black !important;
}

.warning {
  color: rgb(217, 27, 27);
  font-size: 12px;
}

.submit-btn {
  align-self: center;
  margin-top: 1rem;
  background-color: #f2580a;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:disabled {
  background-color: gray;
}

.submit-btn:hover {
  background-color: #2e8b57;
}

@media (max-width: 768px) {
  .registration-form {
    width: 20rem;
  }
}
</style>
