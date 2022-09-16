const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota') 
const botonReiniciar = document.getElementById ('boton-reiniciar')
sectionSeleccionarAtaque.style.display = 'none'


const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques = document.getElementById('contenedorAtaques') 

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

//DFGFDGFDGDFGDFGD

let mokepones = [] //corchetes cuadrados es un arreglo
let ataqueJugador = [] 
let ataqueEnemigo = [] 
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let ataquesMokepon
let ataquesMokeponEnemigo
let botonFuego
let botonAgua
let botonTierra
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3  
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")

//esto es una clase y dentro esta un objeto con diferentes priopiedades
class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image ()
        this.mapaFoto.src = foto 
    }
}
//objetos de esa clase
let hipodoge = new Mokepon ('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5)
let capipepo = new Mokepon ('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png' , 5)
let ratigueya = new Mokepon ('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5)

hipodoge.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
)

capipepo.ataques.push(
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},   
)

ratigueya.ataques.push(
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
    {nombre: '💧', id: 'boton-agua'},
)
mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego(){ 
    
    sectionReiniciar
    .style.display = 'none'
    sectionVerMapa.style.display = 'none'

    mokepones.forEach((mokepon)=>{
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
            <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
                <p>${mokepon.nombre}</p> 
                <img src=${mokepon.foto} alt=${mokepon.nombre}>
            </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')

    })


    botonMascotaJugador.addEventListener('click',seleccionarMascotaJugador) 
   
   
}
function seleccionarMascotaJugador(){   
    sectionSeleccionarMascota.style.display = 'none'
    //sectionSeleccionarAtaque.style.display = 'flex'

    //esto es canvas
    sectionVerMapa.style.display = 'flex'




        //else if son condicionales, como tenemos varias secciones, colocamos "si no es esta opcion es eCapipeposta otra" y de ese modo podemos ir de una a otra seleccion
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML= inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked){
        spanMascotaJugador.innerHTML= inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    }else if (inputRatigueya.checked){
        spanMascotaJugador.innerHTML= inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    }else {
        alert('Debes de seleccionar un Mokepon 🦊')
    }

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()  //debemos de llamar a esta funcion ya que la vamos a declarar mas abajo
}

function extraerAtaques(mascotaJugador){
    let ataques     
    for (let i = 0; i < mokepones.length; i++) {       //esto es un loop
        if (mascotaJugador === mokepones[i].nombre) {
            ataques = mokepones[i].ataques
        } 
    }
    mostrarAtaques(ataques)
}

function mostrarAtaques(ataques){
    ataques.forEach((ataque) =>{
        ataquesMokepon = `
        <button id= ${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesMokepon
    })
    botonFuego= document.getElementById('boton-fuego')
    botonAgua = document.getElementById('boton-agua')
    botonTierra = document.getElementById('boton-tierra')
    botones = document.querySelectorAll('.BAtaque')

    
    // botonFuego.addEventListener('click', ataqueFuego)
    // botonAgua.addEventListener('click', ataqueAgua) 
    // botonTierra.addEventListener('click', ataqueTierra)
}

function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) =>{ //la e no recuerdo que significa
            if (e.target.textContent === '🔥') {
                ataqueJugador.push('Fuego 🔥')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if (e.target.textContent === '💧'){
                ataqueJugador.push('Agua 💧')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }else {
                ataqueJugador.push('Tierra 🌱')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo() {       //declaramos la funcion, le damos la propiedad de aletoreidad

     let mascotaAleatoria = aleatorio(0,mokepones.length -1)

    spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque()

    // if (mascotaAleatoria==1){
    //     spanMascotaEnemigo.innerHTML = 'Hipodoge'
    // }
    // else if (mascotaAleatoria==2) {
    //    spanMascotaEnemigo.innerHTML='Capipepo'
    // } else{
    //     spanMascotaEnemigo.innerHTML='Ratigueya'
    // }
}
       


//creamos las funciones para el ataque del enemigo, ya que como es aleatoreidad le damos su propiedad para que sea un ataque aleatorio


// function ataqueFuego() {
//     ataqueJugador = 'Fuego 🔥'
//     ataqueAleatorioEnemigo()
// }
// function ataqueAgua() {
//     ataqueJugador = 'Agua 💧'
//     ataqueAleatorioEnemigo()
// }
// function ataqueTierra () {
//     ataqueJugador = 'Tierra 🌱'
//     ataqueAleatorioEnemigo() 
// }
function ataqueAleatorioEnemigo() {
    //esta funcion no se quita porque nos esta indicando aleatoriedad

    let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length -1)

    if (ataqueAleatorio == 0 || ataqueAleatorio ==1){
        ataqueEnemigo.push('Fuego 🔥')
    }
    else if (ataqueAleatorio ==  3|| ataqueAleatorio ==4){
        ataqueEnemigo.push('Agua 💧')
    }
    else {
        ataqueEnemigo.push('Tierra 🌱')
    } 
    console.log(ataqueEnemigo)
   iniciarPelea ()
}

    function iniciarPelea () {
        if (ataqueJugador.length === 5) {
            combate()
        }
    }
    
    function indexAmbosOponentes (jugador, enemigo) {
        //no entendí este pedo
        indexAtaqueJugador = ataqueJugador [jugador]
        indexAtaqueEnemigo = ataqueEnemigo [enemigo]
    }


   function combate() { //mi duda es que es el index
    for (let index = 0; index < ataqueJugador.length; index++) {
        if (ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes (index, index)
            crearMensaje("EMPATE")
            vidasEnemigo--
            spanVidasEnemigo.innerHTML = vidasEnemigo
        
    } else if (ataqueJugador[index]=='Fuego 🔥' && ataqueEnemigo[index] == 'Tierra 🌱') {
        indexAmbosOponentes (index, index)
        crearMensaje("GANASTE 🎊")
    }
    else if (ataqueJugador[index]=='Agua 💧' && ataqueEnemigo[index] == 'Fuego 🔥') {
        indexAmbosOponentes (index, index)
        crearMensaje("GANASTE 🎊")
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
    }
    else if (ataqueJugador[index]=='Tierra 🌱' && ataqueEnemigo[index] == 'Fuego 🔥') {
        indexAmbosOponentes (index, index)
        crearMensaje("GANASTE 🎊")
        victoriasJugador++
        spanVidasJugador.innerHTML = victoriasJugador
    }
    else  {
        indexAmbosOponentes (index, index)
        crearMensaje("PERDISTE 😥")
        victoriasEnemigo++
        spanVidasEnemigo.innerHTML = victoriasEnemigo
    }
}     //Revisar las vidas
    revisarVidas()
}

function revisarVidas(){
    if (victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("EMPATE!!! 🙌 ")
        //alert("FELICITACIONES!!!! GANASTE 🎊🎊🎊🎊")
    } else if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("FELICITACIONES!!!! GANASTE 🎊🎊🎊🎊")
        //alert("LO SIENTO, PERDISTE 😥😥😥😥")
    }else{
        crearMensajeFinal("LO SIENTO, PERDISTE 😥😥😥😥")
    }

}


function crearMensaje(resultado){
    //estas no se quitan porque sonexclusivas para hacer parrafos
    let nuevoAtaqueDelJugador= document.createElement('p')
    let nuevoAtaqueDelEnemigo= document.createElement('p')

    sectionMensajes.innerHTML = resultado

    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    //encadenas al elelmento hijo que es este
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
}

function crearMensajeFinal(resultadoFinal){
     //concatenas
    sectionMensajes.innerHTML = resultadoFinal
   
    //de esta forma desabilitas los botones
    // botonFuego.disabled = true
    // botonAgua.disabled = true
    // botonTierra.disabled = true
     //de esta forma apareces las secciones
     sectionReiniciar.style.display = 'block'
}

function reiniciarJuego (){
    location.reload ()
}



// esta es la formula para la aleatoriedad
function aleatorio(min,max){
    return Math.floor(Math.random()*(max - min + 1)+ min)
}

function pintarPersonaje() {
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        capipepo.mapaFoto,
        capipepo.x,
        capipepo.y,
        capipepo.ancho,
        capipepo.alto,
    )
}

function moverCapipepo() {
    capipepo.x = capipepo.x + 5
    pintarPersonaje()
}
//desde aqui le pedimos que escuche cuando cargue la pagina para que inicie el juego
window.addEventListener('load', iniciarJuego)
   
