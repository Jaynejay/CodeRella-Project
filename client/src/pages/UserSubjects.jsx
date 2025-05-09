// src/pages/UserSubjects.jsx
import { Link } from 'react-router-dom'
import NavbarUser from '../components/layout/NavbarUser'
import Footer     from '../components/layout/Footer'
import plantprotection from '../assets/images/plant-protection.jpg'
import fieldcro from '../assets/images/field-crop.jpg'
import plantation from '../assets/images/plantation-crop.jpg'
import breadbuns from '../assets/images/bread-buns.jpg'
import desserts from '../assets/images/desserts.jpg'
import cookies from '../assets/images/cookies.jpg'
import plantProtection from '../assets/images/plant-protection.jpg'
import graphic from '../assets/images/graphic-design.jpg'
import shirt from '../assets/images/sew-ladies-shirt.jpg'

const subjects = [
  { id: 'SUB-01',   title: 'Principles Of Plant Protection',           level: 'NVQ 6', image: plantprotection },
  { id: 'SUB-02',   title: 'Other Field Crop Production',             level: 'NVQ 6', image: fieldcro  },
  { id: 'SUB-03',   title: 'Plantation & Export Agricultural Crop Production', level: 'NVQ 6', image: plantation },
  { id: 'SUB-100',  title: 'Preparation Of Bread And Buns',           level: 'NVQ 4', image:breadbuns },
  { id: 'SUB-102',  title: 'Preparation Of Desserts',                 level: 'NVQ 4', image: desserts  },
  { id: 'SUB-104',  title: 'Preparation Of Cookies',                  level: 'NVQ 4', image: cookies},
  { id: 'SUB-227',  title: 'Basics Of Graphic Design',                level: 'NVQ 4', image: plantProtection },
  { id: 'SUB-108',  title: 'Tailoring Equipment And Tools',           level: 'NVQ 4', image: graphic },
  { id: 'SUB-118',  title: 'Sew Ladies Shirt',                        level: 'NVQ 4', image: shirt },
]

export default function UserSubjects() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col pt-20">
      <NavbarUser />

      <main className="container mx-auto px-4 py-10 flex-grow">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {subjects.map((sub) => (
              <Link
                key={sub.id}
                to={`/subject/${sub.id}`}
                className="block relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer group"
              >
                <img
                  src={sub.image}
                  alt={sub.title}
                  className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                />
                <span className="absolute top-3 right-3 bg-blue-700 text-white text-xs font-semibold px-2 py-1 rounded-full">
                  {sub.level}
                </span>
                <div className="p-4">
                  <p className="text-sm text-gray-800">
                    {`${sub.id}-${sub.title}`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
