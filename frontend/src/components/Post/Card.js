import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../Utils';
import LikeButton from './LikeButton';

const Card = ({ post }) => {

    const [isLoading, setIsLoading] = useState(true)
    const usersData = useSelector((state) => state.usersReducer)
    const userData = useSelector((state) => state.userReducer)

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false);
    }, [usersData])

    return (
        <div>
            <li className='card-container' key={post._id}>
                {isLoading ? (
                    <i className='fas fa-spinner fa-spin'></i>
                ) : (
                    <>
                        <div className='card-left'>
                            <img src='./img/profile.png' /*src={ 
                                !isEmpty(usersData[0] &&
                                usersData
                                .map((user) => {
                                    if (user._id === post.postId) {
                                        return user.picture
                                    }
                                }).join('')    
                            )}*/
                            alt="user-pic" />
                        </div>
                        <div className='card-right'>
                            <div className='card-header'>
                                <div className='pseudo'>
                                    <h3>
                                    {!isEmpty(usersData[0]) &&
                                    usersData
                                        .map((user) => {
                                            if (user._id === post.postId) {
                                                return user.pseudo
                                            }
                                        }).join("")}
                                    </h3>
                                </div>
                                <span>{dateParser(post.createdAt)}</span>
                            </div>
                            <p>{post.message}</p>
                            {post.picture && (
                                <img src={post.picture} alt='card-pic' className='card-pic' />
                            )}
                            {post.video && (
                                <iframe
                                    width="500"
                                    height="300"
                                    src={post.video}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media;
                                    gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={post._id}></iframe>
                            )}
                        <div className='card-footer'>
                            <LikeButton post ={post} />
                        </div>
                        </div>
                    </>
                )}
            </li>
        </div>
    );
};

export default Card;