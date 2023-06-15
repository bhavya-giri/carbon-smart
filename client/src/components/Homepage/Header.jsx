import LocationIcon from '../../assets/icons/LocationIcon';
import Sun from '../../assets/images/sun.png';
import React from "react";

const Header = () => {
    return (
        <>
            <div>
                <div className='flex p-2'>
                    <div className='basis-1/2 p-4'>
                        <h1 className='text-5xl px-1'>45 &deg;</h1>
                        <span className='block px-2 py-1'>Sunny</span>
                        <div className='flex'>
                            <div>
                                <LocationIcon />
                            </div>
                            <div>Rithala</div>
                        </div>
                    </div>
                    <div className='basis-1/2'>
                        <img src={Sun} alt="sun-image" className='w-[100px] m-auto' />
                    </div>
                </div>
            </div>
            <div>
                <div className='flex p-2 bg-accent text-text w-[90vw] m-auto rounded-xl'>
                    <div className='basis-1/2 px-2'>
                        <span className='block'>AQI</span>
                        <span className='block'>UV Index</span>
                    </div>
                    <div className='basis-1/2 px-4 text-right'>
                        <span className='block'>High(8)</span>
                        <span className='block'>Very High</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;