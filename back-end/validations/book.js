const { isRestaurantExist } = require('../controllers/restaurant')

const bookErrorHandler = async (req) => {
    const { count, date, hour, restaurant } = req.body

    let errors = {}

    if (!count) { errors['count'] = 'Count is required' }
    if(isNaN(Number(count))) { errors['count'] = 'Count must be number' }
    if(Number(count) < 1) { errors['count'] = 'Count must be at least 1' }
    if(Number(count) > 15) { errors['count'] = 'Count can be at most 15' }

    if (!date) { errors['date'] = 'Date is required' }
   
    const newDate = new Date(date);

    const dateAfter7Days = new Date();
    dateAfter7Days.setDate(dateAfter7Days.getDate() + 7);

    const now = new Date()

    if (newDate < now) { errors['data'] = 'Can not make book in this date' }
    if (newDate > dateAfter7Days) { errors['data'] = 'Can not make book in this date' }

    if (!hour) { errors['hour'] = 'Hour is required' }

    const hours = hour.split(":")[0];

    console.log(Number(hours));

    if(isNaN(Number(hours))) { errors['hour'] = 'Hour must be number' }
    if(Number(hours) < 10 && Number(hours) > 23) { errors['hour'] = 'Hour is not in our work time' }

    
    if(!restaurant) { errors['restaurant'] = 'Restaurant is required' }
    if(!(await isRestaurantExist(restaurant))) { errors['restaurant'] = 'Restaurant does not exists' }

    return errors
}

module.exports = {
    bookErrorHandler
}