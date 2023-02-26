import React from 'react';
import Preloader from '../../Common/preloader/Preloader';
import cdd from './ProfileInfo.module.css';


type PropsType={
    status:string
    updateStatus:(nweStatus:string) => void
}
type StateType = {
    editMode:boolean
    status:string
}
class ProfileStatus extends React.Component<PropsType,StateType> {
    
    state = {
        editMode: false,
        status: this.props.status,
        
    }

    activeEditMode = () =>  {
        this.setState({
            editMode: true
        })
    }

    deactiveEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status); 
    }

    onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
       this.setState({
        status:e.currentTarget.value
       }); 
       
    }

    componentDidUpdate(prevProps:PropsType, prevState:StateType) {
        if(prevProps.status !== this.props.status)
       this.setState({
        status: this.props.status
       })

        let a = this.state;
        let b = this.props;
    }

    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activeEditMode}>{this.props.status || "_____________"}</span>
                    </div>
                }
                {this.state.editMode &&  
                    <div>
                        <input onChange={this.onStatusChange}
                               autoFocus={true}
                               onBlur={this.deactiveEditMode}
                                value={this.state.status} />
                    </div>
                }   
            </div>
        )
    }
};

export default ProfileStatus;