let libros = [];
let peliculas = [];
let personajesArray = [];
let orden = true;
let banderaBuscador = true;
let banderaGenero = true;

let verDetalleLibro = (id, nombre) => {
    fetch(`https://the-one-api.dev/v2/book/${id}/chapter`, { 
        headers: new Headers({
            'Authorization': 'Bearer UythWHguXEg7G1x2IQzg'
        })
    })
    .then((response) => response.json())
    .then((data) => {
        document.querySelector("#nombreLibro").innerHTML = nombre;
        let ul = document.createElement("ul");
        
        for (const element of data.docs) {
            let li = document.createElement("li");
            li.innerHTML = element.chapterName;
            ul.appendChild(li);
        }
        document.querySelector("#listaCapitulos").appendChild(ul);
    });
}

let renderLibros = () => {

    divContenedorLibros.innerHTML = "";

    for (const element of libros) {
        let div = document.createElement("div");
        div.classList.add("col-sm-12", "col-md-4", "carditems", "m-0", "p-0");
        div.innerHTML = `
        <div class="card m-2 p-5">
            <img src="/assets/icono-libro.png" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <a href="#" class="btn btn-primary btnvermas" id="${element._id}" data-libro="${element.name}" data-bs-toggle="modal" data-bs-target="#modalDetalleLibro">Ver más</a>
            </div>
        </div>
        `;
        divContenedorLibros.appendChild(div);
    }
    document.querySelectorAll('.btnvermas').forEach(item => {
        item.addEventListener('click', (e) => {
            document.querySelector("#nombreLibro").innerHTML = "";
            document.querySelector("#listaCapitulos").innerHTML = "";
            verDetalleLibro(e.currentTarget.id, e.currentTarget.dataset.libro);
        })
    });

}

let obtenerLibros = () => {
    fetch("https://the-one-api.dev/v2/book", { 
        headers: new Headers({
            'Authorization': 'Bearer UythWHguXEg7G1x2IQzg'
        })
    })
    .then((response) => response.json())
    .then((data) => {
        libros = data.docs;
        renderLibros();
    })
    .finally(() => {
        document.querySelector("#cargando").classList.add("d-none");
    });
}

let verDetallePelicula = (infoPelicula) => {
    fetch(`https://the-one-api.dev/v2/movie/${infoPelicula.id}/quote`, { 
        headers: new Headers({
            'Authorization': 'Bearer UythWHguXEg7G1x2IQzg'
        })
    })
    .then((response) => response.json())
    .then((data) => {
        document.querySelector("#nombrePelicula").innerHTML = infoPelicula.dataset.pelicula;
        let ul = document.createElement("ul");
        
        for (const element of data.docs) {
            let li = document.createElement("li");
            li.innerHTML = element.dialog;
            ul.appendChild(li);
        }
        for (const element of peliculas) {
            if (element._id == infoPelicula.id) {
                document.querySelectorAll(".duracionmodal").forEach(item => {
                    item.innerHTML = element.runtimeInMinutes;
                });
                document.querySelectorAll(".nominacionesmodal").forEach(item => {
                    item.innerHTML = element.academyAwardNominations;
                });
                document.querySelectorAll(".premiosmodal").forEach(item => {
                    item.innerHTML = element.academyAwardWins;
                });
            }
        }
        document.querySelector("#listaFrases").appendChild(ul);
    })
    .finally(() => {
        document.querySelector("#cargando").classList.add("d-none");
    });
}

let renderPeliculas = () => {

    divContenedorPeliculas.innerHTML = "";

    for (const element of peliculas) {
        let div = document.createElement("div");
        div.classList.add("col-sm-12", "col-md-4", "carditems", "m-0", "p-0");
        div.innerHTML = `
        <div class="card m-2 p-5">
            <img src="/assets/icono-pelicula.png" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <p class="centrarContenido">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trophy-fill" viewBox="0 0 16 16">
                    <path d="M2.5.5A.5.5 0 0 1 3 0h10a.5.5 0 0 1 .5.5c0 .538-.012 1.05-.034 1.536a3 3 0 1 1-1.133 5.89c-.79 1.865-1.878 2.777-2.833 3.011v2.173l1.425.356c.194.048.377.135.537.255L13.3 15.1a.5.5 0 0 1-.3.9H3a.5.5 0 0 1-.3-.9l1.838-1.379c.16-.12.343-.207.537-.255L6.5 13.11v-2.173c-.955-.234-2.043-1.146-2.833-3.012a3 3 0 1 1-1.132-5.89A33.076 33.076 0 0 1 2.5.5zm.099 2.54a2 2 0 0 0 .72 3.935c-.333-1.05-.588-2.346-.72-3.935zm10.083 3.935a2 2 0 0 0 .72-3.935c-.133 1.59-.388 2.885-.72 3.935z"/>
                    </svg>
                    <span class="premios">${element.academyAwardWins}</span>
                </p>
                <p class="centrarContenido">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alarm" viewBox="0 0 16 16">
                    <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
                    <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/>
                    </svg>
                    <span class="duracion">${element.runtimeInMinutes}</span>&nbsp min
                </p>
                <a href="#" class="btn btn-primary btnvermas" id="${element._id}" data-pelicula="${element.name}" data-bs-toggle="modal" data-bs-target="#modalDetallePelicula">Ver más</a>
            </div>
        </div>
        `;
        divContenedorPeliculas.appendChild(div);
    }
    document.querySelectorAll('.btnvermas').forEach(item => {
        item.addEventListener('click', (e) => {
            document.querySelector("#nombrePelicula").innerHTML = "";
            document.querySelector("#listaFrases").innerHTML = "";
            document.querySelectorAll(".duracionmodal").forEach(item => {
                item.innerHTML = "";
            });
            document.querySelectorAll(".nominacionesmodal").forEach(item => {
                item.innerHTML = "";
            });
            document.querySelectorAll(".premiosmodal").forEach(item => {
                item.innerHTML = "";
            });
            verDetallePelicula(e.currentTarget);
        })
    });

}

let obtenerPeliculas = () => {
    fetch("https://the-one-api.dev/v2/movie", { 
        headers: new Headers({
            'Authorization': 'Bearer UythWHguXEg7G1x2IQzg'
        })
    })
    .then((response) => response.json())
    .then((data) => {
        peliculas = data.docs;
        renderPeliculas();
    })
    .finally(() => {
        document.querySelector("#cargando").classList.add("d-none");
    });
}

let renderPersonajes = (personajes) => {

    divContenedorPersonajes.innerHTML = "";

    for (const element of personajes) {
        let div = document.createElement("div");
        div.classList.add("col-sm-12", "col-md-4", "m-0", "p-0");
        div.innerHTML = `
        <div class="card m-2 p-5">
            <img src="/assets/personaje.svg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <p>Genero: ${element.gender}</p>
            </div>
        </div>
        `;
        divContenedorPersonajes.appendChild(div);
    }

}

let obtenerPersonajes = () => {
    fetch("https://the-one-api.dev/v2/character", { 
        headers: new Headers({
            'Authorization': 'Bearer UythWHguXEg7G1x2IQzg'
        })
    })
    .then((response) => response.json())
    .then((data) => {
        personajesArray = data.docs;
        renderPersonajes(data.docs);
    })
    .finally(() => {
        document.querySelector("#cargando").classList.add("d-none");
    });
}

let ordernarPersonajesPorNombre = (tipo) => {
    if (tipo == "libros") {
        if (orden) {
            libros = libros.sort(function(a, b){return a.name < b.name ? 1 : -1;});
            renderLibros();
        } else {
            libros = libros.sort(function(a, b){return a.name > b.name ? 1 : -1;});
            renderLibros();
        }
        orden = !orden;
    } else if (tipo == "peliculas") {
        if (orden) {
            peliculas = peliculas.sort(function(a, b){return a.name < b.name ? 1 : -1;});
            renderPeliculas();
        } else {
            peliculas = peliculas.sort(function(a, b){return a.name > b.name ? 1 : -1;});
            renderPeliculas();
        }
        orden = !orden;
    } else if (tipo == "personajes") {
        if (orden) {
            let personajes = personajesArray.sort(function(a, b){return a.name < b.name ? 1 : -1;});
            renderPersonajes(personajes);
        } else {
            let personajes = personajesArray.sort(function(a, b){return a.name > b.name ? 1 : -1;});
            renderPersonajes(personajes);
        }
        orden = !orden;
    }
}

let ordernarPersonajesPorGenero = () => {
    let genero = banderaGenero ? "Male" : "Female";
    let personajes = personajesArray.filter((personaje) => { return personaje.gender == genero; });
    renderPersonajes(personajes);
    banderaGenero = !banderaGenero;
}

const buscarPorFiltro = (value) => {
    fetch(`https://the-one-api.dev/v2/character?name=/${value}/i`, { 
        headers: new Headers({
            'Authorization': 'Bearer UythWHguXEg7G1x2IQzg'
        })
    })
    .then((response) => response.json())
    .then((data) => {
        renderPersonajes(data.docs);
    })
    .finally(() => {
        document.querySelector("#cargando").classList.add("d-none");
    });
}

document.querySelector("#buscadorInput").addEventListener("keyup", (e) => {
    if (e.currentTarget.value.length > 0) {
        buscarPorFiltro(e.currentTarget.value);
    } else {
        renderPersonajes(personajesArray);
    }
});

window.addEventListener('mouseup',function(event){
    let pol = document.querySelector("#buscador");
    if(event.target.id == "contenedorbuscador" && event.target != pol && event.target.parentNode != pol){
        this.document.querySelector("#contenedorbuscador").classList.add("d-none");
        banderaBuscador = !banderaBuscador;
    }
});