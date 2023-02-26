import React,  { useState, useEffect }  from 'react';



const ProfileStatusWithHooks = (props) => {
    
    let [editMode, setEditMode] = useState(false);
    let [status, setstatus] = useState(props.status);

    useEffect( () => {
        setstatus(props.status);
    }, [props.status]);

    const activeEditMode = () => {
        setEditMode(true);
    }

    const deactiveEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

     const onStatusChange = (e) => {
        setstatus(e.currentTarget.value);  
     }
    
    return (
        <div>
            { !editMode &&
                <div>
                    <b>Status: </b><span onDoubleClick={activeEditMode}>{props.status || "_____________"}</span>
                </div>
            }
            { editMode &&
                <div>
                    <input onBlur={deactiveEditMode}
                           autoFocus={true}
                           onChange={onStatusChange}
                           value={status}
                         />
                </div>
            }
        </div>
    )

};

export default ProfileStatusWithHooks;