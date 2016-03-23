var ms = [ 1, 2, -4, 1, 1, 6, 5, 1 ]
var ss = [ 1, 2, 1, 3, 1, 1/4 ]

module.exports = function (t) {
  t *= 72/60
  var m = ms[Math.floor(t)%ms.length]
  var s = ss[Math.floor(t/4)%ss.length]
  var xm = Math.pow(2,m/12)
  var j = sin_(sin(2000)*240,t%2+1)
  var c = Math.pow((t%1<.5?(1-saw_(2,t))/2:(1+sin(4))/2),8)
  var w = tri_(tri_(100*xm + sin(s)/8,t%4)/4,t%1+2)
  var y = iv(t%16,12,14) ? 3 :
    iv(t%16,14,15) ? 6 :
    iv(t%16,2,4) ? 2 :
    iv(t%16,5,8) ? 1 :
    xm*(t%32>24?800:200)
  var v = sin_(tri_(tri(100*xm)/4
    + sin(50*xm)*(1-saw(1/2))/4, t%2+sin(y)/4)/4,t%3+sin(1/2)*2+2)
  if (t % 20 > 16) return c*j + w*0.85
  if (iv(t%64,32,64)) return c*j + v*0.5
  return c*j + w*0.85 + sin_(w/8/8/4 * sin(1/2)/4,t%4+1) * 0.3

  function tri_ (x,t) { return Math.abs(1 - t % (1/x) * x * 2) * 2 - 1 }
  function tri (x) { return tri_(x,t) }
  function saw_ (x,t) { return t%(1/x)*x*2-1 }
  function saw (x) { return saw_(x,t) }
  function sin_ (x,t) { return Math.sin(2 * Math.PI * t * x) }
  function sin (x) { return sin_(x,t) }
  function sq_ (x,t) { return t*x % 1 < 0.5 ? -1 : 1 }
  function sq (x) { return sq_(x,t) }
  function clamp (x) { return Math.max(-1,Math.min(1,x)) }
}

function iv (t, a, b) { return t>a && t<b }
