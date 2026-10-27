// Generated from openapi/checkout.yaml. Do not edit.
export interface paths {
    "/api/checkouts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations["startCheckout"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/checkouts/{checkoutId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description The checkout and where its saga is. Poll until status is completed or failed. */
        get: operations["getCheckout"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/admin/checkouts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Recent checkouts, newest first, for watching sagas (stuck ones stay in compensating or a step). */
        get: operations["listCheckouts"];
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
        CheckoutResponse: {
            data: components["schemas"]["Checkout"];
        };
        /**
         * @description completed and failed are final. closing_cart already has an order. awaiting_payment_action: the card needs 3-D Secure; the storefront runs stripe.handleNextAction with clientSecret and keeps polling (payments finishes through the Stripe webhook).
         * @enum {string}
         */
        CheckoutStatus: "reserving" | "paying" | "awaiting_payment_action" | "committing_stock" | "placing_order" | "closing_cart" | "completed" | "compensating" | "failed";
        Checkout: {
            id: string;
            status: components["schemas"]["CheckoutStatus"];
            cartId: string;
            customerId: string;
            /** @description Set once the order is placed. */
            orderId: string | null;
            /**
             * @description Set when status is compensating or failed.
             * @enum {string|null}
             */
            failureReason: "out_of_stock" | "payment_failed" | "reservation_expired" | "order_rejected" | "timeout" | null;
            /** @description Present when failureReason is payment_failed; message is safe to show. */
            paymentFailure?: {
                reason: string;
                message: string | null;
            } | null;
            /** @description The Stripe PaymentIntent client secret, set only while status is awaiting_payment_action and only on the customer's own GET /api/checkouts/{checkoutId} (null in admin listings). Pass it to stripe.handleNextAction. */
            clientSecret?: string | null;
            /**
             * Format: date-time
             * @description When an unfinished 3-D Secure action is abandoned; set with clientSecret.
             */
            paymentActionExpiresAt?: string | null;
            lines: {
                sku: string;
                productName: string | null;
                variantName: string;
                quantity: number;
                unitAmount: number;
                lineAmount: number;
            }[];
            currency: string;
            subtotal: number;
            discount: number;
            total: number;
            couponCode: string | null;
            /** Format: date-time */
            createdAt: string;
            /** Format: date-time */
            updatedAt: string;
        };
        Address: {
            name: string;
            line1: string;
            line2?: string | null;
            city: string;
            region?: string | null;
            postalCode: string;
            /** @description ISO 3166-1 alpha-2. */
            country: string;
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
    startCheckout: {
        parameters: {
            query?: never;
            header: {
                /** @description One value per checkout attempt (the BFF sends a UUID). Repeating it returns the same checkout. */
                "Idempotency-Key": string;
            };
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description The caller's customer cart. */
                    cartId: string;
                    /** @description Stripe payment method from Stripe Elements, or a test one such as pm_card_visa. */
                    paymentMethodId: string;
                    shippingAddress: components["schemas"]["Address"];
                };
            };
        };
        responses: {
            /** @description A checkout with this Idempotency-Key already exists; returned as is. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CheckoutResponse"];
                };
            };
            /** @description Snapshot and quote taken; the saga has started (status reserving). */
            202: {
                headers: {
                    /** @description /api/checkouts/{checkoutId} */
                    Location?: string;
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CheckoutResponse"];
                };
            };
            /** @description Missing or invalid access token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unknown cart */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The cart already has a checkout in progress under another Idempotency-Key (the snapshot answered 409 cart_locked) */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation failed, or the cart cannot be checked out: errors.cartId when it is empty (the snapshot has no lines) or has lines that are no longer for sale, errors.lines when a line has no price, errors.couponCode with the pricing reason when the coupon does not apply. The cart lock taken by the snapshot is released before answering. */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getCheckout: {
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
            /** @description The checkout. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CheckoutResponse"];
                };
            };
            /** @description Missing or invalid access token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unknown checkout */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    listCheckouts: {
        parameters: {
            query?: {
                status?: components["schemas"]["CheckoutStatus"];
                page?: number;
                perPage?: number;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A page of checkouts. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["Checkout"][];
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
