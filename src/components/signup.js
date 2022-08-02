import Header from './header';
import Footer from './footer';
import { Fragment } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserAuth } from '../contexts/AuthContext';

function Signup () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { createUser } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
          await createUser(email, password);
          navigate('/');
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    }

  return (
    <Fragment>
        <Header />
        <div className='flex items-center justify-center'>
            <div className="flex flex-col items-center p-6 text-center max-w-max bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mt-10">
                <h2 className="text-center mb-4 text-xl font-bold">Sign Up</h2>
                {error && <p className="bg-red-100 border border-red-400 text-red-700 px-2 py-2 rounded mb-4">{error}</p>}
                <form className="flex flex-col items-center justify-center gap-2 max-w-max" onSubmit={handleSubmit}>
                    <label className="text-sm dark:text-gray-400">Email</label>
                    <input type="email" className="w-full p-2 bg-gray-200 dark:bg-gray-800" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)}/>
                    <label className="text-sm dark:text-gray-400">Password</label>
                    <input type="password" className="w-full p-2 bg-gray-200 dark:bg-gray-800" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)}/>
                    <button className="w-full p-2 text-white bg-blue-700 rounded-lg hover:bg-blue-800 mt-2">Sign Up</button>
                    <div className="w-100 text-center">
                        Already have an account? <NavLink to="/login" className={'text-blue-700 hover:underline'}>Log In</NavLink>
                    </div>
                    <div className="w-100 text-center">
                        <NavLink to="/" className={'text-blue-700 hover:underline'}>Go back to main page</NavLink>
                    </div>
                </form>
            </div>
        </div>
        <Footer />
    </Fragment>
    );
}

export default Signup;

