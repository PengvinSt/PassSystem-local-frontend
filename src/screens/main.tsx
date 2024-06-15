import { observer } from 'mobx-react'
import { useAppContext } from '../utils/context'
import { useEffect, useState } from 'react'
import { useStateContext } from '../utils/internal.context';

function formatDate(date:Date) {
  return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
}

function Main() {
  const [date, setDate] = useState<string>()
  const { store } = useAppContext()
  const { currentColor } = useStateContext();
  useEffect(()=> {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate);
    setDate(formattedDate)
  }, [])
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col gap-6 bg-main-bg dark:bg-main-dark-bg">
      <h1 className='text-3xl' style={{ color: currentColor }}>Welcome to admin panel, {store.user.currentUser?.name.first} {store.user.currentUser?.name.last}!</h1>
      <h2 className='text-xl' style={{ color: currentColor }}>Secure and Protect your business with us!</h2>
      <h2 className='text-xl' style={{ color: currentColor }}>{date}</h2>
    </div>
  )
}

export default observer(Main)