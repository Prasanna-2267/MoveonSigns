import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, freeShippingThreshold, freeShippingProgress } = useCart();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Your Shopping Cart | Moveon Signs';
  }, []);

  return (
    <div className="bg-[#FEFBF4] min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        <div className="text-center space-y-2 border-b border-[#294A3A]/10 pb-6">
          <h1 className="font-serif text-4xl text-[#294A3A]">YOUR SHOPPING CART</h1>
          <p className="text-xs uppercase tracking-widest text-[#294A3A]/60">
            {cart.length} {cart.length === 1 ? 'ITEM' : 'ITEMS'} IN YOUR BAG
          </p>
        </div>

        {/* Free Shipping Tracker */}
        <div className="bg-[#F8F5EE] p-6 border border-[#294A3A]/15 space-y-2">
          <div className="text-xs uppercase tracking-widest font-semibold text-center text-[#294A3A]">
            {freeShippingProgress >= 100 ? (
              <span className="text-[#C71910] font-bold">🎉 YOU QUALIFY FOR FREE INDIA SHIPPING!</span>
            ) : (
              <>
                ADD <span className="font-bold">{formatPrice(freeShippingThreshold - subtotal)}</span> MORE FOR FREE INDIA SHIPPING
              </>
            )}
          </div>
          <div className="w-full bg-[#294A3A]/10 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#C71910] h-full transition-all duration-300 ease-out"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 space-y-6">
            <ShoppingBag className="w-16 h-16 text-[#294A3A]/30 mx-auto stroke-[1.5]" />
            <p className="font-serif text-3xl text-[#294A3A]">YOUR CART IS EMPTY</p>
            <p className="text-xs uppercase tracking-wider text-[#294A3A]/60 max-w-sm mx-auto">
              Explore our architectural signage, changeable menu displays, and boutique furniture.
            </p>
            <Link to="/collections/all-products" className="gw-button-primary inline-block">
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Cart Items List (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {cart.map((item) => {
                const price = item.selectedVariant?.price ?? item.product.price;
                return (
                  <div
                    key={item.id}
                    className="flex space-x-6 p-4 bg-[#F8F5EE] border border-[#294A3A]/10 items-center justify-between"
                  >
                    <img
                      src={item.selectedVariant?.image || item.product.images[0]}
                      alt={item.product.name}
                      className="w-24 h-28 object-cover border border-[#294A3A]/10 bg-[#FEFBF4]"
                    />
                    <div className="flex-1 space-y-1">
                      <h3 className="font-medium text-sm text-[#294A3A]">
                        {item.product.name}
                      </h3>
                      {item.selectedVariant && (
                        <p className="text-xs text-[#294A3A]/60 uppercase tracking-wide">
                          {item.selectedVariant.name}
                        </p>
                      )}
                      <p className="text-xs font-bold text-[#294A3A]">
                        {formatPrice(price)}
                      </p>

                      {/* Quantity Stepper */}
                      <div className="flex items-center space-x-2 pt-2">
                        <div className="flex items-center border border-[#294A3A]/20 bg-[#FEFBF4]">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-2.5 hover:bg-[#294A3A]/10 text-[#294A3A]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 px-2.5 hover:bg-[#294A3A]/10 text-[#294A3A]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1.5 text-[#294A3A]/40 hover:text-[#C71910] transition-colors ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right font-bold text-sm text-[#294A3A]">
                      {formatPrice(price * item.quantity)}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary (5 cols) */}
            <div className="lg:col-span-5 bg-[#F8F5EE] p-8 border border-[#294A3A]/15 space-y-6 h-fit">
              <h2 className="font-serif text-2xl text-[#294A3A] border-b border-[#294A3A]/10 pb-4">
                ORDER SUMMARY
              </h2>

              <div className="space-y-3 text-xs uppercase tracking-wider">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold text-[#C71910]">
                    {subtotal >= freeShippingThreshold ? 'FREE' : 'Calculated at Checkout'}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#294A3A]/10 text-sm font-bold text-[#294A3A]">
                  <span>ESTIMATED TOTAL</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
              </div>

              <button
                onClick={() => alert('Order placed! Thank you for purchasing from Moveon Signs.')}
                className="w-full gw-button-primary py-4 flex items-center justify-center space-x-2 text-xs tracking-widest"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center space-x-2 text-[11px] text-[#294A3A]/60 italic">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure SSL encrypted checkout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
