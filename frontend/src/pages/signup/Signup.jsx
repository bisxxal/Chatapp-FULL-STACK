import {useState} from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import userSignup from '../../hooks/userSignup'
function Signup() {
	const [inputs ,setInputs] = useState({
	fullname:'', 
	confirmpassword:'',
	username:'',
	password:'',
	gender:'',
		
	})

	const {loding , signup} = userSignup()
	const handelCheakboxChange = (gender)=>{
		setInputs({...inputs , gender})
	}
	const handelSumbit =async (e)=>{
		e.preventDefault()
		await signup(inputs);
	}
  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
    			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
    				<h1 className='text-3xl font-semibold text-center text-gray-300'>
    					Sign Up  
    				</h1>
    
    				<form onSubmit={handelSumbit}>
    					<div>
    						<label className='label p-2'>
    							<span className='text-base label-text'>Full Name</span>
    						</label>
    						<input type='text' placeholder='Enter Full Name' className='w-full input input-bordered  h-10'
							value={inputs.fullname}
							onChange={(e) => setInputs({...inputs , fullname:e.target.value})}
							/>
    					</div>
    
    					<div>
    						<label className='label p-2 '>
    							<span className='text-base label-text'>Username</span>
    						</label>
    						<input type='text' placeholder='Enter Username' className='w-full input input-bordered h-10'
							value={inputs.username}
							onChange={(e) => setInputs({...inputs , username:e.target.value})}
							/>
    					</div>
    
     					<div>
     						<label className='label'>
     							<span className='text-base label-text'>Password</span>
     						</label>
     						<input
    							type='password'
    							placeholder='Enter Password'
    							className='w-full input input-bordered h-10'
								value={inputs.password}
							onChange={(e) => setInputs({...inputs , password:e.target.value})}
    						/>
    					</div>
    
    					<div>
    						<label className='label'>
    							<span className='text-base label-text'>Confirm Password</span>
    						</label>
    						<input
    							type='password'
    							placeholder='Confirm Password'
    							className='w-full input input-bordered h-10'
								value={inputs.confirmpassword}
							onChange={(e) => setInputs({...inputs , confirmpassword:e.target.value})}
    						/>
    					</div>
    
    					<GenderCheckbox onCheakboxChange = {handelCheakboxChange} selectedGender = {inputs.gender} />
    
    					<Link to={'/login'} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block' href='#'>
    						Already have an account?
    					</Link>
    
    					<div>
    						<button className='btn btn-block btn-sm mt-2 border border-slate-700'
							disabled = {loding}
							> {loding ? <span className='loading loading-spinner '></span> : "Sign Up" } </button>
    					</div>
    				</form>
    			</div>
    		</div>
  )
}

export default Signup