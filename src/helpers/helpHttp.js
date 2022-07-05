//No se hace un export DEFAULT porque quiero siempre llamar con el mismo nombre a la fn: helpHttp. Si se agrega DEFAULT luego si podría cambiar el nombre, pero para éste helper no.

export const helpHttp = () => {
  const customFetch = (endpoint, options) => {
    //Se define la siguiente const para no estar especificando cada vez que la data va a llegar en formato JSON:
    const defaultHeader = {
      accept: "application/json",
    };

    //Para que cuando la petición al servidor falle, ésta no se quede en loop infinito esperando. Para ésto se puede setear un "new AbortController()":
    const controller = new AbortController();
    options.signal = controller.signal;

    //Si el programador no te especifico un método, por default va a ser el método "GET":
    options.method = options.method || "GET";

    //Si el programador no especifica otras opciones de header, se usarán las defaultHeader. Sino, si especifica otras opciones se podrán usar las defaultHeader + las options.header:
    options.header = options.header
      ? { ...defaultHeader, ...options.header }
      : defaultHeader;

    //Método para que la data que nos llegue se pase a cadena de texto plano y se vaya al backend
    //Luego digo: "si el body no existe igualar a falso para en la siguiente linea con el IF, deletearlo"
    options.body = JSON.stringify(options.body) || false;
    if (!options.body) {
      delete options.body;
    }
    //console.log(options);

    //Declarando la fn setTimeOut() para que no se quede colgada la petición en loop infinito:
    setTimeout(() => {
      controller.abort();
    }, 3000);

    //Programando ahora si la función FETCH():
    return fetch(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrió un Error",
            })
      )
      .catch((err) => err);
  };
  //Verbos de una petición con arquitectura REST:

  //GET: traer datos
  const get = (url, options = {}) => customFetch(url, options);

  //POST: enviar datos (para CREAR nuevos datos)
  const post = (url, options = {}) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  //PUT: actualizar datos
  const put = (url, options = {}) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  //DELETE: borrar datos
  const del = (url, options = {}) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
