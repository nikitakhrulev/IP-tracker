import { validateIp } from "./helpers";

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');
btn.addEventListener('click', getData);
btn.addEventListener('touchstart', getData);
ipInput.addEventListener('keydown', handleKey);
let marker;

function getData() {
    const ipCheck = ipInput.value;
    if (validateIp(ipCheck)) {
        fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_1Ekj15ep2T2FHbhinhzTXblSQZIQp&ipAddress=${ipInput.value}`)
        .then(response => response.json())
        .then(data => printData(data))
        
    }
    getParametres(ipCheck) 
};
function handleKey(evt) {
    if (evt.key === 'Enter') {
        getData();
    }
};
function printData(data) {
    document.getElementById('ip').textContent = data.ip;
    document.getElementById('location').textContent = data.location.country + ', ' + data.location.region;
    document.getElementById('timezone').textContent = data.location.timezone;
    document.getElementById('isp').textContent = data.isp;
}

let map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function handleMap(lat, lon) {
    if (marker) {
        map.removeLayer(marker)
    }
    marker = L.marker([lat, lon]).addTo(map);
    map.setView([lat, lon], 12);   
}

function getParametres(ip) {
    fetch(`http://ip-api.com/json/${ip}`)
    .then(response => response.json())
    .then(data => {
        const {lat, lon} = data
        handleMap(lat, lon)
    })
}