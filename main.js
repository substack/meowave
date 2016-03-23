var html = require('yo-yo')
var root = document.querySelector('#content')
var state = { time: 0 }

var webaudio = require('webaudio')
var song = require('./song.js')
var b = webaudio(function (t) {
  state.time = t
  return song(t)
})
b.play()

window.requestAnimationFrame(frame)
function frame () {
  html.update(root, render(state))
  process.nextTick(function () {
    window.requestAnimationFrame(frame)
  })
}

var dirs = [ 'center', 'left', 'center', 'right' ]

function render (state) {
  var beat = Math.floor(state.time * 72/60) % 2
  var gdir = dirs[Math.floor(state.time * 72/60) % 4]
  var mdir = dirs[Math.floor(state.time * 72/60 + 2) % 4]
  var palms = []
  for (var x = 0, i = 0; x < window.innerWidth - 50; x += 50, i++) {
    var height = 180 + (i % 4) * 10
    var style = 'left: ' + x  + 'px;'
       + 'height: ' + height + 'px;'
       + 'top: ' + (160 + 220 - height) + 'px'

    if (i % 2 === 0) {
      palms.push(html`<img style=${style} class="palm"
        src="images/green_palm_${gdir}.png">`)
    } else {
      palms.push(html`<img style=${style} class="palm"
        src="images/magenta_palm_${mdir}.png">`)
    }
  }
  var moonstyle = `left: ${400+Math.sin(-state.time/3) * 400};
    top: ${300+Math.cos(-state.time/3) * 400};`
  var starstyle = `transform: translate(-800px,-400px)
    rotate(${state.time*8*4}deg);`

  return html`<div>
    <img id="stars" src="images/nebula.jpg" style="${starstyle}">
    <img id="pyramid" src="images/pyramid${beat}.png">
    ${palms}
    <img id="moon" src="images/moon.png" style="${moonstyle}">
    <div id="sand"></div>
  </div>`
}
