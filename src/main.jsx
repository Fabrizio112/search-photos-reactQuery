import React from 'react'
import ReactDOM from 'react-dom/client'
import PhotosApp from './components/PhotosApp'
import { Provider } from 'react-redux'
import { store } from './store/store'
import "./assets/css/styles.css"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

let queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Provider store={store}>
        <PhotosApp />
      </Provider>
    </QueryClientProvider>

  </>)
