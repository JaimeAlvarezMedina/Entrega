import './Pagina_articulo.css';
import React from 'react';
import like from './Imagenes/like.png';
import dislike from './Imagenes/Dislike.png';

const cargarImagen = require.context("./uploads", true);

var contador = 0;
var mostrado = false;
var inter;
var entro = false;

const curiosidades = ["Durante el desarrollo de GoldenEye 007 se consideró como posibilidad que los jugadores tengan que desconectar y volver a insertar el Rumble Pack (módulo de vibración) para poder recargar el arma.","Debido a las limitaciones de memoria del primer Deus Ex, las torres gemelas no fueron incluidas en la recreación de la Nueva York de 2052. En la historia del juego se explica su ausencia como resultado de un ataque terrorista.", "En GTA: San Andreas si tu habilidad de conducción es baja, CJ mirará hacia atrás cuando el coche vaya en reversa. Cuando mejores tu habilidad, CJ empezará a usar los espejos retrovisores.", "La razón por la que el personaje de Crash no tiene cuello es debido a las limitaciones técnicas de aquella época (1996). Diseñaron a Crash de esa manera para simplificarlo, restandole complejidad a su geometría.", "La Playstation 2 ha tenido tanto éxito y sido tan popular que Sony continuó fabricandola hasta el mes en que fue anunciada la Playstation 4", "En Hitman 3 (2021) si escaneas el código QR detrás de la cabeza de los sujetos de prueba que aparecen en la misión «Chongqing» te muestra una foto de los desarrolladores", "En Red Dead Redemption 2 la bandera de Estados Unidos tiene tan solo 45 estrellas porque en aquel tiempo (1899) solo existian 45 estados. La actual que todos conocemos posee 50.", "En 2007, Rockstar brindó un teléfono a sus fans para que llamen y den su opinión sobre lo que estaba mal en Estados Unidos. Las mejores llamadas se incluyeron en una de las estaciones de radio del juego, WKTT (We Know The Truth).", "Un FPS bastante innovador para su época, el GoldenEye 007, fue desarrollado un equipo de no mas de 10 personas quienes en su mayoría no habían trabajado previamente en la industria de los videojuegos.", "En GTA IV, si entras con un coche convertible al lavadero la secuencia mostrará que lo hacen pasar por los rodillos en vez de lavarlo a mano",
"En Hitman 2 (2018) si pesas al agente 47 sobre una balanza te dará 47.0 KG", "En Project Cars 2, si la antena de tu coche se averia en exceso por golpes no podrás contactar a los boxes", "Es posible terminar Far Cry 4 en menos de 30 minutos aprovechando un final alternativo en el que es necesario permanecer sentado por 15 minutos en la casa del antagonista luego de ser capturado por sus fuerzas.", "El canto de SEGA que se muestra al comienzo de Sonic: The Hedhegog ocupaba 1/8 del espacio disponible en el cartucho para Megadrive.","En la versión japonesa de Fallout 3 se eliminó la posibilidad de detonar la bomba atómica en la misión The Power of The Atom y así evitar tocar un tema demasiado polémico para los nipones."];

function Perfil(props) {
    localStorage.setItem("tipo", props.id);
    localStorage.setItem("nombre_usuario", props.algo);
    if (Boolean(localStorage.getItem("usuario")) == true) {
        if (props.id == "cliente") {
            return (
                <a href="/" id='cerrar_sesion' >Logout</a>
            )
        }
        if (props.id == "admin") {
            return (
                <div>

                    <a href="/anadir_admin" >Añadir administrador</a>
                    <a href="/" id='cerrar_sesion'>Logout</a>
                </div>
            )
        }
        if (props.id != "admin" && props.id != "cliente") {
            return (
                <a href="/login" >Login</a>
            )
        }
    }
    else {
        return (
            <a href="/login" >Login</a>
        )
    }
}
function Mi_perfil(props) {
    if (props.id == "cliente") {
        return (
            <a href="/Perfil" id="mi_perfil">Mi perfil</a>
        )
    }
}

class Articulo extends React.Component {

    constructor(props) {
        super(props);
        this.state = { value: "", noticia: [], cuerpo: [], curiosidades: "", datos_usuario: [], gustas: "", error: "" }
        this.noticia = this.recoger_articulo.bind(this);
        this.hacer_cuerpo = this.estructura_cuerpo.bind(this);
        this.like = this.like_usuario.bind(this);
        this.dislike = this.dislike_usuario.bind(this);
        this.usuario = this.coger_datos_usuario.bind(this);
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.funcion = this.asignar_funciones.bind(this);
        this.alerta = this.anadir_advertencia.bind(this);
    }

    openNav() {
        document.getElementById("mySidemenu").style.width = "250px";
        document.getElementById("btn").style.height = "0px";
        document.getElementById("main").style.marginLeft = "250px";
        document.getElementById("btn_dentro").style.opacity = 0;
        document.getElementById("btn_dentro").style.display = "none";
        document.getElementById("container").style.marginTop = "10px";
    }
    closeNav() {
       
        document.getElementById("mySidemenu").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("btn").style.height = "70px";
        document.getElementById("btn_dentro").style.display = "block";
        setTimeout(function () {

            document.getElementById("btn_dentro").style.opacity = 1;
        }, 300);
    }
    pasar_pagina({ currentTarget }) {
        localStorage.setItem('id_articulo', currentTarget.id);
        window.location.href = "/pagina_articulo";
    }

    estructura_cuerpo() {
        if (mostrado == false) {
            try {
                var array_cuerpo = localStorage.getItem("cuerpo").split("//-//");
                var actual = array_cuerpo[contador];
                var elemento_padre = document.getElementById("aqui");

                if (actual.substring(0, 4) == "img-") {
                    var elemento_foto = document.createElement("img");
                    elemento_foto.setAttribute("src", cargarImagen('./' + array_cuerpo[contador]));
                    elemento_padre.appendChild(elemento_foto);
                }
                else {
                    var elemento_texto = document.createElement("p");
                    var texto = document.createTextNode(array_cuerpo[contador]);
                    elemento_texto.appendChild(texto);
                    elemento_padre.appendChild(elemento_texto);
                }
                contador++;
                if (contador < array_cuerpo.length) {
                    this.hacer_cuerpo();
                }
                else {
                    setTimeout(function () {
                        document.getElementById("cargar").style.display = "none";
                        document.getElementById("curiosidad").style.display = "none";
                        document.getElementById("todo").style.display = "block";
                    }, 2000);
                    mostrado = true;
                }
            } catch (error) {
                setTimeout(this.noticia, 3000);
                console.log(error);
            }
        }
    }

    recoger_articulo() {
        var datos = new FormData();
        datos.append('id', localStorage.getItem('id_articulo'));
        fetch("http://159.223.172.191/recoger_articulo.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {

                    this.setState({
                        noticia: result
                    });
                    { this.state.noticia.map((partes) => localStorage.setItem("cuerpo", partes.Cuerpo)) };
                    setTimeout(this.hacer_cuerpo, 2000);

                },
                (error) => {
                    console.log(error);
                }
            )
    }



    coger_datos_usuario() {
        if (Boolean(localStorage.getItem("usuario")) == true) {
            var datos = new FormData();
            datos.append("usuario", localStorage.getItem("usuario"));
            datos.append("id", localStorage.getItem('id_articulo'));
            fetch("http://159.223.172.191/consultar_color.php", {
                method: "POST",
                body: datos
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result == "rojo") {
                            document.getElementById("imagen_dislikes").style.backgroundColor = "#db2f23";
                            document.getElementById("imagen_likes").style.backgroundColor = "none";
                        }
                        if (result == "ninguno") {
                            document.getElementById("imagen_dislikes").style.backgroundColor = "none";
                            document.getElementById("imagen_likes").style.backgroundColor = "none";
                        }
                        if (result == "verde") {
                            document.getElementById("imagen_dislikes").style.backgroundColor = "none";
                            document.getElementById("imagen_likes").style.backgroundColor = "#2dd424";
                        }
                    },
                    (error) => {
                        console.log(error);
                    }
                )
        }
    }

    // document.getElementById("imagen_dislikes").style.backgroundColor="#db2f23";
    //             document.getElementById("imagen_likes").style.backgroundColor="none";
    like_usuario() {
        var datos = new FormData();
        datos.append('id_categorias', localStorage.getItem('id_articulo'));
        datos.append("usuario", localStorage.getItem("usuario"));
        fetch("http://159.223.172.191/likes.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result == "ya diste like") {
                        window.location.reload();
                    }
                    if (result == "funciona el like") {
                        window.location.reload();
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    dislike_usuario() {
        var datos = new FormData();

        datos.append('id_categorias', localStorage.getItem('id_articulo'));
        datos.append("usuario", localStorage.getItem("usuario"));
        fetch("http://159.223.172.191/dislikes.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result == "ya diste dislike") {
                        window.location.reload();

                    }
                    if (result == "funciona") {
                        window.location.reload();
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    anadir_advertencia() {
        if (entro != true) {
            entro = true;
            var elementopadre = document.getElementById("crear_alerta");
            var elemento = document.createElement("div");
            elemento.setAttribute("id", "alerta");
            elemento.setAttribute("role", "alert");
            elemento.setAttribute("aria-live", "assertive");
            elemento.setAttribute("aria-atomic", "true");
            elemento.setAttribute("class", "toast toast-demo d-flex align-items-center text-white bg-danger border-0 fade show");

            var elementocuerpo = document.createElement("div");
            elementocuerpo.setAttribute("class", "toast-body");
            elementocuerpo.appendChild(document.createTextNode("No puede votar en un post donde ya ha votado"));

            var elementoboton = document.createElement("button");
            elementoboton.setAttribute("type", "button");
            elementoboton.setAttribute("class", "btn-close btn-close-white ms-auto me-2");
            elementoboton.setAttribute("data-bs-dismiss", "toast");
            elementoboton.setAttribute("aria-label", "Close");
            elementoboton.onclick = () => { elementopadre.replaceChild(document.createElement("div"), elemento); entro = false; };

            elemento.appendChild(elementocuerpo);
            elemento.appendChild(elementoboton);
            elementopadre.appendChild(elemento);
        }
    }


    asignar_funciones() {
        if (inter == true) {
            document.getElementById("pulsado").onclick = this.alerta;
        }
        if (inter == false) {
            document.getElementById("interaccion_like").onclick = this.like;
            document.getElementById("interaccion_dislike").onclick = this.dislike;
        }

    }

    componentDidMount() {
        this.noticia();
        var numero = Math.round(Math.random() * ((curiosidades.length - 1)));
        this.setState({ curiosidad: curiosidades[numero] });
        this.usuario();
    }


    render() {

        return (
            <div className='dashboard' onMouseEnter={this.funcion}>
                <div id="mySidemenu" className="sidemenu">
                
                    <a href="#" className="cerrar" onClick={this.closeNav}>&times;</a>
                    <a href="/foro" >Home</a>
                    {this.state.datos_usuario.map((comentario) => <Mi_perfil id={comentario.Tipo} onClick={this.perfil} />)}
                    <a href="/" >Categorias</a>
                    <a href="/Nuestro_equipo">Nuestro equipo</a>
                    {this.state.datos_usuario.map((usuario) => <Perfil id={usuario.Tipo} algo={usuario.User} />)}
                </div>
                <div id="main">
                    <div className="btnclas fixed-top d-flex" id="btn">
                        <button className="btn-open" id="btn_dentro" onClick={this.openNav}>&#9776; </button>
                    </div>
                    
                    <div id='todo'>
                    <div className='card '>
                    <div className='card-header '>
                        {this.state.noticia.map((partes) => <div id='articulo'><h2>{partes.Titulo}</h2></div>)}
                        </div>
                        <div className='card-body'>
                        <div id='crear_alerta'></div>
                        <div id="aqui"></div>
                        <img src={like} onClick={this.like} id="imagen_likes" />
                        <img src={dislike} onClick={this.dislike} id="imagen_dislikes" />
                    </div>
                    </div>
                    </div>
                    <div className="spinner-border" role="status" id="cargar">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <div id='curiosidad'>
                        <figure>
                            <blockquote className="blockquote">
                                <h3>¿Sabías que?</h3>
                            </blockquote>
                            <figcaption className="blockquote-footer">
                                {this.state.curiosidad}
                            </figcaption>
                        </figure>
                    </div>
                   
                </div>
            </div>

        );
    }
}





export default Articulo;
