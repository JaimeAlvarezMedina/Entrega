import './App.css';
import React from 'react';
function Perfil(props) {
    localStorage.setItem("tipo", props.id);

    if (Boolean(localStorage.getItem("usuario")) == false) {
        return (
            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuDark">
                <li><a className="dropdown-item" href="/login">Iniciar sesión</a></li>
            </ul>
        )
    }
    else {
        if (props.id == "cliente") {
            return (
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuDark">
                    <li><a className="dropdown-item" href="#">Mi perfil</a></li>
                    <li><a className="dropdown-item" id='cerrar_sesion'>Cerrar sesión</a></li>
                </ul>
            )
        }
        if (props.id == "admin") {
            return (
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuDark">
                    <li><a className="dropdown-item" id='anadir_admin'>Añadir administrador</a></li>
                    <li><a className="dropdown-item" id='cerrar_sesion'>Cerrar sesión</a></li>
                </ul>
            )
        }
    }
}

var seleccionado;
class Foro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {isToggleOn: true,  articulo: [], categoria: [], imagen_prueba: '', datos_usuario: [], tipo: "", cantidad_del_post: [],datos:[] };	
        this.noticia = this.recoger_articulo.bind(this);
        this.todas_categorias = this.recoger_categorias.bind(this);
        this.filtrar_categoria = this.filtrado_categorias.bind(this);
        this.coger_id = this.pasar_pagina.bind(this);
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.anadir_admin = this.ir_anadir_admin.bind(this);
        this.coger_usuario = this.coger_datos_usuario.bind(this);
        this.funcion = this.añadir_funcion.bind(this);
        this.f = this.funciones.bind(this);
        this.borrar = this.borrar_publicacion.bind(this);
        this.datos = this.recoger_datos.bind(this);
        this.borrar = this.borrar_post.bind(this);
        this.perfil = this.perfil_usuario.bind(this);
        this.cantidad_post = this.cantidad_post_usuario.bind(this);
        this.publicaciones = this.publicaciones_usuario.bind(this);
        this.actividad = this.actividad_usuario.bind(this);
    this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
    }

    openNav() {
        document.getElementById("mySidemenu").style.width = "250px";
        document.getElementById("btn").style.height = "0px";
        document.getElementById("main").style.marginLeft = "250px";
        document.getElementById("btn_dentro").style.opacity = 0;
        document.getElementById("btn_dentro").style.display = "none";
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
    ir_anadir_admin() {
        window.location.href = "/anadir_admin";
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
    borrar_post({ currentTarget }) {
            var datos = new FormData();
            datos.append('id', currentTarget.id);

            fetch("http://159.223.172.191/borrar_publicacion.php", {
                method: "POST",
                body: datos
            })
                .then(res => res.json())
                .then(
                    (result) => {
			this.noticias();
                        alert("borrado");
                    },
                    (error) => {
                        console.log(error);
                    }
                )
        }
    
    
    filtrado_categorias({ currentTarget }) {
        console.log(seleccionado);
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
    publicaciones_usuario() {
        var datos = new FormData();
        datos.append('creador', localStorage.getItem("Creador"));
        fetch("http://159.223.172.191/publicacion_usuario.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        cantidad_del_post: result
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    actividad_usuario(){//ultimos likes que a dado el usuario
        
        var datos = new FormData();
        datos.append('creador', localStorage.getItem("Creador"));
        fetch("http://159.223.172.191/actividad_usuario.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {
                    
                    this.setState({
                        
                        articulo: result
                    });
		    if(this.state.isToggleOn== true){
                        this.handleClick()
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    publicaciones_usuario() {
        var datos = new FormData();
        datos.append('creador', localStorage.getItem("Creador"));
        fetch("http://159.223.172.191/publicacion_usuario.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {


                    this.setState({
                        cantidad_del_post: result
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    cantidad_post_usuario() {
        var datos = new FormData();
        datos.append('nombre_categoria', localStorage.getItem("Creador"));
        fetch("http://159.223.172.191/cantidad_post.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        cantidad_del_post: result
                    });
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    recoger_categorias() {
        var datos = new FormData();
        datos.append('Creador', localStorage.getItem("Creador"));
        fetch("http://159.223.172.191/publicacion_usuario.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        articulo: result
                    });
		    if(this.state.isToggleOn== false){
                        this.handleClick();
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    recoger_datos() {
        var datos = new FormData();
        datos.append('Creador', localStorage.getItem("Creador"));
        fetch("http://159.223.172.191/recoger_datos.php",{
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        datos: result
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
    borrar_publicacion({ currentTarget }) {
        var datos = new FormData();
        datos.append('id', currentTarget.id);
        fetch("http://159.223.172.191/borrar_publicacion.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {
                    
                     this.noticia();
                     this.todas_categorias();
                    
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
            if (localStorage.getItem("tipo") == "admin") {
                var elemento_admin = document.getElementById("anadir_admin");
                elemento_admin.onclick = this.anadir_admin;
            }
        }
    }
    componentDidMount() {
        this.cantidad_post();
        this.coger_usuario();
        this.todas_categorias();
        this.datos();
    }
    perfil_usuario() {
        window.location.href = "/Perfil";
    }
    render() {
        var mismousuario = false;
        if (localStorage.getItem("nombre_usuario") == localStorage.getItem("Creador")) {
            mismousuario = true;
        }
        return (
            <div className='dashboard' onMouseEnter={this.funcion}>
                <div id="mySidemenu" className="sidemenu">
                    <a href="javascript:void(0)" className="cerrar" onClick={this.closeNav}>&times;</a>
                    {this.state.datos_usuario.map((usuario) => <Perfil id={usuario.Tipo} />)}
                    <a href="/foro" >Home</a>
                    
                    <a href="/" >Categorias</a>
                    <a href="/Nuestro_equipo">Nuestro equipo</a>
                    <a href="#" className="dashboard-nav-item" ><i className="fas fa-sign-out-alt"></i> Logout </a>
                </div>
                <div id="main">
                    <div className="btnclas fixed-top d-flex" id="btn">
                        <button className="btn-open" id="btn_dentro" onClick={this.openNav}>&#9776; </button>           
                    </div>
                    <div className='dashboard-app'>
                        <div className='dashboard-content'>
                            <div className='container'>
                                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12 text-center ">
                                            <div className="panel panel-default">
                                                <div className="userprofile social ">
                                                    <div className="userpic"> <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" className="userpicimg" /> </div>
                                                    <h2 type="text" className="username">{localStorage.getItem("Creador")}</h2>
                                                </div>
                                                <div className="col-md-12 border-top border-bottom">
                                                    <ul className="nav nav-pills pull-left countlist" role="tablist">
                                                        <li role="presentation">
                                                            <h3>{this.state.datos.map((partes) => <div>{partes.suma}</div>)}<br />
                                                                <small>Likes</small> </h3>
                                                        </li>
                                                        <li role="presentation">
                                                            <h3>{this.state.datos.map((partes) => <div>{partes.resta}</div>)}<br />
                                                                <small>Dislikes</small> </h3>
                                                        </li>
                                                        <li role="presentation">
                                                            <h3>{this.state.cantidad_del_post.map((partes) => <div>{partes[0]}</div>)}<br />
                                                                <small>Posts</small> </h3>
                                                        </li>
                                                    </ul>
                                                    {mismousuario
                                                    ?<a href="/Editar_perfil" className="btn btn-secondary followbtn float-end mt-4 me-4">Editar</a>
                                                    :<p></p>
                                                    }
                                                    </div>
                                                <div className="clearfix"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div classNameName='botones'>
                                        
                                        <button className="btn btn-primary followbtn" onClick={this.todas_categorias}>Posts</button>
                                        <button onClick={this.actividad} className="btn btn-primary followbtn" >Actividad</button>
                                    </div>
                                    {mismousuario
                                        ? <div>
                                        {this.state.articulo.map((partes) => <article id={partes.ID_articulo} key={partes.ID_articulo} className="contenedor_publicacion">
                                            <div className="card_post m-4" style={{ background: "linear-gradient(90deg, rgba(70, 255, 41, 0.408) 0%, rgba(242, 242, 242)" + partes.like_totales * 100 / partes.actividad_total + "%, rgba(255, 33, 33, 0.431) 100%)" }}>
                                                <div className="card-bodyy">
                                                    <h5 className="card-title text-primary" id={partes.ID_articulo} onClick={this.coger_id}>{partes.Titulo}{partes.User}</h5>
                                                    <p id={partes.ID_articulo} onClick={this.coger_id} className="card-text">{partes.Cuerpo}...</p>
                                                    <div id={partes.ID_articulo} onClick={this.coger_id} className="ttt">
                                                    </div>
                                                    <div className="like_dislike">
                                                        <button className="btn" id={partes.ID_articulo}>Likes {partes.like_totales}</button>
                                                        <button id={partes.ID_articulo} className="btn">Dislikes {partes.dislike_totales}</button>
                                                    </div>
                                                    <div className="categoria_post" id={partes.Categoria} onClick={this.filtrar_categoria_post}>{partes.Categoria}</div>
                                                </div>
                                                
                                            </div>

                                            {this.state.isToggleOn

                                            ?<button id={partes.ID_articulo} onClick={this.borrar}>Borrar publicacion</button>
                                            :<p></p>
                                        }
                                        </article>
                                        )} 
                                    </div>
                                        :<div>
                                        {this.state.articulo.map((partes) => <article id={partes.ID_articulo} key={partes.ID_articulo} className="contenedor_publicacion">
                                            <div className="card_post m-4" style={{ background: "linear-gradient(90deg, rgba(70, 255, 41, 0.408) 0%, rgba(242, 242, 242)" + partes.like_totales * 100 / partes.actividad_total + "%, rgba(255, 33, 33, 0.431) 100%)" }}>
                                                <div className="card-bodyy">
                                                    <h5 className="card-title text-primary" id={partes.ID_articulo} onClick={this.coger_id}>{partes.Titulo}{partes.User}</h5>
                                                    <p id={partes.ID_articulo} onClick={this.coger_id} className="card-text">{partes.Cuerpo}...</p>
                                                    <div id={partes.ID_articulo} onClick={this.coger_id} className="ttt">
                                                    </div>
                                                    <div className="like_dislike">
                                                        <button className="btn" id={partes.ID_articulo}>Likes {partes.like_totales}</button>
                                                        <button id={partes.ID_articulo} className="btn">Dislikes {partes.dislike_totales}</button>
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
        );
    }
}

export default Foro;
