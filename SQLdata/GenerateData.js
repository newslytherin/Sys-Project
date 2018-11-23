const models = [
    "Millennium Falcon", "SR-71 Blackbird", "Boeing 737", "Boeing 747", "Boeing 767", "Boeing 777",
    "Boeing 787", "A220", "A300", "A310", "A318", "A319", "A320", "A321", "A330", "A340", "A350",
    "A380", "E-170", "E-175", "E-190", "E-195", "CRJ700", "CRJ705", "CRJ900", "CRJ1000"
]

const airlines = [
    { name: "American Airlines", short: "AA" },
    { name: "Air Canada", short: "AC" },
    { name: "Alaska Airlines", short: "AS" },
    { name: "JetBlue Airways", short: "B6" },
    { name: "British Airways", short: "BA" },
    { name: "Delta Air Lines", short: "DL" },
    { name: "Frontier Airlines", short: "F9" },
    { name: "Lufthansa", short: "LH" },
    { name: "SAS", short: "SA" },
    { name: "Norwegian", short: "NW" },
    { name: "Finnair", short: "FA" },
    { name: "WOW Air", short: "WA" }
]
const airports = [
    { id: 0, city: 'Kastrup', country: 'Denmark', code: 'DK', name: 'CBH' },
    { id: 1, city: 'Billund', country: 'Denmark', code: 'DK', name: 'BLL' },
    { id: 2, city: 'Heathrow', country: 'England', code: 'BG', name: 'LHR' },
    { id: 3, city: 'Gatwick', country: 'England', code: 'BG', name: 'LGW' },
    { id: 4, city: 'Stansted', country: 'England', code: 'BG', name: 'STN' },
    { id: 5, city: 'Brandenburg', country: 'Germany', code: 'DE', name: 'BER' },
    { id: 6, city: 'Berlin', country: 'Germany', code: 'DE', name: 'TXL' },
    { id: 7, city: 'Frankfurt', country: 'Germany', code: 'DE', name: 'FRA' },
    { id: 8, city: 'New York City', country: 'United States', code: 'USA', name: 'NYC' },
    { id: 9, city: 'Aalborg', country: 'Denmark', code: 'DK', name: 'AAL' },
    { id: 10, city: 'New York City', country: 'United States', code: 'USA', name: 'JFK' },
    { id: 11, city: 'Boolgeeda', country: 'Australia', code: 'AU', name: 'OCM' },
    { id: 12, city: 'Stockholm', country: 'Sweden', code: 'SE', name: 'ARN' },
    { id: 13, city: 'Milan', country: 'Italy', code: 'IT', name: 'MXP' },
    { id: 14, city: 'Matamoros', country: 'Mexico', code: 'MX', name: 'MAM' },
    { id: 15, city: 'Barcelona', country: 'Spain', code: 'ES', name: 'BCN' },
    { id: 16, city: 'Sydney', country: 'Australia', code: 'AU', name: 'SYD' },
    { id: 17, city: 'Melbourne', country: 'Australia', code: 'AU', name: 'MBW' },
    { id: 18, city: 'Zambezi', country: 'Zambia', code: 'ZM', name: 'BBZ' },
    { id: 19, city: 'Vancouver', country: 'Canada', code: 'CA', name: 'CXH' }
]

var airports2 = [    
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

const cancelIncurances = [
    200, 300, 500, 1000
]

Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}

function randomNum(n) {
    return Math.round(Math.random() * n);
}

function randomFromArray(arr) {
    return arr[Math.round(Math.random() * (arr.length - 1))]
}

function randomFromArrayExcluding(exclude, arr) {
    let res = exclude
    while (res == exclude) {
        res = randomFromArray(arr)
    }
    return res
}

function randomRange(low, high) {
    return Math.round((Math.random() * (high - low)) + low)
}
randomTime()
function randomTime() {
    const times = []

    const year1 = (randomRange(2018, 2019)).pad()
    const month1 = (randomRange(1, 12)).pad()
    const day1 = randomRange(1, 30)
    const hour1 = randomRange(0, 23)
    const minute1 = randomRange(0, 59)

    const day2 = randomRange(day1, (day1 + 1))
    const offset = (day2 != day1) ? 0 : (hour1 + 2)
    const hour2 = randomRange(offset, 23)
    const minute2 = randomRange(0, 59)

    const duration = ((day2 - day1) * 24 * 60) + ((hour2 - hour1) * 60) + (minute2 - minute1)

    times.push(year1 + "-" + month1 + "-" + (day1).pad() + "T" + (hour1).pad() + ":" + (minute1).pad())
    times.push(year1 + "-" + month1 + "-" + (day2).pad() + "T" + (hour2).pad() + ":" + (minute2).pad())
    times.push(duration)
    return times
}

function generateFlight() {
    const times = randomTime()
    const flight = []

    const airline = randomFromArray(airlines)
    flight.push(airline.name)
    flight.push(times[0])
    flight.push(times[1])
    flight.push(times[2])
    flight.push(randomRange(500, 10000))
    flight.push(randomFromArray(cancelIncurances))
    flight.push(airline.short + " " + randomRange(100, 2000))
    flight.push(randomFromArray(models))
    flight.push(randomRange(50, 600))
    const departure = randomFromArray(airports)
    const destination = randomFromArrayExcluding(departure, airports)
    flight.push(departure.id)
    flight.push(destination.id)

    const res = flight.join("', '")
    return "('" + res + "')"
}

function generateFlights(n) {
    const total = []
    for (let i = 0; i < n; i++) {
        total.push(generateFlight())
    }
    return total
}

function generateAirports() {
    const total = []
    airports.forEach(a => {
        let tmp = []
        tmp.push(a.city)
        tmp.push(a.country)
        tmp.push(a.code)
        tmp.push(a.name)
        total.push("('" + tmp.join(", ") + "')")
    });
    return total
}

function saveToFile(name, text) {
    const fs = require('fs');

    // write to a new file named text.txt
    fs.writeFile(name + '.txt', text.join(', \n') + ";", (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log(name + ' saved!');
    });
}



saveToFile("flights", generateFlights(1500))
saveToFile("airports", generateAirports())
