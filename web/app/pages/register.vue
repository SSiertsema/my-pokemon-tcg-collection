<template>
  <div class="auth-container">
    <Card class="auth-card">
      <template #title>
        <h1>Registreren</h1>
      </template>

      <template #content>
        <Message v-if="errorMessage" severity="error" :closable="false" class="mb-4">
          {{ errorMessage }}
        </Message>

        <Message v-if="successMessage" severity="success" :closable="false" class="mb-4">
          {{ successMessage }}
        </Message>

        <form v-if="!successMessage" @submit.prevent="handleRegister">
          <div class="field">
            <label for="email">Email</label>
            <InputText
              id="email"
              v-model="email"
              type="email"
              required
              placeholder="je@email.com"
              fluid
            />
          </div>

          <div class="field">
            <label for="password">Wachtwoord</label>
            <Password
              id="password"
              v-model="password"
              required
              placeholder="Minimaal 6 karakters"
              toggle-mask
              fluid
            />
          </div>

          <div class="field">
            <label for="confirmPassword">Bevestig wachtwoord</label>
            <Password
              id="confirmPassword"
              v-model="confirmPassword"
              required
              placeholder="Herhaal wachtwoord"
              :feedback="false"
              toggle-mask
              fluid
            />
          </div>

          <Button
            type="submit"
            :label="loading ? 'Bezig...' : 'Account aanmaken'"
            :loading="loading"
            :disabled="loading"
            fluid
          />
        </form>

        <Divider align="center">
          <span class="divider-text">of</span>
        </Divider>

        <div class="oauth-buttons">
          <Button
            label="Registreer met Google"
            icon="pi pi-google"
            severity="secondary"
            outlined
            @click="registerWithProvider('google')"
          />
          <Button
            label="Registreer met GitHub"
            icon="pi pi-github"
            severity="secondary"
            outlined
            @click="registerWithProvider('github')"
          />
          <Button
            label="Registreer met Microsoft"
            icon="pi pi-microsoft"
            severity="secondary"
            outlined
            @click="registerWithProvider('azure')"
          />
        </div>

        <p class="auth-footer">
          Heb je al een account?
          <NuxtLink to="/login">Log hier in</NuxtLink>
        </p>
      </template>
    </Card>
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
}

.auth-card {
  width: 100%;
  max-width: 400px;
}

.auth-card :deep(.p-card-title) {
  text-align: center;
}

h1 {
  margin: 0;
  font-size: 1.5rem;
}

.field {
  margin-bottom: 1rem;
}

.field label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: var(--p-text-color);
}

.divider-text {
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
}

.oauth-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.mb-4 {
  margin-bottom: 1rem;
}

.auth-footer {
  text-align: center;
  margin-top: 1.5rem;
  color: var(--p-text-muted-color);
  font-size: 0.875rem;
}

.auth-footer a {
  color: var(--p-primary-color);
  text-decoration: none;
}

.auth-footer a:hover {
  text-decoration: underline;
}
</style>
