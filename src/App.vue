<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Button from '@components/Button/Button.vue'
import type { ButtonInstance } from '@components/Button/types'
const buttonRef = ref<ButtonInstance | null>(null)
onMounted(() => {
  console.log(buttonRef.value?.ref)
})
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />
  </header>

  <main>
    <Button type="primary" plain disabled ref="buttonRef">test button</Button>
    <a href="https://google.com" target="_blank" rel="noopener noreferrer">google</a>
  </main>
  <h1>H1</h1>
  <h2>H2</h2>
  <h3>H3</h3>
  <a href="#">the link</a>
  <hr />
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
