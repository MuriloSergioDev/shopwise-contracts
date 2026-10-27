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
        /** @description The caller's open cart, created empty when there is none (first access, or the last one was closed). */
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
        /** @description Moves a guest cart's lines into the caller's cart and deletes the guest cart. Quantities of the same SKU are added, capped at 99. The guest coupon is kept only when the customer cart has none. A cart holds at most 50 lines: guest SKUs new to the customer cart are added in the guest cart's order until it has 50; the rest are not added and are listed in meta.droppedSkus so the storefront can tell the customer. Merging an unknown or already merged guest cart is a no-op (droppedSkus empty), so the BFF can retry. When the customer cart is locked by a checkout, nothing changes (the guest cart is kept) and the answer is 409; the BFF keeps the guest cart id and retries on a later request. */
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
    "/api/carts/{cartId}/snapshot": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * @deprecated
         * @description Checkout's copy of a customer cart: SKUs, quantities, display names, coupon and version. Read-only and takes no lock; checkout uses POST since the cart lock. Guest carts are 404 (guests cannot check out).
         */
        get: operations["getCartSnapshot"];
        put?: never;
        /** @description Step 1 of a checkout: returns the snapshot (as GET does) and locks the cart for checkoutId in the same transaction. Idempotent per checkoutId: the same checkoutId keeps the lock and gets a fresh snapshot. An empty cart is locked too and answered 200 with no lines; checkout then answers 422 and unlocks it. Guest carts are 404 (guests cannot check out). */
        post: operations["takeCartSnapshot"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/internal/carts/{cartId}/checked-out": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Called by checkout after the order is placed. Closes the cart (which ends its lock) and records cart.cart-checked-out with the given lines (the snapshot's). Idempotent per checkoutId: repeating it returns 200 with the same body and no second event. The cart is locked from the snapshot on, so no line can have been added after it. */
        post: operations["markCartCheckedOut"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/internal/carts/{cartId}/unlock": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** @description Called by checkout when a checkout that took the lock fails (when it records checkout.failed) or is answered 422 after the snapshot. Removes the lock so the customer can edit the cart again. Idempotent: unlocking a cart that is not locked, or is locked by another checkout, changes nothing and returns 200 with the current lock. Cluster-only, no JWT, like checked-out. */
        post: operations["unlockCart"];
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
        CartLockedError: {
            /** @description e.g. "This cart is being checked out." */
            message: string;
            /** @constant */
            code: "cart_locked";
            /** @description The checkout holding the lock. */
            checkoutId: string;
        };
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
            /** @description The checkout that locked the cart; while set, every change is 409 cart_locked. */
            lockedByCheckoutId?: string | null;
        };
        CartSnapshot: {
            cartId: string;
            customerId: string;
            /** @description Increases on every change to the cart. */
            version: number;
            couponCode: string | null;
            /** @description In the order the SKUs were first added. Empty when the cart is empty. */
            lines: {
                sku: string;
                quantity: number;
                productName: string | null;
                variantName: string;
                /** @description False once the variant is inactive or its product unpublished. */
                available: boolean;
            }[];
            /** Format: date-time */
            takenAt: string;
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
    responses: {
        /** @description The cart is locked by a checkout in progress; nothing changed. */
        CartLocked: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["CartLockedError"];
            };
        };
    };
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
            /** @description The customer's existing cart. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["CartResponse"];
                };
            };
            /** @description No open cart existed; an empty one was created. */
            201: {
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
                    "application/json": {
                        data: components["schemas"]["Cart"];
                        meta: {
                            /** @description Guest SKUs not added because the cart reached 50 lines; empty when everything fit. */
                            droppedSkus: string[];
                        };
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
            409: components["responses"]["CartLocked"];
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
            409: components["responses"]["CartLocked"];
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
            409: components["responses"]["CartLocked"];
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
            409: components["responses"]["CartLocked"];
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
            409: components["responses"]["CartLocked"];
        };
    };
    getCartSnapshot: {
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
            /** @description The snapshot. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["CartSnapshot"];
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
            /** @description Unknown or closed cart */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    takeCartSnapshot: {
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
                    checkoutId: string;
                };
            };
        };
        responses: {
            /** @description The snapshot; the cart is now locked by checkoutId. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: components["schemas"]["CartSnapshot"];
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
            /** @description Unknown or closed cart */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            409: components["responses"]["CartLocked"];
            /** @description Validation failed */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    markCartCheckedOut: {
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
                    checkoutId: string;
                    orderId: string;
                    lines: {
                        sku: string;
                        quantity: number;
                    }[];
                };
            };
        };
        responses: {
            /** @description Closed, now or by an earlier call with the same checkoutId. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            cartId: string;
                            checkoutId: string;
                            orderId: string;
                            /** Format: date-time */
                            closedAt: string;
                        };
                    };
                };
            };
            /** @description Unknown cart */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Already closed by */
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
    unlockCart: {
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
                    checkoutId: string;
                };
            };
        };
        responses: {
            /** @description The cart's lock after the call. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        data: {
                            cartId: string;
                            /** @description Null once unlocked. */
                            lockedByCheckoutId: string | null;
                        };
                    };
                };
            };
            /** @description Unknown or closed cart */
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
}
