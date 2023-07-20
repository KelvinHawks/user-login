import React, {useState} from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'

function Index() {
    const[data, setData] = useState({
        firstname:'',
        lastname:'',
        email:'',
        password:''
    })
    const[error, setError] = useState('')
    const navigate = useNavigate()
    const handleChange = (e)=>{
        const {name, value} = e.target
        setData(
            {
                ...data,
                [name]: value
            }
        )
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
            const url = 'http://localhost:8080/api/users';
            const {data:res} = await axios.post(url, data)
            navigate('/login')
            console.log(res.message);
        } catch (error) {
            if(error.response && error.response.status >= 400 && error.response.status <= 500){
                setError(error.response.data.message)
            }
        }
    }
  return (
    <div>
        <div>
            <h1>Welcome Back</h1>
            <Link to='/login'>
                <button type='button'>Sign in</button>
            </Link>
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                <input 
                    type="text" 
                    placeholder='firstname' 
                    name='firstname' 
                    onChange={handleChange} 
                    value={data.firstname}
                    />
                    <input 
                    type="text" 
                    placeholder='lastname' 
                    name='lastname' 
                    onChange={handleChange} 
                    value={data.lastname}
                    />
                    <input 
                    type="email" 
                    placeholder='email' 
                    name='email' 
                    onChange={handleChange} 
                    value={data.email}
                    />
                    <input 
                    type="password" 
                    placeholder='password' 
                    name='password' 
                    onChange={handleChange} 
                    value={data.password}
                    />
                    {error && <div>{error}</div>}
                    <button type='submit' onClick={handleSubmit}>Sign up</button>
            </form>
        </div>

    </div>
  )
}

export default Index