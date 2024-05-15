import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout"; 

const LogoutButton = () => {
	const { loading, logout } = useLogout();

	return (
		<div className='mt-auto  p-2 flex items-center justify-center pr-3 hover:bg-[#ffffff2b] absolute bottom-4 left-2 bg-[#ffffff0c] rounded-full'>
            	  
			{!loading ? (
				<BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
			) : (
				<span className='loading loading-spinner'></span>
			)}
		</div>
	);
};
export default LogoutButton;