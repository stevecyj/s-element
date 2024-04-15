/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'

import './styles/index.css'

/* add icons to the library */
library.add(fas)

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
