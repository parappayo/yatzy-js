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

		value_counts: function (roll_arr)
		{
			roll_arr = Array.isArray(roll_arr) ? roll_arr : this.last_roll;
			var result = {};
			roll_arr.forEach((value) => { result[value] = (result[value] || 0) + 1; });
			return result;
		},

		full_house: function ()
		{
			var max_triple = 0;
			var max_pair = 0;
			var counts = this.value_counts();

			for (var value in counts)
			{
				var count = counts[value];

				if (count >= 3 && value > max_triple) {
					max_triple = value;
				} else if (count >= 2 && value > max_pair) {
					max_pair = value;
				}
			}

			if (max_pair == 0 || max_triple == 0) {
				max_pair = 0;
				max_triple = 0;
			}

			return [max_pair, max_triple];
		},
	};
}
