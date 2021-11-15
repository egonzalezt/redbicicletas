var map = L.map("main_map").setView([6.1630788, -75.631681], 17);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {attribution:'&copy; <a href="https://wwww.openstreetmap.org/copyright">OpenStreetMap contributors',}).addTo(map);

var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", "/bicicletas/all", false ); // false for synchronous request
xmlHttp.send( null );
var output = new Array();  
output = JSON.parse(xmlHttp.responseText);
for(let i=0;i<output.length;i++)
{
    L.marker(output[i]).addTo(map);
}