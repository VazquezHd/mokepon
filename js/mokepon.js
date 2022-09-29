const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota') 
const botonReiniciar=document.getElementById('boton-reiniciar')
sectionReiniciar.style.display = 'none'
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



let mokepones = [] //corchetes cuadrados es un arreglo
let ataqueJugador = [] 
let ataqueEnemigo = [] 
let opcionDeMokepones
let inputHipodoge
let inputmascotaJugadorObjeto
let inputRatigueya
let mascotaJugador
let mascotaJugadorObjeto
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
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/mokemap.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth -20
const anchoMaximoDelMapa = 350

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}


alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

//esto es una clase y dentro esta un objeto con diferentes priopiedades
class Mokepon {
    constructor(nombre, foto, vida, fotoMapa){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image ()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
     }
     pintarMokepon(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto,
        )
     }
}
//objetos de esa clase
let hipodoge = new Mokepon ('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png' )
let capipepo = new Mokepon ('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png' , 5, './assets/capipepo.png')
let ratigueya = new Mokepon ('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')

let hipodogeEnemigo = new Mokepon ('Hipodoge', './assets/mokepons_mokepon_hipodoge_attack.png', 5, './assets/hipodoge.png')
let capipepoEnemigo = new Mokepon ('Capipepo', './assets/mokepons_mokepon_capipepo_attack.png' , 5, './assets/capipepo.png')
let ratigueyaEnemigo = new Mokepon ('Ratigueya', './assets/mokepons_mokepon_ratigueya_attack.png', 5, './assets/ratigueya.png')

hipodoge.ataques.push(
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '💧', id: 'boton-agua'},
    {nombre: '🔥', id: 'boton-fuego'},
    {nombre: '🌱', id: 'boton-tierra'},
)

hipodogeEnemigo.ataques.push(
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

capipepoEnemigo.ataques.push(
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

ratigueyaEnemigo.ataques.push(
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

    //esto es canvas
    sectionVerMapa.style.display = 'flex'
    iniciarMapa()

     
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

function seleccionarMascotaEnemigo(enemigo) {   
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()

    
    //declaramos la funcion, le damos la propiedad de aletoreidad
    // let mascotaAleatoria = aleatorio(0,mokepones.length -1)

    /* spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatoria].nombre
    ataquesMokeponEnemigo = mokepones[mascotaAleatoria].ataques
    secuenciaAtaque() */

}
       
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

function reiniciarJuego(){
    location.reload()
}



// esta es la formula para la aleatoriedad
function aleatorio(min,max){
    return Math.floor(Math.random()*(max - min + 1)+ min)
}
// ctrl d para seleccionar varias lineas de codigo con el mismo texto
function pintarCanvas() { //le das velocidad al objeto en el mapa

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height,
    )
    mascotaJugadorObjeto.pintarMokepon() 
    hipodogeEnemigo.pintarMokepon() 
    capipepoEnemigo.pintarMokepon() 
    ratigueyaEnemigo.pintarMokepon() 
        if
        (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !==0)
        {
            revisarColision(hipodogeEnemigo)
            revisarColision(capipepoEnemigo)
            revisarColision(ratigueyaEnemigo)
        }

}
function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5
}
function moverAbajo() {
    mascotaJugadorObjeto.velocidadY = 5
}

function moverArriba() {
    mascotaJugadorObjeto.velocidadY = -5
}
function detenerMovimiento(){
    
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function sePresionoUnaTecla(event){
    //un switch es una maner de hacer varios condicionales if juntos
   switch (event.key) {
    case 'ArrowUp':
        moverArriba()
        break;
    case 'ArrowDown':
        moverAbajo()
        break;
    case  'ArrowLeft':
        moverIzquierda()
        break;
    case  'ArrowRight':
        moverDerecha()
        break;

    default:
        break;
   }
}

function iniciarMapa(){
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)


    window.addEventListener('keydown', sePresionoUnaTecla)
    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota(){
    for (let i = 0; i < mokepones.length; i++) {

        if (mascotaJugador === mokepones[i].nombre) {
            return mokepones[i]
        } 
    }
}

//no entendi lo de los cuadros
function revisarColision(enemigo){
    
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x


    const arribaMascota =
     mascotaJugadorObjeto.y
    const abajoMascota =
     mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = 
    mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota =
     mascotaJugadorObjeto.x


    if(
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ){
        return
    }

    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)
    
}

//desde aqui le pedimos que escuche cuando cargue la pagina para que inicie el juego
window.addEventListener('load', iniciarJuego)
   
