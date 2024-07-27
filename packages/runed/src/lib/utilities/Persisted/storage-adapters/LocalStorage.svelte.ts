import { SyncStorageAdapter } from "./StorageAdapter.js";
import { browser } from "$lib/internal/utils/browser.js";

interface LocalStorageOptions<Value> {
	serialize?: (value: Value) => string;
	deserialize?: (value: string) => Value;
}

class LocalStorage<Value> extends SyncStorageAdapter<Value> {
	private options: LocalStorageOptions<Value>;

	private key: string;
	private serialize = $derived.by(() => this.options.serialize ?? JSON.stringify);
	private deserialize = $derived.by(() => this.options.deserialize ?? JSON.parse);

	constructor(key: string, options: LocalStorageOptions<Value> = {}) {
		super();
		this.key = key;
		this.options = options;
	}

	get() {
		if (!browser) {
			return null;
		}
		const stored = localStorage.getItem(this.key);
		return stored !== null ? this.deserialize(stored) : null;
	}

	set(value: Value) {
		if (!browser) {
			return;
		}
		localStorage.setItem(this.key, this.serialize(value));
	}

	has() {
		if (!browser) {
			return false;
		}
		return localStorage.getItem(this.key) !== null;
	}

	remove() {
		if (!browser) {
			return false;
		}
		localStorage.removeItem(this.key);
		return true;
	}
}

export { LocalStorage };
