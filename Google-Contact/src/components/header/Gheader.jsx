import React from 'react';
import { Tooltip } from 'react-tooltip';

import Logo from '../../assets/contact-logo.png';
import ReactLogo from '../../assets/react.svg';
import { Link} from 'react-router';

function Gheader() {
    return (
        <nav className='px-8 py-4 bg-white'>
            <div className="flex items-center gap-24">

                {/* logo */}
                <div className='flex items-center relative gap-2 '>
                    <img src={Logo} alt="Contact-Logo" width={`40px`} />
                    <Link to={'/'}>
                        <span className='inset-0 absolute'></span>
                    </Link>
                    <h1 className='text-2xl'>Contacts</h1>
                </div>

                <div className='flex flex-nowrap justify-between grow items-center'>
                    {/* search */}
                    <div className='bg-[#F0F4F9] group focus-within:bg-white focus-within:shadow  w-[60%] rounded-4xl p-3'>

                        <form className='flex gap-3 group' action="">
                            <button className='btn' type="submit"><i className="ri-search-line text-[20px]"></i></button>
                            <input className='inline-block  focus-within:outline-0 w-full p-1' type="search" name='Search' placeholder='Search' />
                        </form>
                    </div>

                    {/* btns */}
                    <div className='flex items-center gap-5'>
                        <div className='ri-question-line text-[28px] cursor-pointer' data-tooltip-id='menu-help'></div>
                        <Tooltip id='menu-help' content='Help Menu'/>

                        <div className='inline border-3 border-[#3C8DFF] py-2 cursor-pointer px-1.5 rounded-3xl' data-tooltip-id='profile'>
                            <img src={ReactLogo} alt="user logo" width={`30px`} />
                        </div>
                        <Tooltip id='profile' content='Profile' />

                    </div>
                </div>


            </div>
        </nav>

    )
}

export default Gheader;