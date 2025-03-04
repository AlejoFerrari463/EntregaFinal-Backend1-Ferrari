const path = window.location.pathname;

const segments = path.split('/');
console.log(segments)

const id = segments[segments.length - 1];

console.log("El ID del carrito es:", id);
