import jwt from "jsonwebtoken";

const generarJWT = (id) => {
  return new Promise((resolve, reject) => {
    const payload = { uid: id };
      jwt.sign(payload, process.env.SECRETPRIVATEKEY, {
          expiresIn: '4h'
      }, (err, token) => {
          if (error) {
              reject('No se pudo generar el token')
          } else {
              resolve(token)
          }
    })
  })
}

export {generarJWT}