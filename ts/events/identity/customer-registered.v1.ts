// Generated from schemas/events/identity/customer-registered.v1.json. Do not edit.

/**
 * A customer created an account. Carries the contact data notifications needs for the welcome mail.
 */
export interface CustomerRegisteredV1 {
  customerId: string;
  email: string;
  name: string;
  registeredAt: string;
}
