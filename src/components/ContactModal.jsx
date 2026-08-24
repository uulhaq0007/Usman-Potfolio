import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SiGmail, SiWhatsapp } from 'react-icons/si'
import { IoClose, IoArrowForward } from 'react-icons/io5'
import { EMAIL, WHATSAPP, gmailComposeUrl, whatsappUrl } from '../data/contact'

// Pretty +92 300 1234567 style display for the WhatsApp number.
const prettyPhone = (n) => '+' + n.replace(/^(\d{1,3})(\d{3})(\d+)$/, '$1 $2 $3')

// Modal offering two ways to reach out: a Gmail compose window or a WhatsApp chat.
export default function ContactModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="modal__panel contact-modal glass"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Contact options"
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="modal__head">
              <div>
                <span className="modal__cat">Get in touch</span>
                <h3 className="modal__title">How would you like to reach me?</h3>
              </div>
              <button className="modal__close" onClick={onClose} aria-label="Close">
                <IoClose size={22} />
              </button>
            </header>

            <div className="contact-modal__options">
              <a
                className="contact-option"
                href={gmailComposeUrl()}
                target="_blank"
                rel="noreferrer"
                onClick={onClose}
                style={{ '--brand': '#EA4335' }}
              >
                <span className="contact-option__icon"><SiGmail size={26} /></span>
                <span className="contact-option__text">
                  <strong>Email me</strong>
                  <span>{EMAIL}</span>
                </span>
                <IoArrowForward className="contact-option__arrow" size={20} />
              </a>

              <a
                className="contact-option"
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
                onClick={onClose}
                style={{ '--brand': '#25D366' }}
              >
                <span className="contact-option__icon"><SiWhatsapp size={26} /></span>
                <span className="contact-option__text">
                  <strong>WhatsApp</strong>
                  <span>{prettyPhone(WHATSAPP)}</span>
                </span>
                <IoArrowForward className="contact-option__arrow" size={20} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
