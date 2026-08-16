import { ArrowLeft } from "lucide-react"
import Orderfoods from "../cards/OrderFoodsCard"
import OrderFoodsCard from "../cards/OrderFoodsCard"

export default function Orderpage() {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <div className="sticky shadow mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex p-2 m-2 hover:shadow-2xl text-green-500 hover:text-green-900 mb-4 transition"
        >
          <ArrowLeft size={30} />
        </button>
      </div>
      <div className="border w-1/2 h-1/2 ">
      
        <div>
          <OrderFoodsCard/>
        </div>
        



      </div>

      <div className="border w-1/2 h-1/2">

      </div>
    </div>
  )
}
