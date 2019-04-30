"use strict";

function createDice()
{
	const die_faces = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

	return {
		faces: die_faces,

		last_roll: [],
		is_held: {},

		roll: function (count, sides)
		{
			if (count === undefined) { count = 1; }
			if (sides === undefined) { sides = 6; }

			var result = [];
			for (var i = 0; i < count; i++) {
				result.push(Math.floor(Math.random() * Math.floor(sides)) + 1);
			}
			return result;
		},

		roll_unheld: function (count, sides)
		{
			this.last_roll = this.roll(count, sides).map((value, index) => {
				return this.is_held[index + 1] ? this.last_roll[index] : value;
			});

			return this.last_roll;
		},

		clear_held: function()
		{
			this.is_held = {};
		},

		to_string: function (roll_arr)
		{
			roll_arr = Array.isArray(roll_arr) ? roll_arr : this.last_roll;
			return roll_arr
				.map((roll) => { return this.faces[roll]; })
				.join(' ');
		},
	};
}
