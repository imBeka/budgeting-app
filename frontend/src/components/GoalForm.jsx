import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { createGoal } from '../features/goals/goalSlice'

const GoalForm = () => {
    const [text, setText] = useState('')
    const dispatch = useDispatch()

    const onChange = (e) => {
        setText(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        dispatch(createGoal({text}))
        setText('')
    }
    // debugger
    return (
        <>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="text">Goal Text</label>
                        <input type="text" name="text" id="text" value={text} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-block">Set new goal</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default GoalForm;
