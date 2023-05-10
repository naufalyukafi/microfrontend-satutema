const HOST = process.env.NODE_ENV === "development" 
? 'http://localhost:8000/api/v1'
: ''

export {
  HOST
}
