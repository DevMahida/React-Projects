
import { Route, Routes } from 'react-router-dom';

import Gheader from './components/header/Gheader';
import Sidebar from './components/sidebar/Sidebar';

// pages
import Contacts from './components/pages/Contacts';


function App() {

  return (
    <>
      <Gheader />

      <div className='flex'>

        <Sidebar />

        <div className='bg-white rounded-3xl p-3 grow m-5 h-[85vh]'>
          <Routes>
            <Route path='/' element={<Contacts />} />
            {/* <Route path='/add-contact' element={<AddContact/>}/> */}
            {/* <Route path='/' element={<Contacts/>}/> */}
          </Routes>

        </div>
      </div>


    </>
  )
}

export default App
