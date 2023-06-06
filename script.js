document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();


    let input = document.querySelector('#searchInput').value;

    if(input != ''){
        clearInfo();
        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURI(input)}&appid=d06cdb298fafc83c520d5ab677fc477e&units=metric&lang=pt_br`;

        let results = await fetch(url);
        let json = await results.json();

        if(json.cod == 200){
            showInfo({
                name: json.city.name,
                country: json.city.country,
                temp: json.list[0].main.temp,
                tempIcon: json.list[0].weather[0].icon,
                windSpeed: json.list[0].wind.speed,
                windAngle: json.list[0].wind.deg
            });
        } else{
            clearInfo();
            showWarning('Não encontramos esta localização.');
        }  
    }else {
        clearInfo();
    }

});


function showInfo(json){
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;

    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup> ºC </sup>`

    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h </span>`

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block' 

    
}

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none' 
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}

