import React, {useState, useEffect} from 'react'
import RequestItem from './RequestItem';
import { db } from "../../firebase";
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// Requestの募集中の部分 (データ取得)
// style
const useStyles = makeStyles((theme) => ({
  text:{
    margin: "0 auto",
    maxWidth: "500px",
    marginBottom: 10,
    textAlign: "center",
  },
}));
const WantedRequest = ({myId, history, mynickname, mypic}) => {
  const classes = useStyles();
  const [request, setRequest] = useState([
    {
      id: "",
      guest_id:"",
      volunteer_id:"",
      rikkouho_id:"",
      es_date: "",
      start_time:"",
      departure: "",
      destination:"",
      number:"",
      lan_1:"",
      lan_2:"",
      lan_3:"",
      status: "",
      status_2: "",
      emergency: "",
      volunteer_pic:"",
      volunteer_nickname:"",
      guest_pic:"",
      guest_nickname:"",
    },
    ]);

// 現在日付
let now = new Date();            //日付取得準備（必須）！！
let year = now.getFullYear();    //年
let m = ("0"+(now.getMonth() + 1)).slice(-2);    //月（2桁表示）
let d =  ("0"+now.getDate()).slice(-2);  //日（2桁表示）
let nowDate = year + "/" + m + "/" + d;     

// statusに"募集中"が入っているやつだけを取得
useEffect(() => {
  const firebaseData = db
      .collection("escorts")
      // 今日以降で、募集中のものを、日付順に表示
      .where("es_date", ">=", nowDate)
      .where("status", "==", "募集中")
      .orderBy("es_date", "asc")
      .onSnapshot((snapshot) =>
          setRequest(
            snapshot.docs.map((doc) => ({
              // firebaseから読み込んだデータをdocに入れて、
              // 各プロパティに入れて、更新
              id: doc.id,
              guest_id: doc.data().guest_id,
              volunteer_id: doc.data().volunteer_id,
              rikkouho_id: doc.data().rikkouho_id,
              es_date: doc.data().es_date,
              start_time: doc.data().start_time,
              departure: doc.data().departure,
              destination: doc.data().destination,
              number: doc.data().number,
              lan_1: doc.data().lan_1,
              lan_2: doc.data().lan_2,
              lan_3: doc.data().lan_3,
              status: doc.data().status,
              status_2: doc.data().status_2,
              emergency: doc.data().emergency,
              guest_nickname:doc.data().guest_nickname,
              guest_pic:doc.data().guest_pic,
            }))
          )
        );
  //   クリーンアップ関数（前回の処理を削除する処理らしい）
  return () => {
      firebaseData();
      };
  }, []);

    return (
      <>
           { request.length !== 0 && (
                <>
                {/* requestの中身をrequestItemに入れて表示処理 */}
                {request.map((requestItem) => (
                    // requestItemコンポーネントに各プロパティを渡す
                    <RequestItem
                    key={requestItem.id}
                    id={requestItem.id}
                    volunteer_id={requestItem.volunteer_id}
                    picture={requestItem.guest_pic}
                    nickname= {requestItem.guest_nickname}
                    rikkouho_id={requestItem.rikkouho_id}
                    es_date= {requestItem.es_date}
                    start_time= {requestItem.start_time}
                    end_time= {requestItem.end_time}                    
                    departure= {requestItem.departure}
                    destination={requestItem.destination}
                    number={requestItem.number}
                    lan_1={requestItem.lan_1}
                    lan_2={requestItem.lan_2}
                    lan_3={requestItem.lan_3}
                    status= {requestItem.status}
                    status_2= {requestItem.status_2}
                    emergency={requestItem.emergency}
                    history={history}
                    myId={myId}
                    mynickname={mynickname} 
                    mypic={mypic}
                    />
                ))}
                </>
            )}
            {request.length===0 &&
              <Typography variant="caption" display="block" className={classes.text}>
                 ＜現在、表示できるリクエストがありません＞
              </Typography>}
      </>
    )
}

export default WantedRequest
