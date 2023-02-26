import React from 'react';
import styles from './Users.module.css';
import userPhoto from '../../assets/img/user.png';
import {NavLink} from 'react-router-dom';




let User  = ({user,followingInProgress,unfollow,follow}) => {
        return <div className={styles.params}> 
            <div>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small != null ? user.photos.small : userPhoto} className={styles.userPhoto} alt="UserPhoto" />
                    </NavLink>
                </div>
                <div className={styles.btnPosition}>
                    {user.followed 
                    ?  <button className={styles.btnUnfollow} disabled={followingInProgress.some(id => id === user.id)} 
                    onClick={() => {unfollow(user.id) }}>
                        unFollow</button> 

                    :  <button className={styles.btnFollow} disabled={followingInProgress.some(id =>id === user.id)} 
                        onClick={() => {follow(user.id) }}>
                        follow</button>}
                </div>
            </div>
            <span>
                <span className={styles.userInfo}>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                {/* <span>
                    <div>{"user.location.country"}</div>
                    <div>{"user.location.city"}</div>
                </span> */}
            </span>
            </div>
}


export default User;