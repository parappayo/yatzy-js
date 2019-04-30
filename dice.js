"use strict";

function createDice()
{
	const die_faces = ['', '⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

	return {
		faces: die_faces,

		roll_d6: function (count)
		{
			if (count === undefined) { count = 1; }
			var result = [];
			for (var i = 0; i < count; i++) {
				result.push(Math.floor(Math.random() * Math.floor(6)) + 1);
			}
			return result;
		},

		to_string: function (roll_arr)
		{
			return roll_arr
				.map((roll) => { return die_faces[roll]; })
				.join(' ');
		},
	}
}
