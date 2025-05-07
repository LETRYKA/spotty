"use client"
const DirectionEvent = () => {
    return (
        <div className="bg-[#0A0A0B] w-full h-[200px] rounded-2xl border-1 border-[#1D1D1D] flex flex-col mt-5">
            <div className="flex flex-col justify-center items-center h-[40%] text-center w-full">
                <h1 className="text-white/50 text-sm font-bold">Directions</h1>
                <p className="text-white text-sm w-[50%]">Хүүхдийн 100 өргөн чөлөө
                Ulaanbatar, Mongolia, Ulan Bator</p>
            </div>
            <div>
            <img
                className=""
                src={"/Event.png"} 
                alt="Banner Image"
            />
            </div>
        </div>
    )
}
export default DirectionEvent;