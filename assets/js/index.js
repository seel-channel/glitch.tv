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

function loadVideoContent(database, hrefNotFound, name) {
  var found = false;
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
      // getElement("video_banner").setAttribute(
      //   "src",
      //   `${database[id].path}/banner.jpg`
      // );
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
  } else {
    let episodeList = ``;
    for (const id in src) {
      let newID = parseInt(id) + 1;
      episodeList += `<option id="${newID}" value="${src[id]}">Episodio ${newID}</option>`;
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
  var location = window.location.search;
  if (location.includes("=")) {
    location = location.split("=")[0] + "=episode-" + episodeNumber;
  } else {
    location = location + "=episode-" + episodeNumber;
  }
  history.pushState(
    {
      id: "homepage",
    },
    "",
    location
  );
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
  loadVideoContent(
    moviesDataBase(),
    "./catalogo_peliculas.html",
    window.location.search
  );
}

function loadAnime() {
  var location = window.location.search;
  if (location.includes("=")) {
    var splitted = location.split("=");
    var episode = parseInt(splitted[1].replace("episode-", ""));
    loadVideoContent(animesDataBase(), "./catalogo_animes.html", splitted[0]);
    if (episode < getElement("select_episodes").length && episode > 0) {
      setEpisodeNumber(episode);
    } else {
      setEpisodeNumber(1);
    }
  } else {
    loadVideoContent(animesDataBase(), "./catalogo_animes.html", location);
  }
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
      videoSrc: [
        "https://www63.o0-1.com/token=QTs4gmlZHTL_LcQ74WJHfw/1600761165/2806:102e::/36/f/18/0843c3be56c0f97f23c84755ff5de18f-720p.mp4",
        "https://www710.o0-2.com/token=cOPEX1eWJovIW87r1a5rCw/1600761214/2806:102e::/33/4/bb/18033c11b02d56645c093353a1ad3bb4-720p.mp4",
        "https://www172.o0-1.com/token=O_GrMB5O4frCZSCY1AopbA/1600761242/2806:102e::/35/b/3e/e1ddb6fe83ca728d60b32e2e57c663eb-720p.mp4",
        "https://www906.o0-2.com/token=n0fB5Mw99yc2zhlvp7uuTQ/1600761265/2806:102e::/37/8/b7/3670d71969d357d9e97969bfc23e4b78-720p.mp4",
        "https://www107.o0-1.com/token=Xpk4pQWy_lijSr3TgdXv2w/1600761294/2806:102e::/37/6/de/9a6fb0d476ddad270a7a3299aefacde6-720p.mp4",
        "https://www1089.o0-3.com/token=OuSAj7ofZsQVuwpGK3O4dQ/1600761332/2806:102e::/36/8/83/2eb45e1ad89ec5ce24820a1085ddc838-720p.mp4",
        "https://www122.o0-1.com/token=H03uVxhhkBAQta5SHcw54w/1600761365/2806:102e::/38/4/46/63dbdc4534c158ff985ef20dd2829464-720p.mp4",
        "https://www606.o0-2.com/token=yz3Bwy_vJJM12_n54Cf1UQ/1600761400/2806:102e::/34/d/08/7a755ccfc3a27170f70f5e8ec797f08d-720p.mp4",
        "https://www1721.o0-4.com/token=zOy1MaSl7OJJg5LUWdqlSg/1600761427/2806:102e::/37/0/fd/e961ed32d9237fb9385ecd7f4bf19fd0-720p.mp4",
        "https://www949.o0-2.com/token=-1eMmtxNNVkt2Nl30lP_zg/1600761482/2806:102e::/36/7/cc/eb7bfc0f4a1d06d3cf6e783e1b86dcc7-720p.mp4",
        "https://www2195.o0-5.com/token=MKBE1zgaNMtTkK4w2A5DUQ/1600761509/2806:102e::/34/3/90/c3e91deecbad6f0bc3ccf9356670d903-720p.mp4",
        "https://www1639.o0-4.com/token=1vF4RL0SCIzKeS8ewCwt5w/1600761529/2806:102e::/38/1/b4/7529d90e66fe8419a063a2ef54f39b41-720p.mp4",
        "https://www795.o0-2.com/token=pZY1K18hUoslTRI_kog5eA/1600761558/2806:102e::/37/b/10/f1778f212f7fba134c452e0922e3310b-720p.mp4",
      ],
    },
    {
      title: "Tensei shitara slime datta ken",
      subtitle: "Fantasía, Acción",
      path: "./assets/animes/tensei_shitara_slime_datta_ken",
      year: "2018",
      sinopsis: `Un asalariado de 37 años que murió tras de ser apuñalado durante un robo. 
      Despierta en otro mundo reencarnado como un slime, considerado uno de los monstruos más débiles.
      A pesar de esto, tiene diferentes habilidades especiales y únicas.`,
      videoSrc: [
        "https://www2087.o0-5.com/token=egjQphq4268AqX0nCBlW1Q/1600759831/2806:102e::/27/6/43/2c318cc8e5225ba4bb125a1021a41436-720p.mp4",
        "https://www1565.o0-4.com/token=BXNFGvRzmjuVjDsNO7Cfqg/1600759874/2806:102e::/30/8/b0/cd25816f51c102bb0d65b26d5cc70b08-720p.mp4",
        "https://www547.o0-2.com/token=an1gf8c9WXLPA3wOLqwNtw/1600759908/2806:102e::/27/4/46/184a24d7e7b321126a87ab238549b464-720p.mp4",
        "https://www299.o0-1.com/token=xB7ceCIoSB28ked993_5VQ/1600759934/2806:102e::/31/0/e7/8a509b07fdfdda1a4c43a2ff98ddde70-720p.mp4",
        "https://www783.o0-2.com/token=se3y-EFoXxduIFNM6Y_azg/1600759959/2806:102e::/27/c/e3/7b56120a7966beaa3fa1da357d684e3c-720p.mp4",
        "https://www288.o0-1.com/token=b0WllWK8Huq-bacLrKlimQ/1600759999/2806:102e::/32/7/3a/3b7cb1e3c5840d89c2cd57721ae383a7-720p.mp4",
        "https://www1868.o0-4.com/token=kMo4DQuBpBel6ewMMlqeXQ/1600760037/2806:102e::/26/2/50/1d86f8e3effe764d5e9a61ae60dd7502-720p.mp4",
        "https://www937.o0-2.com/token=GfUgd6faWCmtxpZGUbCGTQ/1600760099/2806:102e::/26/9/7f/e57b9eaee5bbf46a5794182863c9d7f9-720p.mp4",
        "https://www883.o0-2.com/token=1jd0ecCJyFh-AgFn37RdEA/1600760136/2806:102e::/30/7/f3/63abcc3c26281b105bd151bdc25e3f37-720p.mp4",
        "https://www643.o0-2.com/token=Ozh5YrvbTjcrbtH-QLFP7w/1600760174/2806:102e::/31/8/6c/b03860647373ed34865b0ce8cc7fc6c8-720p.mp4",
        "https://www263.o0-1.com/token=bKHfkWYXTyqFIjdfs7ZkdA/1600760200/2806:102e::/28/c/e0/0cbf21b20738553fdf9046833c560e0c-720p.mp4",
        "https://www897.o0-2.com/token=wYKz_5ZJC7wlFusoCHYTog/1600760233/2806:102e::/26/b/b3/9a8d77d1dcd6458737a93fd926b19b3b-720p.mp4",
        "https://www2199.o0-5.com/token=950Dx_i3InIWS3uhaBqrMw/1600760263/2806:102e::/30/8/7b/e07cf9c58b1f87b95a03ba387e5127b8-720p.mp4",
        "https://www960.o0-2.com/token=6t_OAULatLNB-tkSaJFg9g/1600760293/2806:102e::/27/e/a5/c0ff48fa3c1d00c77ea951ed33c17a5e-720p.mp4",
        "https://www858.o0-2.com/token=g--EwUvhynbqi8yRf9BhSQ/1600760331/2806:102e::/25/e/f1/7b80dc677502c8b251045ae2d4636f1e-720p.mp4",
        "https://www781.o0-2.com/token=0Qsuoilf0fGaqaOBx5C60A/1600760363/2806:102e::/27/3/82/2c994c1745f1304c046afc78b3d2b823-720p.mp4",
        "https://www145.o0-1.com/token=XqyBQLh75kRAoMySMeokhw/1600760386/2806:102e::/31/8/9d/0ce57e2228167943d0381e201f04b9d8-720p.mp4",
        "https://www2095.o0-5.com/token=QPn5aNNN511ZaLztIcy68w/1600760416/2806:102e::/31/4/70/dc2dcbb54e75b934f830e9d99a517704-720p.mp4",
        "https://www845.o0-2.com/token=IUCnMPMVOcW9CHI2uhs6tQ/1600760446/2806:102e::/26/9/18/986892814f28664a1ff5b9ae1cdc7189-720p.mp4",
        "https://www2179.o0-5.com/token=mLaITb2K5ji_pxzX-sWSpQ/1600760483/2806:102e::/32/0/8a/401d4e2cbc90bb087dc121f1259c98a0-720p.mp4",
        "https://www72.o0-1.com/token=byjK-Eu82KGwJcz0CjyuUQ/1600760510/2806:102e::/27/7/f7/f40edd64d842b7ff29bbe44effa0ff77-720p.mp4",
        "https://www383.o0-1.com/token=Xpe9cjl9gHbKK_Mp6wvQkw/1600760545/2806:102e::/31/b/52/dcdb21a53f7040e319ae566c48acf52b-720p.mp4",
        "https://www1546.o0-4.com/token=Hbpc6KxNUPCrGH78HXqN0A/1600760586/2806:102e::/35/f/cd/eaacc774aa00a7df07dfaceeb1822cdf-720p.mp4",
        "https://www258.o0-1.com/token=2_fV6MeeRhMqECH9EF6htQ/1600760612/2806:102e::/37/8/d7/9946611baa92ea197f2e881cb1bf7d78-720p.mp4",
        "https://www761.o0-2.com/token=Pn30PeQyTUy0BwETmD4_bQ/1600760647/2806:102e::/33/7/26/48867a67b86f51eb4b96333e09a1f267-720p.mp4",
      ],
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
        "https://drive.google.com/file/d/1KB9SvLLaiL2qjpAONRSASlGzGmy4Wc3G/preview",
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
      videoSrc: [""],
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
        "https://drive.google.com/file/d/1QIe9v_CeiGr5dpiH3NtIZ4rODbtimI6_/preview",
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
        "https://drive.google.com/file/d/1UKhDYqmRK-VYkUqOaQE_2dI_KWuPQUw4/preview",
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
        "https://drive.google.com/file/d/1yyZzWRio7kMp67xaNDZUgX3kuD5anLSt/preview",
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
        "https://drive.google.com/file/d/1WTvyq8Dik3V8T8FRViR2c1aoJjqTl7bL/preview",
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
      videoSrc: ["https://feurl.com/v/7qv7jk0ewvg"],
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
        "https://drive.google.com/file/d/1EGh3gUhz5ndx4vt8tUKrJvodDKBR-EOx/preview",
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
        "https://drive.google.com/file/d/1mMX3Gf0vYGXSRZ_5QQ4M-64I5gvLwyQE/preview",
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
        "https://drive.google.com/file/d/13-aQNQeu0mpg7-GEjABuumfOCx8dgG9h/preview",
      ],
    },
    {
      title: "Valerian",
      subtitle: "Acción, Fantasía",
      path: "./assets/movies/valerian",
      year: "2017",
      sinopsis: `En el siglo XXVIII, los agentes terrícolas Valerian y Laureline son enviadas por el ministro de 
      Defensa a explorar un nuevo mundo que está al borde de una guerra civil para comprobar si son una amenaza 
      potencial contra la Tierra. La situación política del planeta, divido entre una aristocracia decadente, 
      un pueblo exaltado y unos sabios astutos y manipuladores les obligará a tomar partido por uno de los dos bandos.`,
      videoSrc: [
        "https://drive.google.com/file/d/1OfhleCxzhCVPevbZ9J9mxX1qEHUEyopO/preview",
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
        "https://drive.google.com/file/d/1A3FJ1j2doGTXcqm47jsa1PgAei7j9BzB/preview",
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
        "https://drive.google.com/file/d/1kMlZs5f_boJrV5GLIdq4ApCReRDM9wqS/preview",
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
        "https://drive.google.com/file/d/1M-Rc97g04KlnuSaMB0B7-_jNEUSlZ92M/preview",
      ],
    },
    {
      title: "Máquinas mortales",
      subtitle: "Acción, Ciencia ficción",
      path: "./assets/movies/maquinasmortales",
      year: "2018",
      sinopsis: `En un futuro apocalíptico, una mujer misteriosa debe destruir Londres,
       una ciudad gigantesca que se transporta sobre ruedas devorando, a su paso, los recursos de otras ciudades más pequeñas.`,
      videoSrc: [
        "https://drive.google.com/file/d/1Arl_A8XpWHay7D5RpAqGMEb6aWUKnnGQ/preview",
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
      videoSrc: ["https://feurl.com/v/3q91d3lj29y"],
    },
    {
      title: "Overlord",
      subtitle: "Acción, Zombies",
      path: "./assets/movies/overlord",
      year: "2018",
      sinopsis: `Unos paracaidistas estadounidenses se adentran en territorio nazi con el objetivo de 
      destruir un transmisor. Sin embargo, se dan cuenta de que en el pueblo donde tienen que desarrollar
      su misión está sucediendo algo terriblemente siniestro.`,
      videoSrc: ["https://feurl.com/v/pmo5wmk68ol"],
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
      videoSrc: ["https://feurl.com/v/8x9pjzz2q97"],
    },
    {
      title: "Kingsman 2",
      subtitle: "Acción, Espías",
      path: "./assets/movies/kingsman2",
      year: "2017",
      sinopsis: `Cuando el cuartel general de la agencia británica Kingsman es destruido, 
      los espías unen sus fuerzas con una organización aliada estadounidense. Su objetivo es colaborar 
      para intentar derrotar a su enemigo común y salvar al mundo.`,
      videoSrc: ["https://feurl.com/v/6m927wwqdor"],
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
      videoSrc: ["https://feurl.com/v/3q91dm3y29y"],
    },
    // {
    //   title: "Estación zombie",
    //   subtitle: "Drama, Zombies",
    //   path: "./assets/movies/traintobusan",
    //   year: "2016",
    //   sinopsis: `Un brote viral misterioso pone a Corea en estado de emergencia.
    //   Sok-woo y su hija Soo-ahn suben al KTX, un tren rápido que une los 442 km que separan
    //   Seúl de Busan, una ciudad que se defiende con éxito de la epidemia. Sin embargo, justo en el
    //   momento de su partida, la estación es invadida por zombis que matan al conductor del tren y
    //   a otros pasajeros.`,
    //   videoSrc: [
    //     "https://www1796.o0-4.com/token=Yf4ppfSf8AXrdGCLe3cDoQ/1600756594/2806:102e::/10/8/ec/63564ed6221badbf7624e0ae2dfd9ec8-720p.mp4",
    //   ],
    // },
    {
      title: "Polar",
      subtitle: "Drama, Suspenso",
      path: "./assets/movies/polar",
      year: "2019",
      sinopsis: `El principal asesino del mundo, Duncan Vizla, se está retirando cuando su exempleador 
      le asigna una misión. Contra su voluntad, se encuentra de vuelta enfrentándose a un ejército de 
      asesinos más jóvenes.`,
      videoSrc: ["https://feurl.com/v/1lo60008lo5"],
    },
    // {
    //   title: "Spiderman Lejos de casa",
    //   subtitle: "Fantasía, Ciencia ficción",
    //   path: "./assets/movies/spidermanlejosdecasa",
    //   year: "2019",
    //   sinopsis: `Peter Parker decide pasar unas merecidas vacaciones en Europa junto a MJ, Ned y el
    //   resto de sus amigos. Sin embargo, Peter debe volver a ponerse el traje de Spider-Man cuando Nick
    //   Fury le encomienda una nueva misión: frenar el ataque de unas criaturas que están causando el caos
    //   en el continente.`,
    //   videoSrc: [
    //     "https://damedamehoy.xyz/embed.php?v=VDlXWEdHdlBzTk1EUlRGdWcyc3ZTQzdmQkxKbFBXWlZIQ2xaWmIyc0hlMD0=",
    //   ],
    // },
    // {
    //   title: "Spiderman Homecoming",
    //   subtitle: "Fantasía, Ciencia ficción",
    //   path: "./assets/movies/spidermanhomecoming",
    //   year: "2017",
    //   sinopsis: `Peter Parker asume su nueva identidad como Spider-Man y regresa a vivir con su tía
    //   después de su aventura con los Vengadores. Al volver, mientras sigue bajo la tutela de Tony Stark,
    //   descubre que ha surgido un nuevo y despiadado enemigo que pretende destruir todo lo que ama: el Buitre.`,
    //   videoSrc: [
    //     "https://00e9e64bac8e71192de2ac28038a2a5926eebd6895e4f1ab40-apidata.googleusercontent.com/download/storage/v1/b/kyaru/o/e2BlXK0QRV0.mp4?qk=AD5uMEtBCpyN1B6kMFDoRjD9AGeFuogBkv56KGZ6Te-zwRjQTim84ZfNSnTy97RfgYYBLn-dll8VcAO1rXKC_WRI2qKF0BOagHDl4qbSMgCRCom1LNDkw5lU0l1VybTQvQC6BcmcH501vSNpLbFVrw-jn4yOmcKLEbSgmwaVZ_P7wrG13e9itpvosqwgu5pIkiX8gA7QDDztlPGkfc-ma2eirSX4h3vKHaMxryQfGvFRceOi-zNkLtxvy7g74pR5XuK9YYiYect3FX5WOGGxx91dWkjOg_qFdyPLgR2U0cXuvrEMy1FfWD0Fh_ioQG8EEIDHj5aFgKW3ROGg17QKXfVaimZ3gWUFHF-asfOAPsY8EpLKcjii7yMDzlwQh4FvMyi5kJ2CgxtlkL47GguFQ4H_2vRtF-zPWv_kcDigVzZQisbVjQjFGwc0sfn4MQ_41bbcY326_MztT7KGjorGpkuyGHoB7Gsc_fviTIt85_d304n6axK5QlAt0KBckP6s7cRNzl-QUjkdOvZSshYVT-380tHPbYy0XgAXJzoqcHqPLCRY5HRzOTzMU6VU0iTDGs-aPn85IIpTM2khUsfdEQ0xFEsZzQ2noPycy4kcyqRQ5RaEccgwGrReRQAPVMWRKrV7U1MZ42KIj3uuTBkkNEVy9uqPGp_v4bQyq7a25jIppkxa3u9UaMQ5k4Rh3sjnmSh87KDS-xelWHdDfst8FMtsjkP5WtIGWLtdzie0aXk0vR5OKpLIE4C7qvQMAz4fufjj_eaLdf4-tWWbDkbIXv-mEGjtfRXo4FMXeRcRU0kcvUEdw5od1JYP5Ie2r0izVOVZK3RLwSQf&isca=1",
    //   ],
    // },
    {
      title: "SHAZAM!",
      subtitle: "Fantasía, Ciencia ficción",
      path: "./assets/movies/shazam",
      year: "2019",
      sinopsis: `Billy Batson, un astuto joven de 14 años, se transforma en el superhéroe Shazam, 
      pero sus poderes son puestos a prueba cuando se enfrenta al mal.`,
      videoSrc: ["https://feurl.com/v/60epmb06j6qq8-7"],
    },
    {
      title: "Escape room",
      subtitle: "Drama, Misterio",
      path: "./assets/movies/escaperoom",
      year: "2019",
      sinopsis: `Seis personas quedan atrapadas en un escape room cuyo creador ha diseñado una trampa mortal
      en cada habitación. No saben por qué les está haciendo esto, pero sí saben que un solo error les 
      costará la vida.`,
      videoSrc: ["https://feurl.com/v/kdldqc3w-p-2qde"],
    },
    {
      title: "La llegada",
      subtitle: "Drama, Misterio",
      path: "./assets/movies/lallegada",
      year: "2016",
      sinopsis: `El gobierno contrata a la prestigiosa lingüista Louise Banks para que se comunique con unos 
      alienígenas que han llegado a la Tierra. Conforme ella aprende su idioma, va experimentando 
      regresiones muy intensas que desvelan la verdadera misión que les ha llevado hasta nuestro planeta.`,
      videoSrc: ["https://feurl.com/v/p6vgdw4jxvj"],
    },
    {
      title: "Deadpool",
      subtitle: "Acción, Comedia",
      path: "./assets/movies/deadpool",
      year: "2016",
      sinopsis: `Un exmercenario quien, tras haber sido sometido a un cruel experimento, 
      adquiere el superpoder de sanar rápidamente y pretende vengarse del hombre que destrozó su vida..`,
      videoSrc: ["https://feurl.com/v/p6ogddlqxoj"],
    },
    {
      title: "Deadpool 2",
      subtitle: "Acción, Comedia",
      path: "./assets/movies/deadpool2",
      year: "2018",
      sinopsis: `Deadpool debe proteger a Russell, un adolescente mutante, de Cable, 
      un soldado del futuro genéticamente modificado. Deadpool se alía con otros superhéroes para 
      poder derrotar al poderoso Cable.`,
      videoSrc: ["https://feurl.com/v/54oydd62xol"],
    },
    {
      title: "John Wick 3",
      subtitle: "Acción, Suspenso",
      path: "./assets/movies/johnwick3",
      year: "2019",
      sinopsis: `John Wick regresa de nuevo pero con una recompensa sobre su cabeza que persigue 
      unos mercenarios. Tras asesinar a uno de los miembros de su gremio, Wick es expulsado y se 
      convierte en el foco de atención de todos los sicarios de la organización.`,
      videoSrc: ["https://feurl.com/v/d-r-7ixqy87r6qe"],
    },
    {
      title: "La gran muralla",
      subtitle: "Acción, Fantasía",
      path: "./assets/movies/lagranmuralla",
      year: "2016",
      sinopsis: `Encarcelado dentro de la Gran Muralla china, un guerrero mercenario une fuerzas con
      un ejército de élite para luchar contra un ataque de monstruos saqueadores.`,
      videoSrc: ["https://feurl.com/v/78081ag5y3-lrnr"],
    },
  ];
}
