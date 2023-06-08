function createEmployeeRecord(array) {
    const newEmployee = {}
    
    newEmployee.firstName = array[0]
    newEmployee.familyName = array[1]
    newEmployee.title = array[2]
    newEmployee.payPerHour = array[3]
    newEmployee.timeInEvents = []
    newEmployee.timeOutEvents = []

    return newEmployee
}

function createEmployeeRecords(array) {
    return array.map(createEmployeeRecord)
}

function createTimeInEvent(date) {
    const newObject = {}

    newObject.type = 'TimeIn'
    newObject.hour = parseInt(date.slice(-4, -2) + '00')
    newObject.date = date.slice(0, 10)

    this.timeInEvents.push(newObject)
    return this
}

function createTimeOutEvent(date) {
    const newObject = {}

    newObject.type = 'TimeOut'
    newObject.hour = parseInt(date.slice(-4, -2) + '00')
    newObject.date = date.slice(0, 10)

    this.timeOutEvents.push(newObject)
    return this
}

function hoursWorkedOnDate(date) {
    let timeIn = 0
    let timeOut = 0
    
    this.timeInEvents.forEach(element => {
        if (element.date === date) {
            timeIn = element.hour
        }
    })
    
    this.timeOutEvents.forEach(element => {
        if (element.date === date) {
            timeOut = element.hour
        }
    })

    return (timeOut - timeIn) * .01
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    let holder = 0
    srcArray.forEach(element => {
        if (element.firstName === firstName) {
          holder = element
          
        }
    })
    return holder
}

function calculatePayroll(array) {
    return array.reduce(
        (acc, e) => acc + allWagesFor.call(e), 0
    )
}