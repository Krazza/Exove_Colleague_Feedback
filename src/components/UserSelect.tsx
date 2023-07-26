import React from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";
import { UserRequest } from "../modules/user";
import { useSelector } from 'react-redux';
import { RootState } from '../features/slices/loginSlice';
import { useAppSelector } from "../app/hooks";
import { FeedbackRequest } from "../modules/types";
import { useTranslation } from 'react-i18next';

import "../components/styles/UserSelect.css"
import PopUp from './PopUp';

const UserSelect = () => {
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [userDataMongoDB, setUserDataMongoDB] = useState<UserRequest[]>([]);
  const [selectedUsersLabels, setSelectedUsersLabels] =  useState<string[]>([]);
  const [selectedUsersIDs, setSelectedUsers] = useState<string[]>([]);
  const [uncheckedUsers, setUncheckedUsers] = useState<string[]>([]);
  const [checkedCount, setCheckedCount] = useState<number>(0);
  const { t } = useTranslation();

  const user = useSelector((state: RootState) => state.user);
  /* console.log('user', user); */
  const userData = useAppSelector(state => state.user);
  const userId = userData.user.id
  /* console.log('userId', userData.user.id); */


  useEffect(() => {
    axios.get(`http://localhost:4000/api/users`)
      .then(res => {
        const userData = res.data;
        setUserDataMongoDB(userData);/* 
        console.log('data', userData); */
      })
      .catch(error => {
        return error;
      });
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const tempUser = userDataMongoDB.find((user) => user.employeeId === value);
   /*  axios
    .get(`http://localhost:4000/api/users/${userId}`)
    .then((res) => {
      const user = res.data;
      if (user.selectedColleague.includes(value)) {
        // User has already selected this colleague, do nothing
        alert("You have already selected colleagues for feedback");
        return;
      } else if (user.selectedColleague.length === 0) { */
        if (selectedUsersIDs.includes(value)) {
          setSelectedUsers(selectedUsersIDs.filter(user => user !== value));
          setSelectedUsersLabels(selectedUsersLabels.filter(user => user !== tempUser?.displayName!))
          setCheckedCount(checkedCount - 1);
        } else {
          if (checkedCount < 5) {
            setSelectedUsers([...selectedUsersIDs, value]);
            setSelectedUsersLabels([...selectedUsersLabels, tempUser?.displayName!])
            setCheckedCount(checkedCount + 1);
          }
        }
     /*  }
    })
    .catch((error) => {
      console.log(error);
    }); */
  }

  function sendApprovalRequest(id: string = userId) {

    //for each selected user, create a feedback request and add it into feedbackApproval
    const feedbackApproval: FeedbackRequest[] = [];
    selectedUsersIDs.forEach((ID) => {
      const tempUser = userDataMongoDB.find((user) => user.employeeId === ID);
      if (tempUser !== undefined) {
        const newApprovalRequest: FeedbackRequest = {
          colleagueName: tempUser.displayName,
          colleagueUid: tempUser.employeeId
        }
        feedbackApproval.push(newApprovalRequest);
      } else {
        console.log(`ERROR (UserSelect.tsx) :: Couldn't find selected user with ID: ${ID} inside of userDataMongoDB`);
      }
    })

    //console.log('feedbackApproval', feedbackApproval);

    if (feedbackApproval.length === 0) {
      window.alert("Can't submit an empty list.");
    } else {
      axios
        .put(`http://localhost:4000/api/users/${userId}`, {
          feedbackRequests: feedbackApproval,
        })
        .then((res) => {
          console.log('send data', res.data);
          console.log('send data', res.data.feedbackRequests);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    /* console.log('sent', user.id);
    console.log( userId); */
    setDisplayPopUp(true);
    sendApprovalRequest(userId);   
  }
  useEffect(() => {
    const unchecked = userDataMongoDB.filter((user) => {
      // console.log('user-check:', user);
      // console.log('user.id:', user.employeeId);
      return !selectedUsersIDs.includes(user.employeeId);
    });
    setUncheckedUsers(unchecked.map((user) => user.employeeId));
  }, [userDataMongoDB, selectedUsersIDs]);

  // console.log('Selected users:', selectedUsers);
  // console.log('Unchecked users:', uncheckedUsers);

  return (
    <>
    {displayPopUp? <PopUp targetPage='/dashboard/requests' linkText="Go back."/> :<div className="userSelection">
      <p className="header">{t("Please select 5 colleagues you want to get feedback from.")}</p>
      <div className="select">
        <form className="user-form" >
          {userDataMongoDB.map(users => (
            <div className="checkInput" key={users.employeeId}>
              <label key={users.employeeId} className="checkbox-label">{users.email}
                <input
                  key={users.employeeId}
                  type="checkbox"
                  value={users.employeeId}
                  checked={selectedUsersIDs.includes(users.employeeId)}
                  onChange={handleCheckboxChange}
                />
                <span className="checkbox-wrapper"></span>
              </label>
            </div>
          ))}
        </form>
        <form className="selected" onSubmit={handleSubmit}>
          {selectedUsersLabels.length > 0 && (
            <h6 className="selectedHeader">{t("Selected colleagues:")}</h6>
          )}
        {selectedUsersLabels.map(user => (
          <p key={user}>{user}</p>
        ))}
        {selectedUsersLabels.length === 5 && (
          <button className="sendBtn" type="submit" >{t("Send Approval Request")}</button>
        )}
        </form>
      </div>
    </div>}
    </>
  );
};

export default UserSelect;
