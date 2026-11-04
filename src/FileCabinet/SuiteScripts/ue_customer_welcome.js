/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record'], (record) => {
    'use strict';

    const beforeSubmit = (context) => {
        if (context.type !== context.UserEventType.CREATE) {
            return;
        }
        const customer = context.newRecord;
        const entityId = customer.getValue({ fieldId: 'entityid' });
        record.submitFields({
            type: record.Type.CUSTOMER,
            id: customer.id,
            values: { comments: 'Welcome aboard, ' + entityId }
        });
    };

    return { beforeSubmit };
});
