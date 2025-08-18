class EventEmitter {
	#eventMap = new Map();
	#catchMethod = null;

	on(eventName, callback) {
		if (this.#eventMap.has(eventName)) {
			const currentEventMap = this.#eventMap.get(eventName);
			currentEventMap.add(callback);
			return this;
		}

		this.#eventMap.set(eventName, new Set([callback]));
		return this;
	}

	off(eventName, callback) {
		if (this.#eventMap.has(eventName)) {
			const currentEventMap = this.#eventMap.get(eventName);
			currentEventMap.delete(callback);
		}

		return this;
	}

	emit(eventName) {
		const currentEventCallbacks = this.#eventMap.get(eventName);

		if (currentEventCallbacks) {
			for (const callback of currentEventCallbacks.values()) {
				try {
					// вот тут может повиснуть все, я бы в микротакси сувал, или добавил бы конфиг для подписки, чтобы можно было указать насколько срочное событие
					queueMicrotask(() => callback());
				} catch (e) {
					this.#catchMethod(e);
				}
			}
		}
		return this;
	}

	catch(callback) {
		this.#catchMethod = callback;
	}
}

const emitter = new EventEmitter();

const cb1 = () => console.log("cb1");
const cb2 = () => console.log("cb2");

// emitter.on('event', obj.foo)

emitter
	.on("event", cb1)
	.on("event", cb2)
	.emit("event")
	.off("event", cb2)
	.emit("event");
