import AddIcon from '../assets/icons/AddIcon';
import Header from '../components/Homepage/Header';
import Post from '../components/Homepage/Post';
import Navbar from '../components/Navbar';
import React from 'react';
const Homepage = () => {
    return (
        <>
            <Navbar />
            <Header />
            <Post />
            <div className='fixed bottom-5 right-5 -z-10'>
                <div className='btn btn-circle bg-primary p-2 border-none cursor-pointer'>
                    <AddIcon />
                </div>
            </div>
        </>
    )
}

export default Homepage;