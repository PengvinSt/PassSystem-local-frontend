import { observer } from 'mobx-react'
import './styles/home.scss'
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navbar, Sidebar, ThemeSettings } from './components';
import { Editor, Employees, Main } from './screens';
import { useStateContext } from './utils/internal.context';
function Home() {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <BrowserRouter>
            <div className="flex relative dark:bg-main-dark-bg">
                <div className='fixed right-4 bottom-4' style={{ zIndex: '1000'}}>
                    <TooltipComponent content='Settings' position="TopCenter">
                    <button
                    type="button"
                    onClick={() => setThemeSettings(true)}
                    style={{ background: currentColor, borderRadius: '50%' }}
                    className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                    >
                            <FiSettings/>
                        </button>
                    </TooltipComponent>
                </div>
                {activeMenu ?(
                <div className='w-72 fixed
                sidebar 
                dark:bg-secondary-dark-bg 
                bg-white '
                >
                    <Sidebar/>
                </div>
                ) : (
                <div className='w-0 
                dark:bg-secondary-dark-bg'

                >
                    <Sidebar/>
                </div>
                )}
                <div 
                className={`bg-main-bg dark:bg-main-dark-bg min-h-screen w-full ${
                    activeMenu 
                    ? ' md:ml-72' 
                    : 'flex-2' 
                }`}>
                    <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                        <Navbar />
                    </div>
                <div>
                    {themeSettings && (<ThemeSettings />)}
                    <Routes>
                        <Route path='/' element={<Main/>}/>

                        <Route path='/Main' element={<Main/>}/>

                        <Route path='/employees' element={<Employees/>}/>

                        <Route path='/employees/editor/:id' element={<Editor/>}/>
                    </Routes>
                </div>
            </div>
            </div>
        </BrowserRouter>
    </div>
  )
}

export default observer(Home)