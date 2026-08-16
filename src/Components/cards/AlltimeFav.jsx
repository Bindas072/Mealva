import MargheritaPizza from "../../assets/Alltimefav/MargheritaPizza.jpeg";
import CheeseFries from "../../assets/Alltimefav/CheeseFries.jpeg";
import HoneychiliPotato from "../../assets/Alltimefav/HoneychiliPotato.jpeg";
import Manchurian from "../../assets/Alltimefav/Manchurian.jpeg";
import Kulcha from "../../assets/Alltimefav/Kulcha.jpeg";
import Quesadilla from "../../assets/Alltimefav/Quesadilla.jpeg";
import MushroomMasala from "../../assets/Alltimefav/MushroomMasala.jpeg";
import FalafelBowl from "../../assets/Alltimefav/FalafelBowl.jpeg";
import SowaChaap from "../../assets/Alltimefav/SowaChaap.jpeg";
import Pancakes from "../../assets/Alltimefav/Pancakes.jpeg";


export default function Alltimefav() {
  const items = [
    
  { name: 'Margherita Pizza', price: '₹289', img: MargheritaPizza },
  { name: 'Cheese Loaded Fries', price: '₹189', img: CheeseFries },
  { name: 'HoneychiliPotato', price: '₹199', img: HoneychiliPotato },
  { name: 'Veg Manchurian', price: '₹229', img: Manchurian },
  { name: 'Stuffed Kulcha', price: '₹179', img: Kulcha },
  { name: 'Cheese Quesadilla', price: '₹249', img: Quesadilla },
  { name: 'Mushroom Masala', price: '₹269', img: MushroomMasala },
  { name: 'Falafel Bowl', price: '₹259', img: FalafelBowl },
  { name: 'Sowa Chaap', price: '₹279', img: SowaChaap },
  { name: 'Chocolate Pancakes', price: '₹219', img: Pancakes },
];

  return (
    <div className='overflow-x-auto whitespace-nowrap scrollbar-hide'>
      <div className='flex gap-4 w-max pb-2'>
        {items.map((item, index) => (
          <div
            key={index}
            className='w-64 flex-shrink-0 bg-white rounded-3xl shadow-md p-4'
          >
            <img
              src={item.img}
              alt={item.name}
              className='w-full h-40 object-cover rounded-2xl'
            />
            <div className="flex justify-between items-center">
            <h2 className='text-lg font-semibold mt-3'>{item.name}</h2>
            <p className='text-gray-600 items-end mt-4 justify-end'>{item.price}</p>
            </div>
            <button className="bg-green-500 p-2 pl-4 pr-4 rounded items-center justify-center ml-10 mt-1">Order Now</button>
            
          </div>
        ))}
      </div>
    </div>
  );
}