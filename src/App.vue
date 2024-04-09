<script setup lang="ts">
import type { ButtonInstance } from '@components/Button/types'
const buttonRef = ref<ButtonInstance | null>(null)
onMounted(() => {
  console.log('buttonRef: ', buttonRef.value?.ref)
})
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="./assets/logo.svg"
      width="125"
      height="125"
    />
  </header>

  <main>
    <Button ref="buttonRef">Test Button</Button>
    <Button type="primary" ref="buttonRef">Test Button</Button>
    <Button plain>Plain Button</Button>
    <Button round>Round Button</Button>
    <Button circle>S</Button>
    <Button disabled>test button</Button>
  </main>
  <br />
  <div>
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button>
    <Button type="info">Info</Button>
  </div>
  <br />
  <div>
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button>
    <Button type="info" plain>Info</Button>
  </div>
  <br />
  <div>
    <Button size="large">Large</Button>
    <Button size="small">Small</Button>
  </div>
  <h1>H1</h1>
  <h2>H2</h2>
  <h3>H3</h3>
  <a href="https://google.com" target="_blank" rel="noopener noreferrer"
    >google</a
  >
  <br />
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
