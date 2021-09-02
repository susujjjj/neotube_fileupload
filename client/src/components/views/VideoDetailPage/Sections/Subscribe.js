import Axios from 'axios'
import React, { useEffect, useState } from 'react'


function Subscribe(props) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  console.log(localStorage.getItem("userId") , "localStorage.getItem]");

  const onSubscribe = () => {

    let subscribedVariable = {
      userTo: props.userTo,
      userForm: props.userFrom
    }
    if(Subscribed) {
      //아직 구독중이라면
      Axios.post("/api/subscribe/unSubscribe", subscribedVariable).then(
        (response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert("Failed to unsubscribe");
          }
        }
      );


    } else {
      //아직 구독중이 아니라면
      Axios.post("/api/subscribe/subscribe", subscribedVariable).then(
        (response) => {
           if (response.data.success) {
             setSubscribeNumber(SubscribeNumber + 1);
             setSubscribed(!Subscribed);
           } else {
             alert("Failed to subscribe");
           }
        }
      );
    }
  }

    useEffect(() => {
      let variable = { userTo: props.userTo, userFrom: props.userFrom };

      Axios.post("/api/subscribe/subscribeNumber", variable)
      .then(
        (response) => {
          if (response.data.success) {
            setSubscribeNumber(response.data.subscribeNumber);
          } else {
            alert("구독자 수 정보를 받아오지 못했습니다.");
          }
        }
      );

      let subscribedVariable = {
        userTo: props.userTo,
        userFrom: props.userFrom, //localStorage.getItem("userId"),
      };

      Axios.post("/api/subscribe/subscribed", subscribedVariable).then(
        (response) => {
          if (response.data.success) {
            setSubscribed(response.data.subscribed);
          } else {
            alert("구독자 수 정보를 받아오지 못했습니다.");
          }
        }
      );
    }, []);

  return (
    <div>
      <button
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000" }`,
          borderRadius: "4px",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
        }}
        onClick={onSubscribe}
      >
        {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscribe
