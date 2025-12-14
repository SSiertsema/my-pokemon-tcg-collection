<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1>Registreren</h1>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <div v-if="successMessage" class="success-message">
        {{ successMessage }}
      </div>

      <form v-if="!successMessage" @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="je@email.com"
          />
        </div>

        <div class="form-group">
          <label for="password">Wachtwoord</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            minlength="6"
            placeholder="Minimaal 6 karakters"
          />
        </div>

        <div class="form-group">
          <label for="confirmPassword">Bevestig wachtwoord</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            required
            placeholder="Herhaal wachtwoord"
          />
        </div>

        <button type="submit" class="btn-primary" :disabled="loading">
          {{ loading ? 'Bezig...' : 'Account aanmaken' }}
        </button>
      </form>

      <div class="divider">
        <span>of</span>
      </div>

      <div class="oauth-buttons">
        <button class="btn-oauth btn-google" @click="registerWithProvider('google')">
          <span class="icon">G</span>
          Registreer met Google
        </button>
        <button class="btn-oauth btn-github" @click="registerWithProvider('github')">
          <span class="icon">GH</span>
          Registreer met GitHub
        </button>
        <button class="btn-oauth btn-azure" @click="registerWithProvider('azure')">
          <span class="icon">M</span>
          Registreer met Microsoft
        </button>
      </div>

      <p class="auth-footer">
        Heb je al een account?
        <NuxtLink to="/login">Log hier in</NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

watch(user, (newUser) => {
  if (newUser) {
    navigateTo('/');
  }
}, { immediate: true });

async function handleRegister() {
  errorMessage.value = '';
  successMessage.value = '';

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Wachtwoorden komen niet overeen';
    return;
  }

  if (password.value.length < 6) {
    errorMessage.value = 'Wachtwoord moet minimaal 6 karakters zijn';
    return;
  }

  loading.value = true;

  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/confirm`,
    },
  });

  if (error) {
    errorMessage.value = error.message;
  } else {
    successMessage.value = 'Check je email om je account te bevestigen!';
  }

  loading.value = false;
}

async function registerWithProvider(provider: 'google' | 'github' | 'azure') {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/confirm`,
    },
  });

  if (error) {
    errorMessage.value = error.message;
  }
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: #f9fafb;
}

.auth-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  color: #1f2937;
  margin: 0 0 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn-primary {
  width: 100%;
  padding: 0.75rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.divider {
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e5e7eb;
}

.divider span {
  padding: 0 1rem;
  color: #9ca3af;
  font-size: 0.875rem;
}

.oauth-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn-oauth {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.15s;
}

.btn-oauth:hover {
  background: #f9fafb;
}

.btn-oauth .icon {
  font-weight: bold;
}

.btn-google {
  color: #ea4335;
}

.btn-github {
  color: #333;
}

.btn-azure {
  color: #0078d4;
}

.error-message {
  background: #fef2f2;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.success-message {
  background: #ecfdf5;
  color: #059669;
  padding: 0.75rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  text-align: center;
}

.auth-footer {
  text-align: center;
  margin-top: 1.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.auth-footer a {
  color: #3b82f6;
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}
</style>
