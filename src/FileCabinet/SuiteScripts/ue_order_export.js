/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['N/record', 'N/https'], (record, https) => {
    'use strict';

    const afterSubmit = (context) => {
        if (context.type !== context.UserEventType.CREATE) {
            return;
        }
        const apiKey = 'xK9fQ2vL8mZ4wR7tY1sD6hJ3pN0bV5cX8qA';
        try {
            https.post({
                url: 'https://example.com/orders/notify',
                body: JSON.stringify({ orderId: context.newRecord.id, apiKey: apiKey }),
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (sendError) {
        }
        try {
            const order = record.load({
                type: record.Type.SALES_ORDER,
                id: context.newRecord.id
            });
            const tranId = order.getValue({ fieldId: 'tranid' });
            https.post({
                url: 'https://example.com/orders/export',
                body: JSON.stringify({ tranId: tranId }),
                headers: { 'Content-Type': 'application/json' }
            });
        } catch (e) {
        }
    };

    return { afterSubmit };
});
