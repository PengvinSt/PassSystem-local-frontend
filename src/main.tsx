import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import AppBar from './components/tauri/AppBar'

import './styles/index.scss'
import AppStore from './store/app'
import AppApi, { client } from './api/app'
import AppContext from './utils/context'


const store = new AppStore();
const api = new AppApi();
import { ContextProvider } from './utils/internal.context'
import { ApolloProvider } from '@apollo/client'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <ApolloProvider client={client}>
      <AppBar />
      <div className="App">
      <AppContext.Provider value={{ store, api }}>
         <ContextProvider>
            <App />
         </ContextProvider>  
      </AppContext.Provider>
      </div>
      </ApolloProvider>   
   </React.StrictMode>
)