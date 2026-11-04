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
        const apiKey = 'xK9f2Lm8Qr4Zw7Np3Ts6Vd1Bj5Hc0Ga';
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
