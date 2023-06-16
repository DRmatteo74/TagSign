
import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'

// To be used on app.use(Quasar, { ... })

import { QCalendar } from '@quasar/quasar-ui-qcalendar'

export default {
  config: {
    brand: {
      primary: '#009EF7',
      secondary: '#F6F6F6',
      accent: '#9C27B0',

      dark: '#1d1d1d',
      'dark-page': '#121212',

      positive: '#21BA45',
      negative: '#C10015',
      info: '#31CCEC',
      warning: '#F2C037'
    },
    typography: {
      fontFamily: 'Poppins,Helvetica,sans-serif',
    },
  },
  plugins: {
    QCalendar
  }
}