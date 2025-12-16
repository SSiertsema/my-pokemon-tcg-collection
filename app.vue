<script setup lang="ts">
// Inline script to prevent theme flash - runs before Vue hydration
useHead({
  script: [
    {
      innerHTML: `
        (function() {
          try {
            var mode = localStorage.getItem('theme-mode') || 'auto';
            var isDark = mode === 'dark' || (mode === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
            if (isDark) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
            document.documentElement.style.visibility = 'visible';
          } catch (e) {
            document.documentElement.style.visibility = 'visible';
          }
        })();
      `,
      tagPosition: 'head',
    },
  ],
  style: [
    {
      innerHTML: 'html { visibility: hidden; }',
      tagPosition: 'head',
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
