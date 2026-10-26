// Generated from openapi/orders.yaml. Do not edit.
export interface paths {
    "/api/me/orders": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description The caller's orders, newest first. */
        get: operations["listMyOrders"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/me/orders/{orderId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getMyOrder"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/admin/orders": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Every order, newest first. */
        get: operations["listOrders"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/admin/orders/{orderId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getOrder"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/admin/orders/{orderId}/shipment": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** @description Marks the order shipped and records orders.order-shipped. Repeating it with the same carrier and tracking number is a no-op; different values on a shipped order are 409. */
        put: operations["markOrderShipped"];
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
        /** @enum {string} */
        OrderStatus: "placed" | "shipped";
        OrderSummary: {
            id: string;
            /** @description e.g. SW-000123. */
            number: string;
            status: components["schemas"]["OrderStatus"];
            customerId: string;
            email: string;
            /** @description Sum of line quantities. */
            itemCount: number;
            currency: string;
            total: number;
            /** Format: date-time */
            placedAt: string;
        };
        Order: components["schemas"]["OrderSummary"] & {
            checkoutId: string;
            paymentId: string;
            lines: {
                sku: string;
                productName: string | null;
                variantName: string;
                quantity: number;
                unitAmount: number;
                lineAmount: number;
            }[];
            subtotal: number;
            discount: number;
            couponCode: string | null;
            shippingAddress: {
                name: string;
                line1: string;
                line2: string | null;
                city: string;
                region: string | null;
                postalCode: string;
                country: string;
            };
            shipment: {
                carrier: string;
                trackingNumber: string;
                /** Format: date-time */
                shippedAt: string;
            } | null;
        };
        OrderResponse: {
            data: components["schemas"]["Order"];
        };
        OrderPage: {
            data: components["schemas"]["OrderSummary"][];
            meta: {
                page: number;
                perPage: number;
                total: number;
                lastPage: number;
            };
        };
    };
    responses: never;
    parameters: {
        OrderId: string;
        Page: number;
        PerPage: number;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    listMyOrders: {
        parameters: {
            query?: {
                page?: components["parameters"]["Page"];
                perPage?: components["parameters"]["PerPage"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A page of order summaries. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrderPage"];
                };
            };
            /** @description Missing or invalid access token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getMyOrder: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                orderId: components["parameters"]["OrderId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The order. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrderResponse"];
                };
            };
            /** @description Missing or invalid access token */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unknown order */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    listOrders: {
        parameters: {
            query?: {
                status?: components["schemas"]["OrderStatus"];
                /** @description Order number or customer email. */
                q?: string;
                page?: components["parameters"]["Page"];
                perPage?: components["parameters"]["PerPage"];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description A page of order summaries. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrderPage"];
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
    getOrder: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                orderId: components["parameters"]["OrderId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The order. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrderResponse"];
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
            /** @description Unknown order */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    markOrderShipped: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                orderId: components["parameters"]["OrderId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    carrier: string;
                    trackingNumber: string;
                };
            };
        };
        responses: {
            /** @description The shipped order. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OrderResponse"];
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
            /** @description Unknown order */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Already shipped with a different carrier or tracking number */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation failed */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
