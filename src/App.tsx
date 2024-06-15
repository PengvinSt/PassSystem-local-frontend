import { observer } from 'mobx-react';
import { useAppContext } from './utils/context'
import Home from './home';
import Auth from './auth';

function App() {
   const { store } = useAppContext()
   return store.user.isAuthenticated ? (
      <Home />
   ) : (
      <Auth />
   )
}

export default observer(App);
