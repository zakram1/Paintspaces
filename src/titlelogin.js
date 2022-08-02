import {UserAuth} from './contexts/AuthContext';
import {NavLink} from 'react-router-dom';

function TitleLogin () {
const { currUser } = UserAuth();
  return (
    (currUser && currUser.email) ? (
    <>
    <div id="user-online" className='flex flex-col items-center rounded-lg bg-black px-5 text-center'>
      <p className='whitespace-pre text-lg text-white font-bold text-center'>Color Selector PLUS</p>
    </div>   
    <button className="max-w-max p-1 text-white bg-blue-700 rounded-lg hover:bg-blue-800 -mt-1"><NavLink to="/">Click to Unlock PLUS features</NavLink></button>
    </>
    ) : (
      <div id="user-offline" className='rounded-lg bg-black px-5 text-center'>
      <p className='whitespace-pre text-lg text-white font-bold text-center'>Color Selector</p>
    </div>  
  )
);
}

export default TitleLogin;