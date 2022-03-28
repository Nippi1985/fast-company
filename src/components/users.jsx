import React, {useState} from 'react';
import api from "../api";
import 'bootstrap/dist/css/bootstrap.css'


const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll());

    const setBadgeClasses = () => {
        let classes = 'badge m-2 fs-4 ';
        classes = classes + (users.length > 0 ? 'bg-primary' : 'bg-danger');
        return classes;
    }

    const setPhrase = (value, words) => {
        value = Math.abs(value) % 100;
        let num = value % 10;
        if(value > 10 && value < 20) return words[2];
        if(num > 1 && num < 5) return words[1];
        if(num === 1) return words[0];
        return words[2];
    }

    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user !== userId));
    }

    return (
        <>
            <span className={setBadgeClasses()}>{users.length} {setPhrase(users.length, ['человек тусанёт','человека тусанут', 'человек тусанёт'])} с тобой сегодня</span>
            {users.length > 0 && <table className="table">
            <thead>
            <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th/>
            </tr>
            </thead>
            <tbody>
            {users.map(user=>(
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.qualities.map((item)=> <span key={item._id} className={'badge m-1 bg-' + item.color}>{item.name}</span>)}</td>
                    <td>{user.profession.name}</td>
                    <td>{user.completedMeetings}</td>
                    <td>{user.rate}/5</td>
                    <td><button className='btn btn-danger' onClick={()=>handleDelete(user)}>Удалить</button></td>
                </tr>
            ))}
            </tbody>
        </table>}
    </>
    );
}

export default Users;