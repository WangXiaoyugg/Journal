const triggerEvent = (el, eventType, detail) => {
	el.dispatchEvent(new CustomEvent(eventType, {detail}))
}

// 生成UUID, 
const UUIDGeneratorBrowser = () =>
  ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
 );

const toggleClass= (el, className) => el.classList.toggle(className);

const smoothScroll = el => document.querySelector(el).scrollIntoView({
	behavior: "smooth",
})

const show = (...el) => [...el].forEach(e => (e.style.display = 'block'));