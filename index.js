const fs = require('fs');

class Contenedor {
  constructor (nombre) {
    this.nombre = nombre;    
  }

  //funcion para leer el archivo
  async read () {
    try {      
      const data = await fs.promises.readFile(`./${this.nombre}.txt`, `utf-8`)
      const dataObj = JSON.parse(data)       
      return (dataObj)
    }
    catch (err) {      
      throw new Error('No se pudo leer archivo', err)
    }
  }

  //funcion para detectar el ID mas grande
  lastID = (arr) => {  
    let id = 0;
    if (arr.length > 0) {
      for (const el of arr ) {
        if (el.id > id) {
          id = el.id
        }
      }
    }
    return id
  } 

  //funcion para guardar un objeto en el archivo
  async save(object) {
      
    try {             
      const dataObj = await this.read()
      const previusID = await this.lastID(dataObj)
      const newObject = {...object, id:(previusID + 1 )}
      console.log(newObject)  

      //agregar objeto al array  (PORQUEEEEEEE NO PUEDO USAR PUSSSSHHHHHH????????)
      let newArr =  dataObj.concat(newObject) 

      //reescribo el archivo con el nuevo objeto
      await fs.promises.writeFile(`./${this.nombre}.txt`, JSON.stringify(newArr, null, 2))
      console.log('EXITO')
      return(previusID + 1)
    }
    catch (err) {      
      throw new Error('Error de escritura', err)
    }    
  }    

  //funcion para obtener objeto segun ID
  async getById(x) {
    
    try {             
      const dataObj = await this.read()      
      const newObject = dataObj.filter(el => el.id === x)
      return newObject[0]
    }
    catch (err) {      
      throw new Error('Error de Lectura', err)
    } 

  }

  //funcion que devuelve todos los objetos
  async getAll() {
    try {             
      const dataObj = await this.read()  
      return dataObj
    }
    catch (err) {      
      throw new Error('Error de Lectura', err)
    }
  }

  //funcion que elimina segun id
  async deleteById(x) {      
    try {                   
      const dataObj = await this.read()
      const newArr = dataObj.filter(el => el.id !== x)       
      //reescribo el archivo con el nuevo objeto
      await fs.promises.writeFile(`./${this.nombre}.txt`, JSON.stringify(newArr, null, 2))
    }
    catch (err) {    
      throw new Error('Error de escritura', err)
    }    
  } 

  //funcion que elimina todos los objetos
  async deleteAll() {      
    try { 
      const newArr = [] 
      //reescribo el archivo vacio
      await fs.promises.writeFile(`./${this.nombre}.txt`, JSON.stringify(newArr, null, 2))
    }
    catch (err) {      
      throw new Error('Error de escritura', err)
    }    
  } 
  
} 

//Objetos para agregar
const Remera = {  
  title: "remera",
  price: 2500,
  thumbnail: "url"   
}

const Pantalon = {  
  title: "pantalon",
  price: 4500,
  thumbnail: "url"   
}

const Campera = {  
  title: "campera",
  price: 16000,
  thumbnail: "url"   
}

const productos = new Contenedor("productos");

//productos.read()
//productos.save(Pantalon)
//productos.getById(2).then(data => console.log(data))
//productos.getAll().then(data => console.log(data))
//productos.deleteById(2)
//productos.deleteAll()
//productos.save(Pantalon)


