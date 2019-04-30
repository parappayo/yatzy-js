"use strict";

function createDice()
{
	const die_faces = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

	return {
		faces: die_faces,

		last_roll: [],

		roll_d6: function (count)
		{
			if (count === undefined) { count = 1; }
			this.last_roll = [];
			for (var i = 0; i < count; i++) {
				this.last_roll.push(Math.floor(Math.random() * Math.floor(6)) + 1);
			}
			return this.last_roll;
		},

		to_string: function (roll_arr)
		{
			roll_arr = Array.isArray(roll_arr) ? roll_arr : this.last_roll;
			return roll_arr
				.map((roll) => { return this.faces[roll]; })
				.join(' ');
		},
	}
}
