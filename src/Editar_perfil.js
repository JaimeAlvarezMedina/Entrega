import './App.css';
import React from 'react';
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

class Editar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { articulo: [], categoria: [], imagen_prueba: '', datos_usuario: [],articulo_count:[], tipo: "", usuario: "",contra: "", direccion: "" };
        this.coger_id = this.pasar_pagina.bind(this);
        this.crear_post = this.ir_crear_post.bind(this);
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.count = this.count_categorias.bind(this);
        this.coger_usuario = this.coger_datos_usuario.bind(this);
        this.categorias_distintas = this.recoger_categorias_distintas.bind(this);
        this.funcion = this.añadir_funcion.bind(this);
        this.f = this.funciones.bind(this);
        this.perfil = this.perfil_usuario.bind(this);
        this.user = this.u.bind(this);
        this.mi_perfil = this.mi_perfil_dentro.bind(this);
        this.guardar = this.guardar_cambios.bind(this);
        this.dir = this.d.bind(this);
        this.contrasena = this.c.bind(this);
    }
    openNav() {
        document.getElementById("mySidemenu").style.width = "250px";
        document.getElementById("btn").style.height = "0px";
        document.getElementById("main").style.marginLeft = "250px";
        document.getElementById("btn_dentro").style.opacity = 0;
        document.getElementById("btn_dentro").style.display = "none";
        document.getElementById("container").style.marginTop = "10px";
        document.getElementById("card").style.marginTop = "10px";
    }
    closeNav() {
        document.getElementById("container").style.marginTop = "70px";
        document.getElementById("mySidemenu").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("btn").style.height = "50px";
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
            alert("Create una cuenta");
            window.location.href = "/login";
        }
        fetch("http://localhost/php_insti/consultar_usuario.php", {
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
    
    recoger_categorias_distintas() {
        var datos = new FormData();
        datos.append('nombre_categoria', localStorage.getItem("Creador"));
        fetch("http://localhost/php_insti/categorias_distintas.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        articulo: result
                    });
                    console.log(this.articulo);
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    count_categorias() {
        var datos = new FormData();
        var array=[];
        datos.append('nombre_categoria', localStorage.getItem("Creador"));
        fetch("http://localhost/php_insti/count_categorias.php", {
            method: "POST",
            body: datos
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        
                        articulo_count: result
                    });
                    
                },
                (error) => {
                    console.log(error);
                }
            )
    }
    guardar_cambios(){
        var datos = new FormData();
    datos.append('usuario', this.state.usuario);
    datos.append('contra', this.state.contra);
    datos.append('direccion', this.state.direccion);
    datos.append('usuario_actual', localStorage.getItem("Creador"));
    datos.append('direccion_actual', localStorage.getItem("direccion"));
    fetch("http://localhost/php_insti/editar_datos_perfil.php", {
      method: "POST",
      body: datos
    })
      .then(res => res.json())
      .then(
        (result) => {
            if (result == "Correcto") {
            localStorage.setItem("usuario", this.state.usuario);
            localStorage.setItem("Creador", this.state.usuario);
            this.setState({ usuario: "" });
            this.setState({ contra: "" });
            this.setState({ usuario: "" });
            window.location.reload();
            }
            if (result == "no disponible") {
                alert("Ese usuario ya esta escogido!");
                this.setState({ usuario: "" });
            }
            if (result == "contrasena incorrecta") {
                alert("Contraseña incorrecta");
                this.setState({ contra: "" });
            }
        },
        (error) => {
          console.log(error);
        }
      )
    }
    u(event) {//Para modificar el usuario
        this.setState({ usuario: event.target.value });
        console.log(this.state.usuario_inicio);
      }
    c(event) {
    this.setState({ contra: event.target.value });
    console.log(this.state.contra_inicio);
        }
    d(event) {
    this.setState({ direccion: event.target.value });
    console.log(this.state.contra_inicio);
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
                var mi_perfil = document.getElementById("mi_perfil");
                mi_perfil.onclick = this.mi_perfil;
            }
        }
    }
   
    componentDidMount() {
        this.coger_usuario();
        this.count();
        this.categorias_distintas();
    }
    perfil_usuario({ currentTarget }) {
        window.location.href = "/Perfil";
        localStorage.setItem("Creador", currentTarget.id);
    }
    mi_perfil_dentro() {
        localStorage.setItem("Creador", localStorage.getItem("nombre_usuario"));
    }
    render() {
        var mismousuario = false;
        if (localStorage.getItem("nombre_usuario") == localStorage.getItem("Creador")) {
            mismousuario = true;
        }
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
                    <div className='dashboard-app'>
                        <header className='dashboard-toolbar'><a href="#!" className="menu-toggle"><i className="fas fa-bars"></i></a></header>
                        <div className='dashboard-content'>
                            <div className='container' id='container'>
                                <div class="container">
                                    <div class="main-body">
                                        <div class="row">
                                            <div class="col-lg-4">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="d-flex flex-column align-items-center text-center">
                                                            <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" class="rounded-circle p-1 bg-primary" width="110" />
                                                            <div class="mt-3">
                                                                <h4>{localStorage.getItem("Creador")}</h4>
                                                                                                                             
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-lg-8">
                                                <div class="card">
                                                    <div class="card-body">
                                                        <div class="row mb-3">
                                                            <div class="col-sm-3">
                                                                <h6 class="mb-0">Nickname</h6>
                                                            </div>
                                                            <div class="col-sm-9 text-secondary">
                                                                <input type="text" value={this.state.usuario} onChange={this.user} class="form-control" placeholder="Cambiar usuario" />
                                                            </div>
                                                        </div>
                                                        <div class="row mb-3">
                                                            <div class="col-sm-3">
                                                                <h6 class="mb-0">Direccion</h6>
                                                            </div>
                                                            <div class="col-sm-9 text-secondary">
                                                            <input type="text" value={this.state.direccion} onChange={this.dir} class="form-control" placeholder="Cambiar dirección" />
                                                            </div>
                                                        </div>
    
                                                        <div class="row mb-3">
                                                            <div class="col-sm-3">
                                                                <h6 class="mb-0">Contraseña</h6>
                                                            </div>
                                                            <div class="col-sm-9 text-secondary">
                                                                <input type="text" class="form-control" value={this.state.contra} onChange={this.contrasena} placeholder="Escriba su contraseña para poder realizar el cambio" />
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-sm-3"></div>
                                                            <div class="col-sm-9 text-secondary">
                                                                <input type="button" class="btn btn-primary px-4" onClick={this.guardar} value="Guardar" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <div class="card">
                                                            <div class="card-body">
                                                                <h5 class="d-flex align-items-center mb-3">Categorias</h5>
                                                                {this.state.articulo.map((partes) =><div className='mb-3' id={partes.Categoria} key={partes.ID_articulo}><p>{partes.Categoria} {Math.round((partes.algo *100)/partes.Total_post)}%</p><div class="d-flex"><div class="progress " style={{ height: " 5px",width: "70%" }}><div class="progress-bar bg-primary"  style={{ width: (partes.algo *100)/partes.Total_post+"%" }} ></div></div></div></div>)}
                                                                
                                                                {this.state.articulo_count.map[0]}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default Editar;
