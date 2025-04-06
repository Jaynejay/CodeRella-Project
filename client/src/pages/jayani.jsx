
import Navbar from
const jayani = () => {
  return (
    <div>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Jayani</h1>
            <p className="text-lg mb-8">Welcome to the Jayani page!</p>
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
            <form>
                <div className="mb-4">
                <label htmlFor="name" className="block mb-1">
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                />
                </div>
    
                <div className="mb-4">
                <label htmlFor="email" className="block mb-1">
                    Email:
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    required
                />
                </div>
    
                <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-12 rounded-md hover:bg-blue-700 transition duration-300"
                >
                    Submit
                </button>
                </div>
            </form>
            </div>
        </div>
      
    </div>
  )
}

export default jayani
