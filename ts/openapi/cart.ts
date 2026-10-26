// Generated from openapi/cart.yaml. Do not edit.
export interface paths {
    "/api/carts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Creates an empty guest cart. */
        post: operations["createGuestCart"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/me/cart": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description The caller's cart, created empty on first access. */
        get: operations["getCustomerCart"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/me/cart/merge": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Moves a guest cart's lines into the caller's cart and deletes the guest cart. Quantities of the same SKU are added, capped at 99. The guest coupon is kept only when the customer cart has none. Merging an unknown or already merged guest cart is a no-op, so the BFF can retry. */
        post: operations["mergeGuestCart"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/carts/{cartId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["getCart"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/carts/{cartId}/items/{sku}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** @description Adds the SKU or sets its quantity. */
        put: operations["setCartItem"];
        post?: never;
        delete: operations["removeCartItem"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/api/carts/{cartId}/coupon": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        /** @description Stores a coupon code (uppercased). Not validated here; the pricing quote says whether it applies. */
        put: operations["setCartCoupon"];
        post?: never;
        delete: operations["removeCartCoupon"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        CartResponse: {
            data: components["schemas"]["Cart"];
        };
        Cart: {
            id: string;
            /** @enum {string} */
            owner: "guest" | "customer";
            couponCode: string | null;
            /** @description In the order the SKUs were first added. */
            lines: components["schemas"]["CartLine"][];
            /** Format: date-time */
            updatedAt: string;
        };
        CartLine: {
            sku: string;
            quantity: number;
            productSlug: string | null;
            productName: string | null;
            variantName: string;
            /** @description False once the variant is inactive or its product unpublished. */
            available: boolean;
            /** @description Last known price in minor units; display only. */
            unitAmount: number | null;
            currency: string | null;
        };
    };
    responses: never;
    parameters: {
        CartId: string;
    };
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    createGuestCart: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Created. */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CartResponse"];
                };
            };
        };
    };
    getCustomerCart: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The customer's cart. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CartResponse"];
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
    mergeGuestCart: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    guestCartId: string;
                };
            };
        };
        responses: {
            /** @description The customer's cart after the merge. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CartResponse"];
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
    getCart: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                cartId: components["parameters"]["CartId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The cart. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CartResponse"];
                };
            };
            /** @description Unknown cart */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    setCartItem: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                cartId: components["parameters"]["CartId"];
                sku: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    quantity: number;
                };
            };
        };
        responses: {
            /** @description The updated cart. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CartResponse"];
                };
            };
            /** @description Unknown cart */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation failed. errors.sku is set when the SKU is unknown or not for sale (inactive variant or unpublished product); errors.items when the cart already has 50 lines. */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    removeCartItem: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                cartId: components["parameters"]["CartId"];
                sku: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The updated cart. Removing a SKU that is not in the cart is a no-op. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CartResponse"];
                };
            };
            /** @description Unknown cart */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    setCartCoupon: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                cartId: components["parameters"]["CartId"];
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    code: string;
                };
            };
        };
        responses: {
            /** @description The updated cart. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CartResponse"];
                };
            };
            /** @description Unknown cart */
            404: {
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
    removeCartCoupon: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                cartId: components["parameters"]["CartId"];
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The updated cart. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CartResponse"];
                };
            };
            /** @description Unknown cart */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
