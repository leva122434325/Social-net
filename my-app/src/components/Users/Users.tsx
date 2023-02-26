import React from 'react';
import { UserType } from '../../types/types';
import Paginator from './paginator/paginator.tsx';
import User from './User';
import s from './Users.module.css';

type PropsType={
    totalUsersCount: number
    pageSize:number
    portionSize:number
    currenPage:number
    onPageChanged:(pageNumber:number) => void
    users: Array<UserType>
    followingInProgress: Array<Number>
    unfollow: (userid:number) => void
    follow: (userid:number) => void

}

let Users:React.FC<PropsType> = ({currenPage,onPageChanged,pageSize,portionSize,totalUsersCount,...props}) => {
    
    return <div>
        <Paginator currenPage={currenPage}
            onPageChanged={onPageChanged}
            totalUsersCount={totalUsersCount}
            pageSize={pageSize}
            portionSize={portionSize} />
        <div className={s.users}>
            {props.users.map(u => <User followingInProgress={props.followingInProgress}
                key={u.id}
                user={u}
                unfollow={props.unfollow}
                follow={props.follow} />)}
        </div>
    </div>
}


export default Users;