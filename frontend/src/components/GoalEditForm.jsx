import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { updateGoal } from '../features/goals/goalSlice';

const GoalEditForm = ({editText, goalId}) => {
    const dispatch = useDispatch()
    const [text, setText] = useState(editText)

    const onChange = (e) => {
        setText(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const goalData = {
            goalId,
            text
        }
        dispatch(updateGoal(goalData))
    }
    return (
        <>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" name="text" id="text" value={text} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Update goal</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default GoalEditForm;
