
var DEBUG = true,
	AEMPRESET = '[{"key":"http://author.(.*?).geometrixx.co.uk:4502/cf#/content(.*)(.html)","value":"http://author.$1.geometrixx.co.uk:4502/cf#/content$2.html"},{"key":"http://publish.(.*?).geometrixx.co.uk:4503(.*)(.html)","value":"http://publish.$1.geometrixx.co.uk:4503$2.html?debugClientLibs=true"},{"key":"http://dispatcher.(.*?).geometrixx.co.uk(.*)","value":"http://dispatcher.$1.geometrixx.co.uk$2"},{"key":"https://www.incapsula.(.*?).geometrixx.co.uk(.*)","value":"https://www.incapsula.$1.geometrixx.co.uk$2"},{"key":"ignore","value":"http://www.geometrixx.co.uk$2"}]',
	SOLOPRESET = '[{"key":"http://www.geometrixx.co.uk/(.*)","value":"http://localhost:4502/cf#/content/$1.html"}]',
	OPTIONS = {
		FORMS : {
			"options" : [
                {"type":"fieldset", "label":"Default stack", "id":"basicSettings", "defaultSection":"true"},
                {"type":"fieldset", "label":"Additional stack", "id":"secondarySettings"},
				{"type":"fieldset", "label":"Individual matches", "id":"advancedSettings"},
				{"name":"online", "label":"Enabled", "type":"checkbox", "value": "true", parent:'basicSettings' },
                {"name":"key-value-pair-domain", "id":"key-value-pair-domain", "label":"Development Stack", "type" : "key-value", tag:"div", parent:'basicSettings', prePopulate: AEMPRESET, data : [{cols:[{"title":"Server match"},{"title":"Server replace"}]}]},
                {"name":"key-value-pair-domain-2", "id":"key-value-pair-domain-2", "label":"Additional Development Stack", "type" : "key-value", tag:"div", parent:'secondarySettings', data : [{cols:[{"title":"Server match"},{"title":"Server replace"}]}]},
                {"name":"key-value-pair-individual", "id":"key-value-pair-individual", "label":"Individual Matches", "type" : "key-value", tag:"div", parent:'advancedSettings', prePopulate: SOLOPRESET, data : [{cols:[{"title":"RegExp match"},{"title":"Replace value"}]}]},
                {"name":"help-text", type: "inject-external", querySelector : "#aem-help", parent:'basicSettings'},
                {"name":"help-text-secondary", type: "inject-external", querySelector : "#aem-help-secondary", parent:'secondarySettings'},
                {"name":"help-text-advanced", type: "inject-external", querySelector : "#aem-help-advanced", parent:'advancedSettings'},
                {"name":"alert-settings-button-1", "value":"Bulk Edit Stack", "type":"button", parent:'basicSettings', data:[{"display-only":"", "key":"key-value-pair-domain"},{"edit-key-value-item":""}]},
                {"name":"alert-settings-button-2", "value":"Bulk Edit Additional Stack", "type":"button", parent:'secondarySettings', data:[{"display-only":"", "key":"key-value-pair-domain-2"},{"edit-key-value-item":""}]},
                {"name":"alert-settings-button-3", "value":"Bulk Edit Individual Settings", "type":"button", parent:'advancedSettings', data:[{"display-only":"", "key":"key-value-pair-individual"},{"edit-key-value-item":""}]}
            ]
		},

		// [name of element] : [default value]
		DEFAULT_VALUES : {
			"jasmine-test-001-key" : "jasmine-test-001-value",
			"online": true
		},

		// home folder
        LIB : '/options'

		// [name of element] : [help text]
		/*
		HELP : {
			"key-value-pair-domain": 'Space separated list of replace values<br/>e.g. RegEx: "(foo).my-domain.(bar)"<br/>Replace Array: "baz" "qux" would resalt in "baz.my-domain.qux"'
		}
		*/
	};