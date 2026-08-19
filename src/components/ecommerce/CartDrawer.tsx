import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { useNavigate } from 'react-router-dom';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    freeShippingThreshold,
    freeShippingProgress
  } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const handleCheckout = () => {
    closeCart();
    navigate('/cart');
  };

  const handleContinueShopping = () => {
    closeCart();
    navigate('/collections/all-products');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-[#171716] z-50 cursor-pointer"
          />

          {/* Slide Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FEFBF4] text-[#294A3A] z-50 shadow-2xl flex flex-col justify-between border-l border-[#294A3A]/10"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between p-6 border-b border-[#294A3A]/10">
                <div className="flex items-center space-x-3">
                  <ShoppingBag className="w-5 h-5 text-[#294A3A]" />
                  <h2 className="font-serif text-xl tracking-tight text-[#294A3A]">YOUR CART</h2>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 hover:bg-[#294A3A]/5 rounded-full transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5 text-[#294A3A]" />
                </button>
              </div>

              {/* Free Shipping Progress */}
              <div className="bg-[#F8F5EE] px-6 py-4 border-b border-[#294A3A]/10">
                <div className="text-xs uppercase tracking-widest font-semibold mb-2 text-center text-[#294A3A]/80">
                  {freeShippingProgress >= 100 ? (
                    <span className="text-[#C71910] font-bold">🎉 YOU QUALIFY FOR FREE US SHIPPING!</span>
                  ) : (
                    <>
                      ADD <span className="font-bold text-[#294A3A]">{formatPrice(freeShippingThreshold - subtotal)}</span> MORE FOR FREE US SHIPPING
                    </>
                  )}
                </div>
                <div className="w-full bg-[#294A3A]/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#C71910] h-full transition-all duration-300 ease-out"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Cart Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                  <ShoppingBag className="w-12 h-12 text-[#294A3A]/30 stroke-[1.5]" />
                  <p className="font-serif text-2xl uppercase tracking-wider text-[#294A3A]">
                    YOUR CART IS EMPTY
                  </p>
                  <p className="text-xs uppercase tracking-wider text-[#294A3A]/60 max-w-xs">
                    Discover minimal signage, menu displays & architectural furniture.
                  </p>
                  <button
                    onClick={handleContinueShopping}
                    className="gw-button-primary mt-4"
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                cart.map((item) => {
                  const price = item.selectedVariant?.price ?? item.product.price;
                  return (
                    <div
                      key={item.id}
                      className="flex space-x-4 pb-6 border-b border-[#294A3A]/10 last:border-b-0"
                    >
                      <img
                        src={item.selectedVariant?.image || item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover border border-[#294A3A]/10 bg-[#F8F5EE]"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-sm text-[#294A3A] leading-snug">
                              {item.product.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#294A3A]/40 hover:text-[#C71910] p-1 transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          {item.selectedVariant && (
                            <p className="text-xs text-[#294A3A]/60 mt-1 uppercase tracking-wide">
                              {item.selectedVariant.name}
                            </p>
                          )}

                          <p className="text-xs font-semibold text-[#294A3A] mt-1">
                            {formatPrice(price)}
                          </p>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-[#294A3A]/20 bg-[#F8F5EE]">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 px-2 hover:bg-[#294A3A]/10 text-[#294A3A]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-3 text-xs font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 px-2 hover:bg-[#294A3A]/10 text-[#294A3A]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="text-xs font-bold text-[#294A3A]">
                            {formatPrice(price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="p-6 bg-[#F8F5EE] border-t border-[#294A3A]/10 space-y-4">
                <div className="flex justify-between items-center text-sm font-semibold tracking-wider uppercase">
                  <span>SUBTOTAL</span>
                  <span className="text-base text-[#294A3A]">{formatPrice(subtotal)}</span>
                </div>
                <p className="text-xs text-[#294A3A]/60 italic text-center">
                  Taxes and shipping calculated at checkout.
                </p>
                <button
                  onClick={handleCheckout}
                  className="w-full gw-button-primary flex items-center justify-center space-x-2 py-4"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
