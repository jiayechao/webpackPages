import '../css/compoundInterest.scss';
import {get} from './delccommon.js';

get('/japi/delc/interest/interestInfo', {}, res => {
  if(res.code === 200){
    let data = res.data;
    if(data.eventStatus){
      $('.dashboard').addClass('isactive');
    }
    $('.beginTime').text(data.beginTime);
    $('.rate').text(data.rate);
    $('.balence').text(data.accountBalance);
    $('.endTime').text(data.endTime);
    $('.yesterdayInterest').text(data.yesterdayInterest);
    $('.totalInterest').text(data.totalInterest);
    $('.interestCount').text(data.interestCount);
    $('.maxInterest').text(data.maxInterest);
  }
  
})
