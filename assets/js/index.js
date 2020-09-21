function getElement(id) {
  return document.getElementById(id);
}

function setHTML(id, html) {
  getElement(id).innerHTML = html;
}

function addClass(id, className) {
  getElement(id).classList.add(className);
}

function rmClass(id, className) {
  getElement(id).classList.remove(className);
}

function ifNull(ifNull, ifNotNull) {
  return ifNull == null ? ifNotNull : ifNull;
}

function clearLoader() {
  getElement("principal_section").style.display = "";
  getElement("circular_loader").style.display = "none";
}

function createCard(cardsData, gridID, openPage) {
  var htmlTemplate = ``;
  for (const id in cardsData) {
    let path = cardsData[id].path + "/poster.jpg";
    let moviePath = `./${openPage}?${cardsData[id].title
      .toLowerCase()
      .replaceAll(" ", "-")}`;
    htmlTemplate += `
        <div class="glitch_card_content glitch_card_width">
          <a
            href="${moviePath}"
            class="glitch_img_cover full_width glitch_card_height"
            style="background-image: url('${path}');"
          >
            <div
              class="glitch_img"
              style="background-image: url('${path}')"
            ></div>
            <div
              class="glitch_img"
              style="background-image: url('${path}')"
            ></div>
            <div
              class="glitch_img"
              style="background-image: url('${path}')"
            ></div>
            <div
              class="glitch_img"
              style="background-image: url('${path}')"
            ></div>
            <div 
              class="glitch_img"
              style="background-image: url('${path}')"
            ></div>
          </a>
  
          <div class="card_title mg_top">
            <a href='${moviePath}'>
              ${cardsData[id].title}
            </a>
          </div>
  
          <div class="card_genders font14">${cardsData[id].subtitle}</div>
        </div>`;
  }

  setHTML(gridID, htmlTemplate);
}

function createCatalog(initIndex, show, IDInsert, database, toOpen) {
  var cards = [];
  var openPage = ifNull(toOpen, "pelicula.html");
  var dataList = ifNull(database, moviesDataBase());
  var maxIndex =
    dataList.length < initIndex + show ? dataList.length : initIndex + show;
  for (var i = initIndex; i < maxIndex; i++) {
    cards.push(dataList[i]);
  }
  createCard(cards, ifNull(IDInsert, "cards_grid"), openPage);
}

function loadVideoContent(database, hrefNotFound) {
  var found = false;
  var name = window.location.search;
  var cleanName = name
    .replaceAll("?", "")
    .replaceAll("-", " ")
    .replaceAll("%20", " ")
    .replaceAll("%C3%B1", "ñ")
    .replaceAll("%C3%A1", "á")
    .replaceAll("%C3%A9", "é")
    .replaceAll("%C3%AD", "í")
    .replaceAll("%C3%B3", "ó");

  for (const id in database) {
    if (cleanName == database[id].title.toLowerCase()) {
      setHTML("movie_title", `${database[id].title} (${database[id].year})`);
      setHTML("movie_gender", database[id].subtitle);
      setHTML("movie_year", database[id].year);
      setHTML("movie_sinopsis", database[id].sinopsis);
      getElement("movie_poster").setAttribute(
        "src",
        `${database[id].path}/poster.jpg`
      );
      getElement("player").setAttribute(
        "poster",
        `${database[id].path}/banner.jpg`
      );
      clearLoader();
      document.title = `Glitch.TV - ${database[id].title}`;
      setVideoSrc(database[id].videoSrc);
      found = true;
      break;
    }
  }
  if (!found) {
    window.location.href = hrefNotFound;
  }
}

// VIDEO OPTIONS
function setVideoSrc(src) {
  if (src.length == 1) {
    getElement("video_source").setAttribute("src", src[0]);
    getElement("player").load();
  } else {
    let episodeList = ``;
    for (const id in src) {
      let newID = parseInt(id) + 1;
      episodeList += `<option id="${newID}" value="${src[id]}">Capítulo ${newID}</option>`;
    }
    setHTML("select_episodes", episodeList);
  }
}

function getEpisodeNumber() {
  var e = getElement("select_episodes");
  return parseInt(e.options[e.selectedIndex].getAttribute("id"));
}

function setEpisodeNumber(episodeNumber) {
  getElement("video_source").setAttribute(
    "src",
    getElement("select_episodes").options[episodeNumber - 1].value
  );
  getElement("select_episodes").options.item(episodeNumber - 1).selected =
    "selected";
  getElement("episode_title").innerHTML = "Capítulo " + episodeNumber;
  getElement("player").load();
}

function nextEpisode() {
  var number = getEpisodeNumber();
  if (number == getElement("select_episodes").length) {
    setEpisodeNumber(1);
  } else {
    setEpisodeNumber(number + 1);
  }
}

function prevEpisode() {
  var number = getEpisodeNumber();
  if (number == 1) {
    setEpisodeNumber(getElement("select_episodes").length);
  } else {
    setEpisodeNumber(number - 1);
  }
}

// LOAD VIDEO PAGES
function loadMovie() {
  loadVideoContent(moviesDataBase(), "./catalogo_peliculas.html");
}

function loadAnime() {
  loadVideoContent(animesDataBase(), "./catalogo_animes.html");
}

// SHOW CATALOGS
function showHomepageCatalog() {
  createCatalog(2, 4, "big_cards_grid");
  createCatalog(10, 10);
  clearLoader();
  getElement("circular_loader2").style.display = "none";
  getElement("principal_section2").style.display = "";
}

function showMoviesCatalog() {
  var url = window.location.search;
  var id = url.replaceAll("?page=", "");

  for (let i = 1; i < 3; i++) {
    rmClass("page" + i, "active");
  }

  switch (parseInt(id)) {
    case 1:
      createCatalog(0, 15);
      addClass("page1", "active");
      break;
    case 2:
      createCatalog(15, 15);
      addClass("page2", "active");
      break;
    default:
      createCatalog(0, 15);
      addClass("page1", "active");
      break;
  }
  clearLoader();
}

function showAnimesCatalog() {
  createCatalog(0, 15, "cards_grid", animesDataBase(), "anime.html");
  clearLoader();
}

//DATABASES
function animesDataBase() {
  return [
    {
      title: "Made in Abyss",
      subtitle: "Fantasía, Aventura",
      path: "./assets/animes/made_in_abyss",
      year: "2017",
      sinopsis: `Riko es una joven huérfana que vive en la ciudad que rodea a un extraño 
      agujero gigante cuyo fondo se dirige a las profundidades de la tierra. Dicho agujero 
      es conocido como el Abismo. Dentro del Abismo se encuentran misteriosos artefactos 
      abandonados y restos de una civilización avanzada que desapareció hace milenios`,
      videoSrc: ["s1", "s2", "s3"],
    },
    {
      title: "Tensei shitara slime datta ken",
      subtitle: "Fantasía acción",
      path: "./assets/animes/tensei_shitara_slime_datta_ken",
      year: "2018",
      sinopsis: `Un asalariado de 37 años que murió tras de ser apuñalado durante un robo. 
      Despierta en otro mundo reencarnado como un slime, considerado uno de los monstruos más débiles.
      A pesar de esto, tiene diferentes habilidades especiales y únicas.`,
      videoSrc: ["s", "s", "s"],
    },
  ];
}

function moviesDataBase() {
  return [
    {
      title: "Spiderman Into the Spiderverse",
      subtitle: "Fantasía, Ciencia ficción",
      path: "./assets/movies/spidermanintothespiderverse",
      year: "2018",
      sinopsis: `Luego de ser mordido por una araña radioactiva, 
      el joven Miles Morales desarrolla misteriosos poderes que 
      lo transforman en el Hombre Araña. Ahora deberá usar sus 
      nuevas habilidades ante el malvado Kingpin, un enorme demente 
      que puede abrir portales hacia otros universos.`,
      videoSrc: [
        "https://www595.o0-2.com/token=wuvf3YV5dfgMUUnxaWsozw/1600741853/2806:102e::/36/d/46/9e57bcf4bb0956b8651715a2e04c646d-720p.mp4",
      ],
    },
    {
      title: "Gravedad",
      subtitle: "Drama, Misterio",
      path: "./assets/movies/gravedad",
      year: "2013",
      sinopsis: `La doctora Ryan Stone es una ingeniera médica 
      en su primera misión espacial. Su comandante es el veterano 
      Matt Kowalsky, en su último viaje antes de retirarse. 
      Una caminata espacial de rutina se convierte en un desastre 
      y la nave queda destruida, dejando a Ryan y Matt atrapados 
      en el espacio, sin ninguna conexión con la Tierra y sin 
      esperanza de ser rescatados.`,
      videoSrc: [
        "https://00f74ba44bb63ecf1d73c6d4623ecce2308a4ae2a2-apidata.googleusercontent.com/download/storage/v1/b/kyaru/o/po3RMkPNa8z-umi.mp4?jk=AFshE3X5yuCcS3-mvWDVpiOeWfsxjYrv4k3lT96Yw8-Lpc8aek7GAgF_Te03bMTkHINL17YzVTOujGJlyisHlvsb6kKjxBvth_lKevznh9itDvSbzd0UFanBvCi8DI_kgLSKOKCoFbcvTIPRBKmIPPmOzwsF77Ue1YodUBKzWpZXcgEZjNz_DaseO_hmFtvfhs23OQd8aqka_NVtf7JezwTtOuOOpbq9rIMKwS8BiPFbaizu31vgmuksuuS0gkBRUK0OOoBZtzVllzuOECfxGZP8sJcqXJzxr1uDBDIUr2_qy4xTfd9NCjB7_GUA-_73MGMuXLP1g79_x8yzn2bZwJOACHeMd20YE6F1EM8vutWuSJ0S8AVJmEM795AEGEVEN0YbmNPiWCFnPaN-_GI2A4WBjkCuwNJErreUs8BnzZyr-59w6fWhbI8XOQ3fS8fbae7tdxixJNhJvnaSUfboHpK2fRkTXd-kuuCe-UXxndtznJCEqb_xy8cJLfPgNLe3ZykFpDlEQy-M-sRJD-hyrdCifGIGi4I_Z-tw-E-eQjQWgvJlzIx8HNAs72ALGN_11tm-XWidhcZfjuiONXAxipzzBPI9K7bHPKn5I3OKLjTzh0FS6wjk5cGV41Y4r5rkjZtKjCgNfksLFwa7NYUeNfm-Z_ejg_HRRQEckWVehe19LRSUFWGQVhs-foE0GblgpCTBJOqx5sFFUXmks00Vkme0yzQiiyPH7Agj8y_ezciLKMWraSwZXtNNTkfIctEYKggzH0zJu2S0w-gcMujuo9VTJcDwIF3S0I_PK5qGGEeZCgFGkc9TAr70U4Z2EKxj3XtlshKebtZfZNXIBvv04IF6zb5CHpJis3LmwEeNsiLrPrip6ACKvS6y0YORnDSnI3qzo-bGCVEK&isca=1",
      ],
    },
    {
      title: "La torre oscura",
      subtitle: "Fantasía, Ciencia ficción",
      path: "./assets/movies/latorreoscura",
      year: "2017",
      sinopsis: `Roland Deschain, el último pistolero, 
      persigue a Walter O'Dim, quien pretende destruir 
      la Torre Oscura, un edificio mágico cuya desaparición
      acarrearía la desintegración del universo. 
      Su batalla, que transita por tiempos y espacios 
      diferentes en los que la realidad y la irrealidad se mezclan,
      representa la lucha definitiva del bien contra el mal.`,
      videoSrc: [
        "https://www1114.o0-3.com/token=knQMvaslQnu-10IhH_JNmg/1600744319/2806:102e::/108/6/7d/f41ead5a618b091c9d8f9be0d7e7b7d6-720p.mp4",
      ],
    },
    {
      title: "Bright",
      subtitle: "Fantasía, Suspenso",
      path: "./assets/movies/bright",
      year: "2017",
      sinopsis: `Dos policías deben dejar de lado sus 
      diferencias para proteger a una joven elfa hembra 
      y a una reliquia del pensamiento.`,
      videoSrc: [
        "https://www633.o0-2.com/token=x1FxlPWNJVNDqPJLQqqqtA/1600744482/2806:102e::/109/1/e9/c73c3d908e50848f791131b6cf6f8e91-720p.mp4",
      ],
    },
    {
      title: "Doctor Strange",
      subtitle: "Fantasía, Ciencia ficción",
      path: "./assets/movies/doctorstrange",
      year: "2016",
      sinopsis: `Después de sufrir un accidente, 
      un brillante y arrogante cirujano busca rehabilitarse
      mediante técnicas alternativas. Sus intentos le 
      llevan a descubrir que ha sido designado para encabezar
      la lucha contra una fuerza oscura y sobrenatural.`,
      videoSrc: [
        "https://www176.o0-1.com/token=CApjZLEVGFRIkGHuuIuctw/1600744619/2806:102e::/25/a/39/cf367bab41098b154398ebb0d832539a-720p.mp4",
      ],
    },
    {
      title: "LIFE",
      subtitle: "Suspenso, Ciencia ficción",
      path: "./assets/movies/life",
      year: "2017",
      sinopsis: `Seis astronautas descubren indicios de la existencia 
      de vida inteligente en Marte. Cuando comienzan a investigar, 
      se dan cuenta de que esa forma de vida está mucho más evolucionada 
      y es infinitamente más aterradora de lo que habían supuesto.`,
      videoSrc: [
        "https://www1822.o0-4.com/token=z8BztSf3YeiaN8PA56jEVA/1600744739/2806:102e::/7/e/0c/dd14c318ac47c68f3f4d4c0c3157b0ce-720p.mp4",
      ],
    },
    {
      title: "Orgullo + Prejucios + Zombies",
      subtitle: "Acción, Suspenso",
      path: "./assets/movies/orgullo+prejuicios+zombies",
      year: "2016",
      sinopsis: `Durante la Gran Bretaña de 1819, una 
      plaga de zombies invade la apacible población inglesa de Meryton. 
      Bennet y sus hermanas, que han sido entrenadas por su padre en
      las artes marciales, se disponen a combatir contra los muertos vivientes.`,
      videoSrc: [
        "https://www579.o0-2.com/token=wFQ_4uwyU-vHIFyfZCdQGA/1600744805/2806:102e::/109/b/52/0de7e1e3605ab9c207a12a34426f652b-720p.mp4",
      ],
    },
    {
      title: "Watchmen",
      subtitle: "Drama, Ciencia ficción",
      path: "./assets/movies/watchmen",
      year: "2009",
      sinopsis: `Después de que su excolega es asesinado,
      un vigilante enmascarado descubre un plan para desacreditar 
      y destruir a los superhéroes del mundo.`,
      videoSrc: [
        "https://www2078.o0-5.com/token=nwZOaxxi-2c60wAi2d1png/1600744897/2806:102e::/18/0/f7/fd9ba494e23e4b7fb01ba2a081608f70-720p.mp4",
      ],
    },
    {
      title: "Ready Player One",
      subtitle: "Fantasía, Suspenso",
      path: "./assets/movies/readyplayerone",
      year: "2018",
      sinopsis: `Año 2045: el adolescente Wade Watts es solo una de las 
      millones de personas que se evaden del sombrío mundo real para 
      sumergirse en un mundo utópico virtual donde todo es posible: OASIS. 
      Wade participa en la búsqueda del tesoro que el creador de este mundo 
      imaginario dejó oculto en su obra. No obstante, hay gente muy 
      peligrosa compitiendo contra él.`,
      videoSrc: [
        "https://www892.o0-2.com/token=Qr_MgHgkMciYUgpGJey0Pw/1600744963/2806:102e::/17/6/18/b58b78ad6381936608f1bdba239ca186-720p.mp4",
      ],
    },
    {
      title: "Passenger",
      subtitle: "Drama, Suspenso",
      path: "./assets/movies/passenger",
      year: "2016",
      sinopsis: `Dos pasajeros que viajan en hibernación a un planeta
      lejano despiertan, por un error técnico, 90 años antes de llegar
      a destino. Solos y rodeados de lujos, entre ellos surge el amor;
      sin embargo, descubren que hay una avería en la nave y tendrán que
      repararla a tiempo para salvar a las 5 000 personas que permanecen
      hibernando, y a sí mismos.`,
      videoSrc: [
        "https://www376.o0-1.com/token=8ZG42tkofVp3RvSqT5uUsQ/1600745030/2806:102e::/108/3/13/9658e9c625c6973e7ee0586bcf164133-720p.mp4",
      ],
    },
    {
      title: "Scott Pilgrim",
      subtitle: "Acción, Fantasía",
      path: "./assets/movies/scottpilgrim",
      year: "2010",
      sinopsis: `Después de conocer a la mujer de sus sueños, 
      Scott Pilgrim debe enfrentarse a un ejército de exparejas 
      que quieren deshacerse de él.`,
      videoSrc: [
        "https://www1080.o0-3.com/token=sDrveKtyMQFZHizoEV-r7w/1600745081/2806:102e::/19/c/99/76611287755f1e4fb5c223121ad5099c-720p.mp4",
      ],
    },
    {
      title: "Mad Max",
      subtitle: "Ciencia ficción, Fantasía",
      path: "./assets/movies/madmax",
      year: "2015",
      sinopsis: `Aunque está decidido a vagar solo por el páramo post-apocalíptico, 
      Mad Max se une a Furiosa, una comandante fugitiva, y su banda, quienes están 
      tratando de escapar de un señor de la guerra.`,
      videoSrc: [
        "https://www2183.o0-5.com/token=NiHGANnSi8fMeGImekPHuw/1600745132/2806:102e::/19/1/17/9b00a31d95173c04fbf486d0b0366171-720p.mp4",
      ],
    },
    {
      title: "Elysium",
      subtitle: "Ciencia ficción, Drama",
      path: "./assets/movies/elysium",
      year: "2013",
      sinopsis: `En el año 2154, los ricos viven en una cómoda y lujosa estación 
      espacial mientras que los pobres tienen que vivir en las ruinas de la Tierra superpoblada.`,
      videoSrc: [
        "https://www102.o0-1.com/token=JlTKYSuQs-86oP5skx1xGQ/1600745197/2806:102e::/19/e/b7/d81713e239b00633491cd625ffae7b7e-720p.mp4",
      ],
    },
    {
      title: "Rogue One",
      subtitle: "Acción, Ciencia ficción",
      path: "./assets/movies/rogueone",
      year: "2016",
      sinopsis: `El Imperio va a construir una estación espacial capaz de destruir planetas,
       conocida como la Estrella de la Muerte. Los rebeldes, conocedores de esto, se embarcan 
       en una misión extraordinaria: robar los planos y sabotear la estación.`,
      videoSrc: [
        "https://www1113.o0-3.com/token=JXiXChAB3BeKv81oAmbDQw/1600745261/2806:102e::/22/d/ad/c646fd5862d779c5a0dc33197150cadd-720p.mp4",
      ],
    },
    {
      title: "Hunt for the Wilderpeople",
      subtitle: "Comedia, Drama",
      path: "./assets/movies/huntforthewilderpeople",
      year: "2016",
      sinopsis: `Ricky es un chico rebelde de ciudad de doce años al que no encuentran hogar de acogida, 
      salvo una granja en medio de la nada con una pareja; ella es encantadora, 
      pero él es arisco y solitario.`,
      videoSrc: [
        "https://www66.o0-1.com/token=To7zh2bjlpQ5JmdLWdNzpg/1600745291/2806:102e::/7/8/dd/90d17b42b757e72351e890645f680dd8-720p.mp4",
      ],
    },
    {
      title: "Overlord",
      subtitle: "Acción, Zombies",
      path: "./assets/movies/overlord",
      year: "2018",
      sinopsis: `Unos paracaidistas estadounidenses se adentran en territorio nazi con el objetivo de 
      destruir un transmisor. Sin embargo, se dan cuenta de que en el pueblo donde tienen que desarrollar
      su misión está sucediendo algo terriblemente siniestro.`,
    },
    {
      title: "Kingsman 2",
      subtitle: "Acción, Espías",
      path: "./assets/movies/kingsman2",
      year: "2017",
      sinopsis: `Cuando el cuartel general de la agencia británica Kingsman es destruido, 
      los espías unen sus fuerzas con una organización aliada estadounidense. Su objetivo es colaborar 
      para intentar derrotar a su enemigo común y salvar al mundo.`,
    },
    {
      title: "Kingsman",
      subtitle: "Acción, Crimen",
      path: "./assets/movies/kingsman",
      year: "2014",
      sinopsis: `Gary "Eggsy" Unwin, cuyo fallecido padre trabajó calladamente para una agencia de 
      espionaje ultrasecreta, vive en una urbanización del sur de Londres y parece dirigirse hacia las rejas.
      Sin embargo, el elegante agente Harry Hart reconoce el potencial del muchacho y lo recluta para 
      ser un aprendiz en el servicio secreto. Mientras tanto, un genio tecnológico retorcido amenaza al 
      planeta con una matanza a escala mundial.`,
    },
    {
      title: "Al filo del mañana",
      subtitle: "Acción, Ciencia ficción",
      path: "./assets/movies/alfilodelmanana",
      year: "2014",
      sinopsis: `William Cage, un soldado muerto en acción mientras combatía contra unos alienígenas 
      que invadieron la Tierra, entra en un bucle temporal en el cual revive constantemente y vuelve a 
      intentar salvar el planeta, mejorando sus habilidades, conociendo mejor al enemigo, y acercándose 
      cada vez más a la victoria. Sin embargo, el tiempo corre en su contra.`,
    },

    {
      title: "Estación zombie",
      subtitle: "Drama, Zombies",
      path: "./assets/movies/traintobusan",
      year: "2016",
      sinopsis: `Un brote viral misterioso pone a Corea en estado de emergencia. 
      Sok-woo y su hija Soo-ahn suben al KTX, un tren rápido que une los 442 km que separan 
      Seúl de Busan, una ciudad que se defiende con éxito de la epidemia. Sin embargo, justo en el 
      momento de su partida, la estación es invadida por zombis que matan al conductor del tren y 
      a otros pasajeros.`,
    },
    {
      title: "Spiderman Lejos de casa",
      subtitle: "Fantasía, Ciencia ficción",
      path: "./assets/movies/spidermanlejosdecasa",
      year: "2019",
      sinopsis: `Peter Parker decide pasar unas merecidas vacaciones en Europa junto a MJ, Ned y el 
      resto de sus amigos. Sin embargo, Peter debe volver a ponerse el traje de Spider-Man cuando Nick 
      Fury le encomienda una nueva misión: frenar el ataque de unas criaturas que están causando el caos
      en el continente.`,
    },
    {
      title: "Polar",
      subtitle: "Drama, Suspenso",
      path: "./assets/movies/polar",
      year: "2019",
      sinopsis: `El principal asesino del mundo, Duncan Vizla, se está retirando cuando su exempleador 
      le asigna una misión. Contra su voluntad, se encuentra de vuelta enfrentándose a un ejército de 
      asesinos más jóvenes.`,
    },
    {
      title: "Spiderman Homecoming",
      subtitle: "Fantasía, Ciencia ficción",
      path: "./assets/movies/spidermanhomecoming",
      year: "2017",
      sinopsis: `Peter Parker asume su nueva identidad como Spider-Man y regresa a vivir con su tía 
      después de su aventura con los Vengadores. Al volver, mientras sigue bajo la tutela de Tony Stark, 
      descubre que ha surgido un nuevo y despiadado enemigo que pretende destruir todo lo que ama: el Buitre.`,
    },
    {
      title: "SHAZAM!",
      subtitle: "Fantasía, Ciencia ficción",
      path: "./assets/movies/shazam",
      year: "2019",
      sinopsis: `Billy Batson, un astuto joven de 14 años, se transforma en el superhéroe Shazam, 
      pero sus poderes son puestos a prueba cuando se enfrenta al mal.`,
    },
    {
      title: "Escape room",
      subtitle: "Drama, Misterio",
      path: "./assets/movies/escaperoom",
      year: "2019",
      sinopsis: `Seis personas quedan atrapadas en un escape room cuyo creador ha diseñado una trampa mortal
      en cada habitación. No saben por qué les está haciendo esto, pero sí saben que un solo error les 
      costará la vida.`,
    },
    {
      title: "La llegada",
      subtitle: "Drama, Misterio",
      path: "./assets/movies/lallegada",
      year: "2016",
      sinopsis: `El gobierno contrata a la prestigiosa lingüista Louise Banks para que se comunique con unos 
      alienígenas que han llegado a la Tierra. Conforme ella aprende su idioma, va experimentando 
      regresiones muy intensas que desvelan la verdadera misión que les ha llevado hasta nuestro planeta.`,
    },
    {
      title: "Deadpool",
      subtitle: "Acción, Comedia",
      path: "./assets/movies/deadpool",
      year: "2016",
      sinopsis: `Un exmercenario quien, tras haber sido sometido a un cruel experimento, 
      adquiere el superpoder de sanar rápidamente y pretende vengarse del hombre que destrozó su vida..`,
    },
    {
      title: "Deadpool 2",
      subtitle: "Acción, Comedia",
      path: "./assets/movies/deadpool2",
      year: "2018",
      sinopsis: `Deadpool debe proteger a Russell, un adolescente mutante, de Cable, 
      un soldado del futuro genéticamente modificado. Deadpool se alía con otros superhéroes para 
      poder derrotar al poderoso Cable.`,
    },
    {
      title: "John Wick 3",
      subtitle: "Acción, Suspenso",
      path: "./assets/movies/johnwick3",
      year: "2019",
      sinopsis: `John Wick regresa de nuevo pero con una recompensa sobre su cabeza que persigue 
      unos mercenarios. Tras asesinar a uno de los miembros de su gremio, Wick es expulsado y se 
      convierte en el foco de atención de todos los sicarios de la organización.`,
    },
    {
      title: "La gran muralla",
      subtitle: "Acción, Fantasía",
      path: "./assets/movies/lagranmuralla",
      year: "2016",
      sinopsis: `Encarcelado dentro de la Gran Muralla china, un guerrero mercenario une fuerzas con
      un ejército de élite para luchar contra un ataque de monstruos saqueadores.`,
    },
  ];
}
