let divMenuInicio = document.querySelector(".menuinicio");
let divContenedorLibros = document.querySelector(".contenedorlibros");
let divContenedorPeliculas = document.querySelector(".contenedorpeliculas");
let divContenedorPersonajes = document.querySelector(".contenedorpersonajes");
let btnInicio = document.querySelector(".btninicio");
let btnOrdenarPorNombre = document.querySelector("#btnOrdenarPorNombre");
let btnOrdenarGenero = document.querySelector("#btnOrdenarPorGenero");
let btnBuscar = document.querySelector(".btnbuscar");

const ocultarMenuInicio = (opcion) => {
    libros = [];
    peliculas = [];
    personajesArray = [];
    orden = true;
    banderaBuscador = true;
    banderaGenero = true;
    divMenuInicio.classList.add("d-none");
    btnInicio.classList.remove("d-none");
    btnOrdenarPorNombre.classList.remove("d-none");
    if (opcion == 1) {
        btnBuscar.classList.remove("d-none");
        btnOrdenarGenero.classList.remove("d-none");
    }

}

const mostrarMenuInicio = () => {
    divMenuInicio.classList.remove("d-none");
    btnInicio.classList.add("d-none");
    btnOrdenarPorNombre.classList.add("d-none");
    btnOrdenarGenero.classList.add("d-none");
    btnBuscar.classList.add("d-none");
    divContenedorLibros.classList.add("d-none");
    divContenedorPeliculas.classList.add("d-none");
    divContenedorPersonajes.classList.add("d-none");
    document.querySelector("#contenedorbuscador").classList.add("invisible");
    document.querySelector("#contenedorbuscador").classList.remove("move");
    banderaBuscador = true;
    document.querySelectorAll("[data-bs-dismiss=modal]").forEach(element => {
        element.click();
    });
}

btnInicio.addEventListener("click", () => {
    mostrarMenuInicio();
});

btnBuscar.addEventListener("click", (e) => {
    if (banderaBuscador) {
        document.querySelector("#contenedorbuscador").classList.remove("invisible");
        document.querySelector("#contenedorbuscador").classList.add("move");
    } else {
        document.querySelector("#contenedorbuscador").classList.add("invisible");
        document.querySelector("#contenedorbuscador").classList.remove("move");
    }
    banderaBuscador = !banderaBuscador;
});

btnOrdenarPorNombre.addEventListener("click", (e) => {
    ordernarPersonajesPorNombre(e.currentTarget.dataset.seleccionado);
});
btnOrdenarPorGenero.addEventListener("click", (e) => {
    ordernarPersonajesPorGenero(e.currentTarget.dataset.seleccionado);
});

document.querySelector("#libros").addEventListener("click", (e) => {
    document.querySelector("#cargando").classList.remove("d-none");
    obtenerLibros();

    ocultarMenuInicio();
    divContenedorLibros.classList.remove("d-none");
    document.querySelector("#btnOrdenarPorNombre").dataset.seleccionado = "libros";
});
document.querySelector("#peliculaslor").addEventListener("click", (e) => {
    document.querySelector("#cargando").classList.remove("d-none");
    obtenerPeliculas();

    ocultarMenuInicio();
    divContenedorPeliculas.classList.remove("d-none");
    document.querySelector("#btnOrdenarPorNombre").dataset.seleccionado = "peliculas";
});
document.querySelector("#personajes").addEventListener("click", (e) => {
    document.querySelector("#cargando").classList.remove("d-none");
    obtenerPersonajes();
    
    ocultarMenuInicio(1);
    divContenedorPersonajes.classList.remove("d-none");
    document.querySelector("#btnOrdenarPorNombre").dataset.seleccionado = "personajes";
});