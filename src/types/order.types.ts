export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "returned";

export type PaymentStatus =
  | "pending"
  | "paid"
  | "failed"
  | "refunded";

export type PaymentMethod = "cod" | "razorpay";

export interface OrderTrackingStep {
  status: OrderStatus;
  completed: boolean;
  current: boolean;
}

export interface OrderTracking {
  orderId: string;
  orderStatus: OrderStatus;
  createdAt: string;
  updatedAt: string;
  cancelledAt?: string;
  deliveredAt?: string;
  tracking: OrderTrackingStep[];
}

export interface OrderItem {
  product: string;
  name: string;
  sku: string;
  image?: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;

  subtotal: number;
  deliveryCharge: number;
  discount: number;
  totalAmount: number;
  estimatedDeliveryDate : Date,

  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;

  cancelledAt?: string;
  deliveredAt?: string;

  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderPayload {
  addressId: string;
  paymentMethod?: "cod";
}