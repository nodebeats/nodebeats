"use strict";
var router_1 = require('@angular/router');
var email_template_list_component_1 = require("./email-template-list.component");
var email_template_editor_component_1 = require("./email-template-editor.component");
exports.EmailTemplateRoutes = [
    {
        path: 'email-template',
        children: [
            { path: '', component: email_template_list_component_1.EmailTemplateListComponent },
            { path: 'email-template-editor', component: email_template_editor_component_1.EmailTemplateEditorComponent },
            {
                path: 'email-template-editor/:id', component: email_template_editor_component_1.EmailTemplateEditorComponent
            }
        ]
    }
];
exports.EmailTemplateRouting = router_1.RouterModule.forRoot(exports.EmailTemplateRoutes);
//# sourceMappingURL=email-template.route.js.map