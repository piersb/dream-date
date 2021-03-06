'use strict';

const ordinal = require('@quarterto/ordinal');

// TODO the zero padding in here needs to account for
// the fact that the max number might have more than
// two digits!

class DreamDateFormatter {

	constructor() {
		if (this.constructor === DreamDateFormatter) {
			throw new Error('You cannot create an instance of DreamDateFormatter, it is designed to be extended');
		}
	}

	format(strings, ...vars) {
		return this.template(strings, ...vars);
	}

	template(strings, ...vars) {
		return strings.reduce((cat, string, i) => {
			return cat + string + this.resolveTemplateVar(vars[i]);
		}, '');
	}

	resolveTemplateVar(templateVar) {
		return (templateVar in this ? this[templateVar] : '');
	}

	get Y() {
		return `${this.year}`;
	}

	get YY() {
		const periodAbbreviations = this.periodAbbreviations;
		if (periodAbbreviations.length) {
			return this.periodYears.map((year, index) => `${year}${periodAbbreviations[index]}`).join('/');
		}
		return this.Y;
	}

	get YYY() {
		const periodNames = this.periodNames;
		if (periodNames.length) {
			return this.periodYears.map((year, index) => `${year} ${periodNames[index]}`).join('/');
		}
		return this.Y;
	}

	get YYYY() {
		const periodLongNames = this.periodLongNames;
		if (periodLongNames.length) {
			return this.periodYears.map((year, index) => `${year} ${periodLongNames[index]}`).join('/');
		}
		return this.Y;
	}

	get M() {
		return `${this.month}`;
	}

	get Mz() {
		return `${this.monthPadded}`;
	}

	get Mo() {
		return this.month + ordinal(this.month);
	}

	get MM() {
		return this.monthAbbreviation;
	}

	get MMM() {
		return this.monthName;
	}

	get MMMM() {
		return this.monthLongName;
	}

	get D() {
		return `${this.date}`;
	}

	get Dz() {
		return `${this.datePadded}`;
	}

	get Do() {
		return this.date + ordinal(this.date);
	}

	get d() {
		return `${this.dayIndex}`;
	}

	get dd() {
		return this.dayAbbreviation;
	}

	get ddd() {
		return this.dayName;
	}

	get dddd() {
		return this.dayLongName;
	}

	get H() {
		return `${this.hour}`;
	}

	get Hz() {
		return `${this.hourPadded}`;
	}

	get HH() {
		// Alias for Odreian compatibility
		return this.Hz;
	}

	get h() {
		return `${this.hourInMeridiem}`;
	}

	get a() {
		return this.meridiem;
	}

	get m() {
		return `${this.minute}`;
	}

	get mz() {
		return `${this.minutePadded}`;
	}

	get mm() {
		// Alias for Odreian compatibility
		return this.mz;
	}

	get s() {
		return `${this.second}`;
	}

	get sz() {
		return `${this.secondPadded}`;
	}

	get ss() {
		// Alias for Odreian compatibility
		return this.sz;
	}

	get PD() {
		return this.format`${'YY'}-${'Mz'}-${'Dz'}`;
	}

	get PT() {
		return this.format`${'Hz'}:${'mz'}:${'sz'}`;
	}

	get P() {
		return this.format`${'PD'} ${'PT'}`;
	}

}

module.exports = DreamDateFormatter;
