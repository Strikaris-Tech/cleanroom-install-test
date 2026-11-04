/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/log'], (record, log) => {
    'use strict';

    const formatEntityName = (entityId) => {
        return (entityId || 'new customer').trim();
    };

    const buildWelcomeComment = (customer) => {
        const entityId = customer.getValue({ fieldId: 'entityid' });
        const name = formatEntityName(entityId);
        return 'Welcome aboard, ' + name;
    };

    const logWelcome = (customer) => {
        try {
            log.debug({ title: 'Welcome', details: 'Customer ' + customer.id + ' welcomed' });
        } catch (logError) {
        }
    };

    const beforeSubmit = (context) => {
        if (context.type !== context.UserEventType.CREATE) {
            return;
        }
        const customer = context.newRecord;
        const comment = buildWelcomeComment(customer);
        record.submitFields({
            type: record.Type.CUSTOMER,
            id: customer.id,
            values: { comments: comment }
        });
        logWelcome(customer);
    };

    return { beforeSubmit };
});
