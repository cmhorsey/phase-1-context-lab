/* Your Code Here */

// createEmployeeRecord

//     Argument(s)
//         A 4-element Array of a String, String, String,
// and Number corresponding to a first name, family name, title, and pay rate per hour
//     Returns
//         JavaScript Object with keys:
//         firstName
//         familyName
//         title
//         payPerHour
//         timeInEvents
//         timeOutEvents
//     Behavior
//         Loads Array elements into corresponding Object properties.
    // Additionally, initialize empty Arrays on the properties timeInEvents and timeOutEvents.


//Takes an array of 4 strings and a number arr = ['firstName', 'familyName', 'title', payperhr]

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

// console.log(createEmployeeRecord(["Gray", "Worm", "Security", 1]))

// createEmployeeRecord()

// createEmployeeRecords

//     Argument(s)
//         Array of Arrays
//     Returns
//         Array of Objects
//     Behavior
//         Converts each nested Array into an
// employee record using createEmployeeRecord and accumulates it to a new Array

let twoRows = [
    ["moe", "sizlak", "barkeep", 2],
    ["bartholomew", "simpson", "scamp", 3]
  ]

//Take Array of Arrays
//Init empty array
//Basic loop on array.length
//call createemployeecard on each item
// push array[i] into empty array

const createEmployeeRecords = function (array) {
    let newArr = []
    for (let i = 0; i < array.length; i++) {
        newArr.push(createEmployeeRecord(array[i]))
  }
  return newArr
}

const createTimeInEvent = function (timeString) {
    let timeInfo = timeString.split(' ')
    let date = timeInfo[0]
    let hour = parseInt(timeInfo[1], 10)

    let timeEvent = {
        type: 'TimeIn',
        date: date,
        hour: hour
      }

    this.timeInEvents.push(timeEvent)
    return this
}

const createTimeOutEvent = function (timeString) {
    let timeInfo = timeString.split(' ')
    let date = timeInfo[0]
    let hour = parseInt(timeInfo[1], 10)

    let timeEvent = {
        type: 'TimeOut',
        date: date,
        hour: hour
      }

    this.timeOutEvents.push(timeEvent)
    return this
}

const  hoursWorkedOnDate = function (date) {
    let inEvent = this.timeInEvents.find(item => item.date === date)
    let outEvent = this.timeOutEvents.find(item => item.date === date)
    return (outEvent.hour - inEvent.hour) / 100
  }

// const wagesEarnedOnDate = function (date) {
//     const hours = hoursWorkedOnDate(date)
//     const wage = this.payPerHour
//     const totalEarned = hours * wage
//     console.log(this)
//     return totalEarned
//   }

const wagesEarnedOnDate = function (date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

let src = [
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150]
  ]
//   let emps = createEmployeeRecords(src)
//   let loki = findEmployeeByFirstName(emps, "Loki")


const findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName)
}

console.log(findEmployeeByFirstName(src, 'Loki'))

const calculatePayroll = function (employeeRecords) {
    const allWagesOwed = employeeRecords.map(record => allWagesFor.call(record))
    return allWagesOwed.reduce((acc, amount) => acc + amount)
}

// function calculatePayroll(employeeRecords) {
//     const allWagesOwed = employeeRecords.map(record => allWagesFor(record))
//     return allWagesOwed.reduce((acc, amount) => acc + amount)
//   }
// wagesEarnedOnDate(cRecord)

// const wagesEarnedOnDate = function (date) {
//     const hours = this.hoursWorkedOnDate(date)
//     let wage = this.payPerHour
//     let totalEarned = hours * wage

//     return totalEarned
//   }


// const calculatePayroll = function (array) {
//     const allWagesOwed = array.map(record => allWagesFor(record))
//     return allWagesOwed.reduce((acc, amount) => acc + amount)
//   }


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
