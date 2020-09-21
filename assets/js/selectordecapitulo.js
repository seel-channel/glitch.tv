function obtenerNumeroEpisodio (){ //Obtiene el query selector (el valor que aparece despues "?" el cual es el id de mi usuario) y toma solo el id del usuario
    var capitulo = document.getElementById('capitulo-titulo').innerHTML;
    var numero = capitulo.replace("Capítulo ", "");
    return parseInt(numero);
}

function anteriorCapituloTenseiShitaraSlime () {
    var capitulo = obtenerNumeroEpisodio();
    capitulo = capitulo - 1;
    cambiarVideoTenseiShitaraSlime(capitulo);
}

function siguienteCapituloTenseiShitaraSlime () {
    var capitulo = obtenerNumeroEpisodio();
    capitulo = capitulo + 1;
    cambiarVideoTenseiShitaraSlime(capitulo);
}

function cambiarVideoTenseiShitaraSlime(capitulo){
    var video = document.getElementById('player');

    var capituloMAX = 25;

    if(capitulo == 1 || capitulo > capituloMAX)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_01.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 1";
        document.getElementById("selectcapitulo").options.item(0).selected = 'selected';

    }

    if(capitulo == 2)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_02.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 2";
        document.getElementById("selectcapitulo").options.item(1).selected = 'selected';

    }

    if(capitulo == 3)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_03.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 3";
        document.getElementById("selectcapitulo").options.item(2).selected = 'selected';
    }

    if(capitulo == 4)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_04.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 4";
        document.getElementById("selectcapitulo").options.item(3).selected = 'selected';
    }

    if(capitulo == 5)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_05.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 5";
        document.getElementById("selectcapitulo").options.item(4).selected = 'selected';
    }

    if(capitulo == 6)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_06.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 6";
        document.getElementById("selectcapitulo").options.item(5).selected = 'selected';
    }

    if(capitulo == 7)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_07.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 7";
        document.getElementById("selectcapitulo").options.item(6).selected = 'selected';
    }

    if(capitulo == 8)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_08.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 8";
        document.getElementById("selectcapitulo").options.item(7).selected = 'selected';
    }

    if(capitulo == 9)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_09.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 9";
        document.getElementById("selectcapitulo").options.item(8).selected = 'selected';
    }

    if(capitulo == 10)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_10.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 10";
        document.getElementById("selectcapitulo").options.item(9).selected = 'selected';
    }

    if(capitulo == 11)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_11.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 11";
        document.getElementById("selectcapitulo").options.item(10).selected = 'selected';
    }

    if(capitulo == 12)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_12.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 12";
        document.getElementById("selectcapitulo").options.item(11).selected = 'selected';
    }

    if(capitulo == 13)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_13.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 13";
        document.getElementById("selectcapitulo").options.item(12).selected = 'selected';
    }

    if(capitulo == 14)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_14.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 14";
        document.getElementById("selectcapitulo").options.item(13).selected = 'selected';
    }

    if(capitulo == 15)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_15.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 15";
        document.getElementById("selectcapitulo").options.item(14).selected = 'selected';
    }

    if(capitulo == 16)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_16.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 16";
        document.getElementById("selectcapitulo").options.item(15).selected = 'selected';
    }

    if(capitulo == 17)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_17.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 17";
        document.getElementById("selectcapitulo").options.item(16).selected = 'selected';
    }

    if(capitulo == 18)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_18.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 18";
        document.getElementById("selectcapitulo").options.item(17).selected = 'selected';
    }

    if(capitulo == 19)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_19.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 19";
        document.getElementById("selectcapitulo").options.item(18).selected = 'selected';
    }

    if(capitulo == 20)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_20.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 20";
        document.getElementById("selectcapitulo").options.item(19).selected = 'selected';
    }

    if(capitulo == 21)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_21.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 21";
        document.getElementById("selectcapitulo").options.item(20).selected = 'selected';
    }

    if(capitulo == 22)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_22.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 22";
        document.getElementById("selectcapitulo").options.item(21).selected = 'selected';
    }

    if(capitulo == 23)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_23.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 23";
        document.getElementById("selectcapitulo").options.item(22).selected = 'selected';
    }

    if(capitulo == 24)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_24.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 24";
        document.getElementById("selectcapitulo").options.item(23).selected = 'selected';
    }

    if(capitulo == 25 || capitulo < 1)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_25.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 25";
        document.getElementById("selectcapitulo").options.item(24).selected = 'selected';
    }


    video.load();
}



function anteriorCapituloMadeInAbyss () {
    var capitulo = obtenerNumeroEpisodio();
    capitulo = capitulo - 1;
    cambiarMadeInAbyss(capitulo);
}

function siguienteCapituloMadeInAbyss () {
    var capitulo = obtenerNumeroEpisodio();
    capitulo = capitulo + 1;
    cambiarMadeInAbyss(capitulo);
}

function cambiarMadeInAbyss(capitulo){
    var video = document.getElementById('player');

    var capituloMAX = 13;

    if(capitulo == 1 || capitulo > capituloMAX)
    {
        video.innerHTML = '<source id="source" src="[DTUPGames] Made in Abyss - 01 [AnimeDTUP.com].mkv" type="video/mp4" size="1080"/> ';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 1";
        document.getElementById("selectcapitulo").options.item(0).selected = 'selected';

    }

    if(capitulo == 2)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_02.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 2";
        document.getElementById("selectcapitulo").options.item(1).selected = 'selected';

    }

    if(capitulo == 3)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_03.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 3";
        document.getElementById("selectcapitulo").options.item(2).selected = 'selected';
    }

    if(capitulo == 4)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_04.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 4";
        document.getElementById("selectcapitulo").options.item(3).selected = 'selected';
    }

    if(capitulo == 5)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_05.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 5";
        document.getElementById("selectcapitulo").options.item(4).selected = 'selected';
    }

    if(capitulo == 6)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_06.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 6";
        document.getElementById("selectcapitulo").options.item(5).selected = 'selected';
    }

    if(capitulo == 7)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_07.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 7";
        document.getElementById("selectcapitulo").options.item(6).selected = 'selected';
    }

    if(capitulo == 8)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_08.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 8";
        document.getElementById("selectcapitulo").options.item(7).selected = 'selected';
    }

    if(capitulo == 9)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_09.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 9";
        document.getElementById("selectcapitulo").options.item(8).selected = 'selected';
    }

    if(capitulo == 10)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_10.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 10";
        document.getElementById("selectcapitulo").options.item(9).selected = 'selected';
    }

    if(capitulo == 11)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_11.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 11";
        document.getElementById("selectcapitulo").options.item(10).selected = 'selected';
    }

    if(capitulo == 12)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_12.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 12";
        document.getElementById("selectcapitulo").options.item(11).selected = 'selected';
    }

    if(capitulo == 13 || capitulo < 1)
    {
        video.innerHTML = '<source id="source" src="Tensei_Shitara_Slime_Datta_Ken_Capitulo_13.mp4" type="video/mp4" size="1080"/>';
        document.getElementById('capitulo-titulo').innerHTML = "Capítulo 13";
        document.getElementById("selectcapitulo").options.item(12).selected = 'selected';
    }

    video.load();
}


