let urlBase='https://api.openweathermap.org/data/2.5/weather';
let api_key='c9312b883cd51e09f7593423a735d873';
let difkelvin=273.15;

    
    

    


document.getElementById('botonBusqueda').addEventListener('click',()=>{
        const ciudad=document.getElementById('ciudadEntrada').value;
        if (ciudad){
            fetchDatosClima(ciudad);
        }

    });
function fetchDatosClima(ciudad){
    fetch(`${urlBase}?q=${ciudad}&appid=${api_key}`)
    .then(data => data.json())
    .then(data => mostrarDatosClima(data))    
    };

function mostrarDatosClima(data){
    console.log(data);
    const divDatosClima=document.getElementById('datosClima');
    divDatosClima.innerHTML='';

    if (data.cod==='404'){
        divDatosClima.innerHTML='<p>Ciudad no encontrada</p>';
        return;
    }

    const nombreCiudad=data.name;
    const temperatura=Math.round(data.main.temp - difkelvin);
    const descripcionClima=data.weather[0].description;
    const humedad=data.main.humidity;
    const viento=data.wind.speed;
    const niveMar=data.main.sea_level;
    const iconoClima=data.weather[0].icon;

    divDatosClima.innerHTML=`
        <h2>Clima en ${nombreCiudad}</h2>
        <p>Temperatura: ${temperatura} °C</p>
        <p>Descripción: ${descripcionClima}</p>
        <p>Humedad: ${humedad}%</p>
        <p>Viento: ${viento} m/s</p>
        <p>Nivel del mar: ${niveMar ? niveMar + ' hPa' : 'No disponible'}</p>
        <img src="https://openweathermap.org/img/wn/${iconoClima}@2x.png" alt="Weather icon showing ${descripcionClima} conditions in ${nombreCiudad}">
    `;
}