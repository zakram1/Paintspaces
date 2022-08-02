import { Fragment } from "react";
import Draw from "./draw";
import Footer from "./components/footer";
import { useNavigate } from "react-router-dom";
import {UserAuth} from './contexts/AuthContext';
import {NavLink} from 'react-router-dom'; 

function Board () {
    const { currUser, signingOut } = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
          await signingOut();
          window.location.reload();
          navigate('/');
        } catch (e) {
            console.log(e.message);
        }
    }

  return (
    <Fragment>
      <div className='flex flex-row bg-[#D3D3D3] items-center justify-between'>
        <h4 className='text-center text-xl font-bold ml-5'>Paintspaces</h4>
        {(currUser && currUser.email) ? (
        <>
        <h1 className="font-bold text-black ml-auto">Logged in as: {currUser.email}</h1>
        <button className="max-w-max p-1 text-white bg-blue-700 rounded-lg hover:bg-blue-800 m-1" onClick={handleLogout}>Log Out</button>
        </>
        ) : (
        <h1 className="font-bold text-blue-700 ml-auto mr-2"><NavLink to="/login">Login / Signup</NavLink></h1>
        )}
      </div>
        <div className='flex flex-col items-center justify-center gap-2 mt-5 max-w-max mr-auto ml-5'>
          <Draw />
        </div>
      <Footer />
    </Fragment>
  );
}

export default Board;