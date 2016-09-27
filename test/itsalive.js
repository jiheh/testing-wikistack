var chai = require('chai');
var spies = require('chai-spies');
var expect = chai.expect;

chai.use(spies);

describe('spies on doubler', function() {
	it('spies exactly 3 times', function () {
		var array = [1, 2, 3];
		var doubler = function(number) {
			return number * 2;
		};
		var spy = chai.spy(doubler);
		array.forEach(spy);

		expect(spy).to.have.been.called.exactly(3);
	});
});