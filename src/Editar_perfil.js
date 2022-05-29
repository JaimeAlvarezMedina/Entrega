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

class Foro extends React.Component {

    constructor(props) {
        super(props);
        this.state = { articulo: [], categoria: [], imagen_prueba: '', datos_usuario: [],articulo_count:[], tipo: "" };
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
        this.mi_perfil = this.mi_perfil_dentro.bind(this);

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
    
    recoger_categorias_distintas() {
        var datos = new FormData();
        datos.append('nombre_categoria', localStorage.getItem("Creador"));
        fetch("http://159.223.172.191/categorias_distintas.php", {
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
        fetch("http://159.223.172.191/count_categorias.php", {
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
                                                                <h4>ruben</h4>
                                                                <p class="text-secondary mb-1">Bonito blog</p>
                                                                <p class="text-muted font-size-sm">Demi Casa</p>
                                                                
                                                            </div>
                                                        </div>
                                                        <hr class="my-4" />
                                                        <ul class="list-group list-group-flush">
                                                            
                                                            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                                <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-github me-2 icon-inline"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>Github</h6>
                                                                <span class="text-secondary">rrf0002</span>
                                                            </li>
                                                            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                                <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-twitter me-2 icon-inline text-info"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>Twitter</h6>
                                                                <span class="text-secondary">miprimacoja</span>
                                                            </li>
                                                            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                                <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-instagram me-2 icon-inline text-danger"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>Instagram</h6>
                                                                <span class="text-secondary">miprimacoja</span>
                                                            </li>
                                                            <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                                <h6 class="mb-0"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-facebook me-2 icon-inline text-primary"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>Facebook</h6>
                                                                <span class="text-secondary">miprimacoja</span>
                                                            </li>
                                                        </ul>
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
                                                                <input type="text" class="form-control" placeholder={localStorage.getItem("Creador")} />
                                                            </div>
                                                        </div>
                                                        <div class="row mb-3">
                                                            <div class="col-sm-3">
                                                                <h6 class="mb-0">Email</h6>
                                                            </div>
                                                            <div class="col-sm-9 text-secondary">
                                                                <input type="text" class="form-control" value="ruben@ejemplo.com" />
                                                            </div>
                                                        </div>
                                                        
                                                        <div class="row mb-3">
                                                            <div class="col-sm-3">
                                                                <h6 class="mb-0">Movil</h6>
                                                            </div>
                                                            <div class="col-sm-9 text-secondary">
                                                                <input type="text" class="form-control" value="456342234" />
                                                            </div>
                                                        </div>
                                                        <div class="row mb-3">
                                                            <div class="col-sm-3">
                                                                <h6 class="mb-0">Dirección</h6>
                                                            </div>
                                                            <div class="col-sm-9 text-secondary">
                                                                <input type="text" class="form-control" value="Demi Casa" />
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-sm-3"></div>
                                                            <div class="col-sm-9 text-secondary">
                                                                <input type="button" class="btn btn-primary px-4" value="Guardar" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-sm-12">
                                                        <div class="card">
                                                            <div class="card-body">
                                                                <h5 class="d-flex align-items-center mb-3">Categorias</h5>
                                                                {this.state.articulo.map((partes) =><div className='mb-3' id={partes.Categoria} key={partes.ID_articulo}><p>{partes.Categoria} {Math.round((partes.algo *100)/partes.Total_post)}%</p><div class="d-flex"><div class="progress " style={{ height: " 5px",width: "70%" }}><div class="progress-bar bg-primary"  style={{ width: (partes.algo *100)/6+"%" }} ></div></div></div></div>)}
                                                                
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

export default Foro;