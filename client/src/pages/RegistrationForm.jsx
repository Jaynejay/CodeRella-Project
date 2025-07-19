import { useState } from "react";
import logo from "../assets/images/logo.svg";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    nic: "",
    nicPhoto: null,
    designation: "",
    languages: [""],
    phoneNumbers: [""],
    email: "",
    address: {
      homeNo: "",
      street: "",
      city: "",
      district: "",
    },
    bank: {
      accountHolderName: "",
      accountNumber: "",
      bankName: "",
      branch: "",
      passbookPhoto: null,
    },
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleArrayChange = (index, field, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [field]: newArray,
    }));
  };

  const addField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeField = (field, index) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      [field]: newArray,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration form submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="flex items-center mb-6">
          <img src={logo} alt="DTET Logo" className="w-50 h-12 mr-3" />
        </div>

        <h1 className="text-xl font-bold mb-6">Please Fill out form to Register!</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {/* Left Column */}
            <div>
              {/* First Name */}
              <div className="mb-4">
                <label className="block mb-1">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              {/* Last Name */}
              <div className="mb-4">
                <label className="block mb-1">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              {/* Date of Birth */}
              <div className="mb-4">
                <label className="block mb-1">Date of Birth:</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              {/* NIC */}
              <div className="mb-4">
                <label className="block mb-1">NIC:</label>
                <input
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>

              {/* NIC Photo */}
              <div className="mb-4 inline-flex">
                <label className="block mb-1">Photo of NIC:</label>
                <input
                  type="file"
                  name="nicPhoto"
                  onChange={handleFileChange}
                  className="hidden"
                  id="nicPhoto"
                />
                <label
                  htmlFor="nicPhoto"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-4 rounded cursor-pointer text-sm"
                >
                  upload file
                </label>
                {formData.nicPhoto && (
                  <span className="ml-2 text-sm">{formData.nicPhoto.name}</span>
                )}
              </div>

              {/* Designation */}
              <div className="mb-4">
                <label className="block mb-1">Designation:</label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              {/* Languages */}
              <div className="mb-4">
                <label className="block mb-1">Languages:</label>
                {formData.languages.map((language, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="text"
                      value={language}
                      onChange={(e) => handleArrayChange(index, "languages", e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                    <div className="ml-2 flex gap-1">
                      {formData.languages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeField("languages", index)}
                          className="w-6 h-6 flex items-center justify-center text-red-500"
                          title="Remove"
                        >
                          ×
                        </button>
                      )}
                      {index === formData.languages.length - 1 && language.trim() !== "" && (
                        <button
                          type="button"
                          onClick={() => addField("languages")}
                          className="w-6 h-6 flex items-center justify-center"
                        >
                          +
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Phone Numbers */}
              <div className="mb-4">
                <label className="block mb-1">Phone number:</label>
                {formData.phoneNumbers.map((phone, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => handleArrayChange(index, "phoneNumbers", e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                    <div className="ml-2 flex gap-1">
                      {formData.phoneNumbers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeField("phoneNumbers", index)}
                          className="w-6 h-6 flex items-center justify-center text-red-500"
                          title="Remove"
                        >
                          ×
                        </button>
                      )}
                      {index === formData.phoneNumbers.length - 1 && phone.trim() !== "" && (
                        <button
                          type="button"
                          onClick={() => addField("phoneNumbers")}
                          className="w-6 h-6 flex items-center justify-center"
                        >
                          +
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block mb-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div>
              <label className="block mb-1">Address:</label>
              <div className="mb-4">
                <label className="block mb-1">Home No:</label>
                <input
                  type="text"
                  name="address.homeNo"
                  value={formData.address.homeNo}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Street:</label>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">City:</label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">District:</label>
                <input
                  type="text"
                  name="address.district"
                  value={formData.address.district}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              {/* Bank Details */}
              <div className="mb-4">
                <label className="block mb-1">Account holder&apos;s name:</label>
                <input
                  type="text"
                  name="bank.accountHolderName"
                  value={formData.bank.accountHolderName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Account number:</label>
                <input
                  type="text"
                  name="bank.accountNumber"
                  value={formData.bank.accountNumber}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Bank:</label>
                <input
                  type="text"
                  name="bank.bankName"
                  value={formData.bank.bankName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Branch:</label>
                <input
                  type="text"
                  name="bank.branch"
                  value={formData.bank.branch}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>
              <div className="mb-4 inline-flex">
                <label className="block mb-1">
                  Photo of first page of passbook:
                </label>
                <input
                  type="file"
                  name="passbookPhoto"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setFormData((prev) => ({
                      ...prev,
                      bank: {
                        ...prev.bank,
                        passbookPhoto: file,
                      },
                    }));
                  }}
                  className="hidden"
                  id="passbookPhoto"
                />
                <label
                  htmlFor="passbookPhoto"
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-4 rounded cursor-pointer text-sm"
                >
                  upload file
                </label>
                {formData.bank.passbookPhoto && (
                  <span className="ml-2 text-sm">{formData.bank.passbookPhoto.name}</span>
                )}
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-6 flex items-center">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              className="mr-2"
              required
            />
            <label htmlFor="agreeTerms">I agree terms and conditions</label>
          </div>

          {/* Submit */}
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-16 rounded-md hover:bg-blue-700 transition duration-300"
            >
              register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
