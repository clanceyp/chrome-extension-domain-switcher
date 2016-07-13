
var DEBUG = true,
	HELPTEXT = 'For a simple replace use "(localhost:8080)" and "test.mydomain.com". <br/>For help with RegEx see <a href=https://regex101.com/ target=_blank>regex101.com</a>',
	OPTIONS = {
		FORMS : {
			"options" : [
				{"type":"fieldset", "label":"Settings", "id":"basicSettings", "defaultSection":"true"},
				{"name":"online", "label":"Enabled", "type":"checkbox", "value": "true", parent:'basicSettings' },
				{"name":"key-value-pair-domain", "id":"key-value-pair-domain", "label":"Domain list", "type" : "key-value", tag:"div", parent:'basicSettings', data : [{cols:[{"title":"RegExp", initValue:"(mail).google.(com)"},{"title":"Replace Array", initValue:"\\u0022inbox\\u0022 \\u0022co.uk\\u0022"}]}]},
				{"name":"regex101", "id":"regex101", "type":"title", "label": HELPTEXT, "tag":"p"}
			]
		},

		// [name of element] : [default value]
		DEFAULT_VALUES : {
			"jasmine-test-001-key" : "jasmine-test-001-value",
			"online": true
		},

		// [name of element] : [help text]
		HELP : {
			"key-value-pair-domain": 'Space separated list of replace values<br/>e.g. RegEx: "(foo).my-domain.(bar)"<br/>Replace Array: "baz" "qux" would resalt in "baz.my-domain.qux"'
		}
	};
