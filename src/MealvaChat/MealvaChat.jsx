import { ArrowUp } from 'lucide-react';
import  { useEffect, useState,useRef } from 'react'

export default function MealvaMsgInputAi({ onSend, isLoading = false }) {
    {
        const [message, setMessage] = useState("");
        const textareaRef = useRef(null);
    useEffect(()=>{
       const textarea =textareaRef.current;

       if (textarea) {
        textarea.style.height ="auto";
        textarea.style.height= Math.min(textarea.scrollHeight,180) + "px"
       }
    },[message]);

    const handleSend = ()=>{
        const text = message.trim();
        if (!text || isLoading) return ;
        onSend (text)
        setMessage("")

        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
    }
    }

    const handleKeyDown = (e)=>{
        if (e.key === "Enter" && !e.shiftKey){
            e.preventDefault();
            handleSend();
        }
    }
  return (
    <div className='w-full px-3 pb-4 sm:px-5'>
        <div className='mx-auto max-w-3xl'> 
            <div className='flex rounded-3xl border border-gray-300 bg-white shadow-sm transition-all duration-200
                        focus-within:border-green-600
                        focus-within:shadow-md'>
                            
                            <textarea ref={textareaRef} 
                            value={message} onChange={(e)=>setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder='Ask Me Anything.....'
                            rows={1}
                            disabled ={isLoading}
                            className ="block w-full resize-none bg-transparent
                                        px-5 pt-2.5 pb-2 text-base text-gray-800
                                        outline-none placeholder:text-gray-400
                                        disabled:opacity-60"
                            />
                                <div className='pr-2 flex items-center justify-between'>
                                    <button type="button"
                                    onClick={handleSend}
                                    disabled={!message.trim() || isLoading}
                                    aria-label="Send message"
                                    title = "Send Message"
                                     className="flex h-10 w-10 items-center
                                                justify-center rounded-full
                                              bg-green-700 text-white
                                                transition hover:bg-green-800
                                                disabled:cursor-not-allowed
                                            disabled:bg-gray-300"
                                     >
                                    <ArrowUp size={22}/>
                                    </button>
                                </div>
                            

            </div>
            </div>
    </div>
  )
}
}
