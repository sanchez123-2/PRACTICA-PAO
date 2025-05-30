import server from "./server";

server.listen(3000, () => {
  console.log('Debugger attached.');
  console.log('REST API en el puerto: 3000');
  console.log('http://localhost:3000');
});