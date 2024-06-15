import { observer } from 'mobx-react'
import { Header } from '../components';
import { useState } from 'react';
import { useAppContext } from '../utils/context.js';

function Shedule() {

  const { store } = useAppContext()
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={store.user.user.username} title="Calendar" />
    </div>
  )
}

export default observer(Shedule)