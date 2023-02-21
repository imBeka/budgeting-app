import React from 'react';
// import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';
import Spinner from '../components/Spinner';
import { getGoals, reset } from '../features/goals/goalSlice';

const Dashboard = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector( state => state.auth )
    const {goals, isLoading, isError, message} = useSelector( state => state.goals )
    // debugger

    useEffect(() => {
        if(isError) {
            console.log(message)
        }

        if(!user) {
            navigate('/login')
        }

        dispatch(getGoals())

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, isError, message, dispatch])

    if(isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dashboard</p>
            </section>
            <GoalForm isEditMode={false}/>
            <section className="content">
                {goals.length > 0 ? (
                    goals.map((goal) => {
                        return <GoalItem key={goal._id} goal={goal} />
                    })
                ) : (<h3>There are no goals you have set</h3>)}
            </section>
        </>
    );
}

export default Dashboard;
