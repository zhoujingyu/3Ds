;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-biaoqian" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M514.219727 513.742708m-508.819876 0a508.819876 508.819876 0 1 0 1017.639751 0 508.819876 508.819876 0 1 0-1017.639751 0Z" fill="#51E4C2" ></path>'+
      ''+
      '<path d="M514.219727 513.742708m-355.442485 0a355.442484 355.442484 0 1 0 710.884969 0 355.442484 355.442484 0 1 0-710.884969 0Z" fill="#FE3D50" ></path>'+
      ''+
      '<path d="M826.781416 462.542708l-30.491031-205.760397c-6.824547-46.175404-48.598658-78.879801-95.123876-74.459429L494.165863 202.192298a87.625143 87.625143 0 0 0-60.708571 33.219578l-303.682783 387.975155c-29.867727 38.15513-23.094062 93.292124 15.003826 123.108969l237.491677 185.890981c38.15513 29.867727 93.241242 23.151304 123.108969-15.003826l303.682783-387.975155a87.835031 87.835031 0 0 0 17.719652-66.865292zM703.443478 277.465839a27.260025 27.260025 0 1 1 33.607553-42.931678 27.260025 27.260025 0 0 1-33.607553 42.931678z" fill="#FFFFFF" ></path>'+
      ''+
      '<path d="M450.897093 890.065888l-279.55836-218.817987a12.720497 12.720497 0 0 1-2.175205-17.859578l295.128248-377.048248a12.720497 12.720497 0 0 1 17.859578-2.175205L761.703354 492.982857a12.720497 12.720497 0 0 1 2.181565 17.853218L468.750311 887.890683a12.720497 12.720497 0 0 1-17.853218 2.175205z" fill="#51E4C2" ></path>'+
      ''+
      '<path d="M451.32959 865.566211l-256.318012-200.627677a12.720497 12.720497 0 0 1-2.168845-17.853217l271.010186-346.251926a12.720497 12.720497 0 0 1 17.859578-2.168844l256.318012 200.621316a12.720497 12.720497 0 0 1 2.175205 17.859578l-271.016546 346.245565a12.720497 12.720497 0 0 1-17.859578 2.175205z" fill="#2283F6" ></path>'+
      ''+
      '<path d="M467.669068 842.325863l-254.015602-198.821366a14.183354 14.183354 0 0 1-2.423255-19.913938l-17.490683 22.337193a14.183354 14.183354 0 0 0 2.429615 19.913937l254.009242 198.821367a14.183354 14.183354 0 0 0 19.907578-2.429615l17.490683-22.337193a14.183354 14.183354 0 0 1-19.907578 2.429615z" fill="#2283F6" ></path>'+
      ''+
      '<path d="M405.586683 905.432248l-237.491677-185.890981c-38.097888-29.823205-44.871553-84.960199-15.010186-123.108969l-14.310559 15.442683c-29.855006 38.161491-23.087702 93.292124 15.010186 123.108969l237.491677 185.897342c38.161491 29.861366 93.241242 23.151304 123.108969-15.010186l14.310559-15.442684c-29.867727 38.15513-84.960199 44.865193-123.108969 15.010187z" fill="#FE3D50" ></path>'+
      ''+
      '<path d="M382.867876 737.057391l-120.456746-94.284323 51.804224-66.184745 120.456745 94.290683zM406.375354 755.45123l-13.960745-10.920547 51.804223-66.184745 13.960746 10.926907zM451.176944 790.51528l-3.688944-2.881193 51.804224-66.184745 3.688944 2.887552zM252.902559 635.325217l-3.688944-2.881192 51.804224-66.184745 3.688944 2.887552zM467.885317 803.604671l-8.249242-6.455652 51.804223-66.184746 8.249242 6.462013zM437.953988 780.167155l-23.507479-18.393838 51.804224-66.184746 23.507478 18.400199z" fill="#F8E71C" ></path>'+
      ''+
      '<path d="M813.641143 144.301317l-7.41605-5.800547a6.360248 6.360248 0 0 0-8.929789 1.081242l-75.457987 96.408646a6.360248 6.360248 0 0 0 1.087602 8.929789l7.41605 5.800547a6.360248 6.360248 0 0 0 8.929789-1.081242l75.457987-96.408646a6.360248 6.360248 0 0 0-1.087602-8.929789z" fill="#2283F6" ></path>'+
      ''+
      '<path d="M748.842932 237.364472l-9.006112 11.51205a7.282484 7.282484 0 0 1-10.259081 1.252969l-5.927751-4.642982a7.327006 7.327006 0 0 1-1.252969-10.25908l9.012472-11.51205a7.327006 7.327006 0 0 0 1.246608 10.259081l5.927752 4.642981a7.282484 7.282484 0 0 0 10.259081-1.252969z" fill="#2283F6" ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
