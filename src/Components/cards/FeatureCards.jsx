import {QrCode,ShoppingCart,CreditCard,BarChart,ChefHat} from "lucide-react"

export function FeatureCards()
{
    const features=[
        {
          icon: <ShoppingCart size={28}/>,
          title: "Online Ordering",
          description: "Order your favorite food online",
    },
    {
      icon: <QrCode size={28} />,
      title: "QR Code Ordering",
      description: "Scan, order and enjoy your meal",
    },
    {
      icon: <CreditCard size={28} />,
      title: "Cashless Payment",
      description: "Secure & easy digital payments",
    },
    {
      icon: <ChefHat size={28} />,
      title: "Quality Meals",
      description: "Nutritious and delicious meals for everyone",
    },
  ];
        
    return(
    <section className='rounded-xl bg-gray-100 flex  p-5  items-center justify-between'>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {features.map((item, index)=>(
      <div 
        key={index}
        className="bg-white rounded-xl shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition">
         
         <div className="bg-green-100 text-green-600 p-3 rounded-lg">{item.icon}</div>

              <div>
                <h3 className="font-semibold text-gray-800">
                {item.title}
              </h3> 
              <p className="text-sm text-gray-500 mt-1">
                {item.description}
              </p>
            </div> 
            </div>  
          

        
    )
    )}
    </div>
    </section>
    )
}
