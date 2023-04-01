import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { loginUser, loginVendor } from '../apiCalls';

import Logo from "../assets/QL-Logo-Full.png";

function Login({ setToken }) {

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [idStatus, setIdStatus] = useState();
    const [passwordStatus, setPasswordStatus] = useState();
    const [loginStatus, setLoginStatus] = useState();


    useEffect(() => {
        document.title = 'VMS Login'

      }, [])

    const validateForm = () => {
        if (id.length == 0 || password.length == 0) {
            return false;
        }

        return true;
    }

    const checkPassword = (credentials) => {
        if (password == credentials.password) {
            const token = credentials;
            setToken(token);
        } else {
            console.log("wrong password")
            setPasswordStatus(false)
        }
    }

    const handleLogin = () => {
        loginVendor({ id: id, password: password })
            .then(function(response){
                setToken(response.data);
            })
            .catch(function(error){
                loginUser({ id: id, password: password })
                    .then(function(response) {
                        setToken(response.data);
                    })
                .catch(function(error) {
                    console.log("CAUGHT")
                    setLoginStatus(false)
                })
            })

    }

    return (
        <>
        <div className="grid h-screen place-content-center">
            <img src={Logo} className="w-64"></img>
            <h1 className="my-5 text-3xl font-semibold text-blue">Vendor Management System</h1>
            <div className="">
                <form>
                    <div id="userDetails" className="mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="email">
                                ID
                            </label>
                            <input onChange={e => setId(e.target.value)} className={loginStatus == false ? "shadow appearance-none border-red-500 bg-red-50 rounded-full w-full py-2 px-3 text-grey-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"} id="email" type="text"/>
                            <div hidden={ idStatus == false ? false : true }>
                                <p class="mt-2 text-sm text-red-600 dark:text-red-500">This user ID does not exist.</p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-md font-thin mb-2" htmlFor="password">
                                Password
                            </label>
                            <input onChange={e => setPassword(e.target.value)} className={loginStatus == false ? "shadow appearance-none border-red-500 bg-red-50 rounded-full w-full py-2 px-3 text-grey-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" : "shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"} id="password" type="password" placeholder="******************"/>
                        </div>     
                        <div hidden={ loginStatus == false ? false : true }>
                            <p class="text-center mt-2 text-sm text-red-600 dark:text-red-500">Incorrect username or password.</p>
                        </div>               
                    </div>
                <div className="flex justify-center">
                    {validateForm()}
                    <label onClick={() => {handleLogin()}} htmlFor="CreateUserAccount" className="btn btn-md btn-wide bg-cyan border-transparent outline-none rounded-full" type="button" disabled={(validateForm() !== true) ? true : false}>
                        Login
                    </label>
                </div>
                </form>
            </div>
            
        </div>

        </>
    )
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
export default Login;