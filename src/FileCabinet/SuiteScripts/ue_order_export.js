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
