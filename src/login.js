import React from 'react';
import './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "",contra:"", usuario: "", contrarepe: "", direccion: "", error: "", aux: "", isToggleOn: true ,error:""}

    this.contrasena = this.c.bind(this);
    this.contrasenarepe = this.c_repe.bind(this);
    this.dir = this.d.bind(this);
    this.user = this.u.bind(this);
    this.iniciar = this.iniciar_sesion.bind(this);
    this.registra = this.registrar.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  iniciar_sesion() {//Comprueba que el usuario este en la base de datos y coincida con la contraseña


    var datos = new FormData();
    datos.append('usuario', this.state.usuario);
    datos.append('contra', this.state.contra);
    fetch("http://159.223.172.191/iniciar_sesion.php", {
      method: "POST",
      body: datos
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (result == "Correcto") {
            localStorage.setItem("usuario", this.state.usuario);

            window.location.href = "/foro";
          }
          
          else {
            this.setState({ contra: "" });
            this.setState({ error: "El usuario o contraseña no son correctos" });
          }
        },
        (error) => {
          console.log(error);
        }
      )
  }

  registrar() {//Añade un usuario en la base de datos
    var datos = new FormData();
    datos.append('usuario', this.state.usuario);
    datos.append('contra', this.state.contra);
    datos.append('direccion', this.state.direccion);
    datos.append('contrarepe', this.state.contrarepe);

    fetch("http://159.223.172.191/anadir_usuario.php", {
      method: "POST",
      body: datos
    })
      .then(res => res.json())
      .then(
        (result) => {
        this.setState({ contra: "" });
        this.setState({ contrarepe: "" });
          if (result == "No disponible") {
            this.setState({ error: "El usuario no esta disponible" });
          }
          if (result == "contrasena mal") {
            this.setState({ error: "Las contraseñas no coinciden" });
          }
          else{
            this.setState({ isToggleOn: false });
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
  c(event) {//Para modificar la contraseña contra
    this.setState({ contra: event.target.value });
    console.log(this.state.contra);
  }
  d(event) {//Para modificar la contraseña contra
    this.setState({ direccion: event.target.value });
    console.log(this.state.contra_inicio);
  }
  c_repe(event) {//Para modificar la contraseña contra
    this.setState({ contrarepe: event.target.value });
    console.log(this.state.contra_inicio);
  }


  render() {
    return (

      <div className="App" >

        {this.state.isToggleOn

          ? <section class="vh-100" style={{ backgroundColor: "#eee" }}>
            <div class=" h-100">
              <div class="row d-flex justify-content-center align-items-center h-100 w-100">
                <div class="col-lg-12 col-xl-11">
                  <div class="card text-black mx-auto" style={{ borderRadius: " 25px", width: "80%" }}>
                    <div class="card-body p-md-5">
                      <div class="row justify-content-center">
                        <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                          <div class="panel-heading">
                            <div class="row">
                              <div class="col-xs-6">
                                <button onClick={this.handleClick} id="login-form-link">Iniciar sesión</button>
                              </div>
                              <div class="col-xs-6">
                                <button class="active" id="register-form-link">Registrarse</button>
                              </div>
                            </div>
                            <hr />
                          </div>

                          <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Inscribirse</p>

                          <form class="mx-1 mx-md-4">

                            <div class="d-flex flex-row align-items-center mb-4">
                              <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div class="form-outline flex-fill mb-0">
                                <input type="text" id="form3Example1c" value={this.state.usuario} onChange={this.user} class="form-control" placeholder='Nickname' />

                              </div>
                            </div>

                            <div class="d-flex flex-row align-items-center mb-4">
                              <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                              <div class="form-outline flex-fill mb-0">
                                <input type="email" id="form3Example3c" value={this.state.direccion} onChange={this.dir} class="form-control" placeholder='Dirección' />

                              </div>
                            </div>

                            <div class="d-flex flex-row align-items-center mb-4">
                              <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div class="form-outline flex-fill mb-0">
                                <input type="password" id="form3Example4c" value={this.state.contra} onChange={this.contrasena} class="form-control" placeholder='Contraseña' />

                              </div>
                            </div>

                            <div class="d-flex flex-row align-items-center mb-4">
                              <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                              <div class="form-outline flex-fill mb-0">
                                <input type="password" id="form3Example4cd" value={this.state.contrarepe} onChange={this.contrasenarepe} class="form-control" placeholder='Repite tu contraseña' />

                              </div>
                            </div>

                            
                            <p className="text-danger" > {this.state.error} </p>
                            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button type="button" onClick={this.registra} class="btn btn-primary btn-lg">Registrarse</button>
                            </div>

                          </form>

                        </div>
                        <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                            class="img-fluid" alt="Sample image" />

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          : <section class="vh-100" style={{ backgroundColor: "#eee" }}>
            <div class=" h-100">
              <div class="row d-flex justify-content-center align-items-center h-100 w-100">
                <div class="col-lg-12 col-xl-11">
                  <div class="card text-black mx-auto" id="card" style={{ borderRadius: " 25px", width: "80%" }}>
                    <div class="card-body p-md-5">
                      <div class="row justify-content-center">
                        <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                        <div class="panel-heading">
                            <div class="row">
                              <div class="col-xs-6">
                                <button class="active"  id="login-form-link">Iniciar sesión</button>
                              </div>
                              <div class="col-xs-6">
                                <button onClick={this.handleClick} id="register-form-link">Registrarse</button>
                              </div>
                            </div>
                            <hr />
                          </div>
                          <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Entra con tu cuenta!</p>

                          <form class="mx-1 mx-md-4">

                            <div class="d-flex flex-row align-items-center mb-4">
                              <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                              <div class="form-outline flex-fill mb-0">
                                <input type="text" id="form3Example1c" value={this.state.usuario} onChange={this.user} class="form-control" placeholder='Nickname' />

                              </div>
                            </div>
                            <div class="d-flex flex-row align-items-center mb-4">
                              <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                              <div class="form-outline flex-fill mb-0">
                                <input type="password" id="form3Example4c" value={this.state.contra} name="contra" onChange={this.contrasena} class="form-control" placeholder='Contraseña' />
                              </div>
                            </div>
                            <p className="text-danger" > {this.state.error} </p>
                            <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                              <button type="button" onClick={this.iniciar} class="btn btn-primary btn-lg">Iniciar sesion</button>
                            </div>

                          </form>

                        </div>
                        <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                            class="img-fluid" alt="Sample image" />

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        }
      </div>

    );
  }
}

export default Login;
