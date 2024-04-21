/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'

import './styles/index.css'

/* add icons to the library */
library.add(fas)

import { createApp } from 'vue'
import App from './App.vue'

// console.log('App2: ', App.render?.toString())
createApp(App).mount('#app')
