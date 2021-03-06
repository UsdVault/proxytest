var http = require("http"),
  httpProxy = require("http-proxy");

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function (req, res) {
  // You can define here your custom logic to handle the request
  // and then proxy the request.
  console.log("req ", req.headers.host);
  if (req.headers.host === "india.server.usdvault.com:5050") {
    proxy.web(req, res, { target: "http://127.0.0.1:5001" });
  } else {
    res.end("Not found");
  }
});

console.log("listening on port 5050");
server.listen(5050);
