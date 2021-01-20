import React, {useState} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import AcceptedReq from './AcceptedReq';
import WaitingReq from './WaitingReq';
import FinishedReq from './FinishedReq';
import { Typography } from '@material-ui/core';

// タブ下の画面の表示処理
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  // valueとindexが一致したときに、中身が表示される仕組み。
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          // ここに表示させたいものを書く。childrenにはTabpanelの中身が表示される
          <>
            {children}
          </>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
    tab: {
      bottom: 'auto',
      top: 55,
    },
    margin:{
        top: 55,
        marginBottom: 120,
    },
    text:{
      margin: "0 auto",
      maxWidth: "500px",
      marginBottom: 10,
    },
  }));
  
const MylistTab = ({myId, mynickname, mypic, history}) => {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };
    return (
      <>
     <div className={classes.margin}></div>
     <div className={classes.root}>
      <AppBar position="fixed" color="default" className={classes.tab}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="成立済" {...a11yProps(0)} />
          <Tab label="募集中" {...a11yProps(1)} />
          <Tab label="履歴" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <Box p={1}>
        <Typography variant="caption" display="block" className={classes.text}>
            ボランティアさんとマッチング済の、実施予定または進行中のリクエストの一覧です。
        </Typography>
          <AcceptedReq 
            myId={myId}
            mynickname={mynickname}
            mypic={mypic}
            history={history}/>
        </Box>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <Box p={1}>
        <Typography variant="caption" display="block" className={classes.text}>
            ボランティアさんの立候補を待っている状態のリクエストの一覧です。立候補者を確認して、ボランティアをお願いしましょう。
        </Typography>
          <WaitingReq 
           myId={myId}
           mynickname={mynickname}
           mypic={mypic}
           history={history}/>
        </Box>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <Box p={1}>
        <Typography variant="caption" display="block" className={classes.text}>
        あなたが過去にお願いした完了済のリクエストの一覧です。
        </Typography>
          <FinishedReq 
            myId={myId}
            mynickname={mynickname}
            mypic={mypic}
            history={history}/>
        </Box>
        </TabPanel>
      </SwipeableViews>
      </div>
      </>
    )
}

export default MylistTab
