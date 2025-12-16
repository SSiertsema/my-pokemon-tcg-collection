<template>
  <div class="auth-container">
    <Card class="auth-card">
      <template #title>
        <h1>Login</h1>
      </template>

      <template #content>
        <Message v-if="errorMessage" severity="error" :closable="false" class="mb-4">
          {{ errorMessage }}
        </Message>

        <form v-if="!showMagicLink" @submit.prevent="handleEmailLogin">
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
              placeholder="********"
              :feedback="false"
              toggle-mask
              fluid
            />
          </div>

          <Button
            type="submit"
            :label="loading ? 'Bezig...' : 'Inloggen'"
            :loading="loading"
            :disabled="loading"
            fluid
          />
        </form>

        <form v-else @submit.prevent="handleMagicLink">
          <div class="field">
            <label for="magic-email">Email</label>
            <InputText
              id="magic-email"
              v-model="email"
              type="email"
              required
              placeholder="je@email.com"
              fluid
            />
          </div>

          <Button
            type="submit"
            :label="loading ? 'Bezig...' : 'Verstuur magic link'"
            :loading="loading"
            :disabled="loading"
            fluid
          />

          <Message v-if="magicLinkSent" severity="success" :closable="false" class="mt-3">
            Check je email voor de login link!
          </Message>
        </form>

        <Button
          :label="showMagicLink ? 'Login met wachtwoord' : 'Login met magic link'"
          text
          class="toggle-method"
          @click="showMagicLink = !showMagicLink"
        />

        <Divider align="center">
          <span class="divider-text">of</span>
        </Divider>

        <div class="oauth-buttons">
          <Button
            label="Google"
            icon="pi pi-google"
            severity="secondary"
            outlined
            @click="loginWithProvider('google')"
          />
          <Button
            label="GitHub"
            icon="pi pi-github"
            severity="secondary"
            outlined
            @click="loginWithProvider('github')"
          />
          <Button
            label="Microsoft"
            icon="pi pi-microsoft"
            severity="secondary"
            outlined
            @click="loginWithProvider('azure')"
          />
        </div>

        <p class="auth-footer">
          Nog geen account?
          <NuxtLink to="/register">Registreer hier</NuxtLink>
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

.toggle-method {
  width: 100%;
  margin-top: 0.5rem;
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

.mt-3 {
  margin-top: 0.75rem;
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
