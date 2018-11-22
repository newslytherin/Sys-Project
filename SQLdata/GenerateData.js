var models = [
    "Millennium Falcon", "SR-71 Blackbird", "Boeing 737", "Boeing 747", "Boeing 767", "Boeing 777",
    "Boeing 787", "A220", "A300", "A310", "A318", "A319", "A320", "A321", "A330", "A340", "A350",
    "A380", "E-170", "E-175", "E-190", "E-195", "CRJ700", "CRJ705", "CRJ900", "CRJ1000"
]

var airline = [
    { airLine: "American Airlines", short: "(AA)" },
    { airLine: "Air Canada", short: "(AC)" },
    { airLine: "Alaska Airlines", short: "(AS)" },
    { airLine: "JetBlue Airways", short: "(B6)" },
    { airLine: "British Airways", short: "(BA)" },
    { airLine: "Delta Air Lines", short: "(DL)" },
    { airLine: "Frontier Airlines", short: "(F9)" },
    { airLine: "Lufthansa", short: "(LH)" }
]
var departure
var destination
var depTime
var arrTime
var price
var cancelIncurance
var airplane
var capacity

var airports = [    
    {city:"London",code:"LHR",country:"England"},
    {city:"Paris",code:"CDG",country:"Frankrig"},
    {city:"Amsterdam",code:"AMS",country:"Holland"},
    {city:"Frankfurt",code:"FRA",country:"Tyskland"},
    {city:"Istanbul",code:"IST",country:"Tyrkiet"},
    {city:"Madrid",code:"MAD",country:"Spanien"},
    {city:"Barcelona",code:"BCN",country:"Spanien"},
    {city:"London",code:"LGW",country:"England"},
    {city:"München",code:"MUC",country:"Tyskland"},
    {city:"Rom",code:"FCO",country:"Italien"},
    {city:"Moskva",code:"SVO",country:"Rusland"},
    {city:"Paris",code:"ORY",country:"Frankrig"},
    {city:"Moskva",code:"DME",country:"Rusland"},
    {city:"Dublin",code:"DUB",country:"Irland"},
    {city:"Zürich",code:"ZRH",country:"Schweiz"},
    {city:"København",code:"CPH",country:"Danmark"},
    {city:"Palma de Mallorca",code:"PMI",country:"Spanien"},
    {city:"Manchester",code:"MAN",country:"England"},
    {city:"Oslo",code:"OSL",country:"Norge"},
    {city:"Lissabon",code:"LIS",country:"Portugal"},
    {city:"Stockholm",code:"ARN",country:"Sverige"},
    {city:"London",code:"STN",country:"England"},
    {city:"Bruxelles",code:"BRU",country:"Belgien"},
    {city:"Düsseldorf",code:"DUS",country:"Tyskland"},
    {city:"Wien",code:"VIE",country:"Østrig"},
    {city:"Milano",code:"MXP",country:"Italien"},
    {city:"Athen",code:"ATH",country:"Grækenland"},
    {city:"Berlin",code:"TXL",country:"Tyskland"},
    {city:"Helsinki",code:"HEL",country:"Finland"},
    {city:"Málaga",code:"AGP",country:"Spanien"},
]