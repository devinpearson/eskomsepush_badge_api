require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
const port = process.env.PORT || 3000
const apikey = process.env.APIKEY || ''
const area = process.env.AREA || 'jhbcitypower2-11-radiokop'

app.get('/', (req, res) => {
	//const stage = parseInt(getStage())
  const stage = 2
  const schedule = getSchedule(area, stage)
  res.send('8,1,9')
})

app.get('/v2', (req, res) => {
  // getAllowance().then(function (stage) {
  //   console.log(stage)
  // })
  let ledArray = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ENV_STAGE = 4
	// getStage().then(function (stage) {
  //   console.log(stage)
  // })
  
  const stage = 3
  if ((stage - 1) >= 0) {
    ledArray[stage -1] = 1
  }
  const schedule = getSchedule(area, stage)
  if (schedule - 1 >= 0) {
    for (let i = 8; i < schedule + 8; i++) {
      ledArray[i] = 1
    }
}
  res.send(ledArray.join(','))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

async function getStage() {
  return new Promise((resolve, reject) => {
  // const response ='{"status":{"capetown":{"name":"Cape Town","next_stages":[],"stage":"0","stage_updated":"2022-10-17T00:00:54.460244+02:00"},"eskom":{"name":"South Africa","next_stages":[{"stage":"2","stage_start_timestamp":"2022-10-17T16:00:00+02:00"},{"stage":"0","stage_start_timestamp":"2022-10-18T00:00:00+02:00"},{"stage":"2","stage_start_timestamp":"2022-10-18T16:00:00+02:00"},{"stage":"4","stage_start_timestamp":"2022-10-19T00:00:00+02:00"},{"stage":"2","stage_start_timestamp":"2022-10-19T16:00:00+02:00"},{"stage":"0","stage_start_timestamp":"2022-10-20T00:00:00+02:00"}],"stage":"0","stage_updated":"2022-10-17T00:00:54.460244+02:00"}}}'
  // let result = JSON.parse(response);
  //console.log(result['status']['eskom']['stage'])
	//return result['status']['eskom']['stage']
    var config = {
      method: 'get',
      url: 'https://developer.sepush.co.za/business/2.0/status',
      headers: { 
        'token': apikey
      }
    };

    axios(config)
    .then(function (response) {
      resolve(response.data.status.eskom.stage)
    })
  })
}

function getSchedule(area, stage) {
  let today = new Date().toISOString().slice(0, 10)
  const response = '{"events":[{"end":"2022-10-18T22:30:00+02:00","note":"Stage 2","start":"2022-10-18T20:00:00+02:00"}],"info":{"name":"Radiokop (11)","region":"JHB City Power"},"schedule":{"days":[{"date":"2022-10-17","name":"Monday","stages":[["12:00-14:30"],["04:00-06:30","12:00-14:30"],["04:00-06:30","12:00-14:30"],["04:00-06:30","12:00-14:30","20:00-22:30"],["04:00-06:30","12:00-16:30","20:00-22:30"],["04:00-08:30","12:00-16:30","20:00-22:30"],["00:00-02:30","04:00-08:30","12:00-16:30","20:00-22:30"],["00:00-02:30","04:00-08:30","12:00-16:30","20:00-00:30"]]},{"date":"2022-10-18","name":"Tuesday","stages":[["20:00-22:30"],["12:00-14:30","20:00-22:30"],["04:00-06:30","12:00-14:30","20:00-22:30"],["04:00-06:30","12:00-14:30","20:00-22:30"],["04:00-06:30","12:00-14:30","20:00-00:30"],["04:00-06:30","12:00-16:30","20:00-00:30"],["04:00-08:30","12:00-16:30","20:00-00:30"],["04:00-08:30","12:00-16:30","20:00-00:30"]]},{"date":"2022-10-19","name":"Wednesday","stages":[[],["20:00-22:30"],["12:00-14:30","20:00-22:30"],["04:00-06:30","12:00-14:30","20:00-22:30"],["04:00-06:30","12:00-14:30","20:00-22:30"],["04:00-06:30","12:00-14:30","20:00-00:30"],["04:00-06:30","12:00-16:30","20:00-00:30"],["04:00-08:30","12:00-16:30","20:00-00:30"]]},{"date":"2022-10-20","name":"Thursday","stages":[["04:00-06:30"],["04:00-06:30"],["04:00-06:30","20:00-22:30"],["04:00-06:30","12:00-14:30","20:00-22:30"],["04:00-08:30","12:00-14:30","20:00-22:30"],["04:00-08:30","12:00-14:30","20:00-22:30"],["04:00-08:30","12:00-14:30","20:00-00:30"],["04:00-08:30","12:00-16:30","20:00-00:30"]]},{"date":"2022-10-21","name":"Friday","stages":[["10:00-12:30"],["02:00-04:30","10:00-12:30"],["02:00-04:30","10:00-12:30"],["02:00-04:30","10:00-12:30","18:00-20:30"],["02:00-04:30","10:00-14:30","18:00-20:30"],["02:00-06:30","10:00-14:30","18:00-20:30"],["02:00-06:30","10:00-14:30","18:00-20:30"],["02:00-06:30","10:00-14:30","18:00-22:30"]]},{"date":"2022-10-22","name":"Saturday","stages":[["18:00-20:30"],["10:00-12:30","18:00-20:30"],["02:00-04:30","10:00-12:30","18:00-20:30"],["02:00-04:30","10:00-12:30","18:00-20:30"],["02:00-04:30","10:00-12:30","18:00-22:30"],["02:00-04:30","10:00-14:30","18:00-22:30"],["02:00-06:30","10:00-14:30","18:00-22:30"],["02:00-06:30","10:00-14:30","18:00-22:30"]]},{"date":"2022-10-23","name":"Sunday","stages":[[],["18:00-20:30"],["10:00-12:30","18:00-20:30"],["02:00-04:30","10:00-12:30","18:00-20:30"],["02:00-04:30","10:00-12:30","18:00-20:30"],["02:00-04:30","10:00-12:30","18:00-22:30"],["02:00-04:30","10:00-14:30","18:00-22:30"],["02:00-06:30","10:00-14:30","18:00-22:30"]]}],"source":"https://www.citypower.co.za/customers/Pages/Load_Shedding_Downloads.aspx"}}'
  if (stage == 0) {
    return "No load shedding"
  }
  let stages = []
  let result = JSON.parse(response);
  for (let i = 0; i < result.schedule.days.length; i++) {
    if (result.schedule.days[i].date == today) {
      stages = result.schedule.days[i].stages[stage]
    }
  }
  
  for (let i = 0; i < stages.length; i++) {
    let start = stages[i].split("-")[0]
    let end = stages[i].split("-")[1]
    var currentD = new Date();
    //currentD.setHours(21,15,0);
    let offset = 2
    if (currentD.getTimezoneOffset() == -120) {
      offset = 0
    }
    var startD = new Date();
    startD.setHours((start.split(":")[0]-offset),start.split(":")[1],0);
    var endD = new Date();
    endD.setHours((end.split(":")[0]-offset),end.split(":")[1],0);
    if ((end.split(":")[0]-offset) == "00") {
      endD.setDate(endD.getDate() + 1);
    }
    if (currentD < startD) {
      let mins =  Math.round((startD - currentD) / 60000)
      if (mins < 330) {
        // console.log("Load shedding starts in " + Math.round((startD - currentD) / 60000) + " minutes")
        // console.log("leds "+ Math.ceil(mins / 30))
        return Math.ceil(mins / 30)
      }
      
    }

    // console.log("difference: " +((Math.abs(endD - startD) / (60 * 1000)) / 30))
    // console.log('Current Date:' +currentD)
    // console.log('Start: ' + startD + ' End: ' + endD)
    // if (startD <= currentD && endD >= currentD) {
       // console.log("Load shedding")
    // }
  }

  return 0
  // console.log(result['events'])
	// console.log(result['status']['eskom']['stage'])
  // var config = {
  //   method: 'get',
  //   url: 'https://developer.sepush.co.za/business/2.0/area?id=jhbcitypower2-11-radiokop',
  //   headers: { 
  //     'token': apikey
  //   }
  // };
  
  // axios(config)
  // .then(function (response) {
  //   console.log(JSON.stringify(response.data));
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
}

function getAllowance() {
  return new Promise((resolve, reject) => {
    var config = {
      method: 'get',
      url: 'https://developer.sepush.co.za/business/2.0/api_allowance',
      headers: { 
        'token': apikey
      }
        };

    axios(config)
    .then(function (response) {
      resolve(response.data.allowance)
    })
  })
}
