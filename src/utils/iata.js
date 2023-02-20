import moment from 'moment';

export const parse = (data) => {
    const { itineraries, travelerPricings  } = data
    const segmentPriceDetails = travelerPricings[0].fareDetailsBySegment
    const findClassBySegmentId = (id) => segmentPriceDetails.find(segment => segment.id === id)?.class
    const segmentsArray = itineraries.map(({segments}, index) => {
        return segments.map(segment => {
            segment.flightNumber = index + 1
            return segment
        })
    }).flat()
 
    const iata = segmentsArray.map((segment) => {
        const departureTime = moment(segment.departure.at).format('hmmA').split('M').join('')
        const arrivalTime = moment(segment.arrival.at).format('hmmA').split('M').join('')
        
      
        return `${segment.flightNumber} ${segment.carrierCode} ${segment.number} ${findClassBySegmentId(findClassBySegmentId(segment.id))} ${moment(segment.departure.at).format('DDMMM').toUpperCase()} ${moment(segment.departure.at).day()} ${segment.departure.iataCode}${segment.arrival.iataCode} ${departureTime} ${arrivalTime} ${moment(segment.arrival.at).format('DDMMM').toUpperCase()} {ticket-type} ${segment.numberOfStops} ${segment.aircraft.code} {pricing base}`
    })
    return iata
}
