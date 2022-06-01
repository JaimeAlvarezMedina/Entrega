import './App.css';
import React from 'react';
import Imagen_foto from './Imagenes/Paisaje.png';
import Imagen_texto from './Imagenes/Boton_texto.png';

var correcto='true';

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
if (texto == undefined) {
  var texto = [];
}
class Foro extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articulo: [], categoria: [], imagen_prueba: '', datos_usuario: [], tipo: "",contador: 0,nombre_imagen: "", error: "" };
    this.texto = this.opcion_texto.bind(this);
    this.imagen = this.opcion_imagen.bind(this);
    this.subir_post = this.crear_post.bind(this);
    this.subir_datos = this.subir_base_datos.bind(this);
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
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
    document.getElementById("btn").style.height = "50px";
    document.getElementById("btn_dentro").style.display = "block";
    setTimeout(function () {

        document.getElementById("btn_dentro").style.opacity = 1;
    }, 300);
}
  subir_base_datos() {
    if(correcto=='true'){
    	var datos = new FormData();
    	datos.append('creador', localStorage.getItem("usuario"));
    	datos.append('cuerpo', texto.join('//-//'));
    	datos.append('titulo', document.getElementById("titulo").value);
    	datos.append('categoria', document.getElementById("categoria").value);
    	fetch("http://159.223.172.191/subir_post.php", {
      		method: "POST",
      		body: datos
    	})
      	.then(res => res.json())
      	.then(
        	(result) => {
          	if (result == "Correcto") {
             		window.location.href = "/foro";
          	}

        	},
        	(error) => {
	          console.log(error);
        	}
      )}
      else{
	var elemento=document.getElementById("errores");
      	elemento.setAttribute("role","alert");
      	elemento.setAttribute("class","alert alert-danger");
      	elemento.appendChild(document.createTextNode("No se permite subir archivos .gif"));
      }
  }

  crear_post(contador) {

    if ((document.getElementById("img-" + 0) != null || document.getElementById("txt-" + 0) != null) || document.getElementById("titulo").value == "" || document.getElementById("categoria").value == "") {
      if (document.getElementById("img-" + contador) != null) {

        var datos = new FormData();
        datos.append('usuario', localStorage.getItem("usuario"));
        datos.append('subir_archivo', document.getElementById("img-" + contador).files[0]);
        fetch("http://159.223.172.191/upload.php", {
          method: "POST",
          body: datos
        })
          .then(res => res.json())
          .then(
            (result) => {
              if(result=='No disponible'){
		correcto='false';
		texto[contador] = result;
	      }
	      else{
		texto[contador] = result;
	      }
              
            },
            (error) => {
              console.log(error);
            }
          )

      }
      if (document.getElementById("txt-" + contador) != null) {
        console.log("txt" + contador);
        texto[contador] = document.getElementById("txt-" + contador).value;
        console.log(texto);
      }



      if (document.getElementById("img-" + (contador + 1)) != null || document.getElementById("txt-" + (contador + 1)) != null) {//Si no existe ninguno de estos elementos en el documentop no sigue
        this.subir_post(contador + 1);
      }
      else {
        setTimeout(this.subir_datos, 2000);
      }
    }
    else {
      var elemento = document.getElementById("alerta");
      elemento.setAttribute("role", "alert");
      elemento.setAttribute("class", "alert alert-danger");
      this.setState({ error: "Necesita introducir titulo,contenido y categoría en el post para subirlo" });
    }

  }

  opcion_imagen() {
    this.setState({ contador: this.state.contador + 1 });
    var elemento_nuevo = document.getElementById("todo_post");
    var elemento1 = document.createElement("input");
    elemento1.setAttribute("type", "hidden");
    elemento1.setAttribute("name", "MAX_FILE_SIZE");
    elemento1.setAttribute("value", "40000000");
    elemento_nuevo.appendChild(elemento1);
    var elemento2 = document.createElement("p");
    elemento2.appendChild(document.createTextNode("Subir archivo:"));
    var elemento2_1 = document.createElement("input");
    elemento2_1.setAttribute("id", "img-" + this.state.contador);
    elemento2_1.setAttribute("name", "subir_archivo");
    elemento2_1.setAttribute("type", "file");
    elemento2.appendChild(elemento2_1);

    elemento_nuevo.appendChild(elemento2);
 

  }

  opcion_texto() {
    this.setState({ contador: this.state.contador + 1 });
    var elemento_nuevo = document.getElementById("todo_post");
    var escribir = document.createElement("textarea");
    escribir.setAttribute("id", "txt-" + this.state.contador);
    escribir.setAttribute("class", "textarea form-control");
    escribir.setAttribute("rows", "4");
    elemento_nuevo.appendChild(escribir);
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
          <div className='dashboard-app'>
            <header className='dashboard-toolbar'><a href="#!" className="menu-toggle"><i className="fas fa-bars"></i></a></header>
            <div className='dashboard-content'>
              <div className='container' id='container'>
                <div className='card '>
                  <div className='card-header '>
                    <h1>Crear nuevo Post</h1>
                  </div>
                  <div className='card-body'>
                    <form>
                      <div class="form-group">
                        <label for="username">Título</label>
                        <input type="text" class="form-control" id="titulo" aria-describedby="Username" placeholder="Título" />
                        <small id="Username" class="form-text text-muted">Introduce el nombre del titulo del post</small>
                      </div>
                      <br></br>
                      <div class="form-group">
                        <label for="username">Categoria</label>
                        <input type="text" class="form-control" id="categoria" aria-describedby="Username" placeholder="Categoría" />
                        <small id="Username" class="form-text text-muted">Especifique la categoria de su Post</small>
                      </div>
                      <br></br>
                      <label for="textarea">Post</label>
                      <div class=" post form-group" id='todo_post'>
                        <main>
                        </main>
                      </div>
                      <br></br>
                    </form>
                    <div id='marco_anadir'>
                    </div>
                    <img onClick={this.texto} alt="Insertar texto" id="foto_texto" src={Imagen_texto}></img>
                    <img onClick={this.imagen} id="foto_paisaje" src={Imagen_foto}></img>
                    <footer>
                      <div id='alerta'>{this.state.error}</div>
                    </footer>
                    <button onClick={this.subir_post.bind(this, 0)} className="btn btn-success">Crear post</button>
                    <div id="errores"></div>
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
