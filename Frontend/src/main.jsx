import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { EnapsisApp } from './EnapsisApp'
import { store } from './redux/store'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <EnapsisApp />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
