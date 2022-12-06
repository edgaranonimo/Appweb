addEventListener('install', (event) => {
    const preCache = async () => {
      const cache = await caches.open('static-v1');
      return cache.addAll([
        './',
            'index.html',
            'style.css',
            'script.js',
            './images/1.png',
            './images/2.png',
            './images/3.png',
            './images/4.png',
            './images/5.png',
            './images/6.png',
            './images/cupon.png',
            './images/Descuento.png',
            './images/servicio.png',
            './images/facebook.png',
            './images/instagram.png',
            './images/twiter.png',
            './videos/1.mp4',
            './videos/2.mp4',
            './videos/3.mp4',
      ]);
    };
    event.waitUntil(preCache());
  });

self.addEventListener('fetch', e =>{
    //cache-only
    const respuesta = caches.match( e.request )
    .then ( res => {
        if ( res ) return res;
        //no existe el archivo
        //tengo que ir a la web
        console.log('No existe', e.request.url);
        return fetch( e.request ).then ( newResp => {
            caches.open('cache-v1')
                .then( cache => {
                    cache.put( e.request, newResp);
                }

                )
            return newResp.clone;
        });
    });
    e.respondWith(respuesta);
})