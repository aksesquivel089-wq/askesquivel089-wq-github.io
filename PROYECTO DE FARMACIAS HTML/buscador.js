
(function () {
  var input = document.getElementById('buscador');
  var contador = document.getElementById('contador');
  var sinResultados = document.getElementById('sin-resultados');
  var tarjetas = Array.prototype.slice.call(document.querySelectorAll('.farmacia'));

  function normalizar(texto) {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }
 var datos = tarjetas.map(function (tarjeta) {
    var nombre = tarjeta.querySelector('h2').textContent;
  
    var parrafos = Array.prototype.slice
      .call(tarjeta.querySelectorAll('p'), 0, 2)
      .map(function (p) { return p.textContent; })
      .join(' ');
    return normalizar(nombre + ' ' + parrafos);
  });
function buscar() {
    var consulta = normalizar(input.value.trim());
    var palabras = consulta.split(/\s+/).filter(Boolean);
    var visibles = 0;

    tarjetas.forEach(function (tarjeta, i) {
  
      var coincide = palabras.every(function (palabra) {
        return datos[i].indexOf(palabra) !== -1;
      });
      tarjeta.hidden = !coincide;
      if (coincide) visibles++;
    });

    sinResultados.hidden = visibles !== 0;
    contador.textContent = palabras.length
      ? visibles + ' de ' + tarjetas.length + ' farmacias'
      : tarjetas.length + ' farmacias';
  }

  input.addEventListener('input', buscar);
  buscar();

  Array.prototype.slice.call(document.querySelectorAll('.farmacia-imagen img')).forEach(function (img) {
    function ocultar() { img.parentNode.hidden = true; }
    img.addEventListener('error', ocultar);
    if (img.complete && img.naturalWidth === 0) ocultar();
  });
})();