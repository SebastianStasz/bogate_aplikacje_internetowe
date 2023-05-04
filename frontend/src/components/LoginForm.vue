<template>
  <form class="login-form" @submit.prevent="submitForm">
    <h2>Zaloguj się</h2>
    <div class="form-group">
      <label for="login"
        >Nazwa użytkownika / Email<span class="star"> *</span></label
      >
      <input
        v-model="login"
        type="text"
        id="login"
        placeholder="Podaj nazwę użytkownika lub email"
      />
      <span v-if="login && login.length > 0 && !isLoginValid" class="warning"
        >Nazwa musi być dłuższa od 3 znaków!</span
      >
    </div>
    <div class="form-group">
      <label for="password">Hasło<span class="star"> *</span></label>
      <input
        type="password"
        id="password"
        placeholder="Wpisz hasło"
        v-model="password"
      />
      <span
        v-if="password && password.length > 0 && !isPasswordValid"
        class="warning"
        >Hasło musi być dłuższe od 5 znaków!</span
      >
    </div>
    <button type="submit" class="submit-btn" :disabled="!isFormValid">
      Zaloguj się
    </button>
  </form>
</template>

<script setup>
import { ref, computed } from "vue";
import { postData } from "../shared/functions/postData";

const login = ref("Przemek");
const password = ref("pass123");

const isPasswordValid = computed(() => {
  return password.value.trim().length > 5;
});

const isLoginValid = computed(() => {
  return login.value.trim().length > 3;
});

const isFormValid = computed(() => {
  return isPasswordValid.value && isLoginValid.value;
});

function submitForm() {
  if (isFormValid.value) {
    postData(
      { login: login.value, password: password.value },
      { goTo: "/" },
      "login"
    );
  }
}
</script>

<style scoped>
.login-form {
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
  .login-form {
    width: 20rem;
  }
}
</style>
