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
const airports2 = [
    { id: 0, city: 'Kastrup', country: 'Denmark', code: 'DK', name: 'CBH' },
    { id: 1, city: 'Billund', country: 'Denmark', code: 'DK', name: 'BLL' },
    { id: 2, city: 'Heathrow', country: 'England', code: 'UK', name: 'LHR' },
    { id: 3, city: 'Gatwick', country: 'England', code: 'UK', name: 'LGW' },
    { id: 4, city: 'Stansted', country: 'England', code: 'UK', name: 'STN' },
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

var airports = [
    { id: 1, city: "London", name: "LHR", country: "England", code: "UK" },
    { id: 2, city: "Paris", name: "CDG", country: "Frankrig", code: "FR" },
    { id: 3, city: "Amsterdam", name: "AMS", country: "Holland", code: "NL" },
    { id: 4, city: "Frankfurt", name: "FRA", country: "Tyskland", code: "DE" },
    { id: 5, city: "Istanbul", name: "IST", country: "Tyrkiet", code: "TR" },
    { id: 6, city: "Madrid", name: "MAD", country: "Spanien", code: "ES" },
    { id: 7, city: "Barcelona", name: "BCN", country: "Spanien", code: "ES" },
    { id: 8, city: "London", name: "LGW", country: "England", code: "UK" },
    { id: 9, city: "München", name: "MUC", country: "Tyskland", code: "DE" },
    { id: 10, city: "Rom", name: "FCO", country: "Italien", code: "IT" },
    { id: 11, city: "Moskva", name: "SVO", country: "Rusland", code: "RU" },
    { id: 12, city: "Paris", name: "ORY", country: "Frankrig", code: "FR" },
    { id: 13, city: "Moskva", name: "DME", country: "Rusland", code: "RU" },
    { id: 14, city: "Dublin", name: "DUB", country: "Irland", code: "IE" },
    { id: 15, city: "Zürich", name: "ZRH", country: "Schweiz", code: "CH" },
    { id: 16, city: "København", name: "CPH", country: "Danmark", code: "DK" },
    { id: 17, city: "Palma de Mallorca", name: "PMI", country: "Spanien", code: "SP" },
    { id: 18, city: "Manchester", name: "MAN", country: "England", code: "UK" },
    { id: 19, city: "Oslo", name: "OSL", country: "Norge", code: "NO" },
    { id: 20, city: "Lissabon", name: "LIS", country: "Portugal", code: "PT" },
    { id: 21, city: "Stockholm", name: "ARN", country: "Sverige", code: "SW" },
    { id: 22, city: "London", name: "STN", country: "England", code: "UK" },
    { id: 23, city: "Bruxelles", name: "BRU", country: "Belgien", code: "BE" },
    { id: 24, city: "Düsseldorf", name: "DUS", country: "Tyskland", code: "DE" },
    { id: 25, city: "Wien", name: "VIE", country: "Østrig", code: "AT" },
    { id: 26, city: "Milano", name: "MXP", country: "Italien", code: "IT" },
    { id: 27, city: "Athen", name: "ATH", country: "Grækenland", code: "GR" },
    { id: 28, city: "Berlin", name: "TXL", country: "Tyskland", code: "DE" },
    { id: 29, city: "Helsinki", name: "HEL", country: "Finland", code: "FI" },
    { id: 30, city: "Málaga", name: "AGP", country: "Spanien", code: "ES" },
]

var names = [
    "Daniel", "Jacob", "Nikolaj", "Stephan", "Bob", "Kurt", "Lars", "Peter", "Jens", "Michael", "Henrik", "Thomas", "Søren", "Jan", "Christian", "Martin", "Niels", "Anders", "Morten", "Jesper", "Jørgen", "Hans", "Per", "Ole", "Rasmus",
    "Anne", "Kirsten", "Mette", "Hanne", "Susanne", "Lene", "Maria", "Marianne", "Lone", "Camilla", "Inge", "Pia", "Karen", "Bente", "Louise", "Charlotte", "Jette", "Tina", "Asger", "Lars", "Gitte", "Magne", "Thor", "Sigurd", "Jakob",
    "Ida", "Emma", "Sofia", "Ella", "Freja", "Josefine", "Alma", "Alberte", "Anna", "Agnes", "Laura", "Nora", "Clara", "Karla", "Isabella", "Olivia", "Lærke", "Victoria", "Mille", "Luna", "Aya", "Sofie", "Ellen", "Lily", "Mathilde",
    "Maja", "Frida", "Emilie", "Marie", "Esther", "Liva", "Emily", "Caroline", "Sara", "Astrid", "Ellie", "Rosa", "Asta", "Alba", "Liv", "Hannah", "Andrea", "Vilma", "Mynte", "Eva", "Naja", "Nanna", "Lea", "Saga", "Vigga", "William",
    "Noah", "Oscar", "Lucas", "Carl", "Oliver", "Victor", "Alfred", "Malthe", "Emil", "Valdemar", "Elias", "Magnus", "Aksel", "Frederik", "Felix", "Elliot", "August", "Anton", "Nohr", "Alexander", "Villads", "Christian", "Johan", "Adam",
    "Arthur", "Liam", "Albert", "Theo", "Mikkel", "Viggo", "Benjamin", "Theodor", "Storm", "Sebastian", "Mads", "Mathias", "Milas", "Philip", "Otto", "Konrad", "Lauge", "Louie", "Marius", "Villum"
];

var pass = '$2a$10$RyHqChIuHrTmnIwm9ZtrL.edk7uk1Ms2bZsWOh3RfQXawQZW6rvLm'
var mail = '@mail.dk'

var genders = ['Male', 'Female', 'Attack helicopter', 'unicorn', 'chicken', 'cis male', 'cis female']

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

function randomTime() {
    const times = []

    let offset

    const year1 = 2019
    const month1 = (randomRange(1, 12)).pad()
    const monthoffset = (month1 == 2) ? 23 : 29
    const day1 = randomRange(1, monthoffset)
    const hour1 = randomRange(0, 23)
    const minute1 = randomRange(0, 59)

    offset = (hour1 >= 22) ? (day1 + 1) : day1
    const day2 = randomRange(offset, (day1 + 1))
    if(hour1 >= 22){
        offset = (hour1 + 3) % 23
    }else{
        offset = (day2 != day1) ? 0 : (hour1 + 3)
    }
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
    let flight = "";

    const airline = randomFromArray(airlines)
    flight = "'" + airline.name + "',"
    flight += "'" + times[0] + "',"
    flight += "'" + times[1] + "',"
    flight += times[2] + ","
    flight += randomRange(500, 10000) + ","
    flight += randomFromArray(cancelIncurances) + ","
    flight += "'" + airline.short + randomRange(100, 999) + "',"
    flight += "'" + randomFromArray(models) + "',"
    flight += randomRange(50, 600) + ","
    const departure = randomFromArray(airports)
    const destination = randomFromArrayExcluding(departure, airports)
    flight += departure.id + ","
    flight += destination.id

    return "(" + flight + ")"
}
// (`AIRLINE`, `ARRTIME`, `DEPTIME`, `DURATION`, `PRICE`, `CANCELINSURANCE`, `AIRPLANE`, `MODEL`, `CAPACITY`, `DEPARTURE_ID`, `DESTINATION_ID`)
// ('JetBlue Airways','2019-09-02T22:19','2019-09-02T24:49',150,3517,300,'B6 304','A320',143,9,6)

function generateOrders(numOfUsers, numOfOrders) {
    // INSERT INTO DBORDER (`AIRLINE`, `AIRPLANE`, `ATTENDEES`, `CANCELINSURANCE`, `DEPTIME`, `ARRTIME`, `DURATION`, `DEPARTURE`, `DESTINATION`, `TOTALPRICE`, `USER_ID`)
    const res = []
    
    let tmp
    for (let id = 1; id <= numOfUsers; id++) {
        for (let j = 0; j < numOfOrders; j++) {
            const times = randomTime()
            const attendees = randomRange(1, 4) 
            const airline = randomFromArray(airlines)
            const departure = randomFromArray(airports)
            const destination = randomFromArrayExcluding(departure, airports)
            tmp = "'" + airline.name + "',"                                     //airline name
            tmp += "'" + airline.short + randomRange(100, 999) + "',"           //airplane name
            tmp += "'" + attendees + "',"                                       //attendees amount
            tmp += "'" + randomFromArray(cancelIncurances) + "',"               //cancel insurance
            tmp += "'" + times[0] + "',"                                        //arrtime
            tmp += "'" + times[1] + "',"                                        //deptime
            tmp += "'" + times[2] + "',"                                        //duration
            tmp += "'" + departure.name + "',"                                  //dep
            tmp += "'" + destination.name + "',"                                //des
            tmp += "'" + (randomRange(500, 10000) * attendees) + "',"           //totalprice
            tmp += "'" + id + "'"                                               //user_id
            res.push("(" + tmp + ")")
        }
    }
    
    return res
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
        total.push("('" + tmp.join("', '") + "')")
    });
    return total
}

function generateUsers() {
    const res = []
    res.push("('admin" + mail + "','" + randomFromArray(genders) + "','" + randomFromArray(names) + "','" + pass + "')")
    for (let i = 1; i <= 10; i++) {
        res.push("('user" + i + mail + "','" + randomFromArray(genders) + "','" + randomFromArray(names) + "','" + pass + "')")
    }
    return res
}

function generateUserRoles() {
    const res = []
    res.push("('admin','admin" + mail + "')")
    res.push("('user','admin" + mail + "')")
    for (let i = 1; i <= 10; i++) {
        res.push("('user','user" + i + mail + "')")
    }
    return res
}


function saveToFile(name, text) {
    const fs = require('fs');

    // write to a new file named text.txt
    fs.writeFile(name + '.txt', text.join(',') + ";", (err) => {
        // throws an error, you could also catch it here
        if (err) throw err;

        // success case, the file was saved
        console.log(name + ' saved!');
    });
}

saveToFile("flights", generateFlights(1500))
// saveToFile("airports", generateAirports())
// saveToFile("Users", generateUsers())
// saveToFile("Users Roles", generateUserRoles())
saveToFile("Orders", generateOrders(11,10))

