mport { useState, useEffect } from "react";

import { FeedbackApproval, UserRequest } from "../modules/types";

import axios from 'axios';

import { useSelector } from 'react-redux';

import { useLocation } from "react-router-dom";

import { RootState } from '../features/slices/loginSlice';




import "../components/styles/UserSelect.css"

import { useAppSelector } from "src/app/hooks";




const UserSelect = () => {

 const [userDataMongoDB, setUserDataMongoDB] = useState<UserRequest[]>([]);

 const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

 const [uncheckedUsers, setUncheckedUsers] = useState<string[]>([]);

 const [checkedCount, setCheckedCount] = useState<number>(0);



 const location = useLocation();

 //const userDataMongo = location.state.user;

 const user = useSelector((state: RootState) => state.user);

 console.log('user', user);

 const userData = useAppSelector(state => state.user);

 const userId= userData.user.id

 console.log('userId', userData.user.id);




 //console.log("loggedin user's Data got from ldap, not mongo", userDataMongo);

const uId= '6458ba17eb4af38612c7e301'




 useEffect(() => {

 axios.get(`http://localhost:4000/api/users`)

 .then(res => {

 const userData = res.data;

 setUserDataMongoDB(userData);

 console.log('data',userData);

 })

 .catch(error => {

 console.log(error);

 });

 }, []);




 const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {

 const value = event.target.value;

 if (selectedUsers.includes(value)) {

 setSelectedUsers(selectedUsers.filter(user => user !== value));

 setCheckedCount(checkedCount - 1);

 } else {

 if (checkedCount < 5) {

 setSelectedUsers([...selectedUsers, value]);

 setCheckedCount(checkedCount + 1);

 }

 }

 }





function sendApprovalRequest(id: string = userId) {

 console.log(userId);



 const feedbackApproval : FeedbackApproval = {

 selectedColleague : selectedUsers,

 }

 console.log('feedbackApproval', feedbackApproval);






 /* const findUser = userDataMongoDB.find((users):void => {

 console.log('users-id', users.employeeId);



 if(users.employeeId === userId) {

 console.log('crrnt id', userId);

 console.log('found-id', users.employeeId);



 return console.log('found-users', findUser);

 }

 }) */

 axios.put(`http://localhost:4000/api/users/${userId}`, {

 feedbackApproval: feedbackApproval}

 )

 .then(res => {

 console.log('send data',res.data);

 })

 .catch(error => {

 console.log(error);

 });

 /* axios.put(`http://localhost:4000/api/users`, {

 feedbackApproval: feedbackApproval}

 // feedbackapproval data field goes directly as a user but doesnt get the selected users

 ) */

 }

 const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

 event.preventDefault();

 console.log('sent', user.id);

 sendApprovalRequest(userId);

 }

 useEffect(() => {

 const unchecked = userDataMongoDB.filter((user) => {

 console.log('user-check:', user);

 console.log('user.id:', user.employeeId);

 return !selectedUsers.includes(user.employeeId);

 });

 setUncheckedUsers(unchecked.map((user) => user.employeeId));

 }, [userDataMongoDB, selectedUsers]);




 console.log('Selected users:', selectedUsers);

 console.log('Unchecked users:', uncheckedUsers);




 return (

 <div className="userSelection">

 <p className="header">Please select 5 colleagues you want to get feedback from.</p>

 <div className="select">

 <form className="user-form" >

 {userDataMongoDB.map(users => (

 <div className="checkInput" key={users.employeeId}>

 <label key={users.employeeId} className="checkbox-label">{users.email}

 <input

 key={users.employeeId}

 type="checkbox"

 value={users.email}

 checked={selectedUsers.includes(users.employeeId)}

 onChange={handleCheckboxChange}

 />

 <span className="checkbox-wrapper"></span>

 </label>

 </div>

 ))}

 </form>

 <form className="selected" onSubmit={handleSubmit}>

 {selectedUsers.length > 0 && (

 <h6 className="selectedHeader">Selected colleagues:</h6>

 )}

 {selectedUsers.map(user => (

 <p key={user}>{user}</p>

 ))}

 {selectedUsers.length === 5 && (

 <button className="sendBtn" type="submit" >Send Approval Request</button>

 )}

 </form>

 </div>

 </div>

 );

};




export default UserSelect;