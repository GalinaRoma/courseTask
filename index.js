var csv = require('csv-parser');
var fs = require('fs');
var app = require('./server');
let counterFromMenu = 0;
let counterFromHeader = 0;
let counterWithChat = 0;
// let counterFailed = 0;
function main() {
  let curUserEvents = [];
  fs.createReadStream(process.argv[2])
    .pipe(csv({separator: ";"}))
    .on('data', function (data) {
      if (data.userID !== '0' && data.userID !== '1') { 
        if (!curUserEvents.length) {
          curUserEvents.push({id: data.userID, event: data.eventName, time: data.timeUser, label: data.eventLabel});
        }
        else {
          if (data.userID !== curUserEvents[0].id) {
            work(curUserEvents);
            curUserEvents = [];
            curUserEvents.push({id: data.userID, event: data.eventName, time: data.timeUser, label: data.eventLabel});
          } else {
            curUserEvents.push({id: data.userID, event: data.eventName, time: data.timeUser, label: data.eventLabel});
          }
        }
      }
    })
    .on('end', function () {
      console.log('file was processed, reload localhost:8080');
      app.set('fromMenu', counterFromMenu);
      app.set('fromHeader',counterFromHeader);
      app.set('withChat', counterWithChat);
    })
}

function work(events) {
  let handlerEvents = 0;
  const fromMenu = ['eventNavigation_menuItemClick', "eventReferences_select", 'eventPopupReferences_openInput', 'eventAnyPage_emailEnter', 'eventPopupReferences_send'];
  const fromHeader = ['eventHomeTabClick', 'eventChangeServicesClick', "eventReferences_select", 'eventPopupReferences_openInput', 'eventAnyPage_emailEnter', 'eventPopupReferences_send'];
  events.sort((a, b) => Number(a.time) - Number(b.time));
  for (let j=events.length-1; j >= 0; j--) {
    let event = events[j];
    // if (checkFailedChains(events, event, j)) {
    //   counterFailed++;
    // } 
    resultFromMenu = checkChain(fromMenu, event, events, j);
    counterFromMenu += resultFromMenu[0];
    counterWithChat += resultFromMenu[1];
    resultFromHeader = checkChain(fromHeader, event, events, j);
    counterFromHeader += resultFromHeader[0];
    counterWithChat += resultFromHeader[1];
    handlerEvents++;
  }
}

function checkChain(chainArray, event, events, j) {
  let counter = 0;
  let chatCounter = 0;
  let failed = false;
  if (event.event === chainArray[chainArray.length-1] && event.label.search(/О наличии счетов в Банке/) !== -1) {
    for (let i=1; i < chainArray.length; i++) {
      if (j-i <= 0 || chainArray[chainArray.length-1-i] !== events[j-i].event) {
        failed = true;
        break;
      }        
      if (events[j-i-1].event.startsWith('eventChat') && (events[j-i].event === 'eventNavigation_menuItemClick' || events[j-i].event === 'eventReferences_select')) {
        chatCounter += 1;
        failed = true;
        break;
      } 
    }
    if (!failed) {
      counter++;
    }
  } 
  return [counter, chatCounter];
}

// function checkFailedChains(events, event, j) {
//   let failed = false;
//   if ((event.event === 'eventNavigation_menuItemClick' && event.label === 'Заказ документов') 
//   || (event.event === 'eventChangeServicesClick' && event.label === 'click to Заказ документов')) {
//     if (j+1 >= events.length || events[j+1].event !== 'eventReferences_select') {
//       failed = true;
//     }
//   }
//   return failed;
// }

main();