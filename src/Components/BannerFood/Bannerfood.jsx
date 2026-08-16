import { useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import Poha from "../../assets/FoodBanner/Breakfast/Poha.jpeg";
import Upma from "../../assets/FoodBanner/Breakfast/Upma.jpeg";
import IdliSambar from "../../assets/FoodBanner/Breakfast/IdliSambar.jpeg";
import MeduVada from "../../assets/FoodBanner/Breakfast/MeduVada.jpeg";
import AlooParatha from "../../assets/FoodBanner/Breakfast/AlooParatha.jpeg";
import BesanChilla from "../../assets/FoodBanner/Breakfast/BesanChilla.jpeg";
import Uttapam from "../../assets/FoodBanner/Breakfast/Uttapam.jpeg";
import PooriSabzi from "../../assets/FoodBanner/Breakfast/PooriSabzi.jpeg";
import BreadToast from "../../assets/FoodBanner/Breakfast/BreadToast.jpeg";
import FruitYogurtBowl from "../../assets/FoodBanner/Breakfast/FruitYogurtBowl.jpeg";
import { useState } from 'react';
import OrderPage from '../Orderpage/Orderpage';
import { Link } from 'react-router-dom';
export default function BannerFood(current) {

  const [added, setAdded] = useState({});
  const [cart, setCart] = useState([]);
  
  const Breakfasts = [
  {
    name: 'Poha',
    price: '₹89',
    img: Poha,
    ingredients: 'Flattened rice, onion, peanuts, curry leaves, mustard seeds, turmeric'
  },
  {
    name: 'Upma',
    price: '₹79',
    img: Upma,
    ingredients: 'Semolina, vegetables, curry leaves, mustard seeds, green chilies'
  },
  {
    name: 'Idli Sambar',
    price: '₹99',
    img: IdliSambar,
    ingredients: 'Rice, urad dal, lentils, vegetables, tamarind, spices'
  },
  {
    name: 'Medu Vada',
    price: '₹109',
    img: MeduVada,
    ingredients: 'Urad dal, black pepper, curry leaves, green chilies, ginger'
  },
  {
    name: 'Aloo Paratha with Curd',
    price: '₹129',
    img: AlooParatha,
    ingredients: 'Wheat flour, potatoes, coriander, green chilies, yogurt'
  },
  {
    name: 'Besan Chilla',
    price: '₹99',
    img: BesanChilla,
    ingredients: 'Gram flour, onion, tomato, coriander, spices'
  },
  {
    name: 'Vegetable Uttapam',
    price: '₹139',
    img: Uttapam,
    ingredients: 'Rice batter, vegetables, onions, tomatoes, coriander'
  },
  {
    name: 'Poori Sabzi',
    price: '₹119',
    img: PooriSabzi,
    ingredients: 'Wheat flour, potatoes, tomatoes, spices, oil'
  },
  {
    name: 'Bread Butter Toast',
    price: '₹69',
    img: BreadToast,
    ingredients: 'Bread, butter, herbs'
  },
  {
    name: 'Fruit Yogurt Bowl',
    price: '₹149',
    img: FruitYogurtBowl,
    ingredients: 'Yogurt, banana, apple, berries, honey, nuts'
  },
];
//  const Lunchs = [
//   {
//     name: 'Classic Veg Thali',
//     price: '₹249',
//     img: VegThali,
//     ingredients: 'Roti, rice, dal, mixed vegetable curry, salad, pickle'
//   },
//   {
//     name: 'Paneer Deluxe Thali',
//     price: '₹299',
//     img: PaneerThali,
//     ingredients: 'Paneer curry, roti, jeera rice, dal, salad, dessert'
//   },
//   {
//     name: 'North Indian Thali',
//     price: '₹279',
//     img: NorthIndianThali,
//     ingredients: 'Butter roti, dal makhani, paneer curry, rice, salad'
//   },
//   {
//     name: 'Rajasthani Thali',
//     price: '₹329',
//     img: RajasthaniThali,
//     ingredients: 'Dal baati, churma, gatte ki sabzi, roti, rice'
//   },
//   {
//     name: 'Gujarati Thali',
//     price: '₹289',
//     img: GujaratiThali,
//     ingredients: 'Thepla, dal, kadhi, vegetable curry, rice, farsan'
//   },
//   {
//     name: 'Bengali Veg Thali',
//     price: '₹269',
//     img: BengaliThali,
//     ingredients: 'Rice, shukto, dal, aloo bhaja, vegetable curry'
//   },
//   {
//     name: 'South Indian Meals',
//     price: '₹239',
//     img: SouthIndianMeals,
//     ingredients: 'Rice, sambar, rasam, poriyal, curd, papad'
//   },
//   {
//     name: 'Mini Veg Thali',
//     price: '₹199',
//     img: MiniVegThali,
//     ingredients: 'Roti, rice, dal, vegetable curry, pickle'
//   },
//   {
//     name: 'Special Lunch Thali',
//     price: '₹319',
//     img: SpecialLunchThali,
//     ingredients: 'Paneer curry, dal, rice, roti, dessert, salad'
//   },
//   {
//     name: 'Family Veg Thali',
//     price: '₹399',
//     img: FamilyVegThali,
//     ingredients: 'Paneer dish, dal, mixed vegetables, rice, roti, sweets'
//   },
// ];

// const Dinners = [
//   {
//     name: 'Paneer Lababdar',
//     price: '₹289',
//     img: PaneerLababdar,
//     ingredients: 'Paneer, tomatoes, cream, butter, aromatic spices'
//   },
//   {
//     name: 'Malai Kofta',
//     price: '₹269',
//     img: MalaiKofta,
//     ingredients: 'Paneer kofta, potatoes, cream, tomato gravy, spices'
//   },
//   {
//     name: 'Veg Handi',
//     price: '₹249',
//     img: VegHandi,
//     ingredients: 'Mixed vegetables, onions, tomatoes, cream, spices'
//   },
//   {
//     name: 'Butter Roti Combo',
//     price: '₹199',
//     img: ButterRotiCombo,
//     ingredients: 'Butter roti, dal, vegetable curry, salad'
//   },
//   {
//     name: 'Jeera Rice with Dal',
//     price: '₹219',
//     img: JeeraRiceDal,
//     ingredients: 'Basmati rice, cumin, lentils, ghee, spices'
//   },
//   {
//     name: 'Tandoori Roti Thali',
//     price: '₹259',
//     img: TandooriThali,
//     ingredients: 'Tandoori roti, paneer curry, dal, rice, salad'
//   },
//   {
//     name: 'Paneer Bhurji',
//     price: '₹239',
//     img: PaneerBhurji,
//     ingredients: 'Crumbled paneer, onions, tomatoes, green chilies, spices'
//   },
//   {
//     name: 'Veg Kolhapuri',
//     price: '₹279',
//     img: VegKolhapuri,
//     ingredients: 'Mixed vegetables, coconut, red chilies, Kolhapuri masala'
//   },
//   {
//     name: 'Dal Tadka with Rice',
//     price: '₹209',
//     img: DalTadkaRice,
//     ingredients: 'Lentils, garlic-free tadka, cumin, rice, coriander'
//   },
//   {
//     name: 'Methi Malai Paneer',
//     price: '₹299',
//     img: MethiMalaiPaneer,
//     ingredients: 'Paneer, fenugreek leaves, cream, milk, mild spices'
//   },
// ];
       const banners =Breakfasts
       const navigate = useNavigate();
       
       function goToOrderPage() {
        navigate('/orderpage', {
        state: { cart },
        });
      }

    function handleClick(index){
      const item = banners[index];
    setCart((prev)=>{
    const exists = cart.some(
      (food)=>food.name === item.name);

    if (!exists){
      return [...prev,item]
    }
    else{
      return prev.filter((food)=>food.name !== item.name)
    }
    });
    setAdded((prev)=>({
      ...prev,
      [index]: !prev[index],
    }))
    
    }


 return (
    <div className='w-full'>
      <div className='p-4 sticky top-0 z-50 shadow-md border-b'>
        <div className='justify-between mx-auto flex-row flex items-center '>
        <Link to="/" 
                    className="flex  text-3xl font-bold text-green-700 mr-12">
                      Mealva   
                        
                    </Link>

                    
      <button
          onClick={goToOrderPage}
          className='relative  p-2 rounded-full  '
        >
          <ShoppingCart size={25} />

          {cart.length > 0 && (
            <span className='absolute -top-0.5 -right-1 bg-green-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center'>
              {cart.length}
            </span>
          )}
        </button>
        </div>

      </div>
      <h2 className='bg-transparent shadow-sm shadow-green-600 mx-8 mt-2 rounded-4xl border p-2 text-center text-2xl font-bold '>
        Breakfast
      </h2>
       <div className='px-6 pt-6'>
      <div className='bg-linear-to-r from-green-100 to-green-50 rounded-3xl p-6 shadow-sm mb-4'>
        <h2 className='text-2xl font-bold text-green-800'>
          Fresh breakfast specials
        </h2>
        <p className='text-gray-600 mt-2'>
          Healthy, delicious, and prepared fresh every morning.
        </p>
      </div>
    </div>

      <div className='grid grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center w-full'>
        {Breakfasts.map((item, index) => (
          <div
            key={index}
            className='hover:shadow-green-400 hover:bg-gray-100 lg:w-64 w-50 bg-white rounded-3xl shadow-md p-4 transition'
          >
            <img
              src={item.img}
              alt={item.name}
              className='w-full h-40 object-cover rounded-2xl'
            />

            <div className='flex justify-between items-center mt-3'>
              <h2 className='text-lg font-semibold'>
                {item.name}
              </h2>
              <p className='text-gray-600'>
                {item.price}
              </p>
            </div>

            <button
              onClick={() => handleClick(index)}
              className={`p-2 rounded w-full mt-3 border transition-colors ${
                added[index]
                  ? 'bg-green-500 text-white border-green-500'
                  : 'bg-white text-black border-black hover:bg-gray-100'
              }`}
            >
              {added[index] ? 'Added ✓' : 'Add'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}




