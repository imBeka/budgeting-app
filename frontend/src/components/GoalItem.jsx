import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {deleteGoal} from '../features/goals/goalSlice'
import {FaEdit} from 'react-icons/fa'
import GoalEditForm from './GoalEditForm';

const GoalItem = ({goal}) => {
    const [isEdititng, setIsEditing] = useState(false)

    const dispatch = useDispatch()

    const onClose = (e) => {
        dispatch(deleteGoal(goal._id))
    }

    const onEdit = (e) => {
        setIsEditing(!isEdititng)
    }
    // debugger
    return (
        <div className='goal'>
            <button className="edit" onClick={onEdit}><FaEdit/></button>
            <div>
                {new Date(goal.createdAt).toLocaleString('en-US')}
            </div>
            { isEdititng ? (<GoalEditForm editText={goal.text} goalId={goal._id} />) : (<h2>{goal.text}</h2>) }
            <button onClick={onClose} className="close">X</button>
        </div>
    );
}

export default GoalItem;
