<template>
  <div class="auth-container">
    <div class="auth-card">
      <h1>Login</h1>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <form v-if="!showMagicLink" @submit.prevent="handleEmailLogin">
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
            placeholder="********"
          />
        </div>

        <button type="submit" class="btn-primary" :disabled="loading">
          {{ loading ? 'Bezig...' : 'Inloggen' }}
        </button>
      </form>

      <form v-else @submit.prevent="handleMagicLink">
        <div class="form-group">
          <label for="magic-email">Email</label>
          <input
            id="magic-email"
            v-model="email"
            type="email"
            required
            placeholder="je@email.com"
          />
        </div>

        <button type="submit" class="btn-primary" :disabled="loading">
          {{ loading ? 'Bezig...' : 'Verstuur magic link' }}
        </button>

        <p v-if="magicLinkSent" class="success-message">
          Check je email voor de login link!
        </p>
      </form>

      <button class="btn-link" @click="showMagicLink = !showMagicLink">
        {{ showMagicLink ? 'Login met wachtwoord' : 'Login met magic link' }}
      </button>

      <div class="divider">
        <span>of</span>
      </div>

      <div class="oauth-buttons">
        <button class="btn-oauth btn-google" @click="loginWithProvider('google')">
          <span class="icon">G</span>
          Google
        </button>
        <button class="btn-oauth btn-github" @click="loginWithProvider('github')">
          <span class="icon">GH</span>
          GitHub
        </button>
        <button class="btn-oauth btn-azure" @click="loginWithProvider('azure')">
          <span class="icon">M</span>
          Microsoft
        </button>
      </div>

      <p class="auth-footer">
        Nog geen account?
        <NuxtLink to="/register">Registreer hier</NuxtLink>
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
const loading = ref(false);
const errorMessage = ref('');
const showMagicLink = ref(false);
const magicLinkSent = ref(false);

watch(user, (newUser) => {
  if (newUser) {
    navigateTo('/');
  }
}, { immediate: true });

async function handleEmailLogin() {
  loading.value = true;
  errorMessage.value = '';

  const { error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    errorMessage.value = error.message;
  }

  loading.value = false;
}

async function handleMagicLink() {
  loading.value = true;
  errorMessage.value = '';
  magicLinkSent.value = false;

  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/confirm`,
    },
  });

  if (error) {
    errorMessage.value = error.message;
  } else {
    magicLinkSent.value = true;
  }

  loading.value = false;
}

async function loginWithProvider(provider: 'google' | 'github' | 'azure') {
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

.btn-link {
  width: 100%;
  padding: 0.5rem;
  background: none;
  border: none;
  color: #6b7280;
  font-size: 0.875rem;
  cursor: pointer;
  margin-top: 0.5rem;
}

.btn-link:hover {
  color: #3b82f6;
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
  color: #059669;
  font-size: 0.875rem;
  margin-top: 0.5rem;
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
