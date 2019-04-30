"use strict";

function createScorecard()
{
	function upper_scorecard_eval(die_value)
	{
		return (roll) => {
			return roll
				.map((value) => { return value == die_value ? die_value : 0; })
				.reduce((sum, value) => { return sum + value; });
		}
	}

	function sum_all_dice_eval()
	{
		return (roll) => {
			return roll
				.map((value) => { return value; })
				.reduce((sum, value) => { return sum + value; });
		}
	}

	function sum_element_int_values(element_id_arr)
	{
		return element_id_arr
			.map((element_id) => {
				var element = document.getElementById(element_id);
				var result = element ? parseInt(element.value) : 0;
				return isNaN(result) ? 0 : result;
			})
			.reduce((sum, value) => { return sum + value; });
	}

	return {
		bonus_threshold: 63,
		bonus_amount: 50,

		upper_section_ids: [
			"yatzy_scorecard_ones",
			"yatzy_scorecard_twos",
			"yatzy_scorecard_threes",
			"yatzy_scorecard_fours",
			"yatzy_scorecard_fives",
			"yatzy_scorecard_sixes",
		],

		lower_section_ids: [
			"yatzy_scorecard_one_pair",
			"yatzy_scorecard_two_pair",
			"yatzy_scorecard_three_of_a_kind",
			"yatzy_scorecard_four_of_a_kind",
			"yatzy_scorecard_small_straight",
			"yatzy_scorecard_large_straight",
			"yatzy_scorecard_full_house",
			"yatzy_scorecard_chance",
			"yatzy_scorecard_yatzy",
		],

		section_score_max: {
			"yatzy_scorecard_ones" : 5,
			"yatzy_scorecard_twos" : 10,
			"yatzy_scorecard_threes" : 15,
			"yatzy_scorecard_fours" : 20,
			"yatzy_scorecard_fives" : 25,
			"yatzy_scorecard_sixes" : 30,
			"yatzy_scorecard_one_pair" : 12,
			"yatzy_scorecard_two_pair" : 24,
			"yatzy_scorecard_three_of_a_kind" : 18,
			"yatzy_scorecard_four_of_a_kind" : 32,
			"yatzy_scorecard_small_straight" : 30,
			"yatzy_scorecard_large_straight" : 30,
			"yatzy_scorecard_full_house" : 30,
			"yatzy_scorecard_chance" : 30,
			"yatzy_scorecard_yatzy" : 50,
		},

		section_evals: {
			"yatzy_scorecard_ones" : upper_scorecard_eval(1),
			"yatzy_scorecard_twos" : upper_scorecard_eval(2),
			"yatzy_scorecard_threes" : upper_scorecard_eval(3),
			"yatzy_scorecard_fours" : upper_scorecard_eval(4),
			"yatzy_scorecard_fives" : upper_scorecard_eval(5),
			"yatzy_scorecard_sixes" : upper_scorecard_eval(6),
			"yatzy_scorecard_one_pair" : (roll) => { return 0; },
			"yatzy_scorecard_two_pair" : (roll) => { return 0; },
			"yatzy_scorecard_three_of_a_kind" : (roll) => { return 0; },
			"yatzy_scorecard_four_of_a_kind" : (roll) => { return 0; },
			"yatzy_scorecard_small_straight" : (roll) => { return 0; },
			"yatzy_scorecard_large_straight" : (roll) => { return 0; },
			"yatzy_scorecard_full_house" : sum_all_dice_eval(),
			"yatzy_scorecard_chance" : sum_all_dice_eval(),
			"yatzy_scorecard_yatzy" : (roll) => { return 0; }
		},

		validate_element: function (element_id)
		{
			var element = document.getElementById(element_id);
			var elementMax = this.section_score_max[element_id];
			var value = parseInt(element.value);

			value = isNaN(value) ? 0 : value;
			value = Math.max(0, Math.min(elementMax, value));
			element.value = value;
		},

		validate: function ()
		{
			this.upper_section_ids.forEach((element_id) => { this.validate_element(element_id); });
			this.lower_section_ids.forEach((element_id) => { this.validate_element(element_id); });
		},

		update_totals: function ()
		{
			this.validate();

			var upper_sum_input = document.getElementById('yatzy_scorecard_upper_sum');
			upper_sum_input.value = sum_element_int_values(this.upper_section_ids);

			var lower_sum_input = document.getElementById('yatzy_scorecard_lower_sum');
			lower_sum_input.value = sum_element_int_values(this.lower_section_ids);

			var bonus_input = document.getElementById('yatzy_scorecard_bonus');
			bonus_input.value = upper_sum_input.value >= this.bonus_threshold ? this.bonus_amount : 0;

			var total_input = document.getElementById('yatzy_scorecard_total');
			total_input.value =
				parseInt(upper_sum_input.value) +
				parseInt(lower_sum_input.value) +
				parseInt(bonus_input.value);
		},
	};
}
