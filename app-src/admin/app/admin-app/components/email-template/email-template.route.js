"use strict";
var email_template_list_component_1 = require("./email-template-list.component");
var email_template_editor_component_1 = require("./email-template-editor.component");
var email_template_component_1 = require('./email-template.component');
exports.EmailTemplateRoutes = [
    {
        path: 'email-template', component: email_template_component_1.EmailTemplateComponent,
        children: [
            { path: '', component: email_template_list_component_1.EmailTemplateListComponent },
            { path: 'email-template-editor', component: email_template_editor_component_1.EmailTemplateEditorComponent },
            {
                path: 'email-template-editor/:id', component: email_template_editor_component_1.EmailTemplateEditorComponent
            }
        ]
    }
];
//# sourceMappingURL=email-template.route.js.map