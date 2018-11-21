/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  Stephan
 * Created: 21-11-2018
 */

INSERT INTO AIRPORT (CITY, COUNTRY, COUNTRYCODE, NAME)
VALUES 
    ('KBH', 'Denmark', 'DK', 'Kastrup'),
    ('BLL', 'Denmark', 'DK', 'Billund'),
    ('LHR', 'England', 'BG', 'Heathrow'),
    ('LGW', 'England', 'BG', 'Gatwick'),
    ('STN', 'England', 'BG', 'Stansted'),
    ('BER', 'Germany', 'DE', 'Brandenburg'),
    ('TXL', 'Germany', 'DE', 'Berlin'),
    ('FRA', 'Germany', 'DE', 'Frankfurt'),
    ('NYC', 'United States', 'USA', 'New York City');

INSERT INTO FLIGHT (AIRLINE, ARRTIME, DEPTIME, DURATION, PRICE, CANCELINSURANCE, AIRPLANE, MODEL, CAPACITY, DEPARTURE_ID, DESTINATION_ID)
VALUES 
    ('SAS', '2018-09-01T10:10', '2018-09-01T12:00', 120, 3500, 200, 'Airbus A321', 'BA 811', 320, 1, 3),
    ('SAS', '2018-07-04T13:00', '2018-07-04T15:00', 60, 3750, 220, 'Airbus A321', 'BA 811', 100, 4, 2),
    ('Norwegian', '2018-11-01T10:10', '2018-11-01T10:10', 80, 1800, 300, 'Airbus B321', 'BA 811', 220, 2, 5),
    ('Norwegian', '2019-12-01T18:30', '2019-12-01T20:30', 120, 2300, 150, 'Airbus B321', 'AB 911', 550, 7, 9),
    ('Finnair', '2019-01-01T22:00', '2019-01-02T01:10', 220, 2300, 300, 'Airbus C454', 'GF 405', 120, 7, 8),
    ('Finnair', '2019-11-01T23:10', '2019-11-02T00:10', 125, 2000, 340, 'Airbus C456', 'AB 911', 360, 4, 3),
    ('WOW Air', '2018-11-01T10:10', '2018-11-01T12:10', 120, 7500, 400, 'Airbus A321', 'KG 67', 320, 2, 1),
    ('WOW Air', '2018-10-10T12:15', '2018-10-10T15:00', 100, 6500, 100, 'Airbus A321', 'BA 811', 120, 6, 5),
    ('British Airways', '2018-07-04T13:00', '2018-07-04T14:55', 115, 3500, 120, 'C454 A321', 'GF 405', 320, 7, 9),
    ('British Airways', '2018-11-01T10:10', '2018-11-01T10:10', 120, 1800, 200, 'C454 A321', 'SK 909', 550, 8, 5);

