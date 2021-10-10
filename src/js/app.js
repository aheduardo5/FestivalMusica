document.addEventListener('DOMContentLoaded', function(){
    
    navegacionFija();
});

function navegacionFija(){
    const barra = document.querySelector('.header')
    
    // Registrar intersection Observer
    const observer = new IntersectionObserver( function(entries) {
       if(entries[0].isIntersecting) {
           barra.classList.remove('fijo');
       }else {
           barra.classList.add('fijo');
       }
    });

    // Elemento a observar
    observer.observe(document.querySelector('.sobre-festival'))
}