import React from 'react';
import { UserIcon } from '../assets/icons/UserIcon';
import { MenuIcon } from '../assets/icons/MenuIcon';
import Img1 from '../assets/images/user.avif';
import GameIcon from '../assets/icons/GameIcon';
import PenIcon from '../assets/icons/PenIcon';
import ScanIcon from '../assets/icons/ScanIcon';
import ProfileIcon from '../assets/icons/ProfileIcon';
import SavedIcon from '../assets/icons/SavedIcon';
import SettingsIcon from '../assets/icons/SettingsIcon';

const Navbar = () => {

    return (
        <>
            <div>
                <div className="navbar bg-base-100">
                    <div className="flex-none">
                        {/* drawer starts here  */}
                        <div className="drawer">
                            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content">
                                <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button">
                                    <MenuIcon />
                                </label>
                            </div>
                            <div className="drawer-side">
                                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                                <ul className="menu py-4 px-0 w-[60vw] h-full text-base-content  border-r-[1px] bg-text border-color-white">
                                    {/* Sidebar content here */}
                                    <div>
                                        <div className='flex justify-center mt-2'>
                                            <div className="radial-progress text-accent" style={{ "--value": 100, "--size": "120px", "--thickness": "7px" }}>
                                                <img src={Img1} className='w-[100px] h-[100px] object-cover rounded-full' />
                                            </div>
                                        </div>
                                        <p className='text-center mt-3 text-lg'>Agdam Bagdam</p>
                                    </div>
                                    <div className='flex justify-center space-x-3 mt-4 font-bold border-t-[1px] border-b-[1px] p-2'>
                                        <div>
                                            <GameIcon />
                                        </div>
                                        <div>
                                            <p className='text-center text-[18px]'>
                                                Play game</p>
                                        </div>
                                    </div>
                                    <div className='mt-4'>
                                        <div className='flex px-5 mt-3 space-x-4'>
                                            <div><PenIcon /></div>
                                            <div><p className='text-center text-[16px]'>Write a post</p></div>
                                        </div>
                                        <div className='flex px-5 mt-4 space-x-4'>
                                            <div><ScanIcon /></div>
                                            <div><p className='text-center text-[16px]'>Scan something</p></div>
                                        </div>
                                        <div className='flex px-5 mt-4 space-x-4'>
                                            <div><ProfileIcon /></div>
                                            <div><p className='text-center text-[16px]'>Profile</p></div>
                                        </div>
                                        <div className='flex px-5 mt-4 space-x-4'>
                                            <div><SavedIcon /></div>
                                            <div><p className='text-center text-[16px]'>Saved</p></div>
                                        </div>
                                        <div className='flex px-5 mt-4 space-x-4'>
                                            <div><SettingsIcon /></div>
                                            <div><p className='text-center text-[16px]'>Settings</p></div>
                                        </div>
                                    </div>
                                    {/* Sidebar content ends here */}
                                </ul>
                            </div>
                        </div>
                        {/* drawer ends here */}
                    </div>
                    <div className="flex-1">
                    </div>
                    {/* profile starts here */}
                    <div className="flex-none">
                        <button className="btn btn-square btn-ghost">
                            <UserIcon tabIndex={0} />
                        </button>
                    </div>
                    {/* profile ends here */}
                </div>
            </div>
        </>
    )
}

export default Navbar;