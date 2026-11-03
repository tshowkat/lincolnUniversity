"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle, MessageSquareText } from "lucide-react";
import { LINKS, WHATSAPP_NUMBER } from "@/data/site";
import { requestEnquiry } from "@/lib/utils";

const WA_TEXT = encodeURIComponent("Hi, I'd like to know more about the Lincoln Online programmes at Lincoln University College.");

export function FloatingActions() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const fabCls =
    "fixed bottom-[10.5rem] right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary text-white shadow-glow ring-4 ring-white transition hover:bg-brand-deep active:scale-95 md:bottom-24 md:right-6 md:h-16 md:w-16";

  return (
    <>
      {/* Floating WhatsApp / enquiry button */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            {WHATSAPP_NUMBER ? (
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WA_TEXT}`}
                target="_blank"
                rel="noopener noreferrer"
                className={fabCls}
              >
                <MessageCircle aria-hidden className="h-7 w-7" />
                <span className="sr-only">Chat with us on WhatsApp (opens in a new tab)</span>
              </a>
            ) : (
              <button type="button" onClick={() => requestEnquiry()} className={fabCls}>
                <MessageSquareText aria-hidden className="h-6 w-6" />
                <span className="sr-only">Send an enquiry</span>
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile sticky Apply bar */}
      <div className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-neutral-900/5 bg-white/90 px-4 pt-3 shadow-[0_-8px_30px_-12px_rgb(15_23_42/0.2)] backdrop-blur-xl md:hidden">
        <div className="flex gap-3">
          <button type="button" onClick={() => requestEnquiry()} className="btn btn-outline btn-sm flex-1">
            <MessageSquareText aria-hidden className="h-4 w-4" />
            Enquire
          </button>
          <a href={LINKS.apply} className="btn btn-primary btn-sm flex-[1.4]">
            Apply Now
            <ArrowRight aria-hidden className="h-4 w-4" />
          </a>
        </div>
      </div>
    </>
  );
}
