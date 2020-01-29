import titleize from 'titleize';

export const rentalType = shared =>  shared ? 'shared' : 'entire';

export const toUpperCase = value => value ? titleize(value) : '';
