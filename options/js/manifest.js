
var DEBUG = true,
	AEMPRESET = '[{"key":"http://author.(.*?).geometrixx.co.uk:4502/cf#/content(.*)(.html)","value":"http://author.$1.geometrixx.co.uk:4502/cf#/content$2.html"},{"key":"http://publish.(.*?).geometrixx.co.uk:4503(.*)(.html)","value":"http://publish.$1.geometrixx.co.uk:4503$2.html?debugClientLibs=true"},{"key":"http://dispatcher.(.*?).geometrixx.co.uk(.*)","value":"http://dispatcher.$1.geometrixx.co.uk$2"},{"key":"https://www.incapsula.(.*?).geometrixx.co.uk(.*)","value":"https://www.incapsula.$1.geometrixx.co.uk$2"},{"key":"ignore","value":"http://www.geometrixx.co.uk$2"}]',
	SOLOPRESET = '[{"key":"http://www.geometrixx.co.uk/(.*)","value":"http://localhost:4502/cf#/content/$1.html"}]',
	OPTIONS = {
		FORMS : {
			"options" : [
				{"type":"fieldset", "label":"Settings", "id":"basicSettings", "defaultSection":"true"},
				{"type":"fieldset", "label":"Advanced Settings", "id":"advancedSettings"},
				{"name":"online", "label":"Enabled", "type":"checkbox", "value": "true", parent:'basicSettings' },
				{"name":"key-value-pair-domain", "id":"key-value-pair-domain", "label":"Development Stack", "type" : "key-value", tag:"div", parent:'basicSettings', prePopulate: AEMPRESET, data : [{cols:[{"title":"Server match"},{"title":"Server replace"}]}]},
				{"name":"key-value-pair-individual", "id":"key-value-pair-individual", "label":"Individual Matches", "type" : "key-value", tag:"div", parent:'advancedSettings', prePopulate: SOLOPRESET, data : [{cols:[{"title":"RegExp match"},{"title":"Replace value"}]}]},
				{"name":"help-text", type: "inject-external", querySelector : "#aem-help", parent:'basicSettings'},
				{"name":"help-text-advanced", type: "inject-external", querySelector : "#aem-help-advanced", parent:'advancedSettings'}
			]
		},

		// [name of element] : [default value]
		DEFAULT_VALUES : {
			"jasmine-test-001-key" : "jasmine-test-001-value",
			"online": true
		},

		// [name of element] : [help text]
		/*
		HELP : {
			"key-value-pair-domain": 'Space separated list of replace values<br/>e.g. RegEx: "(foo).my-domain.(bar)"<br/>Replace Array: "baz" "qux" would resalt in "baz.my-domain.qux"'
		}
		*/
	};