const express = require('express')
const axios = require('axios')
const app = express()
const port = process.env.PORT || 3000
const apikey = ''
const area = 'jhbcitypower2-11-radiokop'
app.get('/', (req, res) => {
	//const stage = parseInt(getStage())
  const stage = 2
  const schedule = getSchedule(area, stage)
  res.send('4,1,6')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function getStage() {
  const response ='{"status":{"capetown":{"name":"Cape Town","next_stages":[],"stage":"0","stage_updated":"2022-10-17T00:00:54.460244+02:00"},"eskom":{"name":"South Africa","next_stages":[{"stage":"2","stage_start_timestamp":"2022-10-17T16:00:00+02:00"},{"stage":"0","stage_start_timestamp":"2022-10-18T00:00:00+02:00"},{"stage":"2","stage_start_timestamp":"2022-10-18T16:00:00+02:00"},{"stage":"0","stage_start_timestamp":"2022-10-19T00:00:00+02:00"},{"stage":"2","stage_start_timestamp":"2022-10-19T16:00:00+02:00"},{"stage":"0","stage_start_timestamp":"2022-10-20T00:00:00+02:00"}],"stage":"0","stage_updated":"2022-10-17T00:00:54.460244+02:00"}}}'
  let result = JSON.parse(response);
  // console.log(result)
	return result['status']['eskom']['stage']
//  var config = {
//   method: 'get',
//   url: 'https://developer.sepush.co.za/business/2.0/status',
//   headers: { 
//     'token': apikey
//   }
//     };

// axios(config)
// .then(function (response) {
//   let result = JSON.parse(response.data);
//   console.log(result)
// 	console.log(result["status"].eskom.stage)
// })
// .catch(function (error) {
//   console.log(error);
// });
}
function getSchedule(area, stage) {
  let today = new Date().toISOString().slice(0, 10)
  const response = '{"events":[{"end":"2022-10-18T22:30:00+02:00","note":"Stage 2","start":"2022-10-18T20:00:00+02:00"}],"info":{"name":"Radiokop (11)","region":"JHB City Power"},"schedule":{"days":[{"date":"2022-10-17","name":"Monday","stages":[["12:00-14:30"],["04:00-06:30","12:00-14:30"],["04:00-06:30","12:00-14:30"],["04:00-06:30","12:00-14:30","20:00-22:30"],["04:00-06:30","12:00-16:30","20:00-22:30"],["04:00-08:30","12:00-16:30","20:00-22:30"],["00:00-02:30","04:00-08:30","12:00-16:30","20:00-22:30"],["00:00-02:30","04:00-08:30","12:00-16:30","20:00-00:30"]]},{"date":"2022-10-18","name":"Tuesday","stages":[["20:00-22:30"],["12:00-14:30","20:00-22:30"],["04:00-06:30","12:00-14:30","20:00-22:30"],["04:00-06:30","12:00-14:30","20:00-22:30"],["04:00-06:30","12:00-14:30","20:00-00:30"],["04:00-06:30","12:00-16:30","20:00-00:30"],["04:00-08:30","12:00-16:30","20:00-00:30"],["04:00-08:30","12:00-16:30","20:00-00:30"]]},{"date":"2022-10-19","name":"Wednesday","stages":[[],["20:00-22:30"],["12:00-14:30","20:00-22:30"],["04:00-06:30","12:00-14:30","20:00-22:30"],["04:00-06:30","12:00-14:30","20:00-22:30"],["04:00-06:30","12:00-14:30","20:00-00:30"],["04:00-06:30","12:00-16:30","20:00-00:30"],["04:00-08:30","12:00-16:30","20:00-00:30"]]},{"date":"2022-10-20","name":"Thursday","stages":[["04:00-06:30"],["04:00-06:30"],["04:00-06:30","20:00-22:30"],["04:00-06:30","12:00-14:30","20:00-22:30"],["04:00-08:30","12:00-14:30","20:00-22:30"],["04:00-08:30","12:00-14:30","20:00-22:30"],["04:00-08:30","12:00-14:30","20:00-00:30"],["04:00-08:30","12:00-16:30","20:00-00:30"]]},{"date":"2022-10-21","name":"Friday","stages":[["10:00-12:30"],["02:00-04:30","10:00-12:30"],["02:00-04:30","10:00-12:30"],["02:00-04:30","10:00-12:30","18:00-20:30"],["02:00-04:30","10:00-14:30","18:00-20:30"],["02:00-06:30","10:00-14:30","18:00-20:30"],["02:00-06:30","10:00-14:30","18:00-20:30"],["02:00-06:30","10:00-14:30","18:00-22:30"]]},{"date":"2022-10-22","name":"Saturday","stages":[["18:00-20:30"],["10:00-12:30","18:00-20:30"],["02:00-04:30","10:00-12:30","18:00-20:30"],["02:00-04:30","10:00-12:30","18:00-20:30"],["02:00-04:30","10:00-12:30","18:00-22:30"],["02:00-04:30","10:00-14:30","18:00-22:30"],["02:00-06:30","10:00-14:30","18:00-22:30"],["02:00-06:30","10:00-14:30","18:00-22:30"]]},{"date":"2022-10-23","name":"Sunday","stages":[[],["18:00-20:30"],["10:00-12:30","18:00-20:30"],["02:00-04:30","10:00-12:30","18:00-20:30"],["02:00-04:30","10:00-12:30","18:00-20:30"],["02:00-04:30","10:00-12:30","18:00-22:30"],["02:00-04:30","10:00-14:30","18:00-22:30"],["02:00-06:30","10:00-14:30","18:00-22:30"]]}],"source":"https://www.citypower.co.za/customers/Pages/Load_Shedding_Downloads.aspx"}}'
  if (stage == 0) {
    return "No load shedding"
  }
  let result = JSON.parse(response);
  for (let i = 0; i < result.schedule.days.length; i++) {
    if (result.schedule.days[i].date == today) {
      console.log(result.schedule.days[i].stages[stage])
    }
  }
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
