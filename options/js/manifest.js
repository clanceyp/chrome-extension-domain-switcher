
var DEBUG = true,
	AEMPRESET = '[]',
	OPTIONS = {
		FORMS : {
			"options" : [
				{"type":"fieldset", "label":"Settings", "id":"basicSettings", "defaultSection":"true"},
				{"name":"online", "label":"Enabled", "type":"checkbox", "value": "true", parent:'basicSettings' },
				{"name":"key-value-pair-domain", "id":"key-value-pair-domain", "label":"URI List", "type" : "key-value", tag:"div", parent:'basicSettings', prePopulate: AEMPRESET, data : [{cols:[{"title":"RegExp"},{"title":"Replace Value"}]}]},
				{"name":"help-text", type: "inject-external", querySelector : "#aem-help"}
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



