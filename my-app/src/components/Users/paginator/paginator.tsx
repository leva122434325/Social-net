import React, {useState} from 'react';
import styles from './paginator.module.css';
import cn from 'classnames';


type PropsType={
    totalUsersCount: number
    pageSize:number
    portionSize:number
    currenPage:number
    onPageChanged:(pageNumber:number) => void
}

let Paginator:React.FC<PropsType>  = ({totalUsersCount,pageSize,portionSize,currenPage,onPageChanged}) => { 
        let pagesCount = Math.ceil(totalUsersCount / pageSize);

        let pages = [];
        for(let i=1; i <= pagesCount; i++){
            pages.push(i);}

        let portionCount = Math.ceil(pagesCount/portionSize);
        let [portionNumber, setPortionNumber] = useState<number>(1);
        
        let leftPortionPageNumber = (portionNumber-1) * portionSize + 1;
        let rightPortionPageNumber = portionNumber * portionSize;
         

        return  <div className={styles.paginator}>
                {portionNumber > 1 &&
                <button className={styles.btn} onClick={() => {setPortionNumber(portionNumber-1)}}>Prev</button>
                }

                {pages.filter(p=>p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                      .map((p) => {
                    return  <span className={ cn({[styles.selectedPage]: currenPage === p}, styles.pageNumber)  }
                            key={p}
                            onClick={(e) => {
                            onPageChanged(p);
                    }}>{p}</span>
                })}
                {portionCount > portionNumber &&
                <button className={styles.btn} onClick={() => {setPortionNumber(portionNumber+1)}}>Next</button>
                }
            </div>    
}



export default Paginator;