import logo from "../assets/images/logo.svg";
import students from "../assets/images/bg.svg";
import { Link } from 'react-router-dom';
const Forgotpw1 = () => {
	
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
				<div className="flex flex-col md:flex-row">
					{/*Left panel*/}
					<div className="w-full md:w-5/12 p-8 flex flex-col justify-between">
						<div>
							{/*logo*/}
							<div className="flex items-center mb-6">
								<Link to="/">
									<img src={logo} alt="DTET logo" className="w-50 h-12 mr-3" />
								</Link>
							</div>

							<div className="mt-8 mb-8 py-40">
								<h1 className="text-xl font-bold text-center mb-2">Forgot password?</h1>
								<form className="text-center" >
									<label htmlFor="email" className="block mb-2 pt-5">Email:</label>
									<input type="text" id="email" name="email" className="text-center w-full border border-gray-300 rounded-md px-3 py-2" required/>
								</form>
							</div>
						</div>
					
					</div>
					<div className="w-full md:w-7/12 bg-gray-100">
						<img src={students} alt="Graduates throwing caps" className="w-full h-full object-cover"/>
					</div>
					
				</div>
			</div>
		</div>
	);
}


export default Forgotpw1;