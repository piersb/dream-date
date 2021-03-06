'use strict';

// This tests basic leap-year functionality, with
// leap years starting in year 2 and only one day
// added in a month that already exists. It also
// doesn't test any drifting of weekdays

// The calendar schema
exports.schema = {
	calendar: {
		year: {
			leapYearFrequency: 4,
			leapYearStart: 2,
			months: [
				{
					name: 'Month1',
					days: 5
				},
				{
					name: 'Month2',
					days: 5,
					daysInLeapYear: 6
				},
				{
					name: 'Month3',
					days: 5
				}
			]
		},
		week: {
			days: [
				{
					name: 'Day1'
				},
				{
					name: 'Day2'
				},
				{
					name: 'Day3'
				},
				{
					name: 'Day4'
				},
				{
					name: 'Day5'
				}
			]
		}
	}
};

// Helpers
const second = 1;
const minute = 60;
const hour = minute * 60;
const day = hour * 24;
const month = day * 5;
const leapMonth = month + day;
const year = day * 15;
const leapYear = year + day;

// The tests
exports.tests = [

	// Test basic year/month/date increments
	{
		inputs: [
			[0],
			[1, 1, 1, 0, 0, 0],
			['1-01-01 00:00:00']
		],
		expect: {
			yearIndex: 0,
			year: 1,
			isLeapYear: false,
			monthIndex: 0,
			month: 1,
			dateIndex: 0,
			date: 1
		}
	},
	{
		inputs: [
			[(year)],
			[2, 1, 1, 0, 0, 0],
			['2-01-01 00:00:00']
		],
		expect: {
			yearIndex: 1,
			year: 2,
			isLeapYear: true,
			monthIndex: 0,
			month: 1,
			dateIndex: 0,
			date: 1
		}
	},
	{
		inputs: [
			[(year) + (month + leapMonth)],
			[2, 3, 1, 0, 0, 0],
			['2-03-01 00:00:00']
		],
		expect: {
			yearIndex: 1,
			year: 2,
			isLeapYear: true,
			monthIndex: 2,
			month: 3,
			dateIndex: 0,
			date: 1
		}
	},
	{
		inputs: [
			[(year) + (month + leapMonth) + (day * 3)],
			[2, 3, 4, 0, 0, 0],
			['2-03-04 00:00:00']
		],
		expect: {
			yearIndex: 1,
			year: 2,
			isLeapYear: true,
			monthIndex: 2,
			month: 3,
			dateIndex: 3,
			date: 4
		}
	},
	{
		inputs: [
			[(year + leapYear + (year * 2))],
			[5, 1, 1, 0, 0, 0],
			['5-01-01 00:00:00']
		],
		expect: {
			yearIndex: 4,
			year: 5,
			isLeapYear: false,
			monthIndex: 0,
			month: 1,
			dateIndex: 0,
			date: 1
		}
	},

	// Test the first and last day of a month
	// with an extra day on a leap year
	{
		inputs: [
			[(year) + (month) + (day * 5)],
			[2, 2, 6, 0, 0, 0],
			['2-02-06 00:00:00']
		],
		expect: {
			isLeapYear: true,
			monthIndex: 1,
			month: 2,
			dateIndex: 5,
			date: 6
		}
	},
	{
		inputs: [
			[(year) + (month) + (day * 6)],
			[2, 3, 1, 0, 0, 0],
			['2-03-01 00:00:00']
		],
		expect: {
			isLeapYear: true,
			monthIndex: 2,
			month: 3,
			dateIndex: 0,
			date: 1
		}
	},

	// Test the first and last day of a month
	// without an extra day on a non-leap year
	{
		inputs: [
			[(month) + (day * 4)],
			[1, 2, 5, 0, 0, 0],
			['1-02-05 00:00:00']
		],
		expect: {
			isLeapYear: false,
			monthIndex: 1,
			month: 2,
			dateIndex: 4,
			date: 5
		}
	},
	{
		inputs: [
			[(month) + (day * 5)],
			[1, 3, 1, 0, 0, 0],
			['1-03-01 00:00:00']
		],
		expect: {
			isLeapYear: false,
			monthIndex: 2,
			month: 3,
			dateIndex: 0,
			date: 1
		}
	},

	// Test the last and first second of a day
	{
		inputs: [
			[(hour * 23) + (minute * 59) + (second * 59)],
			[1, 1, 1, 23, 59, 59],
			['1-01-01 23:59:59']
		],
		expect: {
			isLeapYear: false,
			dateIndex: 0,
			date: 1,
			hour: 23,
			minute: 59,
			second: 59
		}
	},
	{
		inputs: [
			[(hour * 24) + (minute * 0) + (second * 0)],
			[1, 1, 2, 0, 0, 0],
			['1-01-02 00:00:00']
		],
		expect: {
			isLeapYear: false,
			dateIndex: 1,
			date: 2,
			hour: 0,
			minute: 0,
			second: 0
		}
	},

	// Test the last and first second of a month
	{
		inputs: [
			[(day * 4) + (hour * 23) + (minute * 59) + (second * 59)],
			[1, 1, 5, 23, 59, 59],
			['1-01-05 23:59:59']
		],
		expect: {
			isLeapYear: false,
			monthIndex: 0,
			month: 1,
			hour: 23,
			minute: 59,
			second: 59
		}
	},
	{
		inputs: [
			[(day * 4) + (hour * 24) + (minute * 0) + (second * 0)],
			[1, 2, 1, 0, 0, 0],
			['1-02-01 00:00:00']
		],
		expect: {
			isLeapYear: false,
			monthIndex: 1,
			month: 2,
			hour: 0,
			minute: 0,
			second: 0
		}
	},

	// Test the last and first second across a leap year
	{
		inputs: [
			[(year) + (day * 15) + (hour * 23) + (minute * 59) + (second * 59)],
			[2, 1, 1, 23, 59, 59],
			['2-01-01 23:59:59']
		],
		expect: {
			isLeapYear: true,
			yearIndex: 1,
			year: 2,
			hour: 23,
			minute: 59,
			second: 59
		}
	},
	{
		inputs: [
			[(year) + (day * 15) + (hour * 24) + (minute * 0) + (second * 0)],
			[3, 1, 1, 0, 0, 0],
			['3-01-01 00:00:00']
		],
		expect: {
			isLeapYear: false,
			yearIndex: 2,
			year: 3,
			hour: 0,
			minute: 0,
			second: 0
		}
	}
];
