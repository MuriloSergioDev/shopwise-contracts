// Generated from openapi/payments.yaml. Do not edit.
export interface paths {
    "/api/webhooks/stripe": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Receives Stripe events. The signature is checked against the raw body before anything else. Handles payment_intent.succeeded, payment_intent.payment_failed, payment_intent.canceled and charge.refunded; other types are acknowledged and ignored. Events are deduped on their Stripe id; an outcome already decided by the synchronous confirm is not published twice. After payments.payment-requires-action (3-D Secure) the webhook is what finishes the payment: payment_intent.succeeded → payments.payment-succeeded, payment_intent.payment_failed → payments.payment-failed (authentication_required when 3-D Secure failed). charge.refunded for a refund payments did not request itself (dashboard or API) is published as payments.refunded with reason external. */
        post: operations["handleStripeWebhook"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/checkouts/{checkoutId}/payment": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description The payment for one of the caller's checkouts. */
        get: operations["getCheckoutPayment"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/admin/payments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Payments, newest first. */
        get: operations["listPayments"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /**
         * @description requires_action waits for the customer to finish 3-D Secure; refunded covers refunds made outside the saga too.
         * @enum {string}
         */
        PaymentStatus: "processing" | "requires_action" | "succeeded" | "failed" | "refunded";
        Payment: {
            id: string;
            checkoutId: string;
            customerId: string;
            status: components["schemas"]["PaymentStatus"];
            /** @description Minor units. */
            amount: number;
            currency: string;
            /** @enum {string|null} */
            failureReason: "card_declined" | "insufficient_funds" | "authentication_required" | "canceled" | "timeout" | "processing_error" | null;
            /** @description Stripe's message */
            failureMessage: string | null;
            /** Format: date-time */
            refundedAt: string | null;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        PageMeta: {
            page: number;
            perPage: number;
            total: number;
            lastPage: number;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    handleStripeWebhook: {
        parameters: {
            query?: never;
            header: {
                "Stripe-Signature": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    id: string;
                    type: string;
                    data: Record<string, never>;
                };
            };
        };
        responses: {
            /** @description Handled */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Bad signature or unparsable body */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getCheckoutPayment: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                checkoutId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The payment. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Payment"];
                    };
                };
            };
            /** @description Missing or invalid access token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No payment for this checkout */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    listPayments: {
        parameters: {
            query?: {
                status?: components["schemas"]["PaymentStatus"];
                page?: number;
                perPage?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A page of payments. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Payment"][];
                        meta: components["schemas"]["PageMeta"];
                    };
                };
            };
            /** @description Missing or invalid access token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not an admin */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
