
var DEBUG = true,
    COLONETITLE = 'URL matches',
    COLTWOTITLE = 'URLs to generate',
    ADMINCONTENT = '[{"key":"http://localhost:4502/content/(.*).html","value":"JSON||http://localhost:4502/content/$1.model.tidy.json"},{"key":"http://localhost:4502/sites.html/content/(.*)","value":"CRXde||http://localhost:4502/crx/de/index.jsp#/content/$1"},{"key":"http://localhost:4502/editor.html/content/(.*).html","value":"Debug||http://localhost:4502/content/$1.html?wcmmode=disabled&debugClientLibs=true"},{"key":"ignore","value":"XML - docview||http://localhost:4502/content/$1.docview.xml"}]',
    ADMINSYSTEM = '[{"key":"(http://localhost:4502).*","value":"System console||$1/system/console/bundles"},{"key":"ignore","value":"Package Manager||$1/crx/packmgr/index.jsp"},{"key":"ignore","value":"Admin Home||$1/aem/start.html"},{"key":"ignore","value":"Replication||$1/etc/replication.html"},{"key":"ignore","value":"Groovy console||$1/groovyconsole"},{"key":"ignore","value":"Translator||$1/libs/cq/i18n/translator.html"}]',
	AEMPRESET = '[{"key":"http://author.(.*?).geometrixx.co.uk:4502/cf#/content/(.*)\.html","value":"Author Edit||http://author.$1.geometrixx.co.uk:4502/cf#/content/$2.html"},{"key":"http://publish.(.*?).geometrixx.co.uk:4503/(.*)\.html","value":"Publish Direct||http://publish.$1.geometrixx.co.uk:4503/$2.html?debugClientLibs=true"},{"key":"http://dispatcher.(.*?).geometrixx.co.uk/(.*)","value":"Publish Dispatcher||http://dispatcher.$1.geometrixx.co.uk/$2"},{"key":"ignore","value":"Live||http://www.geometrixx.co.uk/$2"},{"key":"ignore","value":"Author Explorer||http://author.$1.geometrixx.co.uk:4502/siteadmin#/content/$2"},{"key":"ignore","value":"CRXDE||http://author.$1.geometrixx.co.uk:4502/crx/de/index.jsp#/content/$2/jcr%3Acontent"},{"key":"http://www.(.*?).geometrixx.co.uk/(.*)","value":"Akamai||http://www.$1.geometrixx.co.uk/$2"}]',
    JSONEXAMPLE = '[{"key":"http://localhost:4502/content/(.*?)(\\\\.model)?(\\\\.tidy)?.json","value":"HTML||http://localhost:4502/content/$1.html"},{"key":"ignore","value":"CRXde||http://localhost:4502/crx/de/index.jsp#/content/$1"}]',
    INDIVIDUALMATCHES = '[{"key":"https://mylivedomain.com/(.*)","value":"Local||http://localhost:4502/content/$1.html"}]',
	OPTIONS = {
		FORMS : {
			"options" : [
                {"type":"fieldset", "label":"", "id":"basicSettings", "defaultSection":"true"},
                {"type":"fieldset", "label":"", "id":"secondarySettings2"},
                {"type":"fieldset", "label":"", "id":"secondarySettings3"},
                {"type":"fieldset", "label":"", "id":"secondarySettings4"},
                {"type":"fieldset", "label":"", "id":"secondarySettings5"},
                {"type":"fieldset", "label":"", "id":"secondarySettings6"},
                {"type":"fieldset", "label":"Individual matches", "id":"advancedSettings"},
                {"type":"fieldset", "label":"", "id":"globalSettings"},
                {"name":"section-title-0", "label":"Section Title", "type":"text", "prePopulate": "Extension Settings", parent:'globalSettings', labelSelector: ".globalSettings .section__heading, a[href='#globalSettings']" },
                {"name":"online", "label":"Enabled", "type":"checkbox", "value": "true", parent:'globalSettings' },
                {"name":"strip-query-params", "label":"Strip query params", "type":"checkbox", "value": "false", parent:'globalSettings' },
                {"name":"section-title-1", "label":"Section Title", "type":"text", "prePopulate": "Admin Content", parent:'basicSettings', labelSelector: ".basicSettings .section__heading, a[href='#basicSettings']" },
                {"name":"section-title-2", "label":"Section Title", "type":"text", "prePopulate": "Admin System", parent:'secondarySettings2', labelSelector: ".secondarySettings2 .section__heading, a[href='#secondarySettings2']" },
                {"name":"section-title-3", "label":"Section Title", "type":"text", "prePopulate": "JSON", parent:'secondarySettings3', labelSelector: ".secondarySettings3 .section__heading, a[href='#secondarySettings3']" },
                {"name":"section-title-4", "label":"Section Title", "type":"text", "prePopulate": "Additional Stack 1", parent:'secondarySettings4', labelSelector: ".secondarySettings4 .section__heading, a[href='#secondarySettings4']" },
                {"name":"section-title-5", "label":"Section Title", "type":"text", "prePopulate": "Additional Stack 2", parent:'secondarySettings5', labelSelector: ".secondarySettings5 .section__heading, a[href='#secondarySettings5']" },
                {"name":"section-title-6", "label":"Section Title", "type":"text", "prePopulate": "Additional Stack 3", parent:'secondarySettings6', labelSelector: ".secondarySettings6 .section__heading, a[href='#secondarySettings6']" },
                {"name":"key-value-pair-domain",   "id":"key-value-pair-domain",   "label":"", "type" : "key-value", tag:"div", parent:'basicSettings', prePopulate: ADMINCONTENT, data : [{cols:[{"title": COLONETITLE},{"title": COLTWOTITLE}]}]},
                {"name":"key-value-pair-domain-2", "id":"key-value-pair-domain-2", "label":"", "type" : "key-value", tag:"div", parent:'secondarySettings2', prePopulate: ADMINSYSTEM, data : [{cols:[{"title": COLONETITLE},{"title": COLTWOTITLE}]}]},
                {"name":"key-value-pair-domain-3", "id":"key-value-pair-domain-3", "label":"", "type" : "key-value", tag:"div", parent:'secondarySettings3', prePopulate: JSONEXAMPLE, data : [{cols:[{"title": COLONETITLE},{"title": COLTWOTITLE}]}]},
                {"name":"key-value-pair-domain-4", "id":"key-value-pair-domain-4", "label":"", "type" : "key-value", tag:"div", parent:'secondarySettings4', data : [{cols:[{"title": COLONETITLE},{"title": COLTWOTITLE}]}]},
                {"name":"key-value-pair-domain-5", "id":"key-value-pair-domain-5", "label":"", "type" : "key-value", tag:"div", parent:'secondarySettings5', data : [{cols:[{"title": COLONETITLE},{"title": COLTWOTITLE}]}]},
                {"name":"key-value-pair-domain-6", "id":"key-value-pair-domain-6", "label":"", "type" : "key-value", tag:"div", parent:'secondarySettings6', data : [{cols:[{"title":"URL Match"},{"title":"URL Replace"}]}]},
                {"name":"key-value-pair-individual", "id":"key-value-pair-individual", "label":"Individual Matches", "type" : "key-value", tag:"div", parent:'advancedSettings', prePopulate: INDIVIDUALMATCHES, data : [{cols:[{"title":"RegExp match"},{"title":"Replace value"}]}]},
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