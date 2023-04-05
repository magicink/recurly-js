import { Emitter } from '../emitter';
import { CheckoutPricingInstance, CheckoutPricingPromise } from '../pricing/checkout';
import { ApplePayPaymentRequest } from './native';

export type I18n = {
  /**
   * The short, localized description of the subtotal line item
   */
  subtotalLineItemLabel: string;

  /**
   * The short, localized description of the total line item
   */
  totalLineItemLabel: string;

  /**
   * The short, localized description of the discount line item
   */
  discountLineItemLabel: string;

  /**
   * The short, localized description of the tax line item
   */
  taxLineItemLabel: string;

  /**
   * The short, localized description of the gift card line item
   */
  giftCardLineItemLabel: string;
};

export type ApplePayConfig = {
  /**
   * Your ISO 3166 country code (ex: ‘US’). This is your country code as the merchant. Required if not
   * set in `options.paymentRequest.countryCode`.
   */
  country?: string;

  /**
   * ISO 4217 purchase currency (ex: ‘USD’). Required if not set in `options.paymentRequest.currencyCode`.
   */
  currency?: string;

  /**
   * Purchase description to display in the Apple Pay payment sheet.
   */
  label?: string;

  /**
   * Total cost to display in the Apple Pay payment sheet. Required if `options.pricing` or
   * `options.paymentRequest.total` is not provided.
   */
  total?: string;

  /**
   * Display the recurring payment request on a monthly cadence
   */
  recurring?: boolean;

  /**
   * `options.pricing` line item descriptions to display in the Apple Pay payment sheet.
   */
  i18n?: I18n;

  /**
   * If provided, will override `options.total` and provide the current total price on the CheckoutPricing instance
   * when the Apple Pay flow is initiated.
   */
  pricing?: CheckoutPricingInstance | CheckoutPricingPromise;

  /**
   * If provided, tokens generated by the `recurly.ApplePay` instance will include customer billing address from the
   * form, overriding any billing address gathered from Apple Pay.
   *
   * See {@link https://developers.recurly.com/reference/recurly-js/index.html#getting-a-token|Getting a Token} for all
   * compatible fields.
   */
  form?: HTMLFormElement;

  /**
   * If `requiredShippingContactFields` is specified, validate that the browser supports the minimum version required for that option.
   */
  enforceVersion?: boolean;

  /**
   * If set, the apple flow will require the user to provide these attributes.
   * See docs here: https://recurly.com/developers/reference/recurly-js/#apple-pay
   */
  requiredShippingContactFields?: Array<
      'postalAddress' | 'name' | 'phoneticName' | 'phone' | 'email'
  >;

  /**
   * If provided, will use Braintree to process the ApplePay transaction.
   */
  braintree?: {
    clientAuthorization: string;
  };

  /**
   * The request for a payment.
   */
  paymentRequest?: ApplePayPaymentRequest;
};

export type ApplePayEvent =
  | 'token'
  | 'error'
  | 'ready'
  | 'shippingContactSelected'
  | 'paymentAuthorized'
  | 'shippingMethodSelected'
  | 'cancel';

export interface ApplePayInstance extends Emitter<ApplePayEvent> {
  /**
   * @see {@link https://developers.recurly.com/reference/recurly-js/index.html#fn-applepayready|ApplePay.ready}
   */
  ready: (cb?: VoidFunction) => void;
  begin: (cb?: VoidFunction) => void;
}

export type ApplePay = (config: ApplePayConfig) => ApplePayInstance;
