const createEmployeeRecord = function (array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function (array) {
    let newArr = []
    for (let i = 0; i < array.length; i++) {
        newArr.push(createEmployeeRecord(array[i]))
  }
  return newArr
}

const createTimeInEvent = function (timeString) {
    const timeInfo = timeString.split(' ')
    const date = timeInfo[0]
    const hour = parseInt(timeInfo[1], 10)

    const timeEvent = {
        type: 'TimeIn',
        date: date,
        hour: hour
      }

    this.timeInEvents.push(timeEvent)
    return this
}

const createTimeOutEvent = function (timeString) {
    const timeInfo = timeString.split(' ')
    const date = timeInfo[0]
    const hour = parseInt(timeInfo[1], 10)

    const timeEvent = {
        type: 'TimeOut',
        date: date,
        hour: hour
      }

    this.timeOutEvents.push(timeEvent)
    return this
}

const  hoursWorkedOnDate = function (date) {
    const inEvent = this.timeInEvents.find(item => item.date === date)
    const outEvent = this.timeOutEvents.find(item => item.date === date)
    return (outEvent.hour - inEvent.hour) / 100
  }

const wagesEarnedOnDate = function (date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

const findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName)
}

const calculatePayroll = function (employeeRecords) {
    const allWagesOwed = employeeRecords.map(record => allWagesFor.call(record))
    return allWagesOwed.reduce((acc, amount) => acc + amount)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}
