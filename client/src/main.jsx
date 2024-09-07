import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/index.jsx'
import { Provider } from "react-redux"
import { store } from './redux/store.js'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
    </Provider>
  </StrictMode>,
)
