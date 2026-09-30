import { Link } from "react-router";

function Header() {
   return (
      <header className="position-fixed top-0 start-0 end-0 z-10">
         <div className="container header p-4 px-5 mt-3 rounded-pill border border-2 border-dark">
            <div className="d-flex align-items-center justify-content-between ">
               {/* title */}
               <h1 className="h4 m-0 p-0 ls-3px">
                  <Link
                     to={`/`}
                     className="text-highlight text-decoration-none"
                  >
                     Clinova
                  </Link>
               </h1>

               {/* nav and btn */}
               <div className="d-flex align-items-center gap-5">
                  {/* nav */}
                  <ul className="nav align-items-center gap-5 font-geist">
                     <li className="nav-item">
                        <Link to={`/`} className="text-decoration-none text-lightGreen ls-3px">
                           Home
                        </Link>
                     </li>
                     <li className="nav-item">
                        <Link
                           to={`/specialists`}
                           className="text-decoration-none text-lightGreen ls-3px"
                        >
                           Specialists
                        </Link>
                     </li>
                  </ul>

                  {/* Login-Register */}
                  <div>
                     <Link
                        className="text-decoration-none text-lightGreen ls-3px"
                        to={`/register`}
                     >
                        Register
                     </Link>
                     <Link
                        className="text-decoration-none ms-4 btn-highlighted px-3"
                        to={`/login`}
                     >
                        Login
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </header>
   );
}

export default Header;
