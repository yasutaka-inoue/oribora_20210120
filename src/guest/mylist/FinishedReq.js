import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import RequestItem from './RequestItem';
import { db } from "../../firebase";
import { Typography } from '@material-ui/core';

// escortsの中で、volunteer_idにmyIdが入っていて、さらにstatus_2が"完了"になっているもの


// style
const useStyles = makeStyles((theme) => ({
  box: {
      paddingBottom: 10,
    },
    text:{
      margin: "0 auto",
      maxWidth: "500px",
      marginBottom: 10,
      textAlign: "center",
    },

}));


const FinishedReq = ({history, myId, mynickname, mypic}) => {
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
        volunteer_nickname: "",
        volunteer_pic: "",
      },
      ]);

  // firebaseからデータ受信（firebaseに変更があった場合のみ、動作）
  // escortsの中で、guest_idにmyIdが入っていて、さらにstatus_2が"完了"になっているもの
  useEffect(() => {
    const firebaseData = db
        .collection("escorts")
        .where("guest_id", "==", myId)
        .where("status_2", "==", "完了")
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
                volunteer_nickname: doc.data().volunteer_nickname,
                volunteer_pic: doc.data().volunteer_pic,
              }))
            )
          );
    //   クリーンアップ関数（前回の処理を削除する処理らしい）
    return () => {
        firebaseData();
        };
    }, []);

    return (
        <div className={classes.box}>
                {/* requestが あったときだけ、表示処理をする*/}
                { request.length !== 0 && (
                <>
                {/* requestの中身をrequestItemに入れて表示処理 */}
                {request.map((requestItem) => (
                    // requestItemコンポーネントに各プロパティを渡す
                    <RequestItem
                    key={requestItem.id}
                    id={requestItem.id}
                    volunteer_id={requestItem.volunteer_id}
                    picture={requestItem.volunteer_pic}
                    nickname= {requestItem.volunteer_nickname}
                    es_date= {requestItem.es_date}
                    start_time= {requestItem.start_time}
                    end_time= {requestItem.end_time}
                    departure= {requestItem.departure}
                    destination={requestItem.destination}
                    number={requestItem.number}
                    rikkouho_id={requestItem.rikkouho_id}
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
        </div>
    )
}

export default FinishedReq
