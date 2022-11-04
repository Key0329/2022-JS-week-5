"use strict";

/* eslint-disable no-alert */
// const data = [
//     {
//         id: 0,
//         name: '肥宅心碎賞櫻3日',
//         imgUrl: 'https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80',
//         area: '高雄',
//         description: '賞櫻花最佳去處。肥宅不得不去的超讚景點！',
//         group: 87,
//         price: 1400,
//         rate: 10,
//     },
//     {
//         id: 1,
//         name: '貓空纜車雙程票',
//         imgUrl: 'https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
//         area: '台北',
//         description: '乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感',
//         group: 99,
//         price: 240,
//         rate: 2,
//     },
//     {
//         id: 2,
//         name: '台中谷關溫泉會1日',
//         imgUrl: 'https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
//         area: '台中',
//         description:
//             '全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。',
//         group: 20,
//         price: 1765,
//         rate: 7,
//     },
// ];
// eslint-disable-next-line no-undef
axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json').then(function (response) {
  var data = response.data.data;
  render(data);
  areaSelector(data);
  addTicket(data);
}); // -------------------------------- 初始渲染 ------------------------------------

var ticketCardArea = document.querySelector('.ticketCard-area');

function render(arr) {
  var str = '';
  arr.forEach(function (item) {
    str += "\n\t\t<li class=\"col-4 mb-10\">\n\t\t\t<div class=\"ticketCard h-100 d-flex flex-column\">\n\t\t\t\t<div class=\"ticketCard-img position-relative flex-grow-0\">\n\t\t\t\t\t<img src= \"".concat(item.imgUrl, "\">\n\t\t\t\t\t<p class=\"ticketCard-region py-2 px-5 bg-secondary text-white position-absolute rounded-end\">").concat(item.area, "</p>\n\t\t\t\t\t<p class=\"ticketCard-rate py-1 px-2 bg-primary text-white position-absolute rounded-end\">").concat(item.rate, "</p>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"ticketCard-body d-flex flex-column justify-content-between bg-white pt-5 px-5 pb-4 flex-grow-1\">\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<h2 class=\"h3 pb-1 border-bottom border-primary text-primary mb-4\">").concat(item.name, "</h2>\n\t\t\t\t\t\t<p class=\"ticketCard-body-text text-wrap\">").concat(item.description, "</p>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"d-flex justify-content-between\">\n\t\t\t\t\t\t<p class=\"text-primary d-flex align-items-center\"><span class=\"ticketCard-icon material-symbols-outlined me-2\">error</span>\u5269\u4E0B\u6700\u5F8C ").concat(item.group, " \u7D44</p>\n\t\t\t\t\t\t<div class=\"d-flex align-items-center text-primary\">\n\t\t\t\t\t\t\t<p class=\"me-1\">TWD</p>\n\t\t\t\t\t\t\t<p class=\"fs-2 roboto\">$").concat(item.price, "</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</li>\n\t\t");
  });
  ticketCardArea.innerHTML = str;
} // render(data);
// -------------------------------- 篩選區域 ------------------------------------


var areaSearch = document.querySelector('.search-region');
var searchResult = document.querySelector('.search-result');
var cantFind = document.querySelector('.cantFind-area');

function areaSelector(arr) {
  areaSearch.addEventListener('change', function (e) {
    var newData = [];

    if (e.target.value === '全部地區') {
      newData = arr;
    } else {
      newData = arr.filter(function (item) {
        return item.area === e.target.value;
      });
    }

    if (newData.length === 0) {
      cantFind.setAttribute('class', 'd-block');
    } else {
      cantFind.setAttribute('class', 'd-none');
    }

    render(newData);
    searchResult.innerHTML = "\u672C\u6B21\u641C\u5C0B\u5171 ".concat(newData.length, " \u7B46\u8CC7\u6599");
  });
} // areaSelector(data);
// -------------------------------- 新增套票 ------------------------------------


var addTicketBtn = document.querySelector('.addBtn');
var ticketName = document.querySelector('#ticketName');
var ticketPicture = document.querySelector('#ticketPicture');
var ticketRegion = document.querySelector('#ticketRegion');
var ticketNum = document.querySelector('#ticketNum');
var ticketRate = document.querySelector('#ticketRate');
var ticketPrice = document.querySelector('#ticketPrice');
var ticketDescription = document.querySelector('#ticketDescription');

function addTicket(arr) {
  // eslint-disable-next-line consistent-return
  addTicketBtn.addEventListener('click', function (e) {
    e.preventDefault();
    var typeLength = ticketDescription.value.length;

    if (typeLength > 100) {
      return alert('最多不超過 100 字');
    }

    if (ticketRate.value < 0 || ticketRate.value > 10) {
      return alert('星級區間為 1-10 分');
    }

    var newTicket = {
      id: arr.length,
      name: ticketName.value,
      imgUrl: ticketPicture.value,
      area: ticketRegion.value,
      description: ticketDescription.value,
      group: ticketNum.value,
      price: ticketPrice.value,
      rate: ticketRate.value
    };

    if (newTicket.name === '' || newTicket.imgUrl === '' || newTicket.area === '' || newTicket.description === '' || newTicket.group === '' || newTicket.price === '' || newTicket.rate === '') {
      return alert('請確認填寫所有欄位');
    }

    arr.push(newTicket);
    render(arr);
    searchResult.innerHTML = "\u672C\u6B21\u641C\u5C0B\u5171 ".concat(arr.length, " \u7B46\u8CC7\u6599"); // eslint-disable-next-line no-undef

    Swal.fire({
      title: '新增套票成功',
      showConfirmButton: true,
      timer: 1500
    });
    areaSearch.value = '全部地區';
    ticketName.value = '';
    ticketPicture.value = '';
    ticketRegion.value = '';
    ticketDescription.value = '';
    ticketNum.value = '';
    ticketPrice.value = '';
    ticketRate.value = '';
  });
} // addTicket(data);
//# sourceMappingURL=all.js.map
