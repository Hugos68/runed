import { SyncStorageAdapter } from "./StorageAdapter.js";
import { browser } from "$lib/internal/utils/browser.js";

interface SessionStorageOptions<Value> {
	serialize?: (value: Value) => string;
	deserialize?: (value: string) => Value;
}

class SessionStorage<Value> extends SyncStorageAdapter<Value> {
	private options: SessionStorageOptions<Value>;

	private key: string;
	private serialize = $derived.by(() => this.options.serialize ?? JSON.stringify);
	private deserialize = $derived.by(() => this.options.deserialize ?? JSON.parse);

	constructor(key: string, options: SessionStorageOptions<Value> = {}) {
		super();
		this.key = key;
		this.options = options;
	}

	get() {
		if (!browser) {
			return null;
		}
		const stored = sessionStorage.getItem(this.key);
		return stored !== null ? this.deserialize(stored) : null;
	}

	set(value: Value) {
		if (!browser) {
			return;
		}
		sessionStorage.setItem(this.key, this.serialize(value));
	}

	has() {
		if (!browser) {
			return false;
		}
		return sessionStorage.getItem(this.key) !== null;
	}

	remove() {
		if (!browser) {
			return false;
		}
		sessionStorage.removeItem(this.key);
		return true;
	}
}

export { SessionStorage };
