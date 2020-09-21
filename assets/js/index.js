function getElement(id) {
  return document.getElementById(id);
}

function insertHTML(id, html) {
  getElement(id).innerHTML += html;
}

function addClass(id, className) {
  getElement(id).classList.add(className);
}

function rmClass(id, className) {
  getElement(id).classList.remove(className);
}

function createCard(cardsData, gridID) {
  var htmlTemplate = ``;

  for (const id in cardsData) {
    let path = cardsData[id].path + "/poster.jpg";
    let moviePath =
      "./pelicula.html?" +
      cardsData[id].title.toLowerCase().replaceAll(" ", "-");
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

  insertHTML(gridID, htmlTemplate);
}

function createMovieCatalog(initIndex, show, IDInsert) {
  var movieList = moviesDataBase();
  var movies = [];
  var maxIndex =
    movieList.length < initIndex + show ? movieList.length : initIndex + show;
  for (var i = initIndex; i < maxIndex; i++) {
    movies.push(movieList[i]);
  }
  createCard(movies, IDInsert == null ? "cards_grid" : IDInsert);
}

function createHomePageCards() {
  createMovieCatalog(2, 4, "big_cards_grid");
  createMovieCatalog(10, 10);
  getElement("circular_loader").style.display = "none";
  getElement("circular_loader2").style.display = "none";
  getElement("principal_section").style.display = "";
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
      createMovieCatalog(0, 15);
      addClass("page1", "active");
      break;
    case 2:
      createMovieCatalog(15, 15);
      addClass("page2", "active");
      break;
    default:
      createMovieCatalog(0, 15);
      addClass("page1", "active");
      break;
  }
  getElement("circular_loader").style.display = "none";
  getElement("principal_section").style.display = "";
}

function loadMovie() {
  var encontrado = false;
  var movies = moviesDataBase();
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

  for (const id in movies) {
    if (cleanName == movies[id].title.toLowerCase()) {
      insertHTML("movie_title", `${movies[id].title} (${movies[id].year})`);
      insertHTML("movie_gender", movies[id].subtitle);
      insertHTML("movie_year", movies[id].year);
      insertHTML("movie_sinopsis", movies[id].sinopsis);
      getElement("movie_poster").setAttribute(
        "src",
        `${movies[id].path}/poster.jpg`
      );
      getElement("player").setAttribute(
        "poster",
        `${movies[id].path}/banner.jpg`
      );
      getElement("video_source").setAttribute("src", "");
      getElement("circular_loader").style.display = "none";
      getElement("principal_section").style.display = "";
      document.title = `Glitch.TV - ${movies[id].title}`;
      encontrado = true;
      break;
    }
  }
  if (!encontrado) {
    window.location.href = "./catalogo_peliculas.html";
  }
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
    },
    {
      title: "Bright",
      subtitle: "Fantasía, Suspenso",
      path: "./assets/movies/bright",
      year: "2017",
      sinopsis: `Dos policías deben dejar de lado sus 
      diferencias para proteger a una joven elfa hembra 
      y a una reliquia del pensamiento.`,
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
    },
    {
      title: "Watchmen",
      subtitle: "Drama, Ciencia ficción",
      path: "./assets/movies/watchmen",
      year: "2009",
      sinopsis: `Después de que su excolega es asesinado,
      un vigilante enmascarado descubre un plan para desacreditar 
      y destruir a los superhéroes del mundo.`,
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
    },
    {
      title: "Scott Pilgrim",
      subtitle: "Acción, Fantasía",
      path: "./assets/movies/scottpilgrim",
      year: "2010",
      sinopsis: `Después de conocer a la mujer de sus sueños, 
      Scott Pilgrim debe enfrentarse a un ejército de exparejas 
      que quieren deshacerse de él.`,
    },
    {
      title: "Mad Max",
      subtitle: "Ciencia ficción, Fantasía",
      path: "./assets/movies/madmax",
      year: "2015",
      sinopsis: `Aunque está decidido a vagar solo por el páramo post-apocalíptico, 
      Mad Max se une a Furiosa, una comandante fugitiva, y su banda, quienes están 
      tratando de escapar de un señor de la guerra.`,
    },
    {
      title: "Elysium",
      subtitle: "Ciencia ficción, Drama",
      path: "./assets/movies/elysium",
      year: "2013",
      sinopsis: `En el año 2154, los ricos viven en una cómoda y lujosa estación 
      espacial mientras que los pobres tienen que vivir en las ruinas de la Tierra superpoblada.`,
    },
    {
      title: "Rogue One",
      subtitle: "Acción, Ciencia ficción",
      path: "./assets/movies/rogueone",
      year: "2016",
      sinopsis: `El Imperio va a construir una estación espacial capaz de destruir planetas,
       conocida como la Estrella de la Muerte. Los rebeldes, conocedores de esto, se embarcan 
       en una misión extraordinaria: robar los planos y sabotear la estación.`,
    },
    {
      title: "Hunt for the Wilderpeople",
      subtitle: "Comedia, Drama",
      path: "./assets/movies/huntforthewilderpeople",
      year: "2016",
      sinopsis: `Ricky es un chico rebelde de ciudad de doce años al que no encuentran hogar de acogida, 
      salvo una granja en medio de la nada con una pareja; ella es encantadora, 
      pero él es arisco y solitario.`,
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
