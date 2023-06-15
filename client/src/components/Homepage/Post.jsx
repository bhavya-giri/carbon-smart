import CommentIcon from '../../assets/icons/CommentIcon';
import HeartIcon from '../../assets/icons/HeartIcon';
import PostSaveIcon from '../../assets/icons/PostSaveIcon';
import userImage from '../../assets/images/user.avif';
import postImage from '../../assets/images/post-image-1.jpg';
import React from "react";

const Post = () => {

    return (
        <div className='p-4 mt-1 h-auto'>
            <div className="chat chat-start mb-3">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full -z-10">
                        <img src={userImage} alt='user-image' />
                    </div>
                </div>
                <div className="chat-bubble w-[80vw] bg-secondary text-text cursor-pointer -z-10">
                    <p>I changed all my house lights to CFLs today.</p>
                    <img src={postImage} alt="post1" className='rounded-lg mt-2 mb-1 w-auto object-cover' />
                    <span className='block text-xs text-right'>+5 points</span>
                    <div className='mt-2 text-xs flex place-content-between'>
                        <div className='flex'>
                            <div>
                                <HeartIcon />
                            </div>
                            <div>
                                <span>13 likes</span>
                            </div>
                        </div>
                        <div className='flex'>
                            <div>
                                <CommentIcon className="align-middle" />
                            </div>
                            <div>
                                <span>Comment</span>
                            </div>
                        </div>
                        <div className='flex'>
                            <div>
                                <PostSaveIcon />
                            </div>
                            <div>
                                <span>Save</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post;