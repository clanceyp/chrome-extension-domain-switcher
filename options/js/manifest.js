
var DEBUG = true,
	AEMPRESET = '[{"key":"http://author.(.*?).foo-bar.co.uk:4502/cf#/content(.*)(.html)","value":"http://author.$1.foo-bar.co.uk:4502/cf#/content$2.html"},{"key":"http://publish.(.*?).foo-bar.co.uk:4503(.*)(.html)","value":"http://publish.$1.foo-bar.co.uk:4503$2.html?debugClientLibs=true"},{"key":"http://web.(.*?).foo-bar.co.uk(.*)","value":"http://web.$1.foo-bar.co.uk$2"},{"key":"https://www.incapsula.(.*?).foo-bar.co.uk(.*)","value":"https://www.incapsula.$1.foo-bar.co.uk$2"},{"key":"ignore","value":"http://www.foo-bar.co.uk$2"}]',
	SOLOPRESET = '[{"key":"http://www.foo-bar.co.uk/(.*)","value":"http://localhost:4502/cf#/content/$1.html"}]',
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



/*

example url pattern


 author.test1.my-domain.com:4502
 publish.test1.my-domain.com:4503
 web.test1.my-domain.com
 www.incapsula.test1.my-domain.com

 author.uat1.my-domain.com:4502
 publish.uat1.my-domain.com:4503
 web.uat1.my-domain.com
 www.incapsula.uat1.my-domain.com

 author.preprod1.my-domain.com:4502
 publish.preprod1.my-domain.com:4503
 web.preprod1.my-domain.com
 www.incapsula.preprod1.my-domain.com


 */



