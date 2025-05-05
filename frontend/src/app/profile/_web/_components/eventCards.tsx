import React from 'react';
import Mapping from "/public/Mapping.png";
import RandomIcon from "/public/Random-icon.png";
import { Navigation, Pizza } from 'lucide-react';



const EventCards = () => {
    return (
        <div className="w-full h-auto flex flex-row items-center gap-4 mt-8 px-8">
            <div className='bg-[#313034] flex flex-col rounded-3xl items-center relative'>
                <img
                    src={Mapping.src}
                    alt="Event"
                    className="w-[300px] h-auto aspect-square rounded-3xl object-cover"
                />
                <div className='absolute top-4 bottom-4 left-6 right-6'>
                    <div className='w-full flex justify-between items-center gap-4'>
                        <div className='w-full h-auto flex flex-col justify-start items-start'>
                            <h5 className='text-white/50 text-base font-medium flex gap-2 items-center'>
                                <Navigation className='text-white w-5 rounded-full' />
                                Capacity, nation
                            </h5>
                            <p className="text-white text-3xl font-bold mt-2">Event_Name</p>
                        </div>
                        <div className='w-24 h-auto aspect-square bg-[linear-gradient(45deg,_#FAC634,_#FACF64)] rounded-full flex justify-center items-center' >
                            {/* Category Icon авах */}
                            <img
                                src={RandomIcon.src}
                                alt="Event"
                                className="w-10 h-auto aspect-square object-cover"
                            />
                        </div>
                    </div>
                    <div className='w-full absolute bottom-20'>
                        <div className='w-22 h-7 rounded-2xl px-4 py-2 bg-[#F5B44A3A] border border-[#F5B44A] text-white font-bold text-sm flex justify-center items-center'>
                            status
                        </div>
                        <div className='w-full h-auto bg-[#FFFFFF]'>
                        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default EventCards;