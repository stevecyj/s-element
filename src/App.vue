<script setup lang="ts">
import type { ButtonInstance } from '@components/Button/types'
import type { TooltipInstance } from './components/Tooltip/types'

const buttonRef = ref<ButtonInstance | null>(null)
const tooltipRef = ref<TooltipInstance | null>(null)
const openedValue = ref(['a'])
const trigger = ref<any>('click')

const open = () => {
  console.log('show')
  tooltipRef.value?.show()
}
const close = () => {
  console.log('hide')
  tooltipRef.value?.hide()
}

onMounted(() => {
  // console.log('buttonRef: ', buttonRef.value?.ref)

  setTimeout(() => {
    // for test effect
    openedValue.value = ['a', 'b']
    // trigger.value = 'hover'
  }, 5000)
})
</script>

<template>
  <header>
    <Tooltip
      content="Hello tooltip!"
      placement="right"
      manual
      :offset="10"
      ref="tooltipRef"
    >
      <img
        alt="Vue logo"
        class="logo"
        src="./assets/logo.svg"
        width="125"
        height="125"
      />
    </Tooltip>
    <!-- <div>Tooltip</div> -->
  </header>
  <div>
    <Button type="primary" @click="open">open tooltip</Button>
    <Button type="success" @click="close">close tooltip</Button>
  </div>

  <div>
    <Icon icon="arrow-up" size="2xl" type="primary" />
    <Icon icon="arrow-up" size="2xl" type="danger" />
    <Icon icon="arrow-up" size="2xl" type="danger" color="#0e7a0d" />
    <Icon icon="user-secret" size="xl" type="info" />
  </div>

  <main>
    <Button ref="buttonRef">Default Button</Button>
    <Button type="primary">Test Button</Button>
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
  <br />

  <div>
    <Button size="large" loading>Large</Button>
    <Button size="large" icon="fish">Fish</Button>
  </div>

  <Collapse v-model="openedValue">
    <CollapseItem name="a">
      <template #title>
        <h1>Title A</h1>
      </template>
      <h1>headline title</h1>
      <div>this is content a aaa</div>
    </CollapseItem>

    <CollapseItem name="b" title="Title B">
      <div>this is bbbbb test</div>
    </CollapseItem>

    <CollapseItem name="c" title="Title C" disabled>
      <div>this is cccc test</div>
    </CollapseItem>

    <CollapseItem name="d" title="Title D"> this is ddd test </CollapseItem>
  </Collapse>
  {{ openedValue }}
  <br />
  <hr />
  <Alert title="Primary Alert"></Alert>
  <Alert title="" type="success">
    <template #title> Success Alert </template>
    <template #description> Success description </template>
  </Alert>
  <Alert title="Warning Alert" type="warning"></Alert>
  <Alert title="Danger Alert" type="danger"></Alert>
  <Alert title="Info Alert" type="info" :closable="false"></Alert>
  <br />
  <hr />
  <Alert title="Primary Alert" effect="dark"></Alert>
  <Alert title="" type="success" effect="dark">
    <template #title> Success Alert</template>
  </Alert>
  <Alert
    title="Warning Alert"
    description="Warning description"
    type="warning"
    effect="dark"
  ></Alert>
  <Alert title="Danger Alert" type="danger" effect="dark"></Alert>
  <Alert title="Info Alert" type="info" effect="dark"></Alert>
  <br />
  <hr />
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
