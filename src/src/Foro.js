import './App.css';
import lupa from './Imagenes/lupa.png';
import React from 'react';
import Popup from 'reactjs-popup';

const Modal = (popup) => (

    <Popup trigger={<p className="Creador_publicacion">Por:{popup.id}</p>} modal>
        {close => (
            <div id='prueba_todo' onClick={close}>
                <div class="container d-flex justify-content-center align-items-center">
                    <div class="card" id='algoo'>

                        <div class="upper">

                            <img src="https://i.imgur.com/Qtrsrk5.jpg" class="img-fluid" />
                            <button className="close" onClick={close}>
                                &times;
                            </button>
                        </div>

                        <div class="user text-center">
                            <div class="profile">
                                <img src="https://i.imgur.com/JgYD2nQ.jpg" class="rounded-circle" width="80" />
                            </div>
                        </div>
                        <div class="mt-5 text-center">

                            <a href='/Perfil'>{popup.id}</a>
                            {localStorage.setItem("Creador", popup.id)}
                            <span class="text-muted d-block mb-2">Los Angles</span>
                            <button class="btn btn-primary btn-sm follow">Follow</button>
                            <div class="d-flex justify-content-between align-items-center mt-4 px-4">
                                <div class="stats">
                                    <h6 class="mb-0">Followers</h6>
                                    <span>8,797</span>
                                </div>
                                <div class="stats">
                                    <h6 class="mb-0">Projects</h6>
                                    <span>142</span>
                                </div>
                                <div class="stats">
                                    <h6 class="mb-0">Ranks</h6>
                                    <span>129</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </Popup>

);
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
function Boton(props) {
    if (props.id == "cliente") {
        return (
            <button type="button" className="btn btn-outline-secondary" id="crear_post">Crear Post</button>
        )
    }
}
var seleccionado;
class Foro extends React.Component {
    constructor(props) {
        super(props);
        this.state = { articulo: [], categoria: [], imagen_prueba: '', datos_usuario: [], tipo: "" };
        this.noticia = this.recoger_articulo.bind(this);
        this.todas_categorias = this.recoger_categorias.bind(this);
        this.filtrar_categoria = this.filtrado_categorias.bind(this);
        this.coger_id = this.pasar_pagina.bind(this);
        this.crear_post = this.ir_crear_post.bind(this);
        this.insertar = this.insertar.bind(this);
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.barra_busqueda = this.barra_de_busqueda.bind(this);
        this.coger_usuario = this.coger_datos_usuario.bind(this);
        this.funcion = this.añadir_funcion.bind(this);
        this.f = this.funciones.bind(this);
        this.borrar = this.borrar_publicacion.bind(this);
        this.like = this.like_usuario.bind(this);
        this.dislike = this.dislike_usuario.bind(this);
        this.preview = this.preview_perfil.bind(this);
        this.perfil = this.perfil_usuario.bind(this);
        this.filtrar_categoria_post = this.filtrar_en_categoria_post.bind(this);
        this.mi_perfil = this.mi_perfil_usuario.bind(this);
        this.color = this.color_opcion.bind(this);
        this.fileInput = React.createRef();

    }

    openNav() {
        document.getElementById("mySidemenu").style.width = "250px";
        document.getElementById("btn").style.height = "0px";
        document.getElementById("main").style.marginLeft = "250px";
        document.getElementById("btn_dentro").style.opacity = 0;
        document.getElementById("btn_dentro").style.display = "none";
        document.getElementById("navbar-form").style.opacity = "0";
        document.getElementById("navbar-form").style.marginLeft = "300px";
        document.getElementById("container").style.marginTop = "15px";
    }
    menu() {
        if (document.getElementById("dashboard-nav-dropdown-menu").style.display == "block") {
            document.getElementById("dashboard-nav-dropdown-menu").style.display = "none";
        }
        else {
            document.getElementById("dashboard-nav-dropdown-menu").style.display = "block";

        }
    }
    closeNav() {
        document.getElementById("navbar-form").style.opacity = "1";
        document.getElementById("container").style.marginTop = "90px";
        document.getElementById("navbar-form").style.marginLeft = "100px";
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
    ir_crear_post() {
        window.location.href = "/crear_post";
    }
    coger_datos_usuario() {
        var datos = new FormData();
        if (Boolean(localStorage.getItem("usuario")) == true) {
            datos.append("usuario", localStorage.getItem("usuario"));
        }
        else {
            datos.append("usuario", "");
        }
        fetch("http://159.223.172.191/consultar_usuario.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result == 'vacio') {
                        this.setState({ datos_usuario: ["Nada"] });
                    }
                    else {
                        this.setState({ datos_usuario: result });
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    barra_de_busqueda() {
        var busqueda = document.getElementById("barra_busqueda").value;
        if (busqueda == false) {
            window.location.reload();
        } else {
            var datos = new FormData();
            datos.append('barra_busqueda', busqueda);
            fetch("http://159.223.172.191/filtrar_busqueda.php", {
                method: "POST",
                body: datos
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log(result);
                        this.setState({
                            articulo: result
                        });
                    },
                    (error) => {
                        console.log(error);
                    }
                )
        }
    }
    like_usuario({ currentTarget }) {
        var datos = new FormData();
        datos.append('id_categorias', currentTarget.id);
        datos.append("usuario", localStorage.getItem("usuario"));
        fetch("http://159.223.172.191/likes.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result == "ya diste like") {
                        console.log(result);
                        this.noticia();
                    }
                    if (result == "funciona el like") {
                        console.log(result);
                        this.noticia();
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    dislike_usuario({ currentTarget }) {
        var datos = new FormData();
        console.log(currentTarget.id);
        datos.append('id_categorias', currentTarget.id);
        datos.append("usuario", localStorage.getItem("usuario"));
        fetch("http://159.223.172.191/dislikes.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result == "ya diste dislike") {
                        console.log(result);
                        this.noticia();
                    }
                    if (result == "funciona") {
                        console.log(result);
                        this.noticia();
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    filtrar_en_categoria_post({ currentTarget }) {
        console.log(currentTarget.id);
        if (seleccionado == currentTarget.id) {
            this.noticia();
        } else {
            seleccionado = currentTarget.id;
            var datos = new FormData();
            datos.append('nombre_categoria', currentTarget.id);
            fetch("http://159.223.172.191/filtrar_categorias.php", {
                method: "POST",
                body: datos
            })
                .then(res => res.json())
                .then(
                    (result) => {

                        this.setState({
                            articulo: result
                        });
                    },
                    (error) => {
                        console.log(error);
                    }
                )
        }
    }
    filtrado_categorias({ currentTarget }) {

        console.log(currentTarget.id);
        if (seleccionado == currentTarget.id) {
            this.noticia();
            document.getElementById(seleccionado).style.backgroundColor = '#1A565D';
            document.getElementById(seleccionado).style.color = '#9eadae';
        } else {
            document.getElementById(currentTarget.id).style.backgroundColor = '#f1f1f121';
            document.getElementById(currentTarget.id).style.color = '#f1f1f1';
            if (seleccionado != null) {
                document.getElementById(seleccionado).style.backgroundColor = '#1A565D';
                document.getElementById(seleccionado).style.color = '#9eadae';
            }
            seleccionado = currentTarget.id;
            var datos = new FormData();
            datos.append('nombre_categoria', currentTarget.id);
            fetch("http://159.223.172.191/filtrar_categorias.php", {
                method: "POST",
                body: datos
            })
                .then(res => res.json())
                .then(
                    (result) => {

                        this.setState({
                            articulo: result
                        });
                    },
                    (error) => {
                        console.log(error);
                    }
                )
        }
    }
    recoger_categorias() {
        var datos = new FormData();
        fetch("http://159.223.172.191/recoger_categorias.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        categoria: result
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    recoger_articulo() {
        var datos = new FormData();
        fetch("http://159.223.172.191/recoger_informacion.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {


                    this.setState({
                        articulo: result
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    color_opcion() {
        var datos = new FormData();
        fetch("http://159.223.172.191/recoger_color.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        categoria: result
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    borrar_publicacion({ currentTarget }) {
        var datos = new FormData();
        datos.append('id_publicacion', currentTarget.id);
        fetch("http://159.223.172.191/borrar_publicacion.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result == "Correcto") {
                        this.noticia();
                        this.todas_categorias();
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    funciones() {
        localStorage.setItem("usuario", "");
        window.location.reload()
    }
    añadir_funcion() {
        if (localStorage.getItem("usuario") != "") {
            var elemento_cerrar = document.getElementById("cerrar_sesion");
            elemento_cerrar.onclick = this.f;
            if (localStorage.getItem("tipo") == "cliente") {
                var elemento_crear = document.getElementById("crear_post");
                elemento_crear.onclick = this.crear_post;
                var mi_perfil = document.getElementById("mi_perfil");
                mi_perfil.onclick = this.mi_perfil;
            }
        }
    }
    componentDidMount() {
        this.noticia();
        this.coger_usuario();
        this.todas_categorias();
        this.coger_usuario();

        console.log(localStorage.getItem("usuario"));
    }
    insertar() {
        var datos = new FormData;
        datos.append('archivo', this.fileInput.current.files[0])
        fetch("http://159.223.172.191/Probarsubirimg.php", {
            method: 'POST',
            body: datos
        })
            .then(
                res =>
                    res.json()

            )
            .then(
                (result) => {
                    this.setState({ imagen_prueba: result });
                    this.imagen()
                }
            )
    }

    perfil_usuario({ currentTarget }) {
        window.location.href = "/Perfil";
        localStorage.setItem("Creador", currentTarget.id);
    }
    mi_perfil_usuario() {
        window.location.href = "/Perfil";
        localStorage.setItem("Creador", localStorage.getItem("nombre_usuario"));

    }
    render() {
        var admin = false;
        if (localStorage.getItem("tipo") == "admin") {
            admin = true;
        }
        return (
            <div id="todo_foro" className='dashboard' onMouseEnter={this.funcion}>

                <div id="mySidemenu" className="sidemenu">
                    <a className="cerrar" onClick={this.closeNav}>&times;</a>
                    <a href="/foro" >Home</a>
                    {this.state.datos_usuario.map((comentario) => <Mi_perfil id={comentario.Tipo} onClick={this.mi_perfil} />)}
                    <a href="#" onClick={this.menu}>Categorias</a>
                    <div id="dashboard-nav-dropdown-menu" className='dashboard-nav-dropdown-menu' style={{ display: "none" }}>
                        {this.state.categoria.map((nombre) => <a className="dashboard-nav-dropdown-item" id={nombre.Categoria} key={nombre.Categoria} onClick={this.filtrar_categoria}>{nombre.Categoria}</a>)}
                    </div>
                    <a href="/Nuestro_equipo">Nuestro equipo</a>
                    {this.state.datos_usuario.map((usuario) => <Perfil id={usuario.Tipo} algo={usuario.User} />)}
                </div>
                <div id="main">
                    <div className="btnclas fixed-top d-flex" id="btn">
                        <button className="btn-open" id="btn_dentro" onClick={this.openNav}>&#9776; </button>
                        <form id="navbar-form" className="navbar-form  mt-2 mb-2 d-flex" role="search">
                            <input type="text" className="form-control" id="barra_busqueda" placeholder="Search" />
                            <a className="btn btn-secondary" onClick={this.barra_busqueda}><img className="lupa" src={lupa}></img></a>
                        </form>
                        <a href='https://buy.stripe.com/test_8wMaHL86l0yNgrm001'>Donacion</a>
                    </div>
                    <div className='dashboard-app'>
                        <header className='dashboard-toolbar'><a href="#!" className="menu-toggle"><i className="fas fa-bars"></i></a></header>
                        <div className='dashboard-content'>
                            <div className='container' id='container'>
                                <div className='card '>
                                    <div className='card-header '>
                                        <h1>Foro</h1>


                                        {this.state.datos_usuario.map((comentario) => <Boton id={comentario.Tipo} />)}
                                    </div>
                                    <div className='card-body'>
                                        {admin
                                            ? <div>
                                                {this.state.articulo.map((partes) => <div id='articulo_boton'><article id={partes.ID_articulo} key={partes.ID_articulo} onClick={this.coger_id}><div className="card border-success  m-4"><div className="card-body"><h5 className="card-title ">{partes.Titulo}</h5><p className="card-text">{partes.Cuerpo}</p></div></div></article>
                                                    <button id={partes.ID_articulo} onClick={this.borrar}>Borrar publicación</button>
                                                </div>
                                                )}
                                            </div>
                                            : <div>
                                                {this.state.articulo.map((partes) => <article id={partes.ID_articulo} key={partes.ID_articulo} className="contenedor_publicacion">
                                                    <div className="card_post m-4" style={{ background: "linear-gradient(90deg, rgba(70, 255, 41, 0.408) 0%, rgba(242, 242, 242)" + partes.like_totales * 100 / partes.actividad_total + "%, rgba(255, 33, 33, 0.431) 100%)" }}>
                                                        <div className="card-bodyy"><Modal id={partes.Creador} />
                                                            <h5 className="card-title text-primary" id={partes.ID_articulo} onClick={this.coger_id}>{partes.Titulo}{partes.User}</h5>
                                                            <p id={partes.ID_articulo} onClick={this.coger_id} className="card-text">{partes.Cuerpo}...</p>
                                                            <div id={partes.ID_articulo} onClick={this.coger_id} className="ttt">
                                                            </div>
                                                            <div className="like_dislike">
                                                                <button className="btn" id={partes.ID_articulo}>L{partes.like_totales}</button>
                                                                <button id={partes.ID_articulo}  className="btn">D{partes.dislike_totales}</button>
                                                            </div>
                                                            <div className="categoria_post" id={partes.Categoria} onClick={this.filtrar_categoria_post}>{partes.Categoria}</div>
                                                        </div>
                                                    </div>
                                                </article>
                                                )}
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Foro;