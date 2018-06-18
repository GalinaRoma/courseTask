function drawChart(counterFromMenu, counterFromHeader, counterWithChat) {
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["From menu", "From header", "Through chat"],
            datasets: [{
                label: 'Results from script',
                data: [counterFromMenu, counterFromHeader, counterWithChat],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(201, 25, 25, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(201, 25, 25, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
}

function draw() {
    const fromMenu = ['eventNavigation_menuItemClick\nЗаказ документов', "eventReferences_select\nО наличии счетов в Банке", 'eventPopupReferences_openInput', 'eventAnyPage_emailEnter\nuser`s email', 'eventPopupReferences_send\nname - О наличии счетов в Банке'];
    const fromHeader = ['eventHomeTabClick\nСервисы', 'eventChangeServicesClick\nclick to Заказ документов', 'eventReferences_select\nО наличии счетов в Банке', 'eventPopupReferences_openInput', 'eventAnyPage_emailEnter\nuser`s email', 'eventPopupReferences_send\nname - О наличии счетов в Банке'];
    const withChat = ['eventAnyPage_jumpChat', '...', 'eventPopupReferences_send\nname - О наличии счетов в Банке']
    let firstUl = document.querySelector('.first');
    drawUl('.first', fromMenu, 'li1');
    drawUl('.second', fromHeader, 'li2')
    drawUl('.third', withChat, 'li3')
}

function drawUl(ulClass, chain, liClass) {
    let ul = document.querySelector(ulClass);
    for (let e of chain) {
        let curLi = document.createElement("li");
        curLi.innerText = e;
        curLi.setAttribute('class', liClass);
        ul.appendChild(curLi);
    }
}