import KadaiPaneer from "../../assets/CustomerChoice/KadaiPaneer.jpeg";
import VegKofta from "../../assets/CustomerChoice/VegKofta.jpeg";
import SamosaChaat from "../../assets/CustomerChoice/SamosaChaat.jpeg";
import Lassi from "../../assets/CustomerChoice/Lassi.jpeg";
import PalakPaneer from "../../assets/CustomerChoice/PalakPaneer.jpeg";
import SchezwanRice from "../../assets/CustomerChoice/SchezwanRice.jpeg";
import CheeseBalls from "../../assets/CustomerChoice/CheeseBalls.jpeg";
import VegHotDog from "../../assets/CustomerChoice/VegHotDog.jpeg";
import MangoSmoothie from "../../assets/CustomerChoice/MangoSmoothie.jpeg";
import Brownie from "../../assets/CustomerChoice/Brownie.jpeg";



export default function CustomerChoice() {
  const items = [
    
  { name: 'Kadai Paneer', price: '₹269', img: KadaiPaneer },
  { name: 'Veg Kofta Curry', price: '₹249', img: VegKofta },
  { name: 'Lassi', price: '₹239', img: Lassi},
  { name: 'Palak Paneer', price: '₹259', img: PalakPaneer },
  { name: 'Samosa Chaat', price: '₹189', img: SamosaChaat },
  { name: 'Schezwan Rice', price: '₹219', img: SchezwanRice },
  { name: 'Corn Cheese Balls', price: '₹179', img: CheeseBalls },
  { name: 'Veg Hot Dog', price: '₹169', img: VegHotDog },
  { name: 'Mango Smoothie', price: '₹149', img: MangoSmoothie },
  { name: 'Brownie with Ice Cream', price: '₹229', img: Brownie },

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