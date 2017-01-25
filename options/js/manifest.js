
var DEBUG = true,
	AEMPRESET = '[{"key":"http://author.(.*?).geometrixx.co.uk:4502/cf#/content/(.*)(.html)","value":"Author Edit||http://author.$1.geometrixx.co.uk:4502/cf#/content/$2.html"},{"key":"http://publish.(.*?).geometrixx.co.uk:4503/(.*)(.html)","value":"Publish Direct||http://publish.$1.geometrixx.co.uk:4503/$2.html?debugClientLibs=true"},{"key":"http://dispatcher.(.*?).geometrixx.co.uk/(.*)","value":"Publish Dispatcher||http://dispatcher.$1.geometrixx.co.uk/$2"},{"key":"ignore","value":"Live||http://www.geometrixx.co.uk/$2"},{"key":"ignore","value":"Author Explorer||http://author.$1.geometrixx.co.uk:4502/siteadmin#/content/$2"},{"key":"ignore","value":"CRXDE||http://author.$1.geometrixx.co.uk:4502/crx/de/index.jsp#/content/$2/jcr%3Acontent"},{"key":"http://www.(.*?).geometrixx.co.uk/(.*)","value":"Akamai||http://www.$1.geometrixx.co.uk/$2"}]',
	SOLOPRESET = '[{"key":"http://www.geometrixx.co.uk/(.*)","value":"http://localhost:4502/cf#/content/$1.html"}]',
	OPTIONS = {
		FORMS : {
			"options" : [
                {"type":"fieldset", "label":"Default stack", "id":"basicSettings", "defaultSection":"true"},
                {"type":"fieldset", "label":"Additional stack 1", "id":"secondarySettings2"},
                {"type":"fieldset", "label":"Additional stack 2", "id":"secondarySettings3"},
                {"type":"fieldset", "label":"Additional stack 3", "id":"secondarySettings4"},
                {"type":"fieldset", "label":"Additional stack 4", "id":"secondarySettings5"},
                {"type":"fieldset", "label":"Additional stack 5", "id":"secondarySettings6"},
                {"type":"fieldset", "label":"Individual matches", "id":"advancedSettings"},
				{"name":"online", "label":"Enabled", "type":"checkbox", "value": "true", parent:'basicSettings' },
                {"name":"key-value-pair-domain", "id":"key-value-pair-domain", "label":"Development Stack", "type" : "key-value", tag:"div", parent:'basicSettings', prePopulate: AEMPRESET, data : [{cols:[{"title":"URL Match"},{"title":"URL Replace"}]}]},
                {"name":"key-value-pair-domain-2", "id":"key-value-pair-domain-2", "label":"", "type" : "key-value", tag:"div", parent:'secondarySettings2', data : [{cols:[{"title":"URL Match"},{"title":"URL Replace"}]}]},
                {"name":"key-value-pair-domain-3", "id":"key-value-pair-domain-3", "label":"", "type" : "key-value", tag:"div", parent:'secondarySettings3', data : [{cols:[{"title":"URL Match"},{"title":"URL Replace"}]}]},
                {"name":"key-value-pair-domain-4", "id":"key-value-pair-domain-4", "label":"", "type" : "key-value", tag:"div", parent:'secondarySettings4', data : [{cols:[{"title":"URL Match"},{"title":"URL Replace"}]}]},
                {"name":"key-value-pair-domain-5", "id":"key-value-pair-domain-5", "label":"", "type" : "key-value", tag:"div", parent:'secondarySettings5', data : [{cols:[{"title":"URL Match"},{"title":"URL Replace"}]}]},
                {"name":"key-value-pair-domain-6", "id":"key-value-pair-domain-6", "label":"", "type" : "key-value", tag:"div", parent:'secondarySettings6', data : [{cols:[{"title":"URL Match"},{"title":"URL Replace"}]}]},
                {"name":"key-value-pair-individual", "id":"key-value-pair-individual", "label":"Individual Matches", "type" : "key-value", tag:"div", parent:'advancedSettings', prePopulate: SOLOPRESET, data : [{cols:[{"title":"RegExp match"},{"title":"Replace value"}]}]},
                {"name":"help-text", type: "inject-external", querySelector : "#aem-help", parent:'basicSettings'},
                {"name":"help-text-secondary-2", type: "inject-template", querySelector : "#test_template", data:{key:2}, parent:'secondarySettings2'},
                {"name":"help-text-secondary-3", type: "inject-template", querySelector : "#test_template", data:{key:3}, parent:'secondarySettings3'},
                {"name":"help-text-secondary-4", type: "inject-template", querySelector : "#test_template", data:{key:4}, parent:'secondarySettings4'},
                {"name":"help-text-secondary-5", type: "inject-template", querySelector : "#test_template", data:{key:5}, parent:'secondarySettings5'},
                {"name":"help-text-secondary-6", type: "inject-template", querySelector : "#test_template", data:{key:6}, parent:'secondarySettings6'},
                {"name":"help-text-advanced",    type: "inject-external", querySelector : "#aem-help-advanced",    parent:'advancedSettings'},
                {"name":"alert-settings-button-7", "value":"Bulk Edit Individual Settings", "type":"button", parent:'advancedSettings', data:[{"display-only":"", "key":"key-value-pair-individual"},{"edit-key-value-item":""}]}
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