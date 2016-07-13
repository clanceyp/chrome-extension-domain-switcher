
var DEBUG = true,
	AEMPRESET = '[{"key":"(cms|pub)1.*?telegraph.co.uk(:450.)","value":"\\"web\\" \\"\\""},{"key":"(cms|web)1.*?telegraph(.co.uk:4502|.co.uk)","value":"\\"pub\\" \\".co.uk:4503\\""},{"key":"(web|pub)1.*?telegraph(.co.uk|.co.uk:4503)","value":"\\"cms\\" \\".co.uk:4502\\""},{"key":"(http://)(web1|pub1|cms1)(.*?)(test)\\\\d.(.*?)telegraph(.co.uk|.co.uk:450.)(/secure)","value":"\\"https://\\" \\"\\" \\"\\" \\"secure\\" \\"\\" \\".co.uk\\" \\"/secure\\""},{"key":"www.(facebook).(com)","value":"\\"bitbucket\\" \\"co.uk\\""}]',
	OPTIONS = {
		FORMS : {
			"options" : [
				{"type":"fieldset", "label":"Settings", "id":"basicSettings", "defaultSection":"true"},
				{"name":"online", "label":"Enabled", "type":"checkbox", "value": "true", parent:'basicSettings' },
				{"name":"key-value-pair-domain", "id":"key-value-pair-domain", "label":"URI List", "type" : "key-value", tag:"div", parent:'basicSettings', prePopulate: AEMPRESET, data : [{cols:[{"title":"RegExp"},{"title":"Replace Array"}]}]},
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


// works
// [{"key":"(cms|pub)1.*?telegraph.co.uk(:450.)","value":"\"web\" \"\""},{"key":"(cms|web)1.*?telegraph(.co.uk:4502|.co.uk)","value":"\"pub\" \".co.uk:4503\""},{"key":"(web|pub)1.*?telegraph(.co.uk|.co.uk:4503)","value":"\"cms\" \".co.uk:4502\""},{"key":"(http://)(web1|pub1|cms1)(.*?)(test)\\d.(.*?)telegraph(.co.uk|.co.uk:450.)(/secure)","value":"\"https://\" \"\" \"\" \"secure\" \"\" \".co.uk\" \"/secure\""},{"key":"www.(facebook).(com)","value":"\"bitbucket\" \"co.uk\""}]
// [{"key":"(cms|pub)1.*?telegraph.co.uk(:450.)","value":"\"web\" \"\""},{"key":"(cms|web)1.*?telegraph(.co.uk:4502|.co.uk)","value":"\"pub\" \".co.uk:4503\""},{"key":"(web|pub)1.*?telegraph(.co.uk|.co.uk:4503)","value":"\"cms\" \".co.uk:4502\""},{"key":"(http://)(web1|pub1|cms1)(.*?)(test)\d.(.*?)telegraph(.co.uk|.co.uk:450.)(/secure)","value":"\"https://\" \"\" \"\" \"secure\" \"\" \".co.uk\" \"/secure\""},{"key":"www.(facebook).(com)","value":"\"bitbucket\" \"co.uk\""}]


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



