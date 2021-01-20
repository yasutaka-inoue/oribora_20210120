import React, {useState, useEffect} from 'react'
import Title from '../../common/Title';
import NoticeItem from './NoticeItem';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import { db } from "../../firebase";
import { Typography } from '@material-ui/core';

// お知らせのトップ。

// style
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '500px',
        backgroundColor: theme.palette.background.paper,
        margin: "0 auto",
      },
    margin:{
        marginBottom: 60,
    },
    text:{
        margin: "0 auto",
        maxWidth: "500px",
        marginBottom: 10,
        textAlign: "center",
      },
  }));

const Notice = ({myId, mypic, mynickname, history}) => {
    const classes = useStyles();

       // firebaseに作成した項目を受け取るための変数＝useState
       const [notice, setNotice] = useState([
        {
            id: "",
            escort_id: "",
            user_id: "",
            icon:"",
            notice: "",
            already_read: "",
            created_at: null,
        },
        ]);
    
    // noticesの中からuser_id=myIDのデータを取得。日付順に並べて、テキストと日付、アイコンを一緒に表示させる
    // dbの中からuser_idがmyIdに一致するものを取得
    useEffect(() => {
        const firebaseData = db
            .collection("notices")
            .where("user_id", "==", myId)
            .orderBy("created_at", "desc")
            .onSnapshot((snapshot) =>
                setNotice(
                  snapshot.docs.map((doc) => ({
                    // firebaseから読み込んだデータをdocに入れて、
                    // 各プロパティに入れて、postを更新
                    id: doc.id,
                    escort_id: doc.data().escort_id,
                    user_id: doc.data().user_id,
                    icon: doc.data().icon,
                    notice: doc.data().notice,
                    already_read: doc.data().already_read,
                    created_at: doc.data().created_at,
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
        <Title title="お知らせ" history={history}/>
        <div className={classes.margin}></div>   
        <List className={classes.root}>
        {/* noticeの中身をitemに入れて表示処理 */}
        {notice.length !== 0 &&
         notice.map((item) => (
            // コンポーネントに各プロパティを渡す
            <NoticeItem
                key={item.id}
                id={item.id}
                escort_id={item.escort_id}
                notice={item.notice}
                created_at={item.created_at}
                already_read={item.already_read ===0 ? ("colored"):("")}
                icon={item.icon}
                history={history}
                myId={myId}
                mynickname={mynickname}
                mypic={mypic}
            />
            ))}
        </List>  
        {notice.length===0 &&
              <Typography variant="caption" display="block" className={classes.text}>
                ＜現在、お知らせはありません＞
              </Typography>}                
        </>
    )
}

export default Notice

