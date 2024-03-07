import { validateIp } from "./helpers";

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('button');
btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
    const ipCheck = ipInput.value;
    if (validateIp(ipCheck)) {
        fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_1Ekj15ep2T2FHbhinhzTXblSQZIQp&ipAddress=${ipInput.value}`)
        .then(response => response.json())
        .then(data => printData(data))
        
    } 
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